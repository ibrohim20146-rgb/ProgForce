// enabled: true  -> настоящий вход: письма с кодом отправляет server.js
// enabled: false -> демо-режим (письма не отправляются, код 123456)
window.SERVER_CONFIG = {
  enabled: true,
  apiUrl: ""   // "" = сервер на том же адресе, что и сайт (рекомендуется)
};
