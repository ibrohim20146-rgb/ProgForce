/* ProgForce service worker: оффлайн-оболочка сайта. API (/api/*) никогда не кэшируется. */
const VERSION = 'pf-v17';
const SHELL = [
  '/', '/ProgForce.css', '/App.js', '/Data.js', '/Data.en.js', '/Archive.js',
  '/I18n.js', '/Effects.js', '/Run.js', '/Chatbot.js', '/server-config.js',
  '/favicon.svg', '/favicon.png', '/icons/icon-192.png', '/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/.well-known/')) return;

  // страницы: сначала сеть (свежая версия), при отсутствии сети — кэш
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('/', copy)); return res;
    }).catch(() => caches.match('/')));
    return;
  }
  // остальное: из кэша, параллельно обновляем
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req);
    const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
