// Локальный dev сервер для тестирования Telegram API
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

const TELEGRAM_BOT_TOKEN = '8149651558:AAEcCMGUzcEDULbcGHbk0lCMhk_S51GUBJo';
const TELEGRAM_CHAT_ID = '944549036';

app.use(cors());
app.use(express.json());

// Логирование всех запросов
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

app.post('/api/send-telegram', async (req, res) => {
  try {
    const { type, ...data } = req.body;

    let message = '';

    switch (type) {
      case 'booking':
        let instructorInfo = '';
        let classInfo = '';
        
        if (data.instructor) {
          // Здесь можно добавить логику для получения имени инструктора по ID
          instructorInfo = `\n🧘‍♀️ Бажаний інструктор: ${data.instructor}`;
        }
        
        if (data.class) {
          // Здесь можно добавить логику для получения названия занятия по ID
          classInfo = `\n📅 Бажане заняття: ${data.class}`;
        }
        
        message = `
🧘 <b>Нова заявка на заняття</b>

👤 Ім'я: ${data.name}
📧 Email: ${data.email}
📞 Телефон: ${data.phone}${instructorInfo}${classInfo}
💬 Коментар: ${data.comment || 'Немає'}

Час: ${new Date().toLocaleString('uk-UA')}
        `;
        break;

      case 'callback':
        message = `
📞 <b>Запит на зворотній дзвінок</b>

👤 Ім'я: ${data.name}
📞 Телефон: ${data.phone}
💬 Коментар: ${data.comment || 'Немає'}

Час: ${new Date().toLocaleString('uk-UA')}
        `;
        break;

      case 'newsletter':
        message = `
📬 <b>Нова підписка на новини</b>

📧 Email: ${data.email}

Час: ${new Date().toLocaleString('uk-UA')}
        `;
        break;

      case 'chat':
        message = `
💬 <b>Повідомлення з чату</b>

${data.message}

Час: ${new Date().toLocaleString('uk-UA')}
        `;
        break;

      default:
        return res.status(400).json({ error: 'Invalid type' });
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message.trim(),
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Telegram API error:', result);
      throw new Error(`Telegram API error: ${JSON.stringify(result)}`);
    }

    console.log('✅ Сообщение отправлено в Telegram:', type);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Ошибка отправки в Telegram:', error.message);
    return res.status(500).json({ 
      error: 'Failed to send message',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Dev API сервер запущен на http://localhost:${PORT}`);
  console.log(`📱 Telegram Bot: @Obsidian2580Bot`);
});
