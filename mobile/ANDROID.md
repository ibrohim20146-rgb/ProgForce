# ProgForce для Google Play (TWA)

Сайт уже готов как PWA: `manifest.webmanifest`, `sw.js`, иконки в `icons/`.
Приложение для Play Market — это обёртка вокруг вашего сайта на HTTPS.

1. Выложите сайт на домен с HTTPS (`node server.js`, за nginx/Render/VPS и т.п.).
2. Впишите свой домен в `mobile/twa-manifest.json` (вместо ВАШ-ДОМЕН.com).
3. На компьютере с Node.js:
   ```
   npm i -g @bubblewrap/cli
   cd mobile
   bubblewrap init --manifest=https://ВАШ-ДОМЕН.com/manifest.webmanifest
   bubblewrap build
   ```
   Получите `app-release-bundle.aab` (для Play Console) и `.apk` (для проверки на телефоне).
4. `bubblewrap fingerprint` покажет SHA-256 ключа. Впишите его в `.env`:
   `TWA_SHA256=AA:BB:...` и `TWA_PACKAGE=com.progforce.app`, перезапустите сервер.
   Проверьте: `https://ВАШ-ДОМЕН.com/.well-known/assetlinks.json` должен открываться.
   Если у вас включена подпись Google Play, добавьте и её отпечаток (Play Console → Целостность приложения).
5. Play Console (аккаунт разработчика, $25 один раз): создайте приложение, загрузите `.aab`,
   иконка магазина — `playstore-512.png`, заполните описание, скриншоты, политику конфиденциальности.

Не теряйте `android.keystore` и пароль — без них обновить приложение нельзя.
