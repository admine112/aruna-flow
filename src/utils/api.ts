// API для отправки в Telegram
const isDevelopment = import.meta.env.DEV;

export const sendToTelegram = async (data: any) => {
  // В dev режиме используем локальный API сервер на порту 3001
  const apiUrl = isDevelopment 
    ? 'http://localhost:3001/api/send-telegram'
    : '/api/send-telegram';

  console.log('📨 Отправка в Telegram:', data);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('✅ Успешно отправлено');
    return response;
  } catch (error) {
    console.error('❌ Ошибка отправки:', error);
    throw error;
  }
};
