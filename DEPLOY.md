# 🚀 Инструкция по деплою на Vercel

## Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Название: `aruna-flow-yoga` (или любое другое)
3. **НЕ** добавляйте README, .gitignore или лицензию
4. Нажмите "Create repository"

## Шаг 2: Загрузите код на GitHub

Замените `YOUR_USERNAME` на ваш GitHub username:

```bash
cd /home/linuxuser/Загрузки/yoga/project
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aruna-flow-yoga.git
git push -u origin main
```

## Шаг 3: Деплой на Vercel

### Вариант A: Через веб-интерфейс

1. Перейдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите "Add New..." → "Project"
4. Выберите репозиторий `aruna-flow-yoga`
5. Настройки будут определены автоматически из `vercel.json`
6. Нажмите "Deploy"

### Вариант B: Через CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в аккаунт
vercel login

# Деплой
vercel --prod
```

## Шаг 4: Проверка

После деплоя:
- ✅ Сайт будет доступен по адресу типа `aruna-flow-yoga.vercel.app`
- ✅ Все формы будут отправлять сообщения в Telegram
- ✅ API функция `/api/send-telegram` будет работать автоматически

## Настройки Telegram (уже настроено)

- Bot Token: `8149651558:AAEcCMGUzcEDULbcGHbk0lCMhk_S51GUBJo`
- Chat ID: `8149651558`
- Bot: @Obsidian2580Bot

Все сообщения с форм будут приходить в этот бот.

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск frontend
npm run dev

# Запуск API сервера (в отдельном терминале)
npm run dev:api
```

## Структура проекта

```
/api/send-telegram.ts    - Serverless функция для Vercel
/server.js               - Локальный dev сервер (только для разработки)
/src/utils/api.ts        - Автоматически переключается между dev и prod
```

## Troubleshooting

### Формы не работают локально
- Убедитесь, что запущен API сервер: `npm run dev:api`
- Проверьте, что порт 3001 свободен

### Формы не работают на Vercel
- Проверьте логи в Vercel Dashboard
- Убедитесь, что файл `/api/send-telegram.ts` задеплоен
- Проверьте, что Telegram токен корректный

## Дополнительно

### Кастомный домен
1. В Vercel Dashboard → Settings → Domains
2. Добавьте свой домен
3. Настройте DNS записи

### Переменные окружения (опционально)
Если хотите вынести токены в переменные окружения:
1. Vercel Dashboard → Settings → Environment Variables
2. Добавьте:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
3. Обновите `/api/send-telegram.ts` для использования `process.env`
