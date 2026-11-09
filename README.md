# LumiCalc — Лабораторная работа №5

Фронтенд по теме «Расчёт освещённости помещения светодиодными лампами».
Каталог светильников и вертикальная лента. Поля по теме: мощность `powerWatt`
и угол рассеивания `beamAngleDeg`. Фильтрация — по мощности.

**Ветка:** `lighting-equipment-lab5`.
**Фронтенд:** https://github.com/Renegade19/rip-lighting-equipment-frontend
**Бэкенд ЛР1–4:** https://github.com/Renegade19/rip-lighting-equipment

## Запуск

Нужен Node.js 22.18+ (проверено на 26.13.0) и npm.

```bash
npm ci
npm run dev
```

Открыть http://127.0.0.1:5173/lighting-equipment.
Go, PostgreSQL, MinIO и Redis запускать не требуется. Все данные берутся
из `src/mocks/lightingEquipmentMock.ts`, изображения и видео — из `public/media`.
Приложение не отправляет HTTP-запросов к API. Vite отдаёт только статику,
модули разработки и своё HMR-соединение.

```bash
npm run build       # TypeScript и production-сборка
npm run preview     # просмотр dist на http://127.0.0.1:4173
npm test            # четыре теста фильтрации, статусов, id и порядка ленты
```

Альтернативный запуск: `docker compose up --build`. Он поднимает только фронтенд
на `127.0.0.1:5173`. Bind-mount нужен для изменений кода; Docker не обязателен.

## Две страницы и четыре пункта меню

| Пункт | URL / действие | Состояние в ЛР5 |
|---|---|---|
| Лента | `/lighting-equipment/feed` — первый светильник из результата фильтра | Доступна |
| Добавление | Нет перехода | Недоступно |
| Плитка | `/lighting-equipment` | Доступна |
| Вход | Нет перехода | Недоступно |

Других рабочих страниц, формы добавления и авторизации в ЛР5 нет.
Неизвестный URL показывает сообщение с возвратом к плитке. Прямые ссылки
на черновик №6 или удалённый светильник №5 не раскрывают их данные.

### Плитка

Две колонки карточек. У карточки есть изображение, название, мощность и число
лайков, вычисленное по массиву `likedUserIds`. Ползунки «от» и «до» задают
границы мощности от 0 до 10 Вт с шагом 0,1 Вт. Кнопка «Применить» фильтрует
mock на клиенте, обе границы включены. Счётчик показывает количество результатов.
Если ничего не найдено, выводится понятное сообщение. Клик по карточке
открывает `/lighting-equipment/feed/:equipmentId` этой модели.

### Лента

Видео запускается без звука, автоматически и по кругу (`autoPlay`, `muted`,
`loop`, `playsInline`). Поверх видео расположены название, краткое описание,
мощность, угол, лайки и кнопка «Далее». «Больше» / «Меньше» раскрывает описание.
«Далее» следует порядку текущего отфильтрованного списка: например, для
4,5–10 Вт последовательность 1 → 4 → 7. После последней карточки кнопка
недоступна, как в методичке ЛР5. Лайки отображаются без возможности изменения.

Открытие `/lighting-equipment/feed/7` и обновление страницы работают напрямую.
При возврате к плитке через меню или «Назад» применённый диапазон сохраняется
в состоянии родительского компонента. После F5 состояние сбрасывается —
сохранения в localStorage и Redux в ЛР5 нет.

## Данные и медиа по умолчанию

Пять опубликованных моделей: №1, 2, 3, 4, 7. №5 удалён, №6 — черновик.
Модели и фотографии перенесены из проекта ЛР1; у №7 намеренно пустые поля
`imageUrl` и `videoUrl` для демонстрации подстановки. У №2–4 также нет видео.

- `LightingEquipmentImage` подставляет `/media/default-lighting-equipment.svg`
  при пустом `imageUrl`, а также при ошибке загрузки исходного изображения.
- `LightingEquipmentVideo` подставляет `/media/default-lighting-video.mp4`
  при пустом `videoUrl` или ошибке загрузки исходного видео.
- На ленте с заменой есть подпись «Демонстрационное видео».
- Для показа заглушки в плитке применить диапазон 8–10 Вт, затем открыть №7.

По согласованию оставлено существующее видео `smart-matter-classic-a.mp4`.
Для фронтенда сделан локальный 10-секундный фрагмент; для видео по умолчанию —
4-секундный фрагмент того же файла. Видео не изображает конкретную модель
светильника и служит демонстрацией воспроизведения. Внешних видеохостингов нет.

## Компоненты и передача props

```text
src/
  LightingEquipmentApp.tsx          # маршруты и общее состояние фильтра
  types/lightingEquipment.ts         # типы светильника и диапазона
  mocks/lightingEquipmentMock.ts     # единственный источник данных
  modules/lightingEquipmentRepository.ts  # фильтр, id, порядок «Далее»
  hooks/useLightingEquipment.ts      # асинхронное чтение mock и cleanup
  components/
    LightingEquipmentPowerFilter.tsx # ползунки и callback через props
    LightingEquipmentCard.tsx        # карточка и переход в ленту
    LightingEquipmentImage.tsx       # фото и fallback
    LightingEquipmentVideo.tsx       # видео и fallback
    LightingEquipmentNavigation.tsx  # 4 пункта, 2 недоступны
    LightingEquipmentIcon.tsx        # SVG-иконки
  pages/
    LightingEquipmentTilePage.tsx
    LightingEquipmentFeedPage.tsx
  lighting-equipment.css
```

`LightingEquipmentLayout` хранит применённый `powerFilter` через `useState`.
Передаёт его и `setPowerFilter` в `LightingEquipmentTilePage`, затем
в `LightingEquipmentPowerFilter` как `powerFilter` и `onApplyLightingEquipmentPower`.
У фильтра есть локальные состояния ползунков; при submit вызывается callback.
`useLightingEquipment` читает mock и отдаёт общий результат обеим страницам.
React Context, Outlet context и Redux в исходном коде приложения не используются.

## Все используемые хуки

| Хук | Где | Назначение |
|---|---|---|
| `useState` | Layout, фильтр, media, лента, useLightingEquipment | Диапазон, список, загрузка, ошибки медиа, раскрытие описания |
| `useEffect` | useLightingEquipment | Чтение mock при смене фильтра, cleanup от старого запроса |
| `useEffect` | Обе страницы | Обновление заголовка документа |
| `useLocation` | Layout | Светлая/тёмная оболочка по маршруту |
| `useParams` | Лента | Идентификатор выбранного светильника |
| `useNavigate` | Содержимое ленты | Переход «Далее» без перезагрузки |

В StrictMode эффект разработки может выполнить цикл setup → cleanup → setup.
Флаг `isCurrentLightingEquipmentRequest` защищает от устаревшего результата.
Смена id перемонтирует содержимое ленты через `key`, сбрасывая описание и fallback.

## Дизайн

Сохранён мобильный макет ЛР1 шириной до 420 px. Основной фон белый `#ffffff`,
текст `#201f27`, карточки светло-серые `#e3e3e5`, кнопки и активная вкладка
оранжевые `#f66300`, hover `#cc4902`. Навигация на плитке `#f5f5f5`, на ленте
`#201f27`. Используются React-Bootstrap: Form, Range, Button, Card, Navbar,
Nav, Alert и Spinner. Адаптивная многоколоночная версия и PWA относятся к ЛР7.

Референс ЛР1: https://www.figma.com/design/4K5rICTM65jP6Hur1rlF0E/Untitled?node-id=2-6

## Соответствие ТЗ и защита

Приоритет отдан конкретному заданию ЛР5 в README курса: две страницы гостя,
только mock, четыре пункта меню. Общий заголовок «три страницы и API» и раздел
методички про API относятся к дальнейшему развитию. Интеграция API, авторизация,
Axios и Redux Toolkit оставлены для ЛР6; Context не используется.

1. Показать плитку и ленту с открытым Network: только файлы фронтенда.
2. Показать №7 с изображением и видео по умолчанию, соответствующие компоненты.
3. Применить 4,5–10 Вт, объяснить props фильтра и результат 1 → 4 → 7.
4. Показать useState, useEffect и cleanup, хуки роутера, недоступные пункты меню.
5. Показать README, ответы на вопросы и одностраничный расчёт требований.

Документы и иллюстрации защиты находятся в `docs/`.

## Источники

- ТЗ: https://github.com/iu5git/Web#лабораторная-5
- Методичка: https://github.com/iu5git/Web/blob/main/tutorials/lab5/README.md
- React: https://react.dev/reference/react
- React Router: https://reactrouter.com/start/declarative/routing
- React-Bootstrap: https://react-bootstrap.github.io/docs/getting-started/introduction
- Vite: https://vite.dev/guide/
