'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// мини-загрузчик файла .env
try {
  fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/).forEach(l => {
    const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
} catch (e) { /* .env нет — берём переменные окружения */ }

const express = require('express');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data.json');
const ORIGIN = process.env.ALLOWED_ORIGIN || '';
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
const FROM_NAME = process.env.FROM_NAME || 'ProgForce';
if (!GMAIL_USER || !GMAIL_PASS) console.warn('⚠ Не заданы GMAIL_USER / GMAIL_APP_PASSWORD — письма отправляться не будут.');

const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_PASS } });

/* ---------- хранилище (JSON-файл) ---------- */
let db = { users: {}, profiles: {}, sessions: {}, codes: {} };
try { db = Object.assign(db, JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))); } catch (e) { /* первый запуск */ }
function save() {
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db));
  fs.renameSync(tmp, DATA_FILE);
}
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const NICK_RE = /^[A-Za-z0-9_А-Яа-яЁё.-]{3,20}$/;
const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const fail = (res, status, code, message) => res.status(status).json({ error: { code, message } });

/* ---------- приложение ---------- */
const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '200kb' }));
app.use((req, res, next) => {
  if (ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
  }
  next();
});

// сайт (отдаём только нужные файлы, чтобы data.json и .env были недоступны)
const SITE_URL = (process.env.SITE_URL || '').replace(/\/+$/, '');
const siteUrl = req => SITE_URL || (req.protocol + '://' + req.get('host'));
const sendPage = (req, res) => {
  const html = fs.readFileSync(path.join(__dirname, 'ProgForce.html'), 'utf8').replace(/__SITE_URL__/g, siteUrl(req));
  res.type('html').send(html);
};
app.get('/', sendPage);
app.get('/ProgForce.html', sendPage);
const FILES = { '/App.js': 'App.js', '/Data.js': 'Data.js', '/Data.en.js': 'Data.en.js', '/Archive.js': 'Archive.js', '/I18n.js': 'I18n.js', '/ProgForce.css': 'ProgForce.css', '/Chatbot.js': 'Chatbot.js', '/Effects.js': 'Effects.js', '/Run.js': 'Run.js', '/server-config.js': 'server-config.js',
  '/favicon.svg': 'favicon.svg', '/favicon.png': 'favicon.png', '/favicon.ico': 'favicon.png', '/og-image.png': 'og-image.png',
  '/icons/icon-192.png': 'icons/icon-192.png', '/icons/icon-512.png': 'icons/icon-512.png', '/icons/icon-maskable-512.png': 'icons/icon-maskable-512.png' };
Object.keys(FILES).forEach(p => app.get(p, (req, res) => res.sendFile(path.join(__dirname, FILES[p]))));
// PWA / Android-приложение (Google Play через TWA)
app.get('/manifest.webmanifest', (req, res) => res.type('application/manifest+json').sendFile(path.join(__dirname, 'manifest.webmanifest')));
app.get('/sw.js', (req, res) => { res.set('Cache-Control', 'no-cache'); res.type('application/javascript').sendFile(path.join(__dirname, 'sw.js')); });
// подтверждение связи сайта и приложения (убирает адресную строку в TWA)
app.get('/.well-known/assetlinks.json', (req, res) => {
  const fp = (process.env.TWA_SHA256 || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!fp.length) return res.status(404).json({ error: 'TWA_SHA256 не задан' });
  res.json([{ relation: ['delegate_permission/common.handle_all_urls'],
    target: { namespace: 'android_app', package_name: process.env.TWA_PACKAGE || 'com.progforce.app', sha256_cert_fingerprints: fp } }]);
});
app.get('/robots.txt', (req, res) => res.type('text/plain').send('User-agent: *\nAllow: /\n\nSitemap: ' + siteUrl(req) + '/sitemap.xml\n'));
app.get('/sitemap.xml', (req, res) => res.type('application/xml').send(
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>' + siteUrl(req) + '/</loc></url>\n</urlset>\n'));

/* ---------- тексты писем (ru / en) ---------- */
const MAILS = {
  ru: {
    subject: 'Ваш код для входа в ',
    body: 'Ваш код для входа:',
    note: 'Код действует 10 минут. Если это были не вы — просто проигнорируйте письмо.'
  },
  en: {
    subject: 'Your sign-in code for ',
    body: 'Your sign-in code:',
    note: 'The code is valid for 10 minutes. If it was not you, just ignore this email.'
  }
};

/* ---------- отправка кода ---------- */
const ipHits = {};
app.post('/api/send-code', async (req, res) => {
  const email = String((req.body || {}).email || '').trim().toLowerCase();
  if (!MAIL_RE.test(email) || email.length > 120) return fail(res, 400, 'bad_email', 'Некорректный e-mail');

  const now = Date.now();
  const hits = (ipHits[req.ip] || []).filter(t => now - t < 3600e3);
  if (hits.length >= 10) return fail(res, 429, 'rate', 'rate limit');
  const prev = db.codes[email];
  if (prev && now - prev.sentAt < 60e3) return fail(res, 429, 'rate', 'rate limit');

  const lang = String((req.body || {}).lang || '') === 'en' ? 'en' : 'ru';
  const M = MAILS[lang];
  const code = String(crypto.randomInt(100000, 1000000));
  db.codes[email] = { hash: sha(code + ':' + email), exp: now + 10 * 60e3, tries: 0, sentAt: now };
  ipHits[req.ip] = hits.concat(now);
  save();
  try {
    await transporter.sendMail({
      from: '"' + FROM_NAME + '" <' + GMAIL_USER + '>',
      to: email,
      subject: M.subject + FROM_NAME + ': ' + code,
      text: M.subject + FROM_NAME + ': ' + code + '\n' + M.note,
      html: '<div style="font-family:Arial,sans-serif;max-width:420px;margin:auto;padding:24px;border:1px solid #ddd;border-radius:12px">' +
        '<h2 style="margin:0 0 12px">' + FROM_NAME + '</h2><p>' + M.body + '</p>' +
        '<p style="font-size:34px;letter-spacing:8px;font-weight:bold;margin:12px 0">' + code + '</p>' +
        '<p style="color:#666;font-size:13px">' + M.note + '</p></div>'
    });
    res.json({ ok: true });
  } catch (e) {
    console.error('Mail error:', e.message);
    delete db.codes[email]; save();
    fail(res, 500, 'mail', 'Не удалось отправить письмо');
  }
});

/* ---------- проверка кода ---------- */
app.post('/api/verify', (req, res) => {
  const email = String((req.body || {}).email || '').trim().toLowerCase();
  const code = String((req.body || {}).code || '').replace(/\D/g, '');
  const rec = db.codes[email];
  if (!rec || Date.now() > rec.exp) return fail(res, 400, 'invalid', 'Invalid or expired code');
  if (rec.tries >= 5) { delete db.codes[email]; save(); return fail(res, 400, 'invalid', 'Invalid or expired code'); }
  rec.tries++;
  const a = Buffer.from(sha(code + ':' + email)), b = Buffer.from(rec.hash);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) { save(); return fail(res, 400, 'invalid', 'Invalid or expired code'); }

  delete db.codes[email];
  let user = Object.values(db.users).find(u => u.email === email);
  if (!user) { user = { id: crypto.randomUUID(), email, created: Date.now() }; db.users[user.id] = user; }
  const token = crypto.randomBytes(32).toString('hex');
  db.sessions[sha(token)] = { userId: user.id, created: Date.now() };
  save();
  res.json({ token, user: { id: user.id, email: user.email } });
});

/* ---------- защищённые методы ---------- */
function auth(req, res, next) {
  const m = (req.headers.authorization || '').match(/^Bearer (\w+)$/);
  const s = m && db.sessions[sha(m[1])];
  if (!s || Date.now() - s.created > 90 * 86400e3) return fail(res, 401, 'auth', 'Unauthorized');
  req.user = db.users[s.userId];
  req.tokenHash = sha(m[1]);
  if (!req.user) return fail(res, 401, 'auth', 'Unauthorized');
  next();
}
app.get('/api/me', auth, (req, res) => res.json({ user: { id: req.user.id, email: req.user.email } }));
app.post('/api/logout', auth, (req, res) => { delete db.sessions[req.tokenHash]; save(); res.json({ ok: true }); });
app.get('/api/profile', auth, (req, res) => res.json({ profile: db.profiles[req.user.id] || null }));

function cleanProfile(b, needNick) {
  const out = {};
  const bad = { error: { code: '23514', message: 'invalid data' } };
  b = b || {};
  if (needNick || b.nickname !== undefined) { if (!NICK_RE.test(String(b.nickname || ''))) return bad; out.nickname = b.nickname; }
  if (b.avatar !== undefined) { if (typeof b.avatar !== 'string' || !b.avatar || b.avatar.length > 16) return bad; out.avatar = b.avatar; }
  if (b.color !== undefined) { if (!/^#[0-9a-f]{6}$/i.test(String(b.color))) return bad; out.color = b.color; }
  if (b.bio !== undefined) { if (typeof b.bio !== 'string' || b.bio.length > 80) return bad; out.bio = b.bio; }
  if (b.data !== undefined) {
    if (typeof b.data !== 'object' || b.data === null || JSON.stringify(b.data).length > 100000) return bad;
    out.data = b.data;
  }
  return { out };
}
const nickTaken = (nick, uid) => Object.values(db.profiles).some(p => p.id !== uid && p.nickname.toLowerCase() === nick.toLowerCase());

app.post('/api/profile', auth, (req, res) => {
  if (db.profiles[req.user.id]) return fail(res, 409, 'exists', 'Profile exists');
  const c = cleanProfile(req.body, true);
  if (c.error) return res.status(400).json(c);
  if (nickTaken(c.out.nickname, req.user.id)) return fail(res, 409, '23505', 'duplicate');
  db.profiles[req.user.id] = Object.assign({ id: req.user.id, avatar: '😎', color: '#3dd68c', bio: '', data: {}, created: Date.now() }, c.out);
  save();
  res.json({ profile: db.profiles[req.user.id] });
});
app.put('/api/profile', auth, (req, res) => {
  const p = db.profiles[req.user.id];
  if (!p) return fail(res, 404, 'none', 'No profile');
  const c = cleanProfile(req.body, false);
  if (c.error) return res.status(400).json(c);
  if (c.out.nickname && nickTaken(c.out.nickname, req.user.id)) return fail(res, 409, '23505', 'duplicate');
  Object.assign(p, c.out);
  save();
  res.json({ profile: p });
});


/* ---------- чат-бот ---------- */
// Поддерживаются два варианта (достаточно ОДНОГО ключа в .env):
//   GROQ_API_KEY      — бесплатный Groq (https://console.groq.com)  <- используется первым
//   ANTHROPIC_API_KEY — Claude API (платный)
// Ключ хранится только на сервере и в браузер не попадает.
const GROQ_KEY = process.env.GROQ_API_KEY || '';
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || '';
const PROVIDER = GROQ_KEY ? 'groq' : (ANTHROPIC_KEY ? 'anthropic' : '');
const AI_MODEL = process.env.CHAT_MODEL || (PROVIDER === 'groq' ? 'openai/gpt-oss-120b' : 'claude-haiku-5-5');
const AI_URL = process.env.CHAT_API_URL || (PROVIDER === 'groq'
  ? 'https://api.groq.com/openai/v1/chat/completions'
  : 'https://api.anthropic.com/v1/messages');
if (!PROVIDER) console.warn('⚠ Не задан GROQ_API_KEY (или ANTHROPIC_API_KEY) — чат-бот отвечать не будет.');
else console.log('Чат-бот: ' + PROVIDER + ', модель ' + AI_MODEL);

const CHAT_SYSTEM = [
  'You are ProgForce Assistant, a smart, friendly and patient programming tutor built into ProgForce, a website for learning C++ and Python.',
  'The site has: step-by-step courses with code examples, a keyboard typing trainer, an archive of 60+ Codeforces-style problems, resources comparing languages, and a knowledge test.',
  'Rules:',
  '- Reply in the same language the user writes in. The site language is given in each request; use it if the language is unclear.',
  '- First understand what the user really needs. If the question is vague, ask one short clarifying question.',
  '- Explain step by step, from simple to complex. Use short, correct code examples in markdown code blocks with a language tag.',
  '- When the user asks for code (even a trivial task), write complete working code right away, then explain it briefly. If no language is named, use Python.',
  '- For archive problems, give a hint and the main idea first. Give a full solution only if the user explicitly asks or has already tried.',
  '- If the user shows code with an error, find the exact cause, show the fixed line, and explain why it was wrong.',
  '- Suggest the next small step or a short practice exercise when it helps learning.',
  '- Answer any IT question: languages, algorithms, web development, databases, servers, computer science. Politely decline only unrelated or harmful requests, in one sentence.',
  '- Explain terms and abbreviations simply, with a short example.',
  '- The chat cannot render LaTeX. Never use LaTeX or math markup (no backslash commands, no dollar signs). Write formulas in plain text, and DO use Unicode math symbols freely: ∑ √ π ∞ ≤ ≥ ≠ ≈ → ← ± × ÷ ² ³ ½ α β. Examples: S = ∑ a[i], x ≤ y, √(a² + b²), C = log2(M).',
  '- Keep answers concise. If you are not sure about something, say so instead of guessing.'
].join('\n');

const chatHits = {};
app.post('/api/chat', async (req, res) => {
  if (!PROVIDER) return fail(res, 503, 'no_key', 'Chat is not configured');
  const now = Date.now();
  const hits = (chatHits[req.ip] || []).filter(t => now - t < 86400e3);
  if (hits.filter(t => now - t < 600e3).length >= 20 || hits.length >= 150) return fail(res, 429, 'rate', 'rate limit');

  const body = req.body || {};
  const lang = String(body.lang || '') === 'en' ? 'English' : 'Russian';
  let msgs = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  msgs = msgs
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return fail(res, 400, 'bad_request', 'Invalid messages');

  const system = CHAT_SYSTEM + '\nSite language: ' + lang + '.' + (body.page ? '\nThe user is currently on the page: ' + String(body.page).slice(0, 40) : '');

  let headers, payload;
  if (PROVIDER === 'groq') {
    headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + GROQ_KEY };
    payload = { model: AI_MODEL, max_completion_tokens: 2500, temperature: 0.4,
      messages: [{ role: 'system', content: system }].concat(msgs) };
    if (/gpt-oss/i.test(AI_MODEL)) payload.reasoning_effort = 'low';   // меньше «раздумий» — быстрее ответ
  } else {
    headers = { 'content-type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' };
    payload = { model: AI_MODEL, max_tokens: 900, system, messages: msgs };
  }

  chatHits[req.ip] = hits.concat(now);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30e3);
  try {
    const r = await fetch(AI_URL, { method: 'POST', signal: ctrl.signal, headers, body: JSON.stringify(payload) });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('Chat API error:', r.status, data && data.error && data.error.message);
      return fail(res, r.status === 429 ? 429 : 502, 'ai', 'Chat service error');
    }
    const reply = PROVIDER === 'groq'
      ? String(((data.choices || [])[0] || {}).message && data.choices[0].message.content || '').trim()
      : (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    res.json({ reply: reply || '…' });
  } catch (e) {
    console.error('Chat error:', e.name === 'AbortError' ? 'timeout' : e.message);
    fail(res, 502, 'ai', 'Chat service error');
  } finally { clearTimeout(timer); }
});


/* ---------- запуск кода («Запуск», как custom invocation на Codeforces) ---------- */
// RUN_MODE=remote (по умолчанию) — код уходит в онлайн-компилятор Wandbox: безопасно для вашего сервера.
// RUN_MODE=local  — код компилируется и запускается на этом сервере (нужен g++ / python3). Выполняйте
//                   чужой код локально только в Docker/на отдельной машине: процесс видит файлы сервера.
const { spawn, spawnSync } = require('child_process');
const os = require('os');
const RUN_MODE = (process.env.RUN_MODE || 'remote').toLowerCase();
const RUN_LOGIN = process.env.RUN_REQUIRE_LOGIN === '1';
const RUN_TL = Math.min(+process.env.RUN_TIME_LIMIT_MS || 3000, 10000);
const RUN_MEM_MB = +process.env.RUN_MEMORY_MB || 512;
const RUN_MAX_OUT = 64 * 1024, RUN_MAX_CODE = 64 * 1024, RUN_MAX_IN = 100 * 1024;
const IS_WIN = process.platform === 'win32';
const CAN_UNSHARE = !IS_WIN && RUN_MODE === 'local' && (() => { try { return spawnSync('unshare', ['-rn', 'true']).status === 0; } catch (e) { return false; } })();
if (RUN_MODE === 'local') console.log('Запуск кода: локально' + (CAN_UNSHARE ? ' (без сети)' : ' (⚠ изоляция сети недоступна)'));
else console.log('Запуск кода: онлайн-компилятор Wandbox');

function runProc(cmd, args, o) {
  return new Promise(resolve => {
    const t0 = Date.now();
    let out = '', err = '', over = false, timedOut = false, done = false;
    let ch;
    try { ch = spawn(cmd, args, { cwd: o.cwd, env: o.env, stdio: ['pipe', 'pipe', 'pipe'] }); }
    catch (e) { return resolve({ code: -1, signal: null, stdout: '', stderr: String(e.message), spawnError: true, ms: 0 }); }
    const finish = (code, signal, extra) => {
      if (done) return; done = true; clearTimeout(timer);
      resolve(Object.assign({ code, signal, stdout: out, stderr: err, timedOut, over, ms: Date.now() - t0 }, extra));
    };
    const timer = setTimeout(() => { timedOut = true; try { ch.kill('SIGKILL'); } catch (e) {} }, o.timeout);
    ch.stdout.on('data', d => { if (out.length < RUN_MAX_OUT) out += d.toString('utf8'); else { over = true; try { ch.kill('SIGKILL'); } catch (e) {} } });
    ch.stderr.on('data', d => { if (err.length < RUN_MAX_OUT) err += d.toString('utf8'); });
    ch.on('error', e => { err += String(e.message); finish(-1, null, { spawnError: true }); });
    ch.on('close', (code, signal) => finish(code, signal));
    ch.stdin.on('error', () => {});
    ch.stdin.end(o.input || '');
  });
}

async function runLocal(lang, code, input) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pf-run-'));
  const env = { PATH: process.env.PATH || '/usr/bin:/bin', LANG: 'C.UTF-8', HOME: dir, TMPDIR: dir };
  try {
    let cmd, args;
    if (lang === 'cpp') {
      fs.writeFileSync(path.join(dir, 'main.cpp'), code);
      const exe = IS_WIN ? 'main.exe' : 'main';
      const c = await runProc('g++', ['-O2', '-std=c++17', '-pipe', '-o', exe, 'main.cpp'], { cwd: dir, env, timeout: 20000, input: '' });
      if (c.spawnError) return { error: 'no_compiler' };
      if (c.code !== 0 || c.timedOut) return { verdict: 'ce', stdout: '', stderr: '', compile: (c.stderr || c.stdout || 'compilation failed').slice(0, 20000), exit: c.code, time: null };
      cmd = path.join(dir, exe); args = [];
    } else {
      fs.writeFileSync(path.join(dir, 'main.py'), code);
      cmd = IS_WIN ? 'python' : 'python3'; args = ['-I', 'main.py'];
    }
    if (!IS_WIN) {
      args = ['-c', 'ulimit -c 0; ulimit -f 4096; ulimit -v ' + (RUN_MEM_MB * 1024) + '; exec "$@"', 'sh', cmd].concat(args);
      cmd = 'sh';
      if (CAN_UNSHARE) { args = ['-rn', 'sh'].concat(args); cmd = 'unshare'; }
    }
    const r = await runProc(cmd, args, { cwd: dir, env, timeout: RUN_TL, input });
    if (r.spawnError) return { error: lang === 'py' ? 'no_python' : 'run_failed' };
    let verdict = 'ok';
    if (r.timedOut) verdict = 'tle';
    else if (r.over) verdict = 'ole';
    else if (r.code !== 0 || r.signal) verdict = 're';
    return { verdict, stdout: r.stdout, stderr: r.stderr, compile: '', exit: r.signal || r.code, time: r.ms };
  } finally { try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {} }
}

let wbList = null, wbAt = 0;
async function wandboxCompiler(lang) {
  const fallback = lang === 'cpp' ? 'gcc-head' : 'cpython-head';
  try {
    if (!wbList || Date.now() - wbAt > 6 * 3600e3) {
      const r = await fetch('https://wandbox.org/api/list.json', { signal: AbortSignal.timeout(10000) });
      if (!r.ok) throw new Error('list');
      wbList = await r.json(); wbAt = Date.now();
    }
    const want = lang === 'cpp' ? 'C++' : 'Python';
    const ver = n => (n.match(/\d+(\.\d+)*/) || ['0'])[0].split('.').map(Number);
    const cmp = (a, b) => { const x = ver(a), y = ver(b); for (let i = 0; i < 4; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0); } return 0; };
    const names = wbList.filter(c => c.language === want && (lang === 'cpp' ? /^gcc-\d/.test(c.name) : /^cpython-\d/.test(c.name))).map(c => c.name).sort(cmp);
    return names.length ? names[names.length - 1] : fallback;
  } catch (e) { return fallback; }
}

async function runRemote(lang, code, input) {
  const compiler = await wandboxCompiler(lang);
  const body = { compiler, code, stdin: input, save: false };
  if (lang === 'cpp') body['compiler-option-raw'] = '-O2\n-std=gnu++17';
  const t0 = Date.now();
  let r;
  try { r = await fetch('https://wandbox.org/api/compile.json', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(30000) }); }
  catch (e) { return { error: 'remote_down' }; }
  if (!r.ok) return { error: r.status === 429 ? 'busy' : 'remote_down' };
  const d = await r.json().catch(() => null);
  if (!d) return { error: 'remote_down' };
  const status = String(d.status == null ? '' : d.status), sig = String(d.signal || '');
  const stdout = String(d.program_output || ''), stderr = String(d.program_error || '');
  const cmsg = String(d.compiler_error || d.compiler_message || '');
  const ran = d.program_message !== undefined && d.program_message !== '' || stdout !== '' || stderr !== '';
  let verdict = 'ok';
  if (status === '0' && !sig) verdict = 'ok';
  else if (!ran && lang === 'cpp' && cmsg) verdict = 'ce';
  else if (/kill|timeout/i.test(sig)) verdict = 'tle';
  else verdict = 're';
  if (lang === 'py' && verdict === 're' && !ran && cmsg) verdict = 're';
  return { verdict, stdout, stderr, compile: verdict === 'ce' ? cmsg : '', exit: sig || status, time: null };
}

const runHits = {};
let runActive = 0;
const runGuard = RUN_LOGIN ? [auth] : [];
app.post('/api/run', runGuard, async (req, res) => {
  const b = req.body || {};
  const lang = b.lang === 'py' ? 'py' : (b.lang === 'cpp' ? 'cpp' : '');
  const code = typeof b.code === 'string' ? b.code : '';
  const input = typeof b.input === 'string' ? b.input : '';
  if (!lang || !code.trim()) return fail(res, 400, 'bad_request', 'Invalid request');
  if (code.length > RUN_MAX_CODE || input.length > RUN_MAX_IN) return fail(res, 413, 'too_big', 'Too large');

  const now = Date.now();
  const hits = (runHits[req.ip] || []).filter(t => now - t < 600e3);
  if (hits.length >= 40) return fail(res, 429, 'rate', 'rate limit');
  if (runActive >= (RUN_MODE === 'local' ? 3 : 6)) return fail(res, 429, 'busy', 'busy');
  runHits[req.ip] = hits.concat(now);

  runActive++;
  try {
    const r = RUN_MODE === 'local' ? await runLocal(lang, code, input) : await runRemote(lang, code, input);
    if (r.error) return fail(res, r.error === 'busy' ? 429 : 502, r.error, 'Run service error');
    res.json(r);
  } catch (e) {
    console.error('Run error:', e.message);
    fail(res, 500, 'run_failed', 'Run error');
  } finally { runActive--; }
});


// чистка старых кодов и сессий раз в час
setInterval(() => {
  const now = Date.now();
  Object.keys(db.codes).forEach(k => { if (now > db.codes[k].exp) delete db.codes[k]; });
  Object.keys(db.sessions).forEach(k => { if (now - db.sessions[k].created > 90 * 86400e3) delete db.sessions[k]; });
  Object.keys(chatHits).forEach(k => { chatHits[k] = chatHits[k].filter(t => now - t < 86400e3); if (!chatHits[k].length) delete chatHits[k]; });
  Object.keys(runHits).forEach(k => { runHits[k] = runHits[k].filter(t => now - t < 600e3); if (!runHits[k].length) delete runHits[k]; });
  save();
}, 3600e3).unref();

app.listen(PORT, () => console.log('ProgForce запущен: http://localhost:' + PORT));
