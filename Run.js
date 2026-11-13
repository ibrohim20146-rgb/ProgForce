'use strict';

/* ============ ЗАПУСК (как «Проверка» / custom invocation на Codeforces) ============
   Пишете код на C++ или Python, вводите входные данные (stdin) и сразу видите вывод
   и вердикт. Сам код выполняет сервер: POST /api/run (см. server.js, RUN_MODE). */
(function () {
  const tr = I18N.t;
  const $ = (s, r = document) => r.querySelector(s);
  const cfg = window.SERVER_CONFIG || {};
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  const TPL = {
    cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    cin >> a >> b;\n    cout << a + b << "\\n";\n    return 0;\n}\n',
    py: 'a, b = map(int, input().split())\nprint(a + b)\n'
  };

  const elLang = $('#run-lang'), elCode = $('#run-code'), elIn = $('#run-input'),
        elGo = $('#run-go'), elOut = $('#run-output'), elTpl = $('#run-tpl'), elClear = $('#run-clear');
  if (!elLang || !elCode) return;

  let lang = LS.get('pf_run_lang', 'cpp');
  if (!TPL[lang]) lang = 'cpp';
  elLang.value = lang;

  const codeKey = l => 'pf_run_code_' + l;
  const loadCode = () => { elCode.value = LS.get(codeKey(lang), TPL[lang]); };
  loadCode();
  elIn.value = LS.get('pf_run_input', '2 3\n');

  elLang.addEventListener('change', () => {
    LS.set(codeKey(lang), elCode.value);
    lang = elLang.value; LS.set('pf_run_lang', lang);
    loadCode(); clearOut();
  });
  elCode.addEventListener('input', () => LS.set(codeKey(lang), elCode.value));
  elIn.addEventListener('input', () => LS.set('pf_run_input', elIn.value));
  elTpl.addEventListener('click', () => {
    if (elCode.value.trim() && elCode.value !== TPL[lang] && !confirm(tr('run_tpl_confirm'))) return;
    elCode.value = TPL[lang]; LS.set(codeKey(lang), elCode.value); elCode.focus();
  });
  elClear.addEventListener('click', () => { elIn.value = ''; LS.set('pf_run_input', ''); clearOut(); elIn.focus(); });

  /* Tab — отступ, Enter — сохраняет отступ предыдущей строки (+ уровень после { или :) */
  elCode.addEventListener('keydown', e => {
    const t = elCode, s = t.selectionStart, en = t.selectionEnd, v = t.value;
    const put = (txt, back) => {
      t.value = v.slice(0, s) + txt + v.slice(en);
      t.selectionStart = t.selectionEnd = s + txt.length - (back || 0);
      LS.set(codeKey(lang), t.value);
    };
    if (e.key === 'Tab' && !e.ctrlKey && !e.altKey) { e.preventDefault(); put('    '); }
    else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
    else if (e.key === 'Enter' && s === en) {
      e.preventDefault();
      const line = v.slice(v.lastIndexOf('\n', s - 1) + 1, s);
      let ind = (line.match(/^[ \t]*/) || [''])[0];
      const last = line.trimEnd().slice(-1);
      if (last === '{' || (lang === 'py' && last === ':')) ind += '    ';
      if (last === '{' && v[s] === '}') put('\n' + ind + '\n' + ind.slice(4), ind.length - 3);
      else put('\n' + ind);
    }
  });
  elIn.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); } });

  /* ---------- вывод ---------- */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function clearOut() { elOut.innerHTML = '<p class="run-empty">' + esc(tr('run_empty')) + '</p>'; }
  clearOut();

  const VERDICT = { ok: ['run_v_ok', 'ok'], ce: ['run_v_ce', 'bad'], re: ['run_v_re', 'bad'], tle: ['run_v_tle', 'bad'], ole: ['run_v_ole', 'bad'] };
  function block(title, text, cls) {
    return '<div class="run-block ' + (cls || '') + '"><div class="ar-ex-h"><span>' + esc(title) + '</span>' +
      '<button class="copy-btn" data-copy>' + esc(tr('copy')) + '</button></div><pre>' + esc(text) + '</pre></div>';
  }
  function showResult(r) {
    const v = VERDICT[r.verdict] || VERDICT.re;
    let meta = [];
    if (r.time != null) meta.push(r.time + ' ' + tr('run_ms'));
    if (r.verdict !== 'ok' && r.verdict !== 'ce' && r.exit !== undefined && r.exit !== '' && r.exit !== null) meta.push(tr('run_exit') + ': ' + r.exit);
    let h = '<div class="run-verdict ' + v[1] + '"><b>' + esc(tr(v[0])) + '</b>' + (meta.length ? '<span>' + esc(meta.join(' · ')) + '</span>' : '') + '</div>';
    if (r.verdict === 'ce') h += block(tr('run_compile'), r.compile || '', 'err');
    else {
      h += block(tr('run_stdout'), r.stdout || '', '');
      if (r.stderr) h += block(tr('run_stderr'), r.stderr, 'err');
      if (r.verdict === 'ole') h += '<p class="hint">' + esc(tr('run_ole_hint')) + '</p>';
    }
    elOut.innerHTML = h;
  }
  function showError(key) { elOut.innerHTML = '<div class="run-verdict bad"><b>' + esc(tr(key)) + '</b></div>'; }

  elOut.addEventListener('click', e => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const pre = b.closest('.run-block').querySelector('pre');
    const done = () => { const o = b.textContent; b.textContent = tr('copied'); setTimeout(() => { b.textContent = tr('copy'); }, 1200); };
    if (navigator.clipboard) navigator.clipboard.writeText(pre.textContent).then(done, () => {});
  });

  /* ---------- запуск ---------- */
  let busy = false;
  async function run() {
    if (busy) return;
    if (!elCode.value.trim()) { showError('run_empty_code'); return; }
    busy = true; elGo.disabled = true;
    elOut.innerHTML = '<p class="run-empty">' + esc(tr(lang === 'cpp' ? 'run_running_cpp' : 'run_running')) + '</p>';
    const headers = { 'Content-Type': 'application/json' };
    try { const t = localStorage.getItem('cs_api_token'); if (t) headers.Authorization = 'Bearer ' + t; } catch (e) { /* ignore */ }
    try {
      const r = await fetch((cfg.apiUrl || '') + '/api/run', { method: 'POST', headers, body: JSON.stringify({ lang, code: elCode.value, input: elIn.value }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.verdict) showResult(j);
      else {
        const c = j.error && j.error.code;
        showError(r.status === 401 ? 'run_need_login'
          : r.status === 413 ? 'run_too_big'
          : (c === 'rate' || c === 'busy' || r.status === 429) ? 'run_busy'
          : c === 'no_compiler' ? 'run_no_compiler'
          : c === 'no_python' ? 'run_no_python'
          : 'run_fail');
      }
    } catch (e) { showError('run_fail'); }
    finally { busy = false; elGo.disabled = false; }
  }
  elGo.addEventListener('click', run);

  /* ---------- вход из архива: «Проверить в Запуске» подставляет первый пример в ввод ---------- */
  function takePending() {
    if (!/^#run/.test(location.hash)) return;
    let p = null;
    try { p = sessionStorage.getItem('pf_run_input'); sessionStorage.removeItem('pf_run_input'); } catch (e) { /* ignore */ }
    if (p !== null) { elIn.value = p; LS.set('pf_run_input', p); clearOut(); }
  }
  window.addEventListener('hashchange', takePending);
  takePending();

  I18N.onChange(() => { if (!busy && !elOut.querySelector('.run-verdict')) clearOut(); });
})();
