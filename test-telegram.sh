#!/bin/bash

# Скрипт для быстрого тестирования отправки в Telegram

echo "🧪 Тестирование отправки в Telegram..."
echo ""

# Проверка, запущен ли API сервер
if ! curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "❌ API сервер не запущен на порту 3001"
    echo "Запустите: npm run dev:api"
    exit 1
fi

echo "✅ API сервер работает"
echo ""
echo "📨 Отправка тестовой заявки..."
echo ""

# Отправка тестовой заявки
response=$(curl -s -X POST http://localhost:3001/api/send-telegram \
  -H "Content-Type: application/json" \
  -d '{
    "type": "booking",
    "name": "Тестовый Пользователь",
    "email": "test@example.com",
    "phone": "+380671234567",
    "comment": "Это тестовое сообщение из скрипта"
  }')

echo "📬 Ответ сервера:"
echo "$response" | jq . 2>/dev/null || echo "$response"
echo ""

if echo "$response" | grep -q "success"; then
    echo "✅ Сообщение успешно отправлено!"
    echo "📱 Проверьте Telegram (@Obsidian2580Bot)"
else
    echo "❌ Ошибка отправки"
    echo "Проверьте логи API сервера"
fi
