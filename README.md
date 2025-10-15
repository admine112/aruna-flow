# 🧘 Aruna Flow - Yoga Studio Website

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/aruna-flow-yoga)

## 📝 Краткое описание

**Aruna Flow** - это современный веб-сайт студии йоги с полным функционалом бронирования занятий, интеграцией с Telegram и двуязычным интерфейсом (украинский/английский).

### Ключевые возможности:
- 🌍 **Двуязычность** - полная поддержка украинского и английского языков
- 📅 **Расписание занятий** - запланированные занятия с датами, временем и ценами
- 🎯 **Умное бронирование** - автозаполнение форм при выборе занятия/инструктора
- 📱 **Telegram интеграция** - автоматические уведомления о заявках
- ✨ **Модальные окна** - детальная информация о занятиях и инструкторах
- 📊 **Отслеживание доступности** - показ свободных мест в реальном времени
- 📄 **Страница подтверждения** - детали заказа после успешного бронирования
- 🎨 **Современный дизайн** - адаптивный интерфейс с плавными анимациями

### Основной функционал:
1. **Главная страница** - презентация студии, преимущества, отзывы
2. **Расписание** - список занятий с фильтрацией и бронированием
3. **О студии** - философия, инструкторы, ценности
4. **Контакты** - формы бронирования, обратного звонка, подписки, чат
5. **Подтверждение заказа** - страница с деталями бронирования

## 🚀 Quick Deploy

**[See QUICK_START.md](./QUICK_START.md)** for 5-minute deployment guide!

## 📸 Preview

- **Live Demo:** Coming soon after your deployment!
- **Telegram Bot:** @Obsidian2580Bot

## ✨ Детальные возможности

### 🌐 Многоязычность
- Переключение между украинским и английским в реальном времени
- Все тексты, формы, кнопки, модальные окна переведены
- Сохранение выбранного языка

### 📅 Система расписания
- **Запланированные занятия** с конкретными датами и временем
- Фильтрация по типу: Йога, Медитация, Стретчинг
- Отображение доступности мест:
  - 🟢 Много мест (>3)
  - 🟠 Мало мест (≤3) - "Поспешите!"
  - 🔴 Нет мест - кнопка заблокирована
- Цены для каждого занятия
- Информация об инструкторе и длительности

### 🎯 Умное бронирование
- **Автозаполнение формы** при выборе:
  - Запланированного занятия → заполняются все поля
  - Обычного занятия → заполняется тип занятия
  - Инструктора → заполняется только инструктор
- Выбор даты (текстовое поле с примерами)
- Выбор времени (dropdown 06:00-21:00)
- Валидация полей
- Статусы отправки (отправка/успех/ошибка)

### 📱 Telegram интеграция
- **Автоматические уведомления** о:
  - Бронировании занятий
  - Запросах на обратный звонок
  - Подписках на новости
  - Сообщениях из чата
- Форматированные сообщения с эмодзи
- Полная информация о клиенте и выбранном занятии

### 🎨 Интерфейс
- **Модальные окна** для:
  - Детальной информации о занятиях
  - Профилей инструкторов
  - Запланированных занятий
- **Анимации** при прокрутке
- **Адаптивный дизайн** для всех устройств
- **Плавные переходы** между страницами

### 📄 Дополнительные формы
- Форма обратного звонка
- Подписка на новости
- Мини-чат с администратором
- Карта Google Maps с локацией студии

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **Vercel Functions** / **Netlify Functions** - Serverless API for Telegram

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server (frontend only, mock Telegram)
npm run dev

# Run API server for Telegram (in separate terminal)
npm run dev:api

# Build for production
npm run build

# Type checking
npm run typecheck
```

### Development Mode

For full functionality with real Telegram integration in development:

1. **Terminal 1** - Run API server:
   ```bash
   npm run dev:api
   ```
   This starts Express server on http://localhost:3001

2. **Terminal 2** - Run Vite dev server:
   ```bash
   npm run dev
   ```
   This starts frontend on http://localhost:5173

Now all forms will send real messages to Telegram!

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy - Vercel will automatically detect the configuration

The site is configured with `vercel.json` for proper routing and CORS headers.

### Deploy to Netlify

1. Push your code to GitHub
2. Import the project in Netlify
3. Deploy - Netlify will use the `netlify.toml` configuration

Both platforms support the serverless function at `/api/send-telegram.ts` out of the box.

## Telegram Bot Configuration

The Telegram bot is pre-configured with:
- Bot Token: `8149651558:AAEcCMGUzcEDULbcGHbk0lCMhk_S51GUBJo`
- Chat ID: `8149651558`

All form submissions (booking, callback, newsletter, chat) will send formatted messages to the configured Telegram chat.

**Note:** In development mode (`npm run dev`), forms will work in mock mode and log data to console instead of sending to Telegram. Real Telegram integration works only in production (Vercel/Netlify).

## 📁 Структура проекта

```
project/
├── src/
│   ├── components/              # Переиспользуемые компоненты
│   │   ├── Header.tsx           # Шапка с навигацией и переключателем языка
│   │   ├── Modal.tsx            # Базовый модальный компонент
│   │   ├── ClassModal.tsx       # Модальное окно типа занятия
│   │   ├── InstructorModal.tsx  # Модальное окно инструктора
│   │   └── ScheduledClassModal.tsx  # Модальное окно запланированного занятия
│   │
│   ├── pages/                   # Страницы приложения
│   │   ├── Home.tsx             # Главная (Hero, Benefits, Testimonials)
│   │   ├── Schedule.tsx         # Расписание с фильтрацией
│   │   ├── About.tsx            # О студии (Philosophy, Teachers, Values)
│   │   ├── Contacts.tsx         # Формы и контакты
│   │   └── OrderConfirmation.tsx  # Подтверждение заказа
│   │
│   ├── data/                    # Данные приложения
│   │   ├── instructors.ts       # 3 инструктора (двуязычные данные)
│   │   ├── classes.ts           # 6 типов занятий (двуязычные)
│   │   └── schedule.ts          # 14 запланированных занятий
│   │
│   ├── context/
│   │   └── LanguageContext.tsx  # Контекст языка (uk/en)
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.tsx  # Анимации при прокрутке
│   │
│   ├── i18n/
│   │   └── translations.ts      # Все переводы (uk/en)
│   │
│   ├── utils/
│   │   └── api.ts               # API функции для Telegram
│   │
│   ├── App.tsx                  # Главный компонент с роутингом
│   ├── main.tsx                 # Точка входа
│   └── index.css                # Глобальные стили и анимации
│
├── api/
│   └── send-telegram.ts         # Serverless функция для Telegram
│
├── public/
│   └── aruna logo.png           # Логотип студии
│
├── server.js                    # Node.js сервер для dev режима
├── PROJECT_OVERVIEW.md          # Детальная документация
└── README.md                    # Этот файл
```

## 🔄 Поток данных при бронировании

### Сценарий 1: Бронирование запланированного занятия
```
1. Пользователь → Страница "Расписание"
2. Клик на занятие → Открывается ScheduledClassModal
3. Просмотр деталей (дата, время, инструктор, цена, места)
4. Клик "Забронювати місце" → Сохранение ID в localStorage
5. Переход на страницу "Контакты"
6. Автозаполнение формы:
   - Інструктор: автоматически
   - Заняття: автоматически
   - Дата: автоматически (форматированная)
   - Час: автоматически
7. Пользователь заполняет: Ім'я, Email, Телефон, Коментар
8. Отправка формы → server.js → Telegram Bot API
9. Сохранение данных заказа в localStorage
10. Переход на OrderConfirmation
11. Отображение деталей заказа + "Очікуйте дзвінка"
```

### Сценарий 2: Выбор инструктора
```
1. Страница "О студии" → Клик на инструктора
2. Открывается InstructorModal (образование, опыт, методология)
3. Клик "Записатися на заняття" → Сохранение ID
4. Переход на "Контакты"
5. Автозаполнение: только поле "Інструктор"
6. Пользователь выбирает остальное вручную
```

### Сценарий 3: Выбор типа занятия
```
1. Клик на занятие (не запланированное)
2. Открывается ClassModal (описание, польза, что взять)
3. Клик "Записатися" → Сохранение ID
4. Автозаполнение: поле "Заняття"
```

## 📄 Детализация страниц

### 🏠 Главная (Home)
- **Hero секция**: заголовок, подзаголовок, кнопка "Записатися зараз"
- **Преимущества**: 4 карточки (Професійні тренери, Простір, Графік, Підхід)
- **Отзывы**: 3 карточки учеников
- **Анимации**: fadeIn при прокрутке

### 📅 Расписание (Schedule)
- **Фильтры**: Всі, Йога, Медитація, Стретчинг
- **14 занятий**: с датами 21-25 октября 2024
- **Карточки**: дата, время, название, инструктор, цена, места
- **Статусы доступности**: цветовая индикация
- **Модальные окна**: детальная информация + бронирование

### 👥 О студии (About)
- **Философия**: текст о миссии студии
- **Инструкторы**: 3 карточки (Марія, Андрій, Олена)
- **Ценности**: 4 карточки (Гармонія, Усвідомленість, Турбота, Розвиток)
- **Модальные окна**: полная информация об инструкторах

### 📞 Контакты (Contacts)
- **Форма бронирования**: 8 полей (ім'я, email, телефон, інструктор, заняття, дата, час, коментар)
- **Форма обратного звонка**: ім'я, телефон, коментар
- **Подписка**: email
- **Мини-чат**: интерфейс чата с предупреждением
- **Карта**: Google Maps с локацией
- **Контакты**: адрес, телефон, email, часы работы

### ✅ Подтверждение (OrderConfirmation)
- **Заголовок**: "Замовлення прийнято!"
- **Детали клиента**: имя, email, телефон
- **Детали занятия**: название, дата, время, инструктор, цена
- **Бажаний час**: выбранная дата и время
- **Следующие шаги**: 3 пункта с иконками
- **Призыв**: "Очікуйте дзвінка спеціаліста"

## Customization

### Colors
The design uses a warm, calming color palette:
- Primary: Amber (amber-400 to amber-600)
- Accent: Rose (rose-50 to rose-300)
- Neutral: Stone (stone-50 to stone-800)

### Fonts
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

### Animations
Custom animations defined in `index.css`:
- `fadeIn` - Fade in with upward motion
- `scaleIn` - Scale up from center
- `slideInLeft` - Slide from left
- `slideInRight` - Slide from right

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is created for Aruna Flow Yoga Studio.

## Contact

For questions or support, contact the Aruna Flow team through the website forms or Telegram.
