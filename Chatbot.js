'use strict';

/* ============ ЧАТ-БОТ / CHATBOT ============
   Плавающая кнопка в правом нижнем углу + окно чата.
   Запросы идут на /api/chat (server.js), ключ Claude API хранится только на сервере. */
(function () {
  const t = (k) => (window.I18N ? I18N.t(k) : k);
  const cfg = window.SERVER_CONFIG || {};
  const SS_KEY = 'pf_chat_history';
  const MAX_HISTORY = 12;

  let history = [];
  try { history = JSON.parse(sessionStorage.getItem(SS_KEY) || '[]').filter(m => m && m.content); } catch (e) { history = []; }
  let busy = false;

  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Мини-разметка: ```код```, `код`, **жирный**, списки. Всё сначала экранируется. */
  function md(src) {
    return String(src).split('```').map((part, i) => {
      if (i % 2) {
        const nl = part.indexOf('\n');
        const body = nl >= 0 && /^[\w+#.-]*$/.test(part.slice(0, nl).trim()) ? part.slice(nl + 1) : part;
        return '<pre><button type="button" class="cb-copy">' + esc(t('cb_copy')) + '</button><code>' + esc(body.replace(/\n$/, '')) + '</code></pre>';
      }
      return esc(part)
        .replace(/`([^`\n]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
        .replace(/^\s*[-*] /gm, '• ')
        .replace(/^#{1,4} (.+)$/gm, '<b>$1</b>')
        .replace(/\n/g, '<br>');
    }).join('');
  }

  const ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12z"/></svg>';
  const ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>';

  /* ---------- размер окна ---------- */
  const SIZE_KEY = 'pf_chat_big';
  const st = document.createElement('style');
  st.textContent =
    '@media (min-width: 561px) {' +
    ' .cb-panel { width: 480px; height: 660px; max-height: calc(100vh - 110px); }' +
    ' .cb-panel.cb-big { width: min(960px, calc(100vw - 40px)); height: calc(100vh - 110px); }' +
    ' .cb-panel.cb-big .cb-m { font-size: 15.5px; max-width: 80%; }' +
    ' .cb-panel.cb-big .cb-m code, .cb-panel.cb-big .cb-m pre code { font-size: 14px; }' +
    ' .cb-panel.cb-big .cb-form textarea { font-size: 15.5px; max-height: 160px; }' +
    '}' +
    '@media (max-width: 560px) { .cb-size { display: none; } }' +
    '.cb-m { font-size: 15px; } .cb-panel { transition: width .15s, height .15s; }';
  document.head.appendChild(st);

  /* ---------- DOM ---------- */
  const fab = document.createElement('button');
  fab.type = 'button'; fab.className = 'cb-fab'; fab.innerHTML = ICON_CHAT;

  const panel = document.createElement('div');
  panel.className = 'cb-panel'; panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.innerHTML =
    '<div class="cb-head"><img src="favicon.png" alt="" width="28" height="28"><strong></strong>' +
    '<button type="button" class="cb-size">⤢</button><button type="button" class="cb-clear">🗑</button><button type="button" class="cb-close">✕</button></div>' +
    '<div class="cb-msgs" aria-live="polite"></div>' +
    '<div class="cb-sugg"></div>' +
    '<form class="cb-form"><textarea rows="1" maxlength="2000"></textarea><button type="submit">' + ICON_SEND + '</button></form>';

  const $ = sel => panel.querySelector(sel);
  const msgs = $('.cb-msgs'), sugg = $('.cb-sugg'), input = $('textarea'), sendBtn = $('.cb-form button');

  function refreshLabels() {
    fab.setAttribute('aria-label', t('cb_open')); fab.title = t('cb_open');
    panel.setAttribute('aria-label', t('cb_title'));
    $('.cb-head strong').textContent = t('cb_title');
    updateSizeBtn();
    $('.cb-clear').title = t('cb_clear'); $('.cb-clear').setAttribute('aria-label', t('cb_clear'));
    $('.cb-close').title = t('cb_close'); $('.cb-close').setAttribute('aria-label', t('cb_close'));
    input.placeholder = t('cb_placeholder');
    sendBtn.setAttribute('aria-label', t('cb_send')); sendBtn.title = t('cb_send');
    panel.querySelectorAll('.cb-copy').forEach(b => { b.textContent = t('cb_copy'); });
    renderSuggestions();
    const hello = msgs.querySelector('.cb-m[data-hello]');
    if (hello) hello.innerHTML = md(t('cb_hello'));
  }

  function updateSizeBtn() {
    const big = panel.classList.contains('cb-big'), en = window.I18N && I18N.lang === 'en';
    const b = $('.cb-size');
    b.textContent = big ? '⤡' : '⤢';
    b.title = big ? (en ? 'Smaller' : 'Уменьшить') : (en ? 'Enlarge' : 'Увеличить');
    b.setAttribute('aria-label', b.title);
  }
  function setBig(on) {
    panel.classList.toggle('cb-big', !!on);
    try { sessionStorage.setItem(SIZE_KEY, on ? '1' : '0'); } catch (e) { /* ignore */ }
    updateSizeBtn();
    msgs.scrollTop = msgs.scrollHeight;
  }

  function renderSuggestions() {
    sugg.innerHTML = '';
    if (history.length) return;
    ['cb_s1', 'cb_s2', 'cb_s3'].forEach(k => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = t(k);
      b.addEventListener('click', () => send(b.textContent));
      sugg.appendChild(b);
    });
  }

  function addMsg(role, text, opts) {
    const d = document.createElement('div');
    d.className = 'cb-m ' + (role === 'user' ? 'user' : 'bot') + (opts && opts.err ? ' err' : '');
    if (role === 'user') d.textContent = text; else d.innerHTML = md(text);
    if (opts && opts.hello) d.dataset.hello = '1';
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  function renderAll() {
    msgs.innerHTML = '';
    addMsg('bot', t('cb_hello'), { hello: true });
    history.forEach(m => addMsg(m.role, m.content));
    renderSuggestions();
  }

  const save = () => { try { sessionStorage.setItem(SS_KEY, JSON.stringify(history.slice(-MAX_HISTORY))); } catch (e) { /* ignore */ } };

  async function send(text) {
    text = String(text || '').trim();
    if (!text || busy) return;
    if (!cfg.enabled) { addMsg('bot', t('cb_err_demo'), { err: true }); return; }
    busy = true; sendBtn.disabled = true;
    history.push({ role: 'user', content: text });
    history = history.slice(-MAX_HISTORY);
    save();
    sugg.innerHTML = '';
    addMsg('user', text);
    input.value = ''; autosize();

    const wait = addMsg('bot', '');
    wait.innerHTML = '<span class="cb-dots" aria-label="' + esc(t('cb_thinking')) + '"><i></i><i></i><i></i></span>';
    try {
      const r = await fetch((cfg.apiUrl || '') + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, lang: window.I18N ? I18N.lang : 'ru', page: location.hash.replace('#', '') })
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        const code = data && data.error && data.error.code;
        throw new Error(code === 'rate' ? 'cb_err_rate' : code === 'no_key' ? 'cb_err_nokey' : 'cb_err');
      }
      wait.innerHTML = md(data.reply);
      history.push({ role: 'assistant', content: data.reply });
      history = history.slice(-MAX_HISTORY);
      save();
    } catch (e) {
      const key = /^cb_err/.test(e.message) ? e.message : 'cb_err';
      wait.className = 'cb-m bot err';
      wait.textContent = t(key);
      history.pop(); save();   // неудачный вопрос не копим в истории
    }
    busy = false; sendBtn.disabled = false;
    msgs.scrollTop = msgs.scrollHeight;
    input.focus();
  }

  function autosize() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 110) + 'px'; }

  /* ---------- события ---------- */
  function toggle(open) {
    panel.hidden = open === undefined ? !panel.hidden : !open;
    fab.innerHTML = panel.hidden ? ICON_CHAT : '<span style="font-size:22px;line-height:1">✕</span>';
    if (!panel.hidden) { msgs.scrollTop = msgs.scrollHeight; setTimeout(() => input.focus(), 50); }
  }
  fab.addEventListener('click', () => toggle());
  $('.cb-close').addEventListener('click', () => toggle(false));
  $('.cb-size').addEventListener('click', () => setBig(!panel.classList.contains('cb-big')));
  try { if (sessionStorage.getItem(SIZE_KEY) === '1') panel.classList.add('cb-big'); } catch (e) { /* ignore */ }
  $('.cb-clear').addEventListener('click', () => { history = []; save(); renderAll(); });
  $('.cb-form').addEventListener('submit', e => { e.preventDefault(); send(input.value); });
  input.addEventListener('input', autosize);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) toggle(false); });
  msgs.addEventListener('click', e => {
    const b = e.target.closest('.cb-copy');
    if (!b) return;
    const code = b.parentNode.querySelector('code').textContent;
    const done = () => { b.textContent = t('cb_copied'); setTimeout(() => { b.textContent = t('cb_copy'); }, 1200); };
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(done, () => { /* ignore */ });
  });

  document.body.appendChild(panel);
  document.body.appendChild(fab);
  renderAll();
  refreshLabels();
  if (window.I18N) I18N.onChange(refreshLabels);
})();
