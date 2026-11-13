'use strict';

(function () {
  /* ============ Утилиты ============ */
  const EN_DATA = typeof EN !== 'undefined' ? EN : null;   // английские тексты из Data.en.js (если файл подключён)
  const tr = I18N.t;                       // перевод строки по ключу (см. I18n.js)
  I18N.apply();                            // перевод статичной части страницы
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Данные, которые у каждого пользователя свои (у гостя ключи без суффикса)
  const USER_KEYS = ['cs_progress', 'cs_typing', 'cs_quiz', 'cs_tasks', 'cs_archive', 'cs_activity'];
  let currentUser = null;      // uid пользователя (null = гость)
  let userInfo = null;         // { name, email, photo }
  let syncHook = null;         // вызывается при изменении данных пользователя
  const ukey = k => (currentUser && USER_KEYS.includes(k)) ? k + ':' + currentUser : k;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(ukey(k)); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(ukey(k), JSON.stringify(v)); } catch (e) { /* ignore */ } if (syncHook && currentUser && USER_KEYS.includes(k)) syncHook(); }
  };
  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ============ Тема ============ */
  const root = document.documentElement;
  const savedTheme = store.get('cs_theme', null);
  if (savedTheme) root.dataset.theme = savedTheme;
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) root.dataset.theme = 'light';
  $('#theme-btn').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('cs_theme', root.dataset.theme);
    applySettings();
    if (location.hash === '#settings') renderSettings();
  });
  // Выпадающий список языков (столбиком) рядом с кнопкой «Войти»
  const langBtn = $('#lang-btn'), langList = $('#lang-list');
  function renderLangList() {
    langList.innerHTML = Object.keys(I18N.LANGS).map(k =>
      '<button type="button" class="lang-item' + (k === I18N.lang ? ' active' : '') + '" data-lang="' + k + '"><b>' + ({ ru: 'RU', en: 'EN', tg: 'TJ' }[k] || k.toUpperCase()) + '</b> ' + I18N.LANGS[k] + '</button>'
    ).join('');
  }
  function toggleLangList(open) {
    langList.hidden = open === undefined ? !langList.hidden : !open;
    langBtn.setAttribute('aria-expanded', String(!langList.hidden));
    if (!langList.hidden) renderLangList();
  }
  langBtn.addEventListener('click', e => { e.stopPropagation(); toggleLangList(); });
  langList.addEventListener('click', e => {
    const b = e.target.closest('[data-lang]');
    if (b) { I18N.set(b.dataset.lang); toggleLangList(false); }
  });
  document.addEventListener('click', e => { if (!langList.hidden && !e.target.closest('.lang-menu')) toggleLangList(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleLangList(false); });
  $('#menu-btn').addEventListener('click', () => document.body.classList.toggle('menu-open'));

  /* ============ Настройки внешнего вида ============ */
  // Каждый цвет: [акцент, цвет текста на акценте, (необязательно) второй акцент] для тёмной и светлой темы
  const ACCENTS = {
    green:  { name: 'Зелёный',    dark: ['#3dd68c', '#04210f'],            light: ['#14a85f', '#ffffff'] },
    blue:   { name: 'Синий',      dark: ['#58a6ff', '#04162b', '#3dd68c'], light: ['#0b6bcb', '#ffffff', '#14a85f'] },
    purple: { name: 'Фиолетовый', dark: ['#b48cff', '#1a0a33'],            light: ['#7c3aed', '#ffffff'] },
    orange: { name: 'Оранжевый',  dark: ['#ffa657', '#2b1500'],            light: ['#d9680b', '#ffffff'] },
    pink:   { name: 'Розовый',    dark: ['#ff7eb6', '#33001a'],            light: ['#d6336c', '#ffffff'] },
    red:    { name: 'Красный',    dark: ['#ff6b6b', '#330404'],            light: ['#cf222e', '#ffffff'] },
    teal:   { name: 'Бирюзовый',  dark: ['#2dd4bf', '#042b27'],            light: ['#0f9d8f', '#ffffff'] },
    cyan:   { name: 'Голубой',    dark: ['#4dd0f0', '#04222b'],            light: ['#0a8db0', '#ffffff'] },
    yellow: { name: 'Жёлтый',     dark: ['#f5d547', '#2b2300'],            light: ['#b58900', '#ffffff'] },
    lime:   { name: 'Лаймовый',   dark: ['#a3e635', '#1a2b04'],            light: ['#5f9a0c', '#ffffff'] },
    indigo: { name: 'Индиго',     dark: ['#8b9cff', '#0a0f33'],            light: ['#4353d6', '#ffffff'] },
    coral:  { name: 'Коралловый', dark: ['#ff8a75', '#33100a'],            light: ['#d9482e', '#ffffff'] }
  };
  // Палитры фона (стили в ProgForce.css: [data-theme][data-palette]); [id, цвет для кружка]
  const PALETTES = {
    dark:  [['default', '#0d1117'], ['midnight', '#0b1020'], ['dracula', '#282a36'], ['nord', '#2e3440'], ['forest', '#0e1914'], ['amoled', '#000000']],
    light: [['default', '#f6f8fa'], ['sepia', '#f4ecd8'], ['sky', '#eef5fc'], ['mint', '#eef8f2'], ['rose', '#fdf1f4']]
  };
  const FONT_FAMILIES = {
    system: null,
    serif: 'Georgia, "Times New Roman", serif',
    rounded: 'ui-rounded, "Nunito", "Segoe UI Rounded", "Trebuchet MS", sans-serif',
    mono: 'var(--mono)'
  };
  const RADII = { sharp: '0.35', md: '1', round: '1.6' };
  const LINE_H = { tight: '1.4', md: '1.6', loose: '1.85' };
  const CODE_K = { sm: '0.85', md: '1', lg: '1.2' };
  const FONT_SIZES = { sm: '14px', md: '16px', lg: '18px' };
  const SITE_WIDTHS = { sm: '920px', md: '1120px', lg: '1320px' };
  const SET_DEFAULTS = { accent: 'green', font: 'md', width: 'md', anim: 'on', palette: 'default', family: 'system', radius: 'md', lh: 'md', code: 'md', shadow: 'on', tags: 'on', fx: '' };
  const getSettings = () => Object.assign({}, SET_DEFAULTS, store.get('cs_settings', {}));

  function applySettings() {
    const s = getSettings();
    const theme = root.dataset.theme === 'light' ? 'light' : 'dark';
    const acc = (ACCENTS[s.accent] || ACCENTS.green)[theme];
    if (s.accent === 'green') {
      ['--accent', '--accent-ink', '--accent2'].forEach(p => root.style.removeProperty(p));
    } else {
      root.style.setProperty('--accent', acc[0]);
      root.style.setProperty('--accent-ink', acc[1]);
      if (acc[2]) root.style.setProperty('--accent2', acc[2]);
      else root.style.removeProperty('--accent2');
    }
    root.style.fontSize = FONT_SIZES[s.font] || FONT_SIZES.md;
    root.style.setProperty('--wrap-w', SITE_WIDTHS[s.width] || SITE_WIDTHS.md);
    document.body.classList.toggle('no-anim', s.anim === 'off');
    const pal = (PALETTES[theme].find(x => x[0] === s.palette) || PALETTES[theme][0])[0];
    root.dataset.palette = pal;
    if (FONT_FAMILIES[s.family]) root.style.setProperty('--sans', FONT_FAMILIES[s.family]); else root.style.removeProperty('--sans');
    root.style.setProperty('--rad', RADII[s.radius] || RADII.md);
    root.style.setProperty('--lh', LINE_H[s.lh] || LINE_H.md);
    root.style.setProperty('--code-k', CODE_K[s.code] || CODE_K.md);
    if (s.shadow === 'off') root.style.setProperty('--shadow', 'none'); else root.style.removeProperty('--shadow');
    document.body.classList.toggle('no-tags', s.tags === 'off');
    if (window.FX) FX.set(String(s.fx || '').split(',').filter(Boolean));   // эффекты (снег и др.)
  }


  /* Картинки-кнопки эффектов (SVG): каждая плитка — маленькая сцена */
  const FX_ICONS = {
    snow: '<svg viewBox="0 0 64 64" aria-hidden="true"><g stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none">' +
      '<path d="M32 8v48M11.2 20l41.6 24M11.2 44l41.6-24"/>' +
      '<path d="M27 12l5 5 5-5M27 52l5-5 5 5M13 27l7-1-2-7M51 37l-7 1 2 7M13 37l7 1-2 7M51 27l-7-1 2-7" stroke-width="2.2"/></g>' +
      '<circle cx="10" cy="10" r="2" fill="#fff"/><circle cx="54" cy="12" r="1.6" fill="#fff"/><circle cx="52" cy="54" r="2" fill="#fff"/><circle cx="9" cy="53" r="1.6" fill="#fff"/></svg>',
    rain: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 36a10 10 0 0 1 2-19.8A14 14 0 0 1 47 19a8.5 8.5 0 0 1-1 17z" fill="#dbe7f7"/>' +
      '<g stroke="#7db7ff" stroke-width="3" stroke-linecap="round"><path d="M22 42l-4 10M33 42l-4 10M44 42l-4 10"/></g></svg>',
    stars: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6l5.5 15.5L54 27l-16.5 5.5L32 48l-5.5-15.5L10 27l16.5-5.5z" fill="#ffe58a"/>' +
      '<path d="M52 8l1.8 4.2L58 14l-4.2 1.8L52 20l-1.8-4.2L46 14l4.2-1.8zM12 44l1.4 3.2L16.6 48.6l-3.2 1.4L12 53.2l-1.4-3.2L7.4 48.6l3.2-1.4z" fill="#fff6c9"/></svg>',
    matrix: '<svg viewBox="0 0 64 64" aria-hidden="true"><g font-family="monospace" font-size="13" font-weight="700" fill="#3dff8f">' +
      '<text x="8" y="16">ｱ1</text><text x="30" y="26" opacity=".8">0ｷ</text><text x="8" y="38" opacity=".65">{ }</text><text x="34" y="48" opacity=".5">ｻ7</text><text x="12" y="58" opacity=".35">01</text></g></svg>',
    confetti: '<svg viewBox="0 0 64 64" aria-hidden="true"><g>' +
      '<rect x="10" y="12" width="12" height="6" rx="1.5" fill="#ff5d73" transform="rotate(25 16 15)"/><rect x="38" y="8" width="12" height="6" rx="1.5" fill="#ffc233" transform="rotate(-30 44 11)"/>' +
      '<rect x="24" y="28" width="12" height="6" rx="1.5" fill="#3dd68c" transform="rotate(60 30 31)"/><rect x="46" y="34" width="12" height="6" rx="1.5" fill="#58a6ff" transform="rotate(-15 52 37)"/>' +
      '<rect x="8" y="42" width="12" height="6" rx="1.5" fill="#b48cff" transform="rotate(-50 14 45)"/><rect x="30" y="50" width="12" height="6" rx="1.5" fill="#ff9f43" transform="rotate(20 36 53)"/></g></svg>'
  };

  Object.assign(FX_ICONS, {
    storm: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 33a9 9 0 0 1 2-17.8A13 13 0 0 1 44 18a8 8 0 0 1-1 15z" fill="#8fa0ba"/><path d="M35 26l-9 15h7l-4 15 14-19h-8l5-11z" fill="#ffe45e" stroke="#fff6b0" stroke-width="1.2" stroke-linejoin="round"/><g stroke="#7db7ff" stroke-width="2.6" stroke-linecap="round"><path d="M16 42l-3 8M50 40l-3 8"/></g></svg>',
    meteors: '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="mtg" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#9ec5ff" stop-opacity="0"/></linearGradient></defs><g stroke="url(#mtg)" stroke-width="3.4" stroke-linecap="round" fill="none"><path d="M54 8L22 40"/><path d="M60 30L40 50" stroke-width="2.6"/><path d="M38 6L18 26" stroke-width="2.2"/></g><g fill="#fff"><circle cx="54" cy="8" r="3"/><circle cx="60" cy="30" r="2.4"/><circle cx="38" cy="6" r="2"/><circle cx="12" cy="52" r="1.2"/><circle cx="26" cy="56" r="1"/></g></svg>',
    embers: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6C38 20 50 26 48 40a16 16 0 0 1-32 0C14 30 24 26 26 14c2 4 4 6 6-8z" fill="#ff8a1f"/><path d="M32 28c3 6 9 9 8 17a8 8 0 0 1-16 0c-1-5 3-7 4-12 2 2 3 2 4-5z" fill="#ffd45a"/><g fill="#ffb347"><circle cx="12" cy="20" r="2"/><circle cx="52" cy="14" r="2.2"/><circle cx="56" cy="34" r="1.6"/><circle cx="8" cy="40" r="1.6"/></g></svg>',
    leaves: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M26 6C42 16 44 36 26 54C8 36 10 16 26 6z" fill="#e8892b"/><path d="M26 10V58" stroke="#8a3d12" stroke-width="2"/><path d="M50 22C60 30 58 44 46 54C36 44 38 30 50 22z" fill="#c9381f"/><path d="M48 26L44 56" stroke="#6d1b0b" stroke-width="1.6"/></svg>',
  });
  const FX_ORDER = ['snow', 'rain', 'storm', 'stars', 'meteors', 'embers', 'leaves', 'confetti', 'matrix'];

  function renderSettings() {
    const s = getSettings();
    const theme = root.dataset.theme === 'light' ? 'light' : 'dark';
    const chips = (key, opts, cur) => opts.map(o =>
      '<button class="chip' + (cur === o[0] ? ' active' : '') + '" data-set="' + key + '" data-val="' + o[0] + '">' + o[1] + '</button>'
    ).join('');
    const swatches = Object.keys(ACCENTS).map(k =>
      '<button class="swatch' + (s.accent === k ? ' active' : '') + '" data-set="accent" data-val="' + k + '" ' +
      'style="background:' + ACCENTS[k][theme][0] + '" title="' + tr('acc_' + k) + '" aria-label="' + tr('acc_' + k) + '"></button>'
    ).join('');
    const curPal = (PALETTES[theme].find(x => x[0] === s.palette) || PALETTES[theme][0])[0];
    const palettes = PALETTES[theme].map(x =>
      '<button class="swatch pal' + (curPal === x[0] ? ' active' : '') + '" data-set="palette" data-val="' + x[0] + '" style="background:' + x[1] + '" title="' + tr('pal_' + x[0]) + '" aria-label="' + tr('pal_' + x[0]) + '"></button>'
    ).join('');
    const fxOn = String(s.fx || '').split(',').filter(Boolean);
    const fxTiles = FX_ORDER.map(k =>
      '<button class="fx-btn fx-' + k + (fxOn.includes(k) ? ' active' : '') + '" data-set="fx" data-val="' + k + '" aria-pressed="' + fxOn.includes(k) + '">' +
      FX_ICONS[k] + '<span>' + tr('fx_' + k) + '</span></button>'
    ).join('') + (fxOn.length ? '<button class="chip fx-none" data-set="fx" data-val="none">' + tr('fx_none') + '</button>' : '');
    const group = (title, hint, body, cls) =>
      '<div class="set-group' + (cls ? ' ' + cls : '') + '"><div class="set-info"><h3>' + title + '</h3><p>' + hint + '</p></div><div class="set-ctrl">' + body + '</div></div>';

    $('#settings-box').innerHTML =
      group(tr('set_lang_t'), tr('set_lang_h'),
        '<div class="lang-col">' + chips('lang', Object.keys(I18N.LANGS).map(k => [k, I18N.LANGS[k]]), I18N.lang) + '</div>') +
      group(tr('fx_t'), tr('fx_h'), fxTiles, 'wide') +
      group(tr('set_theme_t'), tr('set_theme_h'),
        chips('theme', [['dark', tr('set_dark')], ['light', tr('set_light')]], theme)) +
      group(tr('set_palette_t'), tr('set_palette_h'), palettes) +
      group(tr('set_accent_t'), tr('set_accent_h', tr('acc_' + s.accent)), swatches) +
      group(tr('set_family_t'), tr('set_family_h'),
        chips('family', [['system', tr('set_f_system')], ['serif', tr('set_f_serif')], ['rounded', tr('set_f_rounded')], ['mono', tr('set_f_mono')]], s.family)) +
      group(tr('set_font_t'), tr('set_font_h'),
        chips('font', [['sm', tr('set_sm')], ['md', tr('set_md')], ['lg', tr('set_lg')]], s.font)) +
      group(tr('set_width_t'), tr('set_width_h'),
        chips('width', [['sm', tr('set_w_sm')], ['md', tr('set_w_md')], ['lg', tr('set_w_lg')]], s.width)) +
      group(tr('set_lh_t'), tr('set_lh_h'),
        chips('lh', [['tight', tr('set_lh_tight')], ['md', tr('set_md')], ['loose', tr('set_lh_loose')]], s.lh)) +
      group(tr('set_code_t'), tr('set_code_h'),
        chips('code', [['sm', tr('set_sm')], ['md', tr('set_md')], ['lg', tr('set_lg')]], s.code)) +
      group(tr('set_radius_t'), tr('set_radius_h'),
        chips('radius', [['sharp', tr('set_r_sharp')], ['md', tr('set_md')], ['round', tr('set_r_round')]], s.radius)) +
      group(tr('set_shadow_t'), tr('set_shadow_h'),
        chips('shadow', [['on', tr('set_on')], ['off', tr('set_off')]], s.shadow)) +
      group(tr('set_tags_t'), tr('set_tags_h'),
        chips('tags', [['on', tr('set_on')], ['off', tr('set_off')]], s.tags)) +
      group(tr('set_anim_t'), tr('set_anim_h'),
        chips('anim', [['on', tr('set_on')], ['off', tr('set_off')]], s.anim)) +
      '<div class="set-foot"><button class="btn" data-act="reset-settings">' + tr('set_reset') + '</button></div>';
  }

  $('#settings-box').addEventListener('click', e => {
    const reset = e.target.closest('[data-act="reset-settings"]');
    if (reset) {
      store.set('cs_settings', {});
      root.dataset.theme = 'dark';
      store.set('cs_theme', 'dark');
      applySettings(); renderSettings();
      return;
    }
    const b = e.target.closest('[data-set]');
    if (!b) return;
    const key = b.dataset.set, val = b.dataset.val;
    if (key === 'lang') { I18N.set(val); return; }
    if (key === 'theme') {
      root.dataset.theme = val;
      store.set('cs_theme', val);
    } else if (key === 'fx') {
      const s = store.get('cs_settings', {});
      let cur = String(s.fx || '').split(',').filter(Boolean);
      if (val === 'none') cur = [];
      else cur = cur.includes(val) ? cur.filter(x => x !== val) : cur.concat(val);
      s.fx = cur.join(',');
      store.set('cs_settings', s);
    } else {
      const s = store.get('cs_settings', {});
      s[key] = val;
      store.set('cs_settings', s);
    }
    applySettings(); renderSettings();
  });

  applySettings();

  /* ============ Подсветка кода ============ */
  const KW = {
    py: new Set('False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield'.split(' ')),
    cpp: new Set('auto bool break case catch char class const continue default delete do double else enum explicit false float for if int long namespace new nullptr private protected public return short signed sizeof static struct switch template this throw true try typedef unsigned using virtual void while string vector map'.split(' '))
  };
  const BI = {
    py: new Set('print len range input int str float list dict set tuple sum min max open sorted'.split(' ')),
    cpp: new Set('cout cin endl sort stoi'.split(' '))
  };
  const RE = {
    py: /(?<com>#.*)|(?<str>"""[\s\S]*?"""|f?"(?:\\.|[^"\\\n])*"|f?'(?:\\.|[^'\\\n])*')|(?<num>\b\d+(?:\.\d+)?\b)|(?<word>[A-Za-z_]\w*)/g,
    cpp: /(?<com>\/\/.*|\/\*[\s\S]*?\*\/)|(?<str>"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(?<pre>^[ \t]*#.*$)|(?<num>\b\d+(?:\.\d+)?\b)|(?<word>[A-Za-z_]\w*)/gm
  };
  function highlight(code, lang) {
    let out = '', last = 0;
    for (const m of code.matchAll(RE[lang])) {
      out += esc(code.slice(last, m.index));
      const g = m.groups, t = m[0];
      let cls = '';
      if (g.com) cls = 'c';
      else if (g.str) cls = 's';
      else if (g.pre) cls = 'p';
      else if (g.num) cls = 'n';
      else if (g.word) {
        if (KW[lang].has(t)) cls = 'k';
        else if (BI[lang].has(t) || code[m.index + t.length] === '(') cls = 'f';
      }
      out += cls ? '<span class="t-' + cls + '">' + esc(t) + '</span>' : esc(t);
      last = m.index + t.length;
    }
    return out + esc(code.slice(last));
  }


  /* ============ Аккаунты: вход по коду из письма (свой сервер) ============ */
  const scfg = window.SERVER_CONFIG || {};
  let sb = null;

  /* Клиент для server.js (та же «форма», что и у демо-клиента) */
  function apiClient(base) {
    const TK = 'cs_api_token';
    const listeners = [];
    const call = async (method, path, body, withAuth) => {
      const headers = { 'Content-Type': 'application/json' };
      const t = localStorage.getItem(TK);
      if (withAuth !== false && t) headers.Authorization = 'Bearer ' + t;
      let r;
      try { r = await fetch(base + path, { method, headers, body: body ? JSON.stringify(body) : undefined }); }
      catch (e) { return { error: { message: 'Failed to fetch' } }; }
      let j = {};
      try { j = await r.json(); } catch (e) { /* ignore */ }
      if (!r.ok) return { error: Object.assign({ status: r.status, message: 'error' }, j.error || {}) };
      return j;
    };
    const getSession = async () => {
      if (!localStorage.getItem(TK)) return null;
      const r = await call('GET', '/api/me');
      if (r.error) { if (r.error.status === 401) localStorage.removeItem(TK); return null; }
      return { user: r.user };
    };
    return {
      auth: {
        signInWithOtp: async ({ email }) => { const r = await call('POST', '/api/send-code', { email, lang: I18N.lang }, false); return { error: r.error || null }; },
        verifyOtp: async ({ email, token }) => {
          const r = await call('POST', '/api/verify', { email, code: token }, false);
          if (r.error) return { error: r.error };
          localStorage.setItem(TK, r.token);
          const s = { user: r.user };
          listeners.forEach(cb => cb('SIGNED_IN', s));
          return { error: null };
        },
        signOut: async () => { await call('POST', '/api/logout'); localStorage.removeItem(TK); listeners.forEach(cb => cb('SIGNED_OUT', null)); },
        onAuthStateChange: cb => { listeners.push(cb); getSession().then(s => cb('INITIAL_SESSION', s)); }
      },
      from() {
        let op = 'select', payload = null;
        const run = async () => {
          if (op === 'select') { const r = await call('GET', '/api/profile'); return { data: r.profile || null, error: r.error || null }; }
          const r = await call(op === 'insert' ? 'POST' : 'PUT', '/api/profile', payload);
          return { error: r.error || null };
        };
        const q = {
          select() { op = 'select'; return q; },
          insert(r) { op = 'insert'; payload = r; return q; },
          update(r) { op = 'update'; payload = r; return q; },
          eq() { return q; },
          maybeSingle() { return run(); },
          then(res, rej) { return run().then(res, rej); }
        };
        return q;
      }
    };
  }
  if (scfg.enabled) sb = apiClient(scfg.apiUrl || '');

  /* Демо-режим: если сервер не подключён, вход работает локально (письма не отправляются) */
  const DEMO = !scfg.enabled;
  const DEMO_CODE = '123456';
  function demoClient() {
    const lsGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
    const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } };
    const listeners = [];
    const session = () => lsGet('cs_demo_session', null);
    const notify = (ev, s) => listeners.forEach(cb => cb(ev, s));
    return {
      auth: {
        signInWithOtp: async () => ({ error: null }),
        verifyOtp: async ({ email, token }) => {
          if (token !== DEMO_CODE) return { error: { message: 'Token has expired or is invalid' } };
          const s = { user: { id: 'demo:' + email, email } };
          lsSet('cs_demo_session', s); notify('SIGNED_IN', s);
          return { error: null };
        },
        signOut: async () => { localStorage.removeItem('cs_demo_session'); notify('SIGNED_OUT', null); },
        onAuthStateChange: cb => { listeners.push(cb); setTimeout(() => cb('INITIAL_SESSION', session()), 0); }
      },
      from() {
        let op = 'select', payload = null, id = null;
        const run = () => {
          const all = lsGet('cs_demo_profiles', {});
          const dup = () => payload && payload.nickname && Object.keys(all).some(k => k !== (op === 'insert' ? payload.id : id) &&
            (all[k].nickname || '').toLowerCase() === payload.nickname.toLowerCase());
          if (op === 'select') return { data: all[id] || null, error: null };
          if (dup()) return { error: { code: '23505', message: 'duplicate' } };
          if (op === 'insert') all[payload.id] = payload;
          else all[id] = Object.assign(all[id] || {}, payload);
          lsSet('cs_demo_profiles', all);
          return { error: null };
        };
        const q = {
          select() { op = 'select'; return q; },
          insert(r) { op = 'insert'; payload = r; return q; },
          update(r) { op = 'update'; payload = r; return q; },
          eq(c, v) { id = v; return q; },
          maybeSingle() { return Promise.resolve(run()); },
          then(res, rej) { return Promise.resolve(run()).then(res, rej); }
        };
        return q;
      }
    };
  }
  if (DEMO) sb = demoClient();
  const demoNote = () => DEMO ? tr('demo_note', DEMO_CODE) : '';

  const AVATARS = ['😎', '👾', '🤖', '🦊', '🐱', '🐼', '🦉', '🐍', '🚀', '⚡', '🔥', '🌟', '🎮', '🧠', '🐉', '🦄'];
  const COLORS = ['#3dd68c', '#58a6ff', '#b48cff', '#ffa657', '#ff7eb6', '#ff6b6b', '#e3b341', '#2dd4bf'];
  const NICK_RE = /^[A-Za-z0-9_А-Яа-яЁё.-]{3,20}$/;
  const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  let needNick = false, editing = false, authStep = 'email', pendingEmail = '', resendAt = 0, justSignedIn = false;
  let formAvatar = AVATARS[0], formColor = COLORS[0];

  const avatarHTML = u => '<div class="avatar" style="background:' + esc(u.color) + '">' + esc(u.avatar) + '</div>';

  function authError(e) {
    const m = ((e && e.message) || '').toLowerCase();
    if (e && e.code === '23505') return tr('acc_nick_taken');
    if (e && e.code === '23514') return tr('acc_nick_rule');
    if (m.includes('expired') || m.includes('invalid')) return tr('acc_bad_code');
    if (m.includes('rate limit') || m.includes('security purposes') || (e && e.status === 429)) return tr('acc_rate');
    if (m.includes('failed to fetch') || m.includes('network')) return tr('acc_network');
    return tr('acc_error', (e && e.message) || tr('acc_try_again'));
  }

  /* --- слияние данных (гость + устройство + облако) --- */
  const union = (a, b) => Array.from(new Set([].concat(a || [], b || [])));
  function mergeData(key, a, b) {
    if (a == null) return b;
    if (b == null) return a;
    if (key === 'cs_progress') return { py: union(a.py, b.py), cpp: union(a.cpp, b.cpp) };
    if (key === 'cs_tasks') return { py: union(a.py, b.py), cpp: union(a.cpp, b.cpp) };
    if (key === 'cs_archive') return union(a, b);
    if (key === 'cs_activity') { const o = Object.assign({}, a); Object.keys(b).forEach(k => { o[k] = Math.max(o[k] || 0, b[k] || 0); }); return o; }
    if (key === 'cs_quiz') return { best: Math.max(a.best || 0, b.best || 0) };
    if (key === 'cs_typing') {
      const best = Object.assign({}, a.best);
      Object.keys(b.best || {}).forEach(k => { if (!best[k] || b.best[k].wpm > best[k].wpm) best[k] = b.best[k]; });
      return { best, history: [].concat(a.history || [], b.history || []).slice(-20) };
    }
    return b;
  }
  const readLS = k => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } };
  const localData = () => {
    const d = {};
    USER_KEYS.forEach(k => { const v = readLS(k + ':' + currentUser); if (v != null) d[k] = v; });
    return d;
  };

  let pushTimer = null;
  function pushCloud() {
    if (!sb || !currentUser || !userInfo || !userInfo.name) return;
    sb.from('profiles').update({ data: localData() }).eq('id', currentUser)
      .then(r => { if (r.error) console.warn('Cloud sync failed', r.error); });
  }
  syncHook = () => { clearTimeout(pushTimer); pushTimer = setTimeout(pushCloud, 800); };

  function updateAuthUI() {
    const a = $('#nav-login');
    if (userInfo && userInfo.name) a.textContent = userInfo.avatar + ' ' + userInfo.name;
    else if (needNick) a.textContent = tr('nav_finish');
    else a.textContent = tr('nav_login');
    a.classList.toggle('in', !!userInfo);
    $('#nav-logout').hidden = !userInfo;
  }

  async function handleSession(session) {
    if (!session) {
      currentUser = null; userInfo = null; needNick = false; editing = false; authStep = 'email';
      updateAuthUI(); renderRecords(); route();
      return;
    }
    const uid = session.user.id, email = session.user.email || '';
    if (currentUser === uid && userInfo) return;      // обновление токена — ничего не делаем
    const res = await sb.from('profiles').select('*').eq('id', uid).maybeSingle();
    const prof = res.data;
    currentUser = uid;
    const cloud = (prof && prof.data) || {};
    USER_KEYS.forEach(k => {
      let m = mergeData(k, readLS(k + ':' + uid), cloud[k]);
      m = mergeData(k, m, readLS(k));                 // данные гостя на этом устройстве
      if (m != null) localStorage.setItem(k + ':' + uid, JSON.stringify(m));
      localStorage.removeItem(k);
    });
    if (prof && prof.nickname) {
      userInfo = { name: prof.nickname, email, avatar: prof.avatar, color: prof.color, bio: prof.bio || '' };
      needNick = false;
      pushCloud();
      if (justSignedIn && location.hash === '#login') location.hash = '#home';
    } else {
      userInfo = { name: null, email, avatar: AVATARS[0], color: COLORS[0], bio: '' };
      formAvatar = AVATARS[0]; formColor = COLORS[0];
      needNick = true;
      if (location.hash !== '#login') location.hash = '#login';
    }
    justSignedIn = false;
    updateAuthUI(); renderRecords(); route();
  }
  if (sb) sb.auth.onAuthStateChange((ev, session) => { setTimeout(() => handleSession(session), 0); });

  /* --- отрисовка --- */
  function profileForm(isNew) {
    const u = userInfo;
    return '<form class="auth-form" id="profile-form" novalidate>' +
      (isNew ? '<p class="auth-hint">' + tr('pf_new_ok') + '</p>' : '') +
      '<label>' + tr('pf_nick') + '<input name="nick" type="text" maxlength="20" autocomplete="off" value="' + esc(u.name || '') + '" placeholder="' + tr('pf_nick_ph') + '" required></label>' +
      '<label>' + tr('pf_bio') + '<input name="bio" type="text" maxlength="80" value="' + esc(u.bio || '') + '"></label>' +
      '<div class="pf-label">' + tr('pf_avatar') + '</div><div class="emoji-grid">' +
      AVATARS.map(a => '<button type="button" class="emoji-btn' + (a === formAvatar ? ' active' : '') + '" data-emoji="' + a + '">' + a + '</button>').join('') + '</div>' +
      '<div class="pf-label">' + tr('pf_color') + '</div><div class="color-row">' +
      COLORS.map(c => '<button type="button" class="color-dot' + (c === formColor ? ' active' : '') + '" data-color="' + c + '" style="background:' + c + '" aria-label="' + tr('pf_color_aria') + '"></button>').join('') + '</div>' +
      '<div class="pf-preview"><div class="avatar" id="pf-av" style="background:' + formColor + '">' + formAvatar + '</div><b id="pf-name">' + esc(u.name || tr('pf_your_nick')) + '</b></div>' +
      '<p class="auth-error" id="auth-error" role="alert"></p>' +
      '<button class="btn primary" type="submit">' + (isNew ? tr('pf_done') : tr('pf_save')) + '</button>' +
      (isNew ? '' : '<button class="btn ghost" type="button" data-act="cancel-edit">' + tr('pf_cancel') + '</button>') +
      '</form>';
  }

  function renderAuth() {
    const box = $('#auth-box');
    if (!sb) {
      $('#login-title').textContent = tr('login_title');
      box.innerHTML = '<div class="setup-box"><h3>' + tr('srv_down_t') + '</h3>' +
        '<p>' + tr('srv_down_p') + '</p></div>';
      return;
    }
    if (userInfo && needNick) { $('#login-title').textContent = tr('pf_create'); box.innerHTML = profileForm(true); return; }
    if (userInfo && editing) { $('#login-title').textContent = tr('pf_edit_title'); box.innerHTML = profileForm(false); return; }
    if (userInfo) {
      $('#login-title').textContent = tr('pf_title');
      const p = getProgress();
      const done = (p.py || []).length + (p.cpp || []).length;
      const typing = store.get('cs_typing', { best: {}, history: [] });
      const wpm = Math.max(0, ...Object.values(typing.best).map(b => b.wpm));
      const quiz = store.get('cs_quiz', null);
      box.innerHTML =
        '<div class="profile">' + avatarHTML(userInfo) + '<h2>' + esc(userInfo.name) + '</h2>' +
        '<p class="sub">' + esc(userInfo.email) + '</p>' + (userInfo.bio ? '<p class="bio">' + esc(userInfo.bio) + '</p>' : '') +
        '<div class="profile-stats"><div><b>' + done + '</b><span>' + tr('pr_lessons') + '</span></div><div><b>' + wpm + '</b><span>' + tr('st_wpm') + '</span></div><div><b>' + (quiz ? quiz.best + '%' : '—') + '</b><span>' + tr('pr_quiz') + '</span></div></div>' +
        '<div class="activity"><h3>' + tr('cal_title') + '</h3>' + activityHTML() + '</div>' +
        '<div class="profile-actions"><button class="btn primary" data-act="edit">' + tr('pr_edit') + '</button>' +
        '<button class="btn" data-act="logout">' + tr('pr_logout') + '</button></div></div>';
      const calSc = box.querySelector('.cal-scroll'); if (calSc) calSc.scrollLeft = calSc.scrollWidth;
      return;
    }
    $('#login-title').textContent = tr('login_title');
    if (authStep === 'code') {
      box.innerHTML =
        '<form class="auth-form" id="code-form" novalidate>' + demoNote() +
        '<p class="auth-hint">' + tr('code_sent', esc(pendingEmail)) + '</p>' +
        '<label>' + tr('code_label') + '<input name="code" class="code-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="one-time-code" required></label>' +
        '<p class="auth-error" id="auth-error" role="alert"></p>' +
        '<button class="btn primary" type="submit">' + tr('code_confirm') + '</button>' +
        '<button class="btn ghost" type="button" id="resend-btn" data-act="resend">' + tr('code_resend') + '</button>' +
        '<button class="btn ghost" type="button" data-act="change-email">' + tr('code_change') + '</button></form>';
      tickResend();
      const inp = $('input[name="code"]', box); if (inp) inp.focus();
      return;
    }
    box.innerHTML =
      '<form class="auth-form" id="email-form" novalidate>' + demoNote() +
      '<p class="auth-hint">' + tr('mail_hint') + '</p>' +
      '<label>' + tr('mail_label') + '<input name="email" type="email" autocomplete="email" placeholder="you@gmail.com" value="' + esc(pendingEmail) + '" required></label>' +
      '<p class="auth-error" id="auth-error" role="alert"></p>' +
      '<button class="btn primary" type="submit">' + tr('mail_get') + '</button></form>' +
      '<p class="auth-note">' + tr('auth_note') + '</p>';
  }

  const setMsg = (msg, ok) => { const el = $('#auth-error'); if (el) { el.textContent = msg; el.className = ok ? 'auth-ok' : 'auth-error'; } };
  let resendTimer = null;
  function tickResend() {
    clearInterval(resendTimer);
    const upd = () => {
      const b = $('#resend-btn');
      if (!b) { clearInterval(resendTimer); return; }
      const left = Math.ceil((resendAt - Date.now()) / 1000);
      b.disabled = left > 0;
      b.textContent = left > 0 ? tr('code_resend_in', left) : tr('code_resend');
      if (left <= 0) clearInterval(resendTimer);
    };
    upd(); resendTimer = setInterval(upd, 500);
  }
  async function sendCode(email) {
    const r = await sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if (!r.error) resendAt = Date.now() + 60000;
    return r.error;
  }

  $('#auth-box').addEventListener('click', async e => {
    const em = e.target.closest('[data-emoji]');
    if (em) {
      formAvatar = em.dataset.emoji;
      $$('.emoji-btn').forEach(b => b.classList.toggle('active', b === em));
      $('#pf-av').textContent = formAvatar; return;
    }
    const co = e.target.closest('[data-color]');
    if (co) {
      formColor = co.dataset.color;
      $$('.color-dot').forEach(b => b.classList.toggle('active', b === co));
      $('#pf-av').style.background = formColor; return;
    }
    const b = e.target.closest('[data-act]');
    if (!b || !sb) return;
    const act = b.dataset.act;
    if (act === 'resend') {
      b.disabled = true;
      const err = await sendCode(pendingEmail);
      if (err) { setMsg(authError(err)); b.disabled = false; } else { setMsg(tr('code_new_sent'), true); tickResend(); }
    } else if (act === 'change-email') { authStep = 'email'; renderAuth(); }
    else if (act === 'logout') { await sb.auth.signOut(); }
    else if (act === 'edit') { editing = true; formAvatar = userInfo.avatar; formColor = userInfo.color; renderAuth(); }
    else if (act === 'cancel-edit') { editing = false; renderAuth(); }
  });

  $('#auth-box').addEventListener('input', e => {
    if (e.target.name === 'nick') { const n = $('#pf-name'); if (n) n.textContent = e.target.value || tr('pf_your_nick'); }
  });

  $('#auth-box').addEventListener('submit', async e => {
    e.preventDefault();
    if (!sb) return;
    const f = e.target;
    const btn = $('button[type="submit"]', f);
    const busy = v => { if (btn) btn.disabled = v; };
    busy(true);
    try {
      if (f.id === 'email-form') {
        const email = f.email.value.trim().toLowerCase();
        if (!MAIL_RE.test(email)) return setMsg(tr('bad_email'));
        const err = await sendCode(email);
        if (err) return setMsg(authError(err));
        pendingEmail = email; authStep = 'code'; renderAuth();
      } else if (f.id === 'code-form') {
        const token = f.code.value.replace(/\D/g, '');
        if (token.length < 6) return setMsg(tr('bad_code_len'));
        justSignedIn = true;
        const r = await sb.auth.verifyOtp({ email: pendingEmail, token, type: 'email' });
        if (r.error) { justSignedIn = false; return setMsg(authError(r.error)); }
        authStep = 'email';
      } else if (f.id === 'profile-form') {
        const nick = f.nick.value.trim(), bio = f.bio.value.trim();
        if (!NICK_RE.test(nick)) return setMsg(tr('acc_nick_rule'));
        const row = { nickname: nick, avatar: formAvatar, color: formColor, bio };
        const r = needNick
          ? await sb.from('profiles').insert(Object.assign({ id: currentUser, data: localData() }, row))
          : await sb.from('profiles').update(row).eq('id', currentUser);
        if (r.error) return setMsg(authError(r.error));
        const wasNew = needNick;
        userInfo = { name: nick, email: userInfo.email, avatar: formAvatar, color: formColor, bio };
        needNick = false; editing = false;
        updateAuthUI(); renderAuth();
        if (wasNew) location.hash = '#home';
      }
    } catch (err) { setMsg(authError(err)); }
    finally { busy(false); }
  });

  $('#nav-logout').addEventListener('click', async e => {
    e.preventDefault();
    if (sb) await sb.auth.signOut();
    location.hash = '#home';
  });

  /* ============ Роутинг ============ */
  const PAGES = ['home', 'courses', 'archive', 'typing', 'resources', 'quiz', 'settings', 'login'];
  function route() {
    let id = location.hash.slice(1).split('/')[0] || 'home';
    if (!PAGES.includes(id)) id = 'home';
    $$('.page').forEach(p => { p.hidden = p.id !== 'page-' + id; });
    $$('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === id));
    document.body.classList.remove('menu-open');
    window.scrollTo(0, 0);
    renderPage(id);
  }
  function renderPage(id) {
    if (id === 'home') renderHome();
    if (id === 'courses') renderCourses();
    if (id === 'archive') renderArchive();
    if (id === 'settings') renderSettings();
    if (id === 'login') renderAuth();
  }
  function currentPage() {
    const id = location.hash.slice(1).split('/')[0] || 'home';
    return PAGES.includes(id) ? id : 'home';
  }
  window.addEventListener('hashchange', route);

  /* ============ Прогресс ============ */
  const getProgress = () => store.get('cs_progress', { py: [], cpp: [] });
  const setProgress = p => store.set('cs_progress', p);
  // Отметки выполненных заданий: { py: ['py1:0', 'py1:3'], cpp: [...] }
  const getTasks = () => store.get('cs_tasks', { py: [], cpp: [] });
  const setTasks = t => store.set('cs_tasks', t);

  /* ============ Активность: календарь занятий (как на Codeforces) ============ */
  const pad2 = n => String(n).padStart(2, '0');
  const dayKey = d => d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  // Записывает «сегодня занимался»: вызывается при отметке урока/задания, тренажёре, тесте
  function logActivity(n) {
    const a = store.get('cs_activity', {});
    const k = dayKey(new Date());
    a[k] = (a[k] || 0) + (n || 1);
    const keys = Object.keys(a).sort();
    if (keys.length > 400) keys.slice(0, keys.length - 400).forEach(x => { delete a[x]; });
    store.set('cs_activity', a);
  }
  function activityHTML() {
    const act = store.get('cs_activity', {});
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const start = new Date(today); start.setDate(start.getDate() - ((today.getDay() + 6) % 7) - 52 * 7);   // понедельник 52 недели назад
    const months = tr('cal_months').split(','), wdays = tr('cal_days').split(',');
    const loc = I18N.lang === 'en' ? 'en' : 'ru';
    const lvl = n => n <= 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 7 ? 3 : 4;
    let cells = '', labels = '', prevM = -1;
    const counts = [];
    for (let c = 0; c < 53; c++) {
      const first = new Date(start); first.setDate(start.getDate() + c * 7);
      const nextM = new Date(first.getFullYear(), first.getMonth(), first.getDate() + 7).getMonth();
      const m = first.getMonth();
      labels += '<span>' + (m !== prevM && (c > 0 || nextM === m) ? months[m] : '') + '</span>';
      prevM = m;
      for (let r = 0; r < 7; r++) {
        const d = new Date(start); d.setDate(start.getDate() + c * 7 + r);
        if (d > today) { cells += '<i class="cal-c off"></i>'; continue; }
        const n = act[dayKey(d)] || 0;
        counts.push(n);
        const ds = d.toLocaleDateString(loc, { day: 'numeric', month: 'long', year: 'numeric' });
        const tip = n ? tr('cal_tip_n', ds, n) : tr('cal_tip_0', ds);
        cells += '<i class="cal-c l' + lvl(n) + '" title="' + esc(tip) + '"></i>';
      }
    }
    let active = 0, best = 0, run = 0;
    counts.forEach(n => { if (n > 0) { active++; run++; if (run > best) best = run; } else run = 0; });
    let streak = 0, i = counts.length - 1;
    if (i >= 0 && counts[i] === 0) i--;               // сегодня ещё можно успеть — серия не прерывается
    for (; i >= 0 && counts[i] > 0; i--) streak++;
    return '<div class="profile-stats"><div><b>' + active + '</b><span>' + tr('cal_active') + '</span></div>' +
      '<div><b>' + streak + '</b><span>' + tr('cal_streak') + '</span></div>' +
      '<div><b>' + best + '</b><span>' + tr('cal_best') + '</span></div></div>' +
      '<div class="cal-wrap"><div class="cal-days">' + wdays.map((w, k) => '<span>' + (k % 2 === 0 ? w : '') + '</span>').join('') + '</div>' +
      '<div class="cal-scroll"><div class="cal-months">' + labels + '</div><div class="cal">' + cells + '</div></div></div>' +
      '<div class="cal-legend"><span>' + tr('cal_none') + '</span><i class="cal-c l0"></i><i class="cal-c l1"></i><i class="cal-c l2"></i><i class="cal-c l3"></i><i class="cal-c l4"></i><span>' + tr('cal_more') + '</span></div>' +
      '<p class="cal-note">' + tr('cal_note') + '</p>';
  }

  /* ============ Главная ============ */
  function renderHome() {
    const p = getProgress();
    const total = COURSES.py.lessons.length + COURSES.cpp.lessons.length;
    const done = (p.py || []).length + (p.cpp || []).length;
    const typing = store.get('cs_typing', { best: {}, history: [] });
    const bestWpm = Math.max(0, ...Object.values(typing.best).map(b => b.wpm));
    const quiz = store.get('cs_quiz', null);
    const u = userInfo && userInfo.name ? userInfo : null;
    $('#home-auth').innerHTML = u
      ? '<div class="card home-auth"><span>' + esc(u.avatar) + tr('home_hi', esc(u.name)) + '</span><a class="btn small" href="#login">' + tr('home_profile') + '</a></div>'
      : '<div class="card home-auth"><span>' + tr('home_guest') + '</span><a class="btn small primary" href="#login">' + tr('nav_login') + '</a></div>';
    $('#home-stats').innerHTML =
      '<div class="card"><b>' + done + ' / ' + total + '</b><span>' + tr('home_stat_lessons') + '</span></div>' +
      '<div class="card"><b>' + bestWpm + '</b><span>' + tr('home_stat_wpm') + '</span></div>' +
      '<div class="card"><b>' + (quiz ? quiz.best + '%' : '—') + '</b><span>' + tr('home_stat_quiz') + '</span></div>';
  }

  /* ============ Курсы ============ */
  let courseLang = store.get('cs_lang', 'py');
  if (!COURSES[courseLang]) courseLang = 'py';
  let lessonIdx = 0;

  // Курс на текущем языке интерфейса: структура и код — из Data.js, тексты — из Data.en.js
  const courseCache = {};
  function cdata(k) {
    const key = I18N.lang + ':' + k;
    if (courseCache[key]) return courseCache[key];
    const base = COURSES[k], tx = I18N.lang === 'en' && EN_DATA && EN_DATA.COURSES && EN_DATA.COURSES[k];
    return (courseCache[key] = !tx ? base : Object.assign({}, base, {
      desc: tx.desc,
      lessons: base.lessons.map((l, i) => Object.assign({}, l, tx.lessons[i] || {}))
    }));
  }

  // Список заданий урока с галочками (у старых данных без tasks[] — одно задание)
  function taskBlock(l) {
    const list = l.tasks && l.tasks.length ? l.tasks : [l.task];
    const doneT = getTasks()[courseLang] || [];
    const n = list.filter((_, i) => doneT.includes(l.id + ':' + i)).length;
    return '<div class="task"><div class="task-head"><strong>' + tr('tasks_h') + '</strong><span class="task-count">' + n + ' / ' + list.length + '</span></div>' +
      '<ol class="task-list">' + list.map((t, i) => {
        const on = doneT.includes(l.id + ':' + i);
        return '<li class="' + (on ? 'on' : '') + '"><label><input type="checkbox" data-task="' + i + '"' + (on ? ' checked' : '') + '><span>' + esc(t) + '</span></label></li>';
      }).join('') + '</ol></div>';
  }

  function renderCourses() {
    const c = cdata(courseLang);
    const done = getProgress()[courseLang] || [];
    if (lessonIdx >= c.lessons.length) lessonIdx = 0;
    $$('.lang-tab').forEach(b => b.classList.toggle('active', b.dataset.lang === courseLang));
    $('#course-desc').textContent = c.desc;
    const pct = Math.round(done.length / c.lessons.length * 100);
    $('#course-progress-bar').style.width = pct + '%';
    $('#course-progress-text').textContent = tr('progress_text', done.length, c.lessons.length, pct);

    $('#lesson-list').innerHTML = c.lessons.map((l, i) => {
      const isDone = done.includes(l.id);
      return '<li><button class="lesson-btn ' + (i === lessonIdx ? 'active ' : '') + (isDone ? 'done' : '') + '" data-i="' + i + '">' +
        '<span class="num">' + (isDone ? '✓' : i + 1) + '</span>' + esc(l.title) + '</button></li>';
    }).join('');

    const l = c.lessons[lessonIdx];
    const isDone = done.includes(l.id);
    $('#lesson-view').innerHTML =
      '<p class="eyebrow">' + tr('lesson_of', lessonIdx + 1, c.lessons.length) + '</p>' +
      '<h2>' + esc(l.title) + '</h2>' +
      '<div class="prose">' + l.text + '</div>' +
      '<div class="code-block"><div class="code-head"><span>' + c.file + '</span>' +
      '<button class="copy-btn" data-act="copy">' + tr('copy') + '</button></div>' +
      '<pre><code>' + highlight(l.code, courseLang) + '</code></pre></div>' +
      '<div class="lesson-actions">' +
      '<button class="btn" data-act="prev"' + (lessonIdx === 0 ? ' disabled' : '') + '>' + tr('prev') + '</button>' +
      '<button class="btn ' + (isDone ? '' : 'primary') + '" data-act="done">' + (isDone ? tr('unmark') : tr('mark_done')) + '</button>' +
      '<button class="btn" data-act="next"' + (lessonIdx === c.lessons.length - 1 ? ' disabled' : '') + '>' + tr('next') + '</button>' +
      '</div>';
  }

  $$('.lang-tab').forEach(b => b.addEventListener('click', () => {
    courseLang = b.dataset.lang;
    store.set('cs_lang', courseLang);
    lessonIdx = 0;
    renderCourses();
  }));
  $('#lesson-list').addEventListener('click', e => {
    const b = e.target.closest('.lesson-btn');
    if (!b) return;
    lessonIdx = +b.dataset.i;
    renderCourses();
    if (window.innerWidth <= 900) $('#lesson-view').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('#lesson-view').addEventListener('change', e => {
    const cb = e.target.closest('input[data-task]');
    if (!cb) return;
    const id = cdata(courseLang).lessons[lessonIdx].id + ':' + cb.dataset.task;
    const t = getTasks();
    const arr = t[courseLang] || [];
    t[courseLang] = cb.checked ? union(arr, [id]) : arr.filter(x => x !== id);
    setTasks(t);
    if (cb.checked) logActivity();
    renderCourses();
  });
  $('#lesson-view').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const c = cdata(courseLang);
    const act = b.dataset.act;
    if (act === 'prev' && lessonIdx > 0) lessonIdx--;
    else if (act === 'next' && lessonIdx < c.lessons.length - 1) lessonIdx++;
    else if (act === 'done') {
      const p = getProgress();
      const arr = p[courseLang] || [];
      const id = c.lessons[lessonIdx].id;
      p[courseLang] = arr.includes(id) ? arr.filter(x => x !== id) : arr.concat(id);
      setProgress(p);
      if ((p[courseLang] || []).includes(id)) logActivity();
    } else if (act === 'copy') {
      copyText(c.lessons[lessonIdx].code, b);
      return;
    }
    renderCourses();
  });
  function copyText(text, btn) {
    const ok = () => { const o = btn.textContent; btn.textContent = tr('copied'); setTimeout(() => { btn.textContent = o; }, 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, ok);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      ta.remove(); ok();
    }
  }

  /* ============ Тренажёр клавиатуры ============ */
  const input = $('#typing-input');
  const display = $('#typing-display');
  const box = $('#typing-box');
  const T = { text: '', lang: store.get('cs_tlang', 'py'), started: false, t0: 0, total: 0, errors: 0, timer: null, done: false, prevLen: 0 };
  if (!TYPING[T.lang]) T.lang = 'py';
  $('#typing-lang').value = T.lang;

  // Раскладки: латинская (код, English), русская ЙЦУКЕН и таджикская (русская + ғ ӣ қ ӯ ҳ ҷ вместо редких букв)
  const KB_LAYOUTS = {
    lat: [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
      ['Space']
    ],
    ru: [
      ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
      ['Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
      ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '.', 'Shift'],
      ['Space']
    ],
    tg: [
      ['ӯ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'й', 'қ', 'у', 'к', 'е', 'н', 'г', 'ш', 'ғ', 'з', 'х', 'ъ', 'ҷ'],
      ['Caps', 'ф', 'ӣ', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
      ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ҳ', 'б', 'ю', ',', '.', 'Shift'],
      ['Space']
    ]
  };
  const kbLayout = () => (T.lang === 'ru' ? 'ru' : T.lang === 'tg' ? 'tg' : 'lat');
  let kbCur = '';
  const KB_WIDE = { Backspace: 'w15', Tab: 'w15', Caps: 'w2', Enter: 'w25', Shift: 'w25', Space: 'space' };
  const KB_LABEL = { Backspace: '⌫', Caps: 'Caps', Space: '' };
  const SHIFT_MAP = { '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=', '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/' };

  // Пальцы: 0-4 левая рука (мизинец, безымянный, средний, указательный, большой), 5-9 правая (большой, указательный, средний, безымянный, мизинец)
  const KB_FINGERS = [
    [0, 0, 1, 2, 3, 3, 6, 6, 7, 8, 9, 9, 9, 9],
    [0, 0, 1, 2, 3, 3, 6, 6, 7, 8, 9, 9, 9, 9],
    [0, 0, 1, 2, 3, 3, 6, 6, 7, 8, 9, 9, 9, 9],
    [0, 0, 1, 2, 3, 3, 6, 6, 7, 8, 9, 9, 9, 9]
  ];
  const fingerOf = (row, i) => row === 4 ? 4 : KB_FINGERS[row][i];

  function buildKeyboard() {
    kbCur = kbLayout();
    $('#keyboard').innerHTML = KB_LAYOUTS[kbCur].map((r, ri) =>
      '<div class="kb-row">' + r.map((k, i) =>
        '<div class="key ' + (KB_WIDE[k] || '') + '" data-key="' + esc(k) + '" data-f="' + fingerOf(ri, i) + '">' + esc(k in KB_LABEL ? KB_LABEL[k] : k) + '</div>'
      ).join('') + '</div>'
    ).join('');
  }

  // Руки: прозрачные «стеклянные» кисти со светящимся контуром поверх клавиатуры; нужный палец подсвечивается
  let handsMove = null;
  function buildHands() {
    const el = $('#hands');
    if (!el) return;
    const rd = n => Math.round(n * 10) / 10;
    const qb = (p0, c, p2, t) => { const u = 1 - t; return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p2[1]]; };
    const qd = (p0, c, p2, t) => { const u = 1 - t; return [2 * u * (c[0] - p0[0]) + 2 * t * (p2[0] - c[0]), 2 * u * (c[1] - p0[1]) + 2 * t * (p2[1] - c[1])]; };
    // трубка с округлыми концами вдоль кривой (палец, большой палец, предплечье)
    function tube(p0, c, p2, ra, rb) {
      const N = 14, L = [], R = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N, p = qb(p0, c, p2, t), d = qd(p0, c, p2, t), m = Math.hypot(d[0], d[1]) || 1;
        const nx = -d[1] / m, ny = d[0] / m, r = ra + (rb - ra) * t;
        L.push([p[0] + nx * r, p[1] + ny * r]); R.push([p[0] - nx * r, p[1] - ny * r]);
      }
      const pts = L.slice();
      const dT = qd(p0, c, p2, 1), aT = Math.atan2(dT[1], dT[0]);
      for (let k = 1; k < 8; k++) { const a = aT + Math.PI / 2 - Math.PI * k / 8; pts.push([p2[0] + Math.cos(a) * rb, p2[1] + Math.sin(a) * rb]); }
      for (let i = N; i >= 0; i--) pts.push(R[i]);
      const dB = qd(p0, c, p2, 0), aB = Math.atan2(dB[1], dB[0]);
      for (let k = 1; k < 8; k++) { const a = aB - Math.PI / 2 - Math.PI * k / 8; pts.push([p0[0] + Math.cos(a) * ra, p0[1] + Math.sin(a) * ra]); }
      return pts;
    }
    // плавный замкнутый контур (ладонь)
    function blob(P) {
      const out = [], m = P.length, n = 7;
      for (let i = 0; i < m; i++) {
        const a = P[(i - 1 + m) % m], b = P[i], c = P[(i + 1) % m], d = P[(i + 2) % m];
        for (let k = 0; k < n; k++) {
          const t = k / n, t2 = t * t, t3 = t2 * t;
          out.push([0, 1].map(j => 0.5 * (2 * b[j] + (-a[j] + c[j]) * t + (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * t2 + (-a[j] + 3 * b[j] - 3 * c[j] + d[j]) * t3)));
        }
      }
      return out;
    }
    const path = pts => 'M' + pts.map(p => rd(p[0]) + ' ' + rd(p[1])).join('L') + 'Z';

    // Левая рука (мизинец → большой), кончики пальцев стоят на ASDF; правая — зеркальное отражение
    const FING = [
      { p0: [108, 224], c: [90, 172], p2: [115, 114], ra: 21, rb: 15 },
      { p0: [160, 210], c: [144, 160], p2: [167, 110], ra: 24, rb: 16.5 },
      { p0: [213, 204], c: [203, 152], p2: [218, 105], ra: 25, rb: 17 },
      { p0: [266, 212], c: [260, 162], p2: [269, 112], ra: 24, rb: 17 },
      { p0: [248, 284], c: [298, 266], p2: [316, 218], ra: 27, rb: 17 }
    ];
    const PALM = [[86, 228], [120, 210], [180, 198], [238, 196], [286, 208], [300, 240], [294, 272], [274, 298], [250, 312], [152, 312], [116, 292], [92, 262]];
    const ARM = { p0: [200, 290], c: [206, 350], p2: [212, 400], ra: 52, rb: 58 };
    const tf = ['translate(0 0)', 'translate(687 0) scale(-1 1)'];   // правая рука — зеркальное отражение левой

    // Состояние руки (в её локальных координатах): sx, sy — сдвиг ладони, ft[k] — смещение кончика k-го пальца
    const mk = () => ({ sx: 0, sy: 0, ft: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] });
    const cur = [mk(), mk()], goal = [mk(), mk()];
    // контуры всех частей руки: 5 пальцев, ладонь, предплечье
    const shapesOf = st => {
      const fp = FING.map((f, k) => {
        const d = st.ft[k];
        const p0 = [f.p0[0] + st.sx, f.p0[1] + st.sy];
        const p2 = [f.p2[0] + st.sx + d[0], f.p2[1] + st.sy + d[1]];
        const c = [f.c[0] + st.sx + d[0] * 0.5, f.c[1] + st.sy + d[1] * 0.5];
        return path(tube(p0, c, p2, f.ra, f.rb));
      });
      const palm = path(blob(PALM.map(p => [p[0] + st.sx, p[1] + st.sy])));
      const arm = path(tube([ARM.p0[0] + st.sx, ARM.p0[1] + st.sy], [ARM.c[0] + st.sx * 0.5, ARM.c[1]], ARM.p2, ARM.ra, ARM.rb));
      return fp.concat([palm, arm]);
    };

    const hand = i => '<g transform="' + tf[i] + '"><g mask="url(#hFade)">' +
      '<g filter="url(#hGlow)"><g mask="url(#hOuter' + i + ')"><path id="hs' + i + '" class="hs" d=""/></g></g></g></g>';
    const masks = i => '<mask id="hOuter' + i + '" maskUnits="userSpaceOnUse" x="-300" y="-300" width="1500" height="1000"><rect x="-300" y="-300" width="1500" height="1000" fill="#fff"/>' +
      '<path d="" fill="#000"/><path d="" fill="#000"/><path d="" fill="#000"/><path d="" fill="#000"/><path d="" fill="#000"/><path d="" fill="#000"/><path d="" fill="#000"/></mask>';
    el.innerHTML = '<svg viewBox="0 0 760 350" role="presentation" focusable="false"><defs>' +
      '<filter id="hGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      masks(0) + masks(1) +
      '<linearGradient id="hFadeG" gradientUnits="userSpaceOnUse" x1="0" y1="270" x2="0" y2="340"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>' +
      '<mask id="hFade" maskUnits="userSpaceOnUse" x="-300" y="-300" width="1500" height="1000"><rect x="-300" y="-300" width="1500" height="1000" fill="url(#hFadeG)"/></mask>' +
      '</defs>' + hand(0) + hand(1) + '</svg>';

    const hEls = [0, 1].map(i => ({ hs: el.querySelector('#hs' + i), mask: Array.from(el.querySelectorAll('#hOuter' + i + ' path')) }));
    const render = i => {
      const sh = shapesOf(cur[i]);
      hEls[i].hs.setAttribute('d', sh.join(''));
      hEls[i].mask.forEach((m, j) => m.setAttribute('d', sh[j]));
    };
    let raf = 0;
    const step = () => {
      let moving = false;
      const lerp = (x, y) => { const d = y - x; if (Math.abs(d) > 0.15) { moving = true; return x + d * 0.3; } return y; };
      [0, 1].forEach(i => {
        const a = cur[i], g = goal[i];
        a.sx = lerp(a.sx, g.sx); a.sy = lerp(a.sy, g.sy);
        a.ft.forEach((f, k) => { f[0] = lerp(f[0], g.ft[k][0]); f[1] = lerp(f[1], g.ft[k][1]); });
        render(i);
      });
      raf = moving ? requestAnimationFrame(step) : 0;
    };
    const HOME_IDX = { 0: 1, 1: 2, 2: 3, 3: 4, 6: 7, 7: 8, 8: 9, 9: 10 };   // домашний ряд: A S D F — J K L ;
    const clamp = (v, m) => Math.max(-m, Math.min(m, v));

    // targets: [{f: номер пальца, el: клавиша}] — палец тянется к клавише, рука немного сдвигается следом
    handsMove = targets => {
      const svg = el.querySelector('svg'), sr = svg.getBoundingClientRect();
      if (!sr.width) return;
      const sc = sr.width / 760;
      const center = k => { const r = k.getBoundingClientRect(); return [(r.left + r.width / 2 - sr.left) / sc, (r.top + r.height / 2 - sr.top) / sc]; };
      const homeRow = $$('#keyboard .kb-row')[2] ? $$('.key', $$('#keyboard .kb-row')[2]) : [];
      goal.forEach(g => { g.sx = 0; g.sy = 0; g.ft.forEach(f => { f[0] = 0; f[1] = 0; }); });
      (targets || []).forEach(t => {
        const hi = t.f < 5 ? 0 : 1, k = hi === 0 ? t.f : 9 - t.f, g = goal[hi];
        if (k === 4) { g.ft[4] = [0, 8]; return; }                   // большой палец: лёгкое нажатие на пробел
        const home = homeRow[HOME_IDX[t.f]];
        if (!home) return;
        const hc = center(home), tc = center(t.el);
        const dx = (tc[0] - hc[0]) * (hi === 1 ? -1 : 1), dy = tc[1] - hc[1];   // правая рука отражена по X
        g.sx = clamp(dx * 0.85, 220); g.sy = clamp(dy * 0.85, 130);
        g.ft[k] = [dx - g.sx, dy - g.sy];
      });
      if (!raf) raf = requestAnimationFrame(step);
    };
    step();
  }

  function keysFor(ch) {
    if (ch === '\n') return ['Enter'];
    if (ch === ' ') return ['Space'];
    if (ch !== ch.toLowerCase()) return [ch.toLowerCase(), 'Shift'];          // заглавная буква (латиница и кириллица)
    if (kbCur === 'lat' && SHIFT_MAP[ch]) return [SHIFT_MAP[ch], 'Shift'];
    return [ch];
  }
  function updateKeyboard() {
    const kb = $('#keyboard');
    if (kbCur !== kbLayout()) buildKeyboard();                   // сменили режим — перерисовать раскладку
    kb.hidden = false;
    const next = T.done ? null : T.text[input.value.length];
    const want = next ? keysFor(next) : [];
    const keys = $$('.key', kb);
    const main = keys.find(k => k.dataset.key !== 'Shift' && want.includes(k.dataset.key));
    const mainF = main ? +main.dataset.f : -1;
    // Shift нажимаем мизинцем противоположной руки
    const shifts = keys.filter(k => k.dataset.key === 'Shift');
    const shiftKey = want.includes('Shift') && shifts.length === 2 ? (mainF >= 0 && mainF < 5 ? shifts[1] : shifts[0]) : null;
    keys.forEach(k => k.classList.toggle('hl', k.dataset.key === 'Shift' ? k === shiftKey : want.includes(k.dataset.key)));
    const fingers = [];
    if (main) fingers.push(mainF);
    if (shiftKey) fingers.push(+shiftKey.dataset.f);
    if (want.includes('Space')) fingers.push(4, 5);
    const tg = [];
    if (main) tg.push({ f: mainF === 4 ? 5 : mainF, el: main });     // пробел — правым большим
    if (shiftKey) tg.push({ f: +shiftKey.dataset.f, el: shiftKey });
    if (handsMove) handsMove(tg);
  }

  function renderText() {
    const v = input.value;
    let html = '';
    for (let i = 0; i < T.text.length; i++) {
      const ch = T.text[i];
      let cls = 'pend';
      if (i < v.length) cls = v[i] === ch ? 'ok' : 'bad';
      else if (i === v.length) cls = 'cur';
      html += '<span class="' + cls + '">' + esc(ch === '\n' ? '↵\n' : ch) + '</span>';
    }
    display.innerHTML = html;
  }

  function stats() {
    const v = input.value;
    let correct = 0;
    for (let i = 0; i < v.length; i++) if (v[i] === T.text[i]) correct++;
    const secs = T.started ? (performance.now() - T.t0) / 1000 : 0;
    const wpm = secs > 0.5 ? Math.round((correct / 5) / (secs / 60)) : 0;
    const acc = T.total ? Math.max(0, Math.round((T.total - T.errors) / T.total * 100)) : 100;
    const prog = Math.round(correct / T.text.length * 100);
    return { wpm, acc, secs, prog };
  }
  function updateStats(final) {
    const s = stats();
    $('#st-wpm').textContent = s.wpm;
    $('#st-acc').textContent = s.acc + '%';
    $('#st-time').textContent = s.secs.toFixed(1) + ' ' + tr('sec');
    $('#st-prog').textContent = s.prog + '%';
    return s;
  }

  function resetTyping(newText) {
    clearInterval(T.timer);
    if (newText || !T.text) {
      const list = TYPING[T.lang];
      let s;
      do { s = list[Math.floor(Math.random() * list.length)]; } while (list.length > 1 && s === T.text);
      T.text = s;
    }
    Object.assign(T, { started: false, t0: 0, total: 0, errors: 0, timer: null, done: false, prevLen: 0 });
    input.value = '';
    input.maxLength = T.text.length;
    $('#typing-result').hidden = true;
    renderText(); updateStats(); updateKeyboard();
  }

  function finish() {
    clearInterval(T.timer);
    T.done = true;
    const s = updateStats();
    updateKeyboard();
    const data = store.get('cs_typing', { best: {}, history: [] });
    const prev = data.best[T.lang];
    const isRecord = !prev || s.wpm > prev.wpm;
    if (isRecord) data.best[T.lang] = { wpm: s.wpm, acc: s.acc };
    data.history = (data.history || []).concat({ lang: T.lang, wpm: s.wpm, acc: s.acc }).slice(-20);
    store.set('cs_typing', data);
    logActivity();
    const res = $('#typing-result');
    res.hidden = false;
    res.innerHTML =
      '<h3>' + (isRecord ? tr('new_record') : tr('done_ok')) + '</h3>' +
      '<div class="big"><div><b>' + s.wpm + '</b><span>' + tr('st_wpm') + '</span></div><div><b>' + s.acc + '%</b><span>' + tr('st_acc') + '</span></div><div><b>' + s.secs.toFixed(1) + ' ' + tr('sec') + '</b><span>' + tr('st_time') + '</span></div></div>' +
      '<button class="btn primary" data-act="again">' + tr('another') + '</button> <button class="btn" data-act="retry">' + tr('retry') + '</button>';
    renderRecords();
    input.blur();
    box.classList.remove('focused');
  }

  const LANG_KEYS = ['py', 'cpp', 'sym', 'en', 'ru'];
  const langName = k => ({ py: 'Python', cpp: 'C++' })[k] || tr('tl_' + k);
  function renderRecords() {
    const data = store.get('cs_typing', { best: {}, history: [] });
    $('#records').innerHTML = LANG_KEYS.map(k => {
      const b = data.best[k];
      return '<div class="stat"><span>' + (b ? b.wpm : '—') + '</span><small>' + langName(k) + (b ? ' · ' + tr('rec_acc', b.acc) : '') + '</small></div>';
    }).join('');
  }

  input.addEventListener('input', () => {
    if (T.done) { input.value = T.text; return; }
    let v = input.value;
    if (!T.started && v.length) {
      T.started = true;
      T.t0 = performance.now();
      T.timer = setInterval(updateStats, 200);
    }
    if (v.length > T.prevLen) {
      const i = v.length - 1;
      T.total++;
      if (v[i] !== T.text[i]) T.errors++;
      if (v[i] === '\n' && v === T.text.slice(0, v.length)) {
        let j = v.length;
        while (T.text[j] === ' ') j++;
        v = T.text.slice(0, j);
        input.value = v;
      }
    }
    T.prevLen = v.length;
    renderText(); updateStats(); updateKeyboard();
    if (v === T.text) finish();
  });
  input.addEventListener('keydown', e => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'].includes(e.key)) e.preventDefault();
  });
  ['paste', 'cut', 'drop'].forEach(ev => input.addEventListener(ev, e => e.preventDefault()));
  const caretEnd = () => { const n = input.value.length; try { input.setSelectionRange(n, n); } catch (e) { /* ignore */ } };
  input.addEventListener('click', caretEnd);
  input.addEventListener('select', caretEnd);
  input.addEventListener('focus', () => { box.classList.add('focused'); caretEnd(); });
  input.addEventListener('blur', () => box.classList.remove('focused'));
  box.addEventListener('click', () => { if (!T.done) input.focus(); });

  $('#typing-lang').addEventListener('change', e => {
    T.lang = e.target.value;
    store.set('cs_tlang', T.lang);
    resetTyping(true);
  });
  $('#typing-new').addEventListener('click', () => resetTyping(true));
  $('#typing-reset').addEventListener('click', () => { resetTyping(false); input.focus(); });
  $('#typing-result').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    resetTyping(b.dataset.act === 'again');
    input.focus();
  });

  /* ============ Ресурсы (сравнение Python и C++) ============ */
  let resOpen = -1;   // номер открытой темы (-1 — виден список кнопок)
  function renderCheats() {
    const rows = (I18N.lang === 'en' && EN_DATA && EN_DATA.CHEATS) || CHEATS;
    const list = $('#res-list'), det = $('#res-detail');
    if (resOpen >= rows.length) resOpen = -1;
    if (resOpen < 0) {
      list.hidden = false; det.hidden = true; det.innerHTML = '';
      list.innerHTML = rows.map((r, i) =>
        '<button type="button" class="res-btn" data-res="' + i + '"><span>' + esc(r[0]) + '</span><i aria-hidden="true">›</i></button>'
      ).join('');
      return;
    }
    const r = rows[resOpen];
    list.hidden = true; det.hidden = false;
    det.innerHTML =
      '<button type="button" class="btn small" data-res-back>← ' + tr('res_back') + '</button>' +
      '<div class="card res-card"><h2>' + esc(r[0]) + '</h2>' +
      '<p class="res-text">' + esc(r[3] || '') + '</p>' +
      '<div class="grid cards two">' +
        '<div class="code-window"><div class="code-head"><span style="margin-left:0">🐍 Python</span></div><pre>' + highlight(r[1], 'py') + '</pre></div>' +
        '<div class="code-window"><div class="code-head"><span style="margin-left:0">⚙️ C++</span></div><pre>' + highlight(r[2], 'cpp') + '</pre></div>' +
      '</div>' +
      '<div class="res-nav">' +
        (resOpen > 0 ? '<button type="button" class="btn small" data-res="' + (resOpen - 1) + '">← ' + esc(rows[resOpen - 1][0]) + '</button>' : '<span></span>') +
        (resOpen < rows.length - 1 ? '<button type="button" class="btn small" data-res="' + (resOpen + 1) + '">' + esc(rows[resOpen + 1][0]) + ' →</button>' : '<span></span>') +
      '</div></div>';
  }
  $('#page-resources').addEventListener('click', e => {
    const b = e.target.closest('[data-res]'), back = e.target.closest('[data-res-back]');
    if (b) { resOpen = +b.dataset.res; renderCheats(); window.scrollTo({ top: 0 }); }
    else if (back) { resOpen = -1; renderCheats(); }
  });
  renderCheats();

  /* ============ Тест ============ */
  const Q = { list: [], i: 0, score: 0, locked: false };
  const quizBox = $('#quiz-box');
  let quizIdle = true;                 // true, пока показан экран выбора (не идёт тест)

  // Вопросы на текущем языке: порядок, тема и номер верного ответа — из Data.js, тексты — из Data.en.js
  function quizData() {
    const en = I18N.lang === 'en' && EN_DATA && EN_DATA.QUIZ && EN_DATA.QUIZ.length === QUIZ.length ? EN_DATA.QUIZ : null;
    if (!en) return QUIZ;
    return QUIZ.map((x, i) => ({ lang: x.lang, q: en[i][0], options: en[i][1] || x.options, answer: x.answer, explain: en[i][2] }));
  }

  function quizIntro() {
    quizIdle = true;
    const best = store.get('cs_quiz', null);
    quizBox.innerHTML =
      '<h2>' + tr('quiz_h') + '</h2>' +
      '<p class="sub">' + tr('quiz_intro', QUIZ.length) + '</p>' +
      '<p><label>' + tr('quiz_topic') + ' <select id="quiz-lang"><option value="all">' + tr('quiz_all') + '</option><option value="py">Python</option><option value="cpp">C++</option></select></label> ' +
      '<label>' + tr('quiz_count') + ' <select id="quiz-count"><option value="10">10</option><option value="20" selected>20</option><option value="30">30</option><option value="50">50</option><option value="100">100</option><option value="0">' + tr('quiz_every') + '</option></select></label></p>' +
      (best ? '<p class="sub">' + tr('quiz_best') + '<b>' + best.best + '%</b></p>' : '') +
      '<button class="btn primary" data-act="start">' + tr('quiz_start') + '</button>';
  }
  function quizStart() {
    quizIdle = false;
    const f = $('#quiz-lang').value;
    const n = +$('#quiz-count').value || Infinity;
    const pool = quizData().filter(q => f === 'all' || q.lang === f || q.lang === 'all');
    Q.list = shuffle(pool).slice(0, n).map(q => ({
      q: q.q, explain: q.explain,
      opts: shuffle(q.options.map((t, i) => ({ t, ok: i === q.answer })))
    }));
    Q.i = 0; Q.score = 0;
    quizQuestion();
  }
  function quizQuestion() {
    const item = Q.list[Q.i];
    Q.locked = false;
    quizBox.innerHTML =
      '<div class="q-meta"><span>' + tr('quiz_q', Q.i + 1, Q.list.length) + '</span><span>' + tr('quiz_right', Q.score) + '</span>' +
      '<button class="btn small exit-btn" data-act="exit" title="' + tr('quiz_exit_title') + '">' + tr('quiz_exit') + '</button></div>' +
      '<h2>' + esc(item.q) + '</h2>' +
      '<div class="opts">' + item.opts.map((o, i) => '<button class="opt" data-act="opt" data-i="' + i + '">' + esc(o.t) + '</button>').join('') + '</div>' +
      '<div id="q-after"></div>';
  }
  function quizAnswer(i) {
    if (Q.locked) return;
    Q.locked = true;
    const item = Q.list[Q.i];
    const ok = item.opts[i].ok;
    if (ok) Q.score++;
    $$('.opt', quizBox).forEach((b, idx) => {
      b.disabled = true;
      if (item.opts[idx].ok) b.classList.add('right');
      else if (idx === i) b.classList.add('wrong');
    });
    const last = Q.i === Q.list.length - 1;
    $('#q-after').innerHTML =
      '<div class="explain">' + (ok ? tr('quiz_ok') : tr('quiz_bad')) + esc(item.explain) + '</div>' +
      '<button class="btn primary" data-act="next">' + (last ? tr('quiz_show') : tr('quiz_next')) + '</button>';
  }
  function quizEnd() {
    const pct = Math.round(Q.score / Q.list.length * 100);
    const prev = store.get('cs_quiz', null);
    logActivity();
    if (!prev || pct > prev.best) store.set('cs_quiz', { best: pct });
    const msg = pct === 100 ? tr('quiz_m100') : pct >= 70 ? tr('quiz_m70') : pct >= 40 ? tr('quiz_m40') : tr('quiz_m0');
    quizBox.innerHTML =
      '<div class="quiz-end"><h2>' + tr('quiz_result') + '</h2><div class="score">' + Q.score + ' / ' + Q.list.length + '</div>' +
      '<p class="sub" style="margin:8px auto 18px">' + msg + '</p>' +
      '<button class="btn primary" data-act="restart">' + tr('quiz_again') + '</button> <a class="btn" href="#courses">' + tr('quiz_lessons') + '</a></div>';
  }
  quizBox.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'start') quizStart();
    else if (act === 'opt') quizAnswer(+b.dataset.i);
    else if (act === 'next') { if (Q.i < Q.list.length - 1) { Q.i++; quizQuestion(); } else quizEnd(); }
    else if (act === 'restart') quizIntro();
    else if (act === 'exit') quizIntro();
  });


  /* ============ Архив задач ============ */
  const arSolved = () => store.get('cs_archive', []);
  const arSave = a => store.set('cs_archive', a);
  const arF = { q: '', r: 'all', t: 'all', s: 'all' };          // фильтры списка
  const arD = p => (I18N.lang === 'en' ? p.en : p.ru);   // таджикский: условия на русском           // тексты задачи на языке интерфейса
  const arTag = k => (ARCHIVE_TAGS[k] ? (ARCHIVE_TAGS[k][I18N.lang] || ARCHIVE_TAGS[k].ru) : k);
  const arCls = c => c < 30 ? 'r1' : c < 50 ? 'r2' : c < 60 ? 'r3' : c < 70 ? 'r4' : 'r5';
  const arParas = t => String(t).split('\n').map(x => '<p>' + esc(x) + '</p>').join('');

  function arFiltered() {
    const done = arSolved(), q = arF.q.trim().toLowerCase().replace(/^#/, '');
    return ARCHIVE.filter(p => {
      if (q && String(p.id) !== q && !arD(p).title.toLowerCase().includes(q)) return false;
      if (arF.t !== 'all' && !p.tags.includes(arF.t)) return false;
      const ok = done.includes(p.id);
      return !(arF.s === 'solved' && !ok) && !(arF.s === 'unsolved' && ok);
    });
  }
  function arRowsHtml() {
    const done = arSolved(), list = arFiltered();
    if (!list.length) return '<tr><td colspan="4" class="ar-empty">' + tr('ar_none') + '</td></tr>';
    return list.map(p => {
      const ok = done.includes(p.id);
      return '<tr class="' + (ok ? 'solved' : '') + '"><td class="ar-id">' + p.id + '</td>' +
        '<td><a href="#archive/' + p.id + '">' + esc(arD(p).title) + '</a></td>' +
        '<td class="ar-tags">' + p.tags.map(k => '<span class="chip">' + esc(arTag(k)) + '</span>').join('') + '</td>' +
        '<td class="ar-st">' + (ok ? '✓' : '') + '</td></tr>';
    }).join('');
  }
  function arUpdateRows() {
    const body = $('#ar-rows');
    if (!body) return;
    body.innerHTML = arRowsHtml();
    $('#ar-shown').textContent = tr('ar_shown', arFiltered().length);
  }
  function arList() {
    const tags = Array.from(new Set([].concat(...ARCHIVE.map(p => p.tags)))).sort((a, b) => arTag(a).localeCompare(arTag(b)));
    const opt = (v, label, cur) => '<option value="' + v + '"' + (String(cur) === String(v) ? ' selected' : '') + '>' + esc(label) + '</option>';
    const done = arSolved().filter(id => ARCHIVE.some(p => p.id === id)).length;
    $('#archive-view').innerHTML =
      '<div class="ar-filters">' +
      '<input id="ar-q" type="search" placeholder="' + esc(tr('ar_search')) + '" value="' + esc(arF.q) + '">' +
      '<select id="ar-t">' + opt('all', tr('ar_all_tags'), arF.t) + tags.map(k => opt(k, arTag(k), arF.t)).join('') + '</select>' +
      '<select id="ar-s">' + opt('all', tr('ar_st_all'), arF.s) + opt('solved', tr('ar_st_solved'), arF.s) + opt('unsolved', tr('ar_st_unsolved'), arF.s) + '</select>' +
      '</div>' +
      '<p class="ar-stat"><b>' + tr('ar_solved_stat', done, ARCHIVE.length) + '</b> · <span id="ar-shown"></span></p>' +
      '<div class="card ar-card"><table class="ar-table"><thead><tr><th>#</th><th>' + tr('ar_col_name') + '</th><th class="ar-tags">' + tr('ar_col_tags') + '</th><th></th></tr></thead>' +
      '<tbody id="ar-rows"></tbody></table></div>';
    arUpdateRows();
  }
  function arProblem(id) {
    const p = ARCHIVE.find(x => x.id === id);
    if (!p) { $('#archive-view').innerHTML = '<div class="card">' + tr('ar_not_found') + '</div><p><a class="btn" href="#archive">' + tr('ar_back') + '</a></p>'; return; }
    const d = arD(p), ok = arSolved().includes(p.id);
    const idx = ARCHIVE.indexOf(p), prev = ARCHIVE[idx - 1], next = ARCHIVE[idx + 1];
    $('#archive-view').innerHTML =
      '<p><a class="btn small" href="#archive">' + tr('ar_back') + '</a></p>' +
      '<div class="card ar-problem' + (ok ? ' is-solved' : '') + '">' +
      '<p class="eyebrow">' + tr('archive_title') + ' #' + p.id + (ok ? ' · <span class="ar-ok">' + tr('ar_solved_badge') + ' ✓</span>' : '') + '</p>' +
      '<h2>' + p.id + '. ' + esc(d.title) + '</h2>' +
      '<div class="ar-tags">' + p.tags.map(k => '<span class="chip">' + esc(arTag(k)) + '</span>').join('') + '</div>' +
      '<div class="prose">' + arParas(d.legend) +
      '<h3>' + tr('ar_input') + '</h3>' + arParas(d.input) +
      '<h3>' + tr('ar_output') + '</h3>' + arParas(d.output) + '</div>' +
      '<h3>' + tr('ar_examples') + '</h3>' +
      p.ex.map((e, i) => '<div class="ar-ex"><div><div class="ar-ex-h"><span>' + tr('ar_ex_in') + '</span><button class="copy-btn" data-act="copy" data-i="' + i + '">' + tr('copy') + '</button></div><pre>' + esc(e[0]) + '</pre></div>' +
        '<div><div class="ar-ex-h"><span>' + tr('ar_ex_out') + '</span></div><pre>' + esc(e[1]) + '</pre></div></div>').join('') +
      (d.note ? '<h3>' + tr('ar_note') + '</h3><div class="prose">' + arParas(d.note) + '</div>' : '') +
      '<div class="ar-mark"><button class="btn primary" id="ar-send" data-act="submit" data-id="' + p.id + '">' + tr('ar_send') + '</button></div>' +
      '<div class="lesson-actions">' +
      (prev ? '<a class="btn" href="#archive/' + prev.id + '">' + tr('ar_prev') + '</a>' : '<span></span>') +
      (next ? '<a class="btn" href="#archive/' + next.id + '">' + tr('ar_next') + '</a>' : '<span></span>') +
      '</div></div>';
  }

  function renderArchive() {
    if (typeof ARCHIVE === 'undefined') return;
    const m = location.hash.slice(1).split('/');
    if (m[1]) arProblem(+m[1]); else arList();
  }
  // Для вашей отправки: отметить / снять отметку «решена» (зелёная подсветка) и перерисовать страницу
  window.ProgForceArchive = {
    setSolved(id, on) { const a = arSolved().filter(x => x !== id); arSave(on === false ? a : a.concat(id)); renderArchive(); }
  };
  const arView = $('#archive-view');
  arView.addEventListener('input', e => { if (e.target.id === 'ar-q') { arF.q = e.target.value; arUpdateRows(); } });
  arView.addEventListener('change', e => {
    const k = { 'ar-t': 't', 'ar-s': 's' }[e.target.id];
    if (k) { arF[k] = e.target.value; arUpdateRows(); }
  });
  arView.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const id = +(location.hash.slice(1).split('/')[1] || 0);
    if (b.dataset.act === 'submit') {
      // Кнопка «Отправить»: сюда подключается ваша отправка (GitHub и т.п.).
      // Задайте window.ProgForceSubmit = function (problem, id) { ... } — она вызовется при нажатии.
      const p = ARCHIVE.find(x => x.id === id);
      if (p && typeof window.ProgForceSubmit === 'function') window.ProgForceSubmit(p, id);
    } else if (b.dataset.act === 'copy') {
      const p = ARCHIVE.find(x => x.id === id);
      if (p) copyText(p.ex[+b.dataset.i][0], b);
    }
  });

  /* ============ Смена языка интерфейса ============ */
  // Статичные тексты I18N.apply() заменил сам; здесь перерисовываем всё, что строится из JS.
  I18N.onChange(() => {
    updateAuthUI();
    renderRecords();
    renderCheats();
    updateStats();
    if (quizIdle) quizIntro();           // тест в процессе не прерываем — он продолжится на прежнем языке
    renderPage(currentPage());
  });

  /* ============ Версия сборки (видна внизу страницы — чтобы понять, что загрузилась новая) ============ */
  (function () {
    const f = $('.site-footer .wrap');
    if (f) { const v = document.createElement('div'); v.className = 'build-ver'; v.textContent = 'build 2026.11.12-a'; f.appendChild(v); }
  })();

  /* ============ Старт ============ */
  buildKeyboard();
  buildHands();
  window.addEventListener('resize', () => { if (typeof updateKeyboard === 'function') updateKeyboard(); });
  resetTyping(true);
  renderRecords();
  quizIntro();
  updateAuthUI();
  route();
})();
