'use strict';

/* ============ ЛОКАЛИЗАЦИЯ / LOCALIZATION ============
   Языки интерфейса: ru, en, tg (таджикский; уроки и тест для него показываются на русском).
   В HTML:  data-i18n="ключ"        — подставляет текст
            data-i18n-html="ключ"   — подставляет HTML
            data-i18n-attr="aria-label:ключ;title:ключ2" — подставляет атрибуты
   В JS:    I18N.t('ключ', арг0, арг1, ...)  — {0}, {1} в строке заменяются аргументами
   Чтобы добавить язык: добавьте его в LANGS, STR и (по желанию) Data.<код>.js */
(function () {
  const LANGS = { ru: 'Русский', en: 'English', tg: 'Тоҷикӣ' };
  const LS_KEY = 'cs_ui_lang';

  const STR = {
    ru: {
      /* --- мета --- */
      meta_title: 'ProgForce — учим C++ и Python',
      meta_desc: 'ProgForce — сайт для изучения программирования: уроки по C++ и Python, тренажёр клавиатуры, шпаргалки и тест.',
      og_desc: 'Уроки по C++ и Python, тренажёр клавиатуры, шпаргалки и тест.',
      noscript: 'Для работы сайта нужен JavaScript.',

      /* --- шапка --- */
      nav_home: 'Главная', nav_courses: 'Курсы', nav_typing: 'Клавиатура', nav_resources: 'Ресурсы',
      nav_quiz: 'Тест', nav_archive: 'Архив', nav_settings: 'Настройки',
      c_archive_t: 'Архив задач', c_archive_p: '90 задач в стиле Codeforces: условия, примеры, теги и рейтинг сложности.',
      archive_title: 'Архив задач',
      ar_lead: 'Задачи в стиле Codeforces: прочитайте условие, напишите решение на Python или C++ (ввод — stdin, вывод — stdout), сравните вывод с примерами и отметьте задачу решённой.',
      ar_search: 'Поиск по названию или номеру', ar_all_ratings: 'Любая сложность', ar_all_tags: 'Все теги',
      ar_st_all: 'Все', ar_st_solved: 'Решённые', ar_st_unsolved: 'Нерешённые',
      ar_solved_stat: 'Решено: {0} из {1}', ar_shown: 'Показано: {0}', ar_none: 'Ничего не найдено — измените фильтры.',
      ar_col_name: 'Название', ar_col_tags: 'Теги', ar_col_rating: 'Сложность',
      ar_mark: 'Отметить решённой ✓', ar_unmark: 'Снять отметку', ar_back: '← К списку', ar_prev: '← Предыдущая задача', ar_next: 'Следующая задача →',
      ar_input: 'Формат ввода', ar_output: 'Формат вывода', ar_examples: 'Примеры', ar_ex_in: 'Ввод', ar_ex_out: 'Вывод', ar_note: 'Примечание',
      ar_submit: 'Отправить решение', ar_lang: 'Язык', ar_send: 'Отправить', ar_subs: 'Мои посылки', ar_delete: 'Удалить посылку', ar_clear_all: 'Удалить все', ar_clear_confirm: 'Удалить все посылки по этой задаче?', ar_when: 'Время', ar_verdict: 'Вердикт',
      ar_v_ce: 'Ошибка компиляции', ar_cpp_fail: 'Не удалось проверить C++: сервер с g++ и онлайн-компиляторы недоступны. Проверьте интернет и попробуйте ещё раз.', ar_cpp_busy: 'Сервер занят или слишком много посылок — попробуйте чуть позже.', ar_v_ok: 'Принято ✓', ar_v_wa: 'Неверный ответ на тесте {0}', ar_v_re: 'Ошибка выполнения на тесте {0}', ar_v_tle: 'Превышено время на тесте {0}',
      ar_empty_code: 'Введите код решения.', ar_testing: 'Тестируем…', ar_loading_py: 'Загружаем Python (первый раз — до нескольких секунд)…',
      ar_load_fail: 'Не удалось загрузить Python. Проверьте интернет и попробуйте ещё раз.', ar_solved_badge: 'Решена', ar_not_found: 'Такой задачи нет.',
      ar_hint: 'Python запускается прямо в браузере, C++ компилируется на сервере сайта (если там есть g++) или в онлайн-компиляторе Wandbox/Godbolt; решение проверяется на примерах выше (ввод — stdin, вывод — stdout). При вердикте «Принято» задача отмечается решённой. Ctrl+Enter — отправить.', nav_login: 'Войти', nav_logout: 'Выйти',
      nav_finish: 'Завершить регистрацию',
      theme_toggle: 'Сменить тему', menu: 'Меню',
      lang_switch: 'Язык', lang_btn: 'RU',

      /* --- главная --- */
      h_eyebrow: 'Учись программировать',
      h_title: 'Изучай <span class="grad">C++</span> и <span class="grad">Python</span> шаг за шагом',
      h_lead: 'Короткие уроки с примерами кода, тренажёр для быстрой печати, ресурсы со сравнением языков и тест для проверки знаний — всё в одном месте.',
      h_cta_start: 'Начать курс', h_cta_typing: 'Тренажёр клавиатуры',
      hero_code: '<span class="t-c"># Твоя первая программа</span>\n<span class="t-k">def</span> <span class="t-f">hello</span>(name):\n    <span class="t-k">return</span> <span class="t-s">f"Привет, {name}!"</span>\n\n<span class="t-f">print</span>(<span class="t-f">hello</span>(<span class="t-s">"мир"</span>))',
      h_sections: 'Разделы сайта',
      c_courses_t: 'Курсы', c_courses_p: '8 уроков по Python и 8 по C++ с примерами.',
      c_typing_t: 'Тренажёр клавиатуры', c_typing_p: 'Печатай код, символы и тексты. Считаем скорость и точность.',
      c_res_t: 'Ресурсы', c_res_p: 'Сравнение синтаксиса Python и C++ на одной странице.',
      c_quiz_t: 'Тест', c_quiz_p: 'Проверь, что запомнил: вопросы по Python и C++.',
      c_acc_t: 'Аккаунт', c_acc_p: 'Зарегистрируйся, чтобы у каждого был свой прогресс и рекорды.',
      c_set_t: 'Настройки', c_set_p: 'Тема, цвет, размер текста и другие параметры вида сайта.',
      home_hi: ' Привет, <b>{0}</b>! Твой прогресс сохраняется в аккаунте.',
      home_profile: 'Профиль',
      home_guest: 'Войди или зарегистрируйся, чтобы у тебя был свой прогресс и рекорды.',
      home_stat_lessons: 'уроков пройдено',
      home_stat_wpm: 'лучший результат печати, слов/мин',
      home_stat_quiz: 'лучший результат теста',

      /* --- курсы --- */
      courses_title: 'Курсы',
      lesson_of: 'Урок {0} из {1}',
      task: 'Задание:', tasks_h: 'Задания для практики',
      copy: 'Копировать', copied: 'Скопировано ✓',
      prev: '← Назад', next: 'Далее →',
      mark_done: 'Отметить пройденным ✓', unmark: 'Снять отметку',
      progress_text: '{0} из {1} уроков · {2}%',

      /* --- клавиатура --- */
      typing_title: 'Тренажёр клавиатуры',
      typing_sub: 'Печатай фрагменты кода и текста. Нажми на поле ниже и начинай — таймер запустится с первого символа.',
      typing_mode: 'Режим',
      mode_sym: 'Символы кода',
      typing_new: 'Другой фрагмент', typing_reset: 'Начать заново',
      st_wpm: 'слов/мин', st_acc: 'точность', st_time: 'время', st_prog: 'прогресс',
      sec: 'с',
      typing_field: 'Поле для печати',
      typing_overlay: 'Нажмите сюда и начинайте печатать',
      typing_hint: 'Отступы после Enter ставятся автоматически. Backspace исправляет ошибки. Символ ↵ — это переход на новую строку (клавиша Enter).',
      records: 'Рекорды',
      rec_acc: '{0}% точность',
      new_record: '🏆 Новый рекорд!', done_ok: '✅ Готово!',
      another: 'Ещё фрагмент', retry: 'Повторить этот',
      tl_sym: 'Символы', tl_en: 'English', tl_ru: 'Русский', tl_tg: 'Тоҷикӣ',

      /* --- ресурсы --- */
      res_title: 'Ресурсы',
      res_sub: 'Выбери тему — откроется объяснение и код на Python и C++.',
      res_what: 'Что делаем',
      res_back: 'Все темы',
      res_diff: 'Главные отличия',
      py_li: '<li>Блоки выделяются отступами</li><li>Типы определяются автоматически</li><li>Интерпретируемый: запускается сразу</li><li>Короткий код, быстрый старт</li>',
      cpp_li: '<li>Блоки в фигурных скобках { }</li><li>Типы указываются явно</li><li>Компилируется в машинный код</li><li>Высокая скорость и контроль над памятью</li>',

      /* --- тест --- */
      quiz_title: 'Тест',
      quiz_loading: 'Загрузка теста… Если эта надпись не пропадает, значит файлы Data.js и App.js не найдены рядом с ProgForce.html.',
      quiz_h: 'Проверь свои знания',
      quiz_intro: 'В тесте {0} вопросов по Python и C++. Выбери тему и количество вопросов, затем нажми «Начать».',
      quiz_topic: 'Тема:', quiz_all: 'Всё вместе',
      quiz_count: 'Вопросов:', quiz_every: 'Все',
      quiz_best: 'Лучший результат: ',
      quiz_start: 'Начать',
      quiz_q: 'Вопрос {0} из {1}', quiz_right: 'Верно: {0}',
      quiz_exit: 'Выйти', quiz_exit_title: 'Выйти из теста',
      quiz_ok: '✅ Верно. ', quiz_bad: '❌ Неверно. ',
      quiz_next: 'Следующий вопрос →', quiz_show: 'Показать результат',
      quiz_result: 'Результат',
      quiz_m100: 'Безупречно! 🏆', quiz_m70: 'Отличный результат!', quiz_m40: 'Неплохо, но есть что повторить.',
      quiz_m0: 'Загляни в раздел «Курсы» и попробуй ещё раз.',
      quiz_again: 'Пройти ещё раз', quiz_lessons: 'К урокам',

      /* --- настройки --- */
      set_title: 'Настройки',
      set_sub: 'Настройте внешний вид ProgForce под себя. Изменения применяются сразу и сохраняются в вашем браузере.',
      set_theme_t: 'Тема', set_theme_h: 'Тёмная или светлая цветовая схема сайта.',
      set_dark: '🌙 Тёмная', set_light: '☀️ Светлая',
      set_accent_t: 'Акцентный цвет', set_accent_h: 'Цвет кнопок, подсветки и прогресса. Сейчас: {0}.',
      acc_green: 'Зелёный', acc_blue: 'Синий', acc_purple: 'Фиолетовый', acc_orange: 'Оранжевый', acc_pink: 'Розовый', acc_red: 'Красный',
      set_font_t: 'Размер текста', set_font_h: 'Сделайте текст и интерфейс мельче или крупнее.',
      set_sm: 'Мелкий', set_md: 'Обычный', set_lg: 'Крупный',
      set_width_t: 'Ширина сайта', set_width_h: 'Насколько широким будет содержимое страниц.',
      set_w_sm: 'Узкая', set_w_md: 'Обычная', set_w_lg: 'Широкая',
      set_anim_t: 'Анимации', set_anim_h: 'Плавные переходы и появление страниц.',
      set_on: 'Включены', set_off: 'Выключены',
      set_lang_t: 'Язык', set_lang_h: 'Язык интерфейса, уроков и теста.',
      acc_teal: 'Бирюзовый', acc_cyan: 'Голубой', acc_yellow: 'Жёлтый', acc_lime: 'Лаймовый', acc_indigo: 'Индиго', acc_coral: 'Коралловый',
      set_palette_t: 'Цвет фона', set_palette_h: 'Оттенок фона и карточек для выбранной темы.',
      pal_default: 'Стандартный', pal_midnight: 'Полночь', pal_dracula: 'Дракула', pal_nord: 'Норд', pal_forest: 'Лес', pal_amoled: 'AMOLED (чёрный)', pal_sepia: 'Сепия', pal_sky: 'Небо', pal_mint: 'Мята', pal_rose: 'Роза',
      set_family_t: 'Шрифт', set_family_h: 'Начертание шрифта интерфейса.',
      set_f_system: 'Системный', set_f_serif: 'С засечками', set_f_rounded: 'Округлый', set_f_mono: 'Моноширинный',
      set_lh_t: 'Межстрочный интервал', set_lh_h: 'Плотность строк текста.', set_lh_tight: 'Плотный', set_lh_loose: 'Свободный',
      set_code_t: 'Размер кода', set_code_h: 'Размер шрифта в примерах кода и редакторе решений.',
      set_radius_t: 'Скругление углов', set_radius_h: 'Форма карточек, кнопок и полей.', set_r_sharp: 'Острые', set_r_round: 'Круглые',
      set_shadow_t: 'Тени', set_shadow_h: 'Тени под карточками и окнами.',
      set_tags_t: 'Теги в архиве', set_tags_h: 'Показывать теги задач в списке и в условии.',
      set_reset: 'Сбросить настройки',
      fx_t: 'Эффекты', fx_h: 'Анимации поверх сайта. Нажмите на картинку, чтобы включить или выключить; эффекты можно сочетать.',
      fx_snow: 'Снег', fx_rain: 'Дождь', fx_stars: 'Звёзды', fx_matrix: 'Матрица', fx_confetti: 'Конфетти', fx_storm: 'Гроза', fx_meteors: 'Метеоры', fx_embers: 'Искры', fx_leaves: 'Листопад', fx_none: 'Выключить все',

      /* --- аккаунт --- */
      login_title: 'Войти',
      acc_nick_taken: 'Этот ник уже занят.',
      acc_nick_rule: 'Ник: 3–20 символов — буквы, цифры, _ . -',
      acc_bad_code: 'Неверный или просроченный код. Запросите новый.',
      acc_rate: 'Слишком часто. Подождите минуту и повторите.',
      acc_network: 'Сервер недоступен. Запустите server.js (npm start) и откройте сайт по адресу http://localhost:3000 — не двойным кликом по файлу.',
      acc_error: 'Ошибка: {0}', acc_try_again: 'попробуйте ещё раз',
      demo_note: '<p class="auth-hint">🧪 <b>Демо-режим:</b> письма не отправляются, вход работает только в этом браузере. Код для входа: <b>{0}</b>. Чтобы коды приходили на настоящую почту, запустите server.js и поставьте <code>enabled: true</code> в <code>server-config.js</code>.</p>',
      pf_new_ok: '✅ Почта подтверждена! Осталось придумать ник и выбрать аватар.',
      pf_nick: 'Ник', pf_nick_ph: 'например, CodeMaster',
      pf_bio: 'О себе (необязательно)',
      pf_avatar: 'Аватар', pf_color: 'Цвет', pf_color_aria: 'Цвет',
      pf_your_nick: 'Твой ник',
      pf_done: 'Готово', pf_save: 'Сохранить', pf_cancel: 'Отмена',
      srv_down_t: '⚙️ Сервер недоступен',
      srv_down_p: 'Не удалось подключиться к серверу. Проверьте, что запущен <code>server.js</code>.',
      pf_create: 'Создай профиль', pf_edit_title: 'Редактировать профиль', pf_title: 'Профиль',
      pr_lessons: 'уроков', pr_wpm: 'слов/мин', pr_quiz: 'тест',
      pr_edit: 'Редактировать профиль', pr_logout: 'Выйти',
      cal_title: 'Активность', cal_days: 'Пн,Вт,Ср,Чт,Пт,Сб,Вс', cal_months: 'янв,фев,мар,апр,май,июн,июл,авг,сен,окт,ноя,дек',
      cal_active: 'дней с занятиями', cal_streak: 'дней подряд', cal_best: 'рекорд серии', cal_none: 'Не занимался', cal_more: 'Больше',
      cal_tip_n: '{0}: действий — {1}', cal_tip_0: '{0}: не занимался',
      cal_note: 'Тёмные клетки — дни, когда вы занимались: отмечали уроки и задания, печатали или проходили тест. Пустые — когда не занимались.',
      code_sent: 'Мы отправили код на <b>{0}</b>. Введите его ниже. Если письма нет — проверьте «Спам».',
      code_label: 'Код из письма', code_confirm: 'Подтвердить',
      code_resend: 'Отправить код ещё раз', code_resend_in: 'Отправить ещё раз через {0} с',
      code_change: 'Изменить почту',
      mail_hint: 'Введите свою почту (например, Gmail) — мы отправим на неё код для входа. Пароль не нужен. Если вы здесь впервые, аккаунт создастся автоматически.',
      mail_label: 'E-mail', mail_get: 'Получить код',
      auth_note: 'Входя, вы сохраняете прогресс в облаке — он будет доступен с любого устройства и из любой страны.',
      code_new_sent: 'Новый код отправлен.',
      bad_email: 'Введите корректный e-mail.',
      bad_code_len: 'Введите код из письма (6 цифр).',

      /* --- подвал --- */
      /* --- чат-бот --- */
      cb_title: 'Помощник ProgForce', cb_open: 'Открыть чат', cb_close: 'Закрыть', cb_clear: 'Очистить чат',
      cb_hello: 'Привет! Я помощник ProgForce. Спрашивайте про C++, Python, задачи из архива или как пользоваться сайтом.',
      cb_placeholder: 'Напишите вопрос…', cb_send: 'Отправить', cb_thinking: 'Думаю…', cb_copy: 'Копировать', cb_copied: 'Скопировано',
      cb_s1: 'Объясни цикл for в Python', cb_s2: 'Чем C++ отличается от Python?', cb_s3: 'Что такое указатели в C++?',
      cb_err: 'Не удалось получить ответ. Попробуйте ещё раз.', cb_err_rate: 'Слишком много запросов. Подождите немного и попробуйте снова.',
      cb_err_nokey: 'Чат-бот ещё не настроен на сервере (нет ANTHROPIC_API_KEY).', cb_err_demo: 'Чат-бот недоступен в демо-режиме — нужен запущенный server.js.',

      footer: 'ProgForce · учись и практикуйся каждый день. Прогресс сохраняется в вашем браузере.'
    },

    en: {
      meta_title: 'ProgForce — learn C++ and Python',
      meta_desc: 'ProgForce is a site for learning programming: C++ and Python lessons, a typing trainer, cheat sheets and a quiz.',
      og_desc: 'C++ and Python lessons, a typing trainer, cheat sheets and a quiz.',
      noscript: 'This site requires JavaScript.',

      nav_home: 'Home', nav_courses: 'Courses', nav_typing: 'Typing', nav_resources: 'Resources',
      nav_quiz: 'Quiz', nav_archive: 'Archive', nav_settings: 'Settings',
      c_archive_t: 'Problem archive', c_archive_p: '90 Codeforces-style problems: statements, examples, tags and difficulty ratings.',
      archive_title: 'Problem archive',
      ar_lead: 'Codeforces-style problems: read the statement, write a solution in Python or C++ (input — stdin, output — stdout), compare with the examples and mark the problem as solved.',
      ar_search: 'Search by title or number', ar_all_ratings: 'Any difficulty', ar_all_tags: 'All tags',
      ar_st_all: 'All', ar_st_solved: 'Solved', ar_st_unsolved: 'Unsolved',
      ar_solved_stat: 'Solved: {0} of {1}', ar_shown: 'Shown: {0}', ar_none: 'Nothing found — change the filters.',
      ar_col_name: 'Title', ar_col_tags: 'Tags', ar_col_rating: 'Difficulty',
      ar_mark: 'Mark as solved ✓', ar_unmark: 'Remove mark', ar_back: '← Back to list', ar_prev: '← Previous problem', ar_next: 'Next problem →',
      ar_input: 'Input', ar_output: 'Output', ar_examples: 'Examples', ar_ex_in: 'Input', ar_ex_out: 'Output', ar_note: 'Note',
      ar_submit: 'Submit solution', ar_lang: 'Language', ar_send: 'Submit', ar_subs: 'My submissions', ar_delete: 'Delete submission', ar_clear_all: 'Delete all', ar_clear_confirm: 'Delete all submissions for this problem?', ar_when: 'Time', ar_verdict: 'Verdict',
      ar_v_ce: 'Compilation error', ar_cpp_fail: 'Could not check C++: the g++ server and online compilers are unreachable. Check your connection and try again.', ar_cpp_busy: 'The server is busy or too many submissions — try again shortly.', ar_v_ok: 'Accepted ✓', ar_v_wa: 'Wrong answer on test {0}', ar_v_re: 'Runtime error on test {0}', ar_v_tle: 'Time limit exceeded on test {0}',
      ar_empty_code: 'Enter your solution code.', ar_testing: 'Testing…', ar_loading_py: 'Loading Python (first time takes a few seconds)…',
      ar_load_fail: 'Could not load Python. Check your connection and try again.', ar_solved_badge: 'Solved', ar_not_found: 'No such problem.',
      ar_hint: 'Python runs right in your browser, C++ is compiled by the site server (if it has g++) or by the online compilers Wandbox/Godbolt; the solution is checked on the examples above (input — stdin, output — stdout). On "Accepted" the problem is marked as solved. Ctrl+Enter submits.', nav_login: 'Log in', nav_logout: 'Log out',
      nav_finish: 'Finish sign-up',
      theme_toggle: 'Toggle theme', menu: 'Menu',
      lang_switch: 'Language', lang_btn: 'EN',

      h_eyebrow: 'Learn to code',
      h_title: 'Learn <span class="grad">C++</span> and <span class="grad">Python</span> step by step',
      h_lead: 'Short lessons with code examples, a typing trainer, resources comparing the languages and a quiz to check your knowledge — all in one place.',
      h_cta_start: 'Start a course', h_cta_typing: 'Typing trainer',
      hero_code: '<span class="t-c"># Your first program</span>\n<span class="t-k">def</span> <span class="t-f">hello</span>(name):\n    <span class="t-k">return</span> <span class="t-s">f"Hello, {name}!"</span>\n\n<span class="t-f">print</span>(<span class="t-f">hello</span>(<span class="t-s">"world"</span>))',
      h_sections: 'Site sections',
      c_courses_t: 'Courses', c_courses_p: '8 Python lessons and 8 C++ lessons with examples.',
      c_typing_t: 'Typing trainer', c_typing_p: 'Type code, symbols and texts. We measure your speed and accuracy.',
      c_res_t: 'Resources', c_res_p: 'Python and C++ syntax compared on a single page.',
      c_quiz_t: 'Quiz', c_quiz_p: 'Check what you remember: questions on Python and C++.',
      c_acc_t: 'Account', c_acc_p: 'Sign up to keep your own progress and records.',
      c_set_t: 'Settings', c_set_p: 'Theme, color, text size and other appearance options.',
      home_hi: ' Hi, <b>{0}</b>! Your progress is saved in your account.',
      home_profile: 'Profile',
      home_guest: 'Log in or sign up to keep your own progress and records.',
      home_stat_lessons: 'lessons completed',
      home_stat_wpm: 'best typing result, words/min',
      home_stat_quiz: 'best quiz result',

      courses_title: 'Courses',
      lesson_of: 'Lesson {0} of {1}',
      task: 'Task:', tasks_h: 'Practice tasks',
      copy: 'Copy', copied: 'Copied ✓',
      prev: '← Back', next: 'Next →',
      mark_done: 'Mark as completed ✓', unmark: 'Remove mark',
      progress_text: '{0} of {1} lessons · {2}%',

      typing_title: 'Typing trainer',
      typing_sub: 'Type fragments of code and text. Click the field below and start — the timer starts with the first character.',
      typing_mode: 'Mode',
      mode_sym: 'Code symbols',
      typing_new: 'Another fragment', typing_reset: 'Start over',
      st_wpm: 'words/min', st_acc: 'accuracy', st_time: 'time', st_prog: 'progress',
      sec: 's',
      typing_field: 'Typing field',
      typing_overlay: 'Click here and start typing',
      typing_hint: 'Indentation after Enter is added automatically. Backspace fixes mistakes. The ↵ symbol is a line break (the Enter key).',
      records: 'Records',
      rec_acc: '{0}% accuracy',
      new_record: '🏆 New record!', done_ok: '✅ Done!',
      another: 'Another fragment', retry: 'Retry this one',
      tl_sym: 'Symbols', tl_en: 'English', tl_ru: 'Русский', tl_tg: 'Тоҷикӣ',

      res_title: 'Resources',
      res_sub: 'Pick a topic to see an explanation and the code in Python and C++.',
      res_what: 'What we do',
      res_back: 'All topics',
      res_diff: 'Key differences',
      py_li: '<li>Blocks are marked by indentation</li><li>Types are detected automatically</li><li>Interpreted: runs right away</li><li>Short code, quick start</li>',
      cpp_li: '<li>Blocks in curly braces { }</li><li>Types are stated explicitly</li><li>Compiled to machine code</li><li>High speed and control over memory</li>',

      quiz_title: 'Quiz',
      quiz_loading: 'Loading the quiz… If this message does not go away, the files Data.js and App.js were not found next to ProgForce.html.',
      quiz_h: 'Test your knowledge',
      quiz_intro: 'The quiz has {0} questions on Python and C++. Choose a topic and the number of questions, then press "Start".',
      quiz_topic: 'Topic:', quiz_all: 'Everything',
      quiz_count: 'Questions:', quiz_every: 'All',
      quiz_best: 'Best result: ',
      quiz_start: 'Start',
      quiz_q: 'Question {0} of {1}', quiz_right: 'Correct: {0}',
      quiz_exit: 'Exit', quiz_exit_title: 'Exit the quiz',
      quiz_ok: '✅ Correct. ', quiz_bad: '❌ Wrong. ',
      quiz_next: 'Next question →', quiz_show: 'Show result',
      quiz_result: 'Result',
      quiz_m100: 'Flawless! 🏆', quiz_m70: 'Great result!', quiz_m40: 'Not bad, but there is something to review.',
      quiz_m0: 'Take a look at the "Courses" section and try again.',
      quiz_again: 'Take it again', quiz_lessons: 'To lessons',

      set_title: 'Settings',
      set_sub: 'Customize how ProgForce looks. Changes apply immediately and are saved in your browser.',
      set_theme_t: 'Theme', set_theme_h: 'Dark or light color scheme of the site.',
      set_dark: '🌙 Dark', set_light: '☀️ Light',
      set_accent_t: 'Accent color', set_accent_h: 'The color of buttons, highlights and progress. Now: {0}.',
      acc_green: 'Green', acc_blue: 'Blue', acc_purple: 'Purple', acc_orange: 'Orange', acc_pink: 'Pink', acc_red: 'Red',
      set_font_t: 'Text size', set_font_h: 'Make the text and interface smaller or larger.',
      set_sm: 'Small', set_md: 'Normal', set_lg: 'Large',
      set_width_t: 'Site width', set_width_h: 'How wide the content of the pages will be.',
      set_w_sm: 'Narrow', set_w_md: 'Normal', set_w_lg: 'Wide',
      set_anim_t: 'Animations', set_anim_h: 'Smooth transitions and page appearance.',
      set_on: 'On', set_off: 'Off',
      set_lang_t: 'Language', set_lang_h: 'Language of the interface, lessons and quiz.',
      acc_teal: 'Teal', acc_cyan: 'Cyan', acc_yellow: 'Yellow', acc_lime: 'Lime', acc_indigo: 'Indigo', acc_coral: 'Coral',
      set_palette_t: 'Background color', set_palette_h: 'Tint of the background and cards for the current theme.',
      pal_default: 'Default', pal_midnight: 'Midnight', pal_dracula: 'Dracula', pal_nord: 'Nord', pal_forest: 'Forest', pal_amoled: 'AMOLED (black)', pal_sepia: 'Sepia', pal_sky: 'Sky', pal_mint: 'Mint', pal_rose: 'Rose',
      set_family_t: 'Font', set_family_h: 'Typeface of the interface.',
      set_f_system: 'System', set_f_serif: 'Serif', set_f_rounded: 'Rounded', set_f_mono: 'Monospace',
      set_lh_t: 'Line spacing', set_lh_h: 'How dense the lines of text are.', set_lh_tight: 'Tight', set_lh_loose: 'Loose',
      set_code_t: 'Code size', set_code_h: 'Font size in code samples and the solution editor.',
      set_radius_t: 'Corner radius', set_radius_h: 'Shape of cards, buttons and fields.', set_r_sharp: 'Sharp', set_r_round: 'Round',
      set_shadow_t: 'Shadows', set_shadow_h: 'Shadows under cards and windows.',
      set_tags_t: 'Archive tags', set_tags_h: 'Show problem tags in the list and in statements.',
      set_reset: 'Reset settings',
      fx_t: 'Effects', fx_h: 'Animations on top of the site. Click a picture to turn it on or off; effects can be combined.',
      fx_snow: 'Snow', fx_rain: 'Rain', fx_stars: 'Stars', fx_matrix: 'Matrix', fx_confetti: 'Confetti', fx_storm: 'Storm', fx_meteors: 'Meteors', fx_embers: 'Embers', fx_leaves: 'Falling leaves', fx_none: 'Turn all off',

      login_title: 'Log in',
      acc_nick_taken: 'This nickname is already taken.',
      acc_nick_rule: 'Nickname: 3–20 characters — letters, digits, _ . -',
      acc_bad_code: 'The code is wrong or expired. Request a new one.',
      acc_rate: 'Too often. Wait a minute and try again.',
      acc_network: 'The server is unavailable. Start server.js (npm start) and open the site at http://localhost:3000 — not by double-clicking the file.',
      acc_error: 'Error: {0}', acc_try_again: 'please try again',
      demo_note: '<p class="auth-hint">🧪 <b>Demo mode:</b> emails are not sent, and login works only in this browser. Sign-in code: <b>{0}</b>. To receive codes by real email, run server.js and set <code>enabled: true</code> in <code>server-config.js</code>.</p>',
      pf_new_ok: '✅ Email confirmed! All that is left is to choose a nickname and an avatar.',
      pf_nick: 'Nickname', pf_nick_ph: 'for example, CodeMaster',
      pf_bio: 'About you (optional)',
      pf_avatar: 'Avatar', pf_color: 'Color', pf_color_aria: 'Color',
      pf_your_nick: 'Your nickname',
      pf_done: 'Done', pf_save: 'Save', pf_cancel: 'Cancel',
      srv_down_t: '⚙️ Server unavailable',
      srv_down_p: 'Could not connect to the server. Check that <code>server.js</code> is running.',
      pf_create: 'Create your profile', pf_edit_title: 'Edit profile', pf_title: 'Profile',
      pr_lessons: 'lessons', pr_wpm: 'words/min', pr_quiz: 'quiz',
      pr_edit: 'Edit profile', pr_logout: 'Log out',
      cal_title: 'Activity', cal_days: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', cal_months: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
      cal_active: 'active days', cal_streak: 'day streak', cal_best: 'best streak', cal_none: 'No activity', cal_more: 'More',
      cal_tip_n: '{0}: {1} actions', cal_tip_0: '{0}: no activity',
      cal_note: 'Colored squares are days you studied: finished lessons or tasks, typed, or took the quiz. Empty squares are days off.',
      code_sent: 'We sent a code to <b>{0}</b>. Enter it below. If there is no email, check "Spam".',
      code_label: 'Code from the email', code_confirm: 'Confirm',
      code_resend: 'Send the code again', code_resend_in: 'Send again in {0} s',
      code_change: 'Change email',
      mail_hint: 'Enter your email (for example, Gmail) — we will send a sign-in code to it. No password needed. If you are here for the first time, an account is created automatically.',
      mail_label: 'E-mail', mail_get: 'Get code',
      auth_note: 'By logging in you save your progress in the cloud — it will be available from any device and any country.',
      code_new_sent: 'A new code has been sent.',
      bad_email: 'Enter a valid e-mail.',
      bad_code_len: 'Enter the code from the email (6 digits).',

      /* --- chatbot --- */
      cb_title: 'ProgForce Assistant', cb_open: 'Open chat', cb_close: 'Close', cb_clear: 'Clear chat',
      cb_hello: 'Hi! I am the ProgForce assistant. Ask me about C++, Python, archive problems or how to use the site.',
      cb_placeholder: 'Type your question…', cb_send: 'Send', cb_thinking: 'Thinking…', cb_copy: 'Copy', cb_copied: 'Copied',
      cb_s1: 'Explain the for loop in Python', cb_s2: 'How is C++ different from Python?', cb_s3: 'What are pointers in C++?',
      cb_err: 'Could not get a reply. Please try again.', cb_err_rate: 'Too many requests. Wait a bit and try again.',
      cb_err_nokey: 'The chatbot is not configured on the server yet (no ANTHROPIC_API_KEY).', cb_err_demo: 'The chatbot is not available in demo mode — run server.js.',

      footer: 'ProgForce · learn and practice every day. Your progress is saved in your browser.'
    },

    tg: {
      /* --- мета --- */
      meta_title: 'ProgForce — омӯзиши C++ ва Python',
      meta_desc: 'ProgForce — сайт барои омӯзиши барномасозӣ: дарсҳо оид ба C++ ва Python, тренажёри клавиатура, шпаргалкаҳо ва тест.',
      og_desc: 'Дарсҳо оид ба C++ ва Python, тренажёри клавиатура, шпаргалкаҳо ва тест.',
      noscript: 'Барои кори сайт JavaScript лозим аст.',

      /* --- сарлавҳа --- */
      nav_home: 'Асосӣ', nav_courses: 'Курсҳо', nav_typing: 'Клавиатура', nav_resources: 'Манбаъҳо',
      nav_quiz: 'Тест', nav_archive: 'Бойгонӣ', nav_settings: 'Танзимот',
      c_archive_t: 'Бойгонии масъалаҳо', c_archive_p: 'Беш аз 90 масъала ба услуби Codeforces: шарт, мисолҳо, барчаспҳо ва дараҷаи мураккабӣ.',
      archive_title: 'Бойгонии масъалаҳо',
      ar_lead: 'Масъалаҳо ба услуби Codeforces: шартро хонед, ҳалро бо Python ё C++ нависед (вуруд — stdin, баромад — stdout), натиҷаро бо мисолҳо муқоиса кунед ва масъаларо ҳалшуда қайд намоед.',
      ar_search: 'Ҷустуҷӯ аз рӯи ном ё рақам', ar_all_ratings: 'Ҳама мураккабӣ', ar_all_tags: 'Ҳамаи барчаспҳо',
      ar_st_all: 'Ҳама', ar_st_solved: 'Ҳалшуда', ar_st_unsolved: 'Ҳалнашуда',
      ar_solved_stat: 'Ҳал шуд: {0} аз {1}', ar_shown: 'Нишон дода шуд: {0}', ar_none: 'Чизе ёфт нашуд — филтрҳоро иваз кунед.',
      ar_col_name: 'Ном', ar_col_tags: 'Барчаспҳо', ar_col_rating: 'Мураккабӣ',
      ar_mark: 'Ҳалшуда қайд кунед ✓', ar_unmark: 'Қайдро бардоред', ar_back: '← Ба рӯйхат', ar_prev: '← Масъалаи қаблӣ', ar_next: 'Масъалаи баъдӣ →',
      ar_input: 'Формати вуруд', ar_output: 'Формати баромад', ar_examples: 'Мисолҳо', ar_ex_in: 'Вуруд', ar_ex_out: 'Баромад', ar_note: 'Эзоҳ',
      ar_submit: 'Ирсоли ҳал', ar_lang: 'Забон', ar_send: 'Фиристодан', ar_subs: 'Ирсолҳои ман', ar_delete: 'Нест кардани ирсол', ar_clear_all: 'Ҳамаро нест кунед', ar_clear_confirm: 'Ҳамаи ирсолҳоро барои ин масъала нест мекунед?', ar_when: 'Вақт', ar_verdict: 'Ҳукм',
      ar_v_ce: 'Хатои компилясия', ar_cpp_fail: 'C++-ро тафтиш карда натавонистем: сервер бо g++ ва компиляторҳои онлайн дастнорасанд. Интернетро санҷед ва бори дигар кӯшиш кунед.', ar_cpp_busy: 'Сервер банд аст ё ирсолҳо аз ҳад зиёданд — каме баъдтар кӯшиш кунед.', ar_v_ok: 'Қабул шуд ✓', ar_v_wa: 'Ҷавоби нодуруст дар тести {0}', ar_v_re: 'Хатои иҷро дар тести {0}', ar_v_tle: 'Вақт дар тести {0} гузашт',
      ar_empty_code: 'Рамзи ҳалро ворид кунед.', ar_testing: 'Санҷида истодааст…', ar_loading_py: 'Python бор мешавад (бори аввал якчанд сония)…',
      ar_load_fail: 'Python-ро бор карда натавонистем. Интернетро санҷед ва бори дигар кӯшиш кунед.', ar_solved_badge: 'Ҳал шуд', ar_not_found: 'Чунин масъала нест.',
      ar_hint: 'Python мустақиман дар браузер иҷро мешавад, C++ дар сервери сайт (агар g++ дошта бошад) ё дар компиляторҳои онлайни Wandbox/Godbolt компилясия мешавад; ҳал аз рӯи мисолҳои боло санҷида мешавад (вуруд — stdin, баромад — stdout). Бо ҳукми «Қабул шуд» масъала ҳалшуда қайд мегардад. Ctrl+Enter — фиристодан.', nav_login: 'Ворид шудан', nav_logout: 'Баромадан',
      nav_finish: 'Анҷоми сабти ном',
      theme_toggle: 'Иваз кардани мавзӯъ', menu: 'Феҳрист',
      lang_switch: 'Забон', lang_btn: 'TJ',

      /* --- асосӣ --- */
      h_eyebrow: 'Барномасозиро омӯз',
      h_title: '<span class="grad">C++</span> ва <span class="grad">Python</span>-ро қадам ба қадам омӯз',
      h_lead: 'Дарсҳои кӯтоҳ бо мисолҳои рамз, тренажёр барои чопи зуд, манбаъҳо бо муқоисаи забонҳо ва тест барои санҷиши донишҳо — ҳама дар як ҷо.',
      h_cta_start: 'Оғози курс', h_cta_typing: 'Тренажёри клавиатура',
      hero_code: '<span class="t-c"># Барномаи аввалини ту</span>\n<span class="t-k">def</span> <span class="t-f">hello</span>(name):\n    <span class="t-k">return</span> <span class="t-s">f"Салом, {name}!"</span>\n\n<span class="t-f">print</span>(<span class="t-f">hello</span>(<span class="t-s">"ҷаҳон"</span>))',
      h_sections: 'Бахшҳои сайт',
      c_courses_t: 'Курсҳо', c_courses_p: '8 дарс оид ба Python ва 8 дарс оид ба C++ бо мисолҳо.',
      c_typing_t: 'Тренажёри клавиатура', c_typing_p: 'Рамз, аломат ва матнҳоро чоп кун. Суръат ва дурустиро ҳисоб мекунем.',
      c_res_t: 'Манбаъҳо', c_res_p: 'Муқоисаи синтаксиси Python ва C++ дар як саҳифа.',
      c_quiz_t: 'Тест', c_quiz_p: 'Санҷ, ки чӣ ба ёд мондааст: саволҳо оид ба Python ва C++.',
      c_acc_t: 'Ҳисоб', c_acc_p: 'Сабти ном шав, то ҳар кас пешрафт ва рекордҳои худро дошта бошад.',
      c_set_t: 'Танзимот', c_set_p: 'Мавзӯъ, ранг, андозаи матн ва дигар параметрҳои намуди сайт.',
      home_hi: ' Салом, <b>{0}</b>! Пешрафти ту дар ҳисоб нигоҳ дошта мешавад.',
      home_profile: 'Профил',
      home_guest: 'Ворид шав ё сабти ном кун, то пешрафт ва рекордҳои худро дошта бошӣ.',
      home_stat_lessons: 'дарс гузашта шуд',
      home_stat_wpm: 'беҳтарин натиҷаи чоп, калима/дақ',
      home_stat_quiz: 'беҳтарин натиҷаи тест',

      /* --- курсҳо --- */
      courses_title: 'Курсҳо',
      lesson_of: 'Дарси {0} аз {1}',
      task: 'Вазифа:', tasks_h: 'Вазифаҳо барои машқ',
      copy: 'Нусха бардоштан', copied: 'Нусха шуд ✓',
      prev: '← Қафо', next: 'Пеш →',
      mark_done: 'Гузашта қайд кунед ✓', unmark: 'Қайдро бардоред',
      progress_text: '{0} аз {1} дарс · {2}%',

      /* --- клавиатура --- */
      typing_title: 'Тренажёри клавиатура',
      typing_sub: 'Порчаҳои рамз ва матнро чоп кун. Ба майдони поён пахш кун ва оғоз намо — таймер аз аввалин аломат оғоз мешавад.',
      typing_mode: 'Реҷа',
      mode_sym: 'Аломатҳои рамз',
      typing_new: 'Порчаи дигар', typing_reset: 'Аз нав оғоз кардан',
      st_wpm: 'калима/дақ', st_acc: 'дурустӣ', st_time: 'вақт', st_prog: 'пешрафт',
      sec: 'сон',
      typing_field: 'Майдони чоп',
      typing_overlay: 'Инҷо пахш кунед ва чоп карданро оғоз намоед',
      typing_hint: 'Фосилаҳо пас аз Enter худкор гузошта мешаванд. Backspace хатоҳоро ислоҳ мекунад. Аломати ↵ — гузариш ба сатри нав (тугмаи Enter).',
      records: 'Рекордҳо',
      rec_acc: '{0}% дурустӣ',
      new_record: '🏆 Рекорди нав!', done_ok: '✅ Тайёр!',
      another: 'Порчаи дигар', retry: 'Ин порчаро такрор кардан',
      tl_sym: 'Аломатҳо', tl_en: 'English', tl_ru: 'Русский', tl_tg: 'Тоҷикӣ',

      /* --- манбаъҳо --- */
      res_title: 'Манбаъҳо',
      res_sub: 'Мавзӯъро интихоб кун — шарҳ ва рамз бо Python ва C++ кушода мешавад.',
      res_what: 'Чӣ мекунем',
      res_back: 'Ҳама мавзӯъҳо',
      res_diff: 'Фарқиятҳои асосӣ',
      py_li: '<li>Блокҳо бо фосила ҷудо мешаванд</li><li>Навъҳо худкор муайян мешаванд</li><li>Тафсиршаванда: фавран иҷро мешавад</li><li>Рамзи кӯтоҳ, оғози зуд</li>',
      cpp_li: '<li>Блокҳо дар қавсҳои фигуравӣ { }</li><li>Навъҳо ошкоро нишон дода мешаванд</li><li>Ба рамзи мошинӣ компилясия мешавад</li><li>Суръати баланд ва назорат болои хотира</li>',

      /* --- тест --- */
      quiz_title: 'Тест',
      quiz_loading: 'Тест бор мешавад… Агар ин навишта нопадид нашавад, файлҳои Data.js ва App.js дар назди ProgForce.html ёфт нашуданд.',
      quiz_h: 'Донишҳои худро санҷ',
      quiz_intro: 'Дар тест {0} савол оид ба Python ва C++ ҳаст. Мавзӯъ ва шумораи саволҳоро интихоб кун, сипас «Оғоз» -ро пахш намо.',
      quiz_topic: 'Мавзӯъ:', quiz_all: 'Ҳама якҷоя',
      quiz_count: 'Саволҳо:', quiz_every: 'Ҳама',
      quiz_best: 'Беҳтарин натиҷа: ',
      quiz_start: 'Оғоз',
      quiz_q: 'Саволи {0} аз {1}', quiz_right: 'Дуруст: {0}',
      quiz_exit: 'Баромадан', quiz_exit_title: 'Аз тест баромадан',
      quiz_ok: '✅ Дуруст. ', quiz_bad: '❌ Нодуруст. ',
      quiz_next: 'Саволи навбатӣ →', quiz_show: 'Нишон додани натиҷа',
      quiz_result: 'Натиҷа',
      quiz_m100: 'Бенуқсон! 🏆', quiz_m70: 'Натиҷаи аъло!', quiz_m40: 'Бад нест, аммо чизе барои такрор ҳаст.',
      quiz_m0: 'Ба бахши «Курсҳо» нигоҳ кун ва бори дигар кӯшиш намо.',
      quiz_again: 'Бори дигар гузаштан', quiz_lessons: 'Ба дарсҳо',

      /* --- танзимот --- */
      set_title: 'Танзимот',
      set_sub: 'Намуди ProgForce-ро мувофиқи худ танзим кунед. Тағйирот фавран татбиқ мешавад ва дар браузери шумо нигоҳ дошта мешавад.',
      set_theme_t: 'Мавзӯъ', set_theme_h: 'Нақшаи рангҳои торик ё равшани сайт.',
      set_dark: '🌙 Торик', set_light: '☀️ Равшан',
      set_accent_t: 'Ранги асосӣ', set_accent_h: 'Ранги тугмаҳо, таъкид ва пешрафт. Ҳоло: {0}.',
      acc_green: 'Сабз', acc_blue: 'Кабуд', acc_purple: 'Бунафш', acc_orange: 'Норинҷӣ', acc_pink: 'Гулобӣ', acc_red: 'Сурх',
      set_font_t: 'Андозаи матн', set_font_h: 'Матн ва интерфейсро хурдтар ё калонтар кунед.',
      set_sm: 'Хурд', set_md: 'Одатӣ', set_lg: 'Калон',
      set_width_t: 'Паҳнои сайт', set_width_h: 'Мундариҷаи саҳифаҳо чӣ қадар васеъ бошад.',
      set_w_sm: 'Танг', set_w_md: 'Одатӣ', set_w_lg: 'Васеъ',
      set_anim_t: 'Аниматсияҳо', set_anim_h: 'Гузаришҳои ҳамвор ва пайдошавии саҳифаҳо.',
      set_on: 'Фаъол', set_off: 'Ғайрифаъол',
      set_lang_t: 'Забон', set_lang_h: 'Забони интерфейс. Дарсҳо ва тест бо русӣ ё англисӣ боқӣ мемонанд.',
      acc_teal: 'Феруза', acc_cyan: 'Осмонӣ', acc_yellow: 'Зард', acc_lime: 'Лаймӣ', acc_indigo: 'Индиго', acc_coral: 'Марҷонӣ',
      set_palette_t: 'Ранги замина', set_palette_h: 'Нимранги замина ва корт барои мавзӯи интихобшуда.',
      pal_default: 'Стандартӣ', pal_midnight: 'Нимашаб', pal_dracula: 'Дракула', pal_nord: 'Норд', pal_forest: 'Ҷангал', pal_amoled: 'AMOLED (сиёҳ)', pal_sepia: 'Сепия', pal_sky: 'Осмон', pal_mint: 'Пудина', pal_rose: 'Гул',
      set_family_t: 'Ҳуруф', set_family_h: 'Тарҳи ҳуруфи интерфейс.',
      set_f_system: 'Низомӣ', set_f_serif: 'Бо пойча', set_f_rounded: 'Мудаввар', set_f_mono: 'Яккаарзӣ',
      set_lh_t: 'Фосилаи байни сатрҳо', set_lh_h: 'Зичии сатрҳои матн.', set_lh_tight: 'Зич', set_lh_loose: 'Озод',
      set_code_t: 'Андозаи рамз', set_code_h: 'Андозаи ҳуруф дар мисолҳои рамз ва муҳаррири ҳалҳо.',
      set_radius_t: 'Мудаввар кардани гӯшаҳо', set_radius_h: 'Шакли кортҳо, тугмаҳо ва майдонҳо.', set_r_sharp: 'Тез', set_r_round: 'Мудаввар',
      set_shadow_t: 'Сояҳо', set_shadow_h: 'Сояҳо дар зери кортҳо ва равзанаҳо.',
      set_tags_t: 'Барчаспҳо дар бойгонӣ', set_tags_h: 'Барчаспҳои масъалаҳоро дар рӯйхат ва шарт нишон диҳед.',
      set_reset: 'Бозсозии танзимот',

      fx_t: 'Эффектҳо', fx_h: 'Аниматсияҳо болои сайт. Барои фаъол ё хомӯш кардан ба расм пахш кунед; эффектҳоро якҷоя кардан мумкин аст.',
      fx_snow: 'Барф', fx_rain: 'Борон', fx_stars: 'Ситораҳо', fx_matrix: 'Матритса', fx_confetti: 'Конфетти', fx_storm: 'Раъду барқ', fx_meteors: 'Метеорҳо', fx_embers: 'Шарораҳо', fx_leaves: 'Баргрезон', fx_none: 'Ҳамаро хомӯш кардан',

      /* --- ҳисоб --- */
      login_title: 'Ворид шудан',
      acc_nick_taken: 'Ин лақаб аллакай банд аст.',
      acc_nick_rule: 'Лақаб: 3–20 аломат — ҳарфҳо, рақамҳо, _ . -',
      acc_bad_code: 'Рамз нодуруст ё мӯҳлаташ гузаштааст. Рамзи наверо дархост кунед.',
      acc_rate: 'Аз ҳад зуд. Як дақиқа интизор шавед ва такрор кунед.',
      acc_network: 'Сервер дастнорас аст. server.js-ро оғоз кунед (npm start) ва сайтро ба суроғаи http://localhost:3000 кушоед — на бо дукарата пахш кардани файл.',
      acc_error: 'Хато: {0}', acc_try_again: 'бори дигар кӯшиш кунед',
      demo_note: '<p class="auth-hint">🧪 <b>Реҷаи намоишӣ:</b> номаҳо фиристода намешаванд, воридшавӣ танҳо дар ҳамин браузер кор мекунад. Рамзи воридшавӣ: <b>{0}</b>. Барои гирифтани рамзҳо ба почтаи воқеӣ, server.js-ро оғоз кунед ва дар <code>server-config.js</code> <code>enabled: true</code> гузоред.</p>',
      pf_new_ok: '✅ Почта тасдиқ шуд! Боқӣ мондааст лақаб ва аватар интихоб кунед.',
      pf_nick: 'Лақаб', pf_nick_ph: 'масалан, CodeMaster',
      pf_bio: 'Дар бораи худ (ихтиёрӣ)',
      pf_avatar: 'Аватар', pf_color: 'Ранг', pf_color_aria: 'Ранг',
      pf_your_nick: 'Лақаби ту',
      pf_done: 'Тайёр', pf_save: 'Захира кардан', pf_cancel: 'Бекор кардан',
      srv_down_t: '⚙️ Сервер дастнорас аст',
      srv_down_p: 'Ба сервер пайваст шуда натавонистем. Санҷед, ки <code>server.js</code> оғоз шудааст.',
      pf_create: 'Профили худро созед', pf_edit_title: 'Таҳрири профил', pf_title: 'Профил',
      pr_lessons: 'дарс', pr_wpm: 'калима/дақ', pr_quiz: 'тест',
      pr_edit: 'Таҳрири профил', pr_logout: 'Баромадан',
      cal_title: 'Фаъолият', cal_days: 'Дш,Сш,Чш,Пш,Ҷм,Шн,Яш', cal_months: 'янв,фев,мар,апр,май,июн,июл,авг,сен,окт,ноя,дек',
      cal_active: 'рӯзҳои машғулият', cal_streak: 'рӯз пай дар пай', cal_best: 'рекорди силсила', cal_none: 'Машғул нашудам', cal_more: 'Бештар',
      cal_tip_n: '{0}: амалҳо — {1}', cal_tip_0: '{0}: машғул нашудам',
      cal_note: 'Хонаҳои рангин — рӯзҳое, ки шумо машғул будед. Хонаҳои холӣ — рӯзҳое, ки машғул набудед.',
      code_sent: 'Мо ба <b>{0}</b> рамз фиристодем. Онро дар поён ворид кунед. Агар нома нест — «Спам»-ро санҷед.',
      code_label: 'Рамз аз нома', code_confirm: 'Тасдиқ кардан',
      code_resend: 'Рамзро бори дигар фиристодан', code_resend_in: 'Пас аз {0} сон бори дигар фиристед',
      code_change: 'Иваз кардани почта',
      mail_hint: 'Почтаи худро ворид кунед (масалан, Gmail) — мо ба он рамзи воридшавӣ мефиристем. Парол лозим нест. Агар шумо бори аввал инҷо бошед, ҳисоб худкор сохта мешавад.',
      mail_label: 'E-mail', mail_get: 'Гирифтани рамз',
      auth_note: 'Бо воридшавӣ шумо пешрафтро дар абр нигоҳ медоред — он аз ҳар дастгоҳ ва ҳар кишвар дастрас мешавад.',
      code_new_sent: 'Рамзи нав фиристода шуд.',
      bad_email: 'E-mail-и дурустро ворид кунед.',
      bad_code_len: 'Рамзро аз нома ворид кунед (6 рақам).',

      footer: 'ProgForce · ҳар рӯз омӯз ва машқ кун. Пешрафт дар браузери шумо нигоҳ дошта мешавад.'

    }
  };

  /* --- выбор языка при первом заходе: сохранённый → язык браузера → русский --- */
  function detect() {
    try { const s = localStorage.getItem(LS_KEY); if (s && STR[s]) return s; } catch (e) { /* ignore */ }
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'ru';
    const code = String(nav).slice(0, 2).toLowerCase();
    return STR[code] ? code : 'ru';
  }

  let lang = detect();
  const listeners = [];

  function t(key) {
    let s = (STR[lang] && STR[lang][key]);
    if (s == null) s = STR.ru[key];
    if (s == null) return key;
    for (let i = 1; i < arguments.length; i++) s = s.split('{' + (i - 1) + '}').join(arguments[i]);
    return s;
  }

  /* Подставляет переводы во все помеченные элементы страницы */
  function apply() {
    document.documentElement.lang = lang;
    document.title = t('meta_title');
    const setMeta = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
    setMeta('meta[name="description"]', 'content', t('meta_desc'));
    setMeta('meta[property="og:title"]', 'content', t('meta_title'));
    setMeta('meta[property="og:description"]', 'content', t('og_desc'));
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const i = pair.indexOf(':');
        if (i > 0) el.setAttribute(pair.slice(0, i).trim(), t(pair.slice(i + 1).trim()));
      });
    });
  }

  function set(l) {
    if (!STR[l] || l === lang) return;
    lang = l;
    try { localStorage.setItem(LS_KEY, l); } catch (e) { /* ignore */ }
    apply();
    listeners.forEach(cb => cb(l));
  }

  window.I18N = {
    LANGS, t,
    get lang() { return lang; },
    set, apply,
    onChange: cb => listeners.push(cb)
  };
})();
