import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Clock, Send, Loader } from 'lucide-react';
import { sendToTelegram } from '../utils/api';

interface FormData {
  name: string;
  email: string;
  phone: string;
  comment: string;
}

interface ChatMessage {
  text: string;
  timestamp: Date;
  sender: 'user' | 'admin';
}

export const Contacts: React.FC = () => {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <ContactHeader />
      <div className="pb-8 md:pb-16">
        <BookingForm />
        <ContactInfo />
        <CallbackForm />
        <NewsletterForm />
        <MiniChat />
        <MapSection />
      </div>
    </div>
  );
};

const ContactHeader: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
        {t.contacts.title}
      </h1>
      <p className="text-lg text-stone-600 max-w-2xl mx-auto">
        Зв'яжіться з нами зручним для вас способом
      </p>
    </div>
  );
};

const BookingForm: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    comment: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    console.log('📤 Отправка формы:', formData);

    try {
      const response = await sendToTelegram({
        type: 'booking',
        ...formData,
      });

      console.log('📬 Ответ сервера:', response);

      if (response.ok) {
        setStatus('success');
        console.log('✅ Форма успешно отправлена');
        setFormData({ name: '', email: '', phone: '', comment: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        console.error('❌ Ошибка отправки формы');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      console.error('❌ Исключение при отправке:', error);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleQuickTest = async () => {
    console.log('🧪 Быстрый тест отправки');
    setFormData({
      name: 'Тестовый Пользователь',
      email: 'test@example.com',
      phone: '+380671234567',
      comment: 'Тестовое сообщение - быстрая проверка'
    });
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  return (
    <section id="booking-form" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800">
            {t.contacts.form.title}
          </h2>
          {import.meta.env.DEV && (
            <button
              type="button"
              onClick={handleQuickTest}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
              title="Быстрый тест (только в dev режиме)"
            >
              🧪 Тест
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t.contacts.form.name} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t.contacts.form.email} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t.contacts.form.phone} *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {t.contacts.form.comment}
            </label>
            <textarea
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'sending' && <Loader className="animate-spin" size={20} />}
            {status === 'sending' ? t.contacts.form.sending : t.contacts.form.submit}
          </button>

          {status === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
              {t.contacts.form.success}
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {t.contacts.form.error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

const ContactInfo: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const info = [
    { icon: MapPin, label: t.contacts.info.address },
    { icon: Phone, label: t.contacts.info.phone },
    { icon: Mail, label: t.contacts.info.email },
    { icon: Clock, label: t.contacts.info.hours },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {info.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="text-white" size={24} />
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const CallbackForm: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await sendToTelegram({ type: 'callback', ...formData });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', comment: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        ref={ref}
        className={`max-w-xl mx-auto bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <h3 className="text-2xl font-serif text-stone-800 mb-4 text-center">
          {t.contacts.callback.title}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder={t.contacts.callback.name}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <input
            type="tel"
            required
            placeholder={t.contacts.callback.phone}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <textarea
            rows={3}
            placeholder={t.contacts.callback.comment}
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
          >
            {status === 'sending' ? t.contacts.form.sending : t.contacts.callback.submit}
          </button>
          {status === 'success' && (
            <p className="text-green-600 text-center text-sm">{t.contacts.form.success}</p>
          )}
        </form>
      </div>
    </section>
  );
};

const NewsletterForm: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await sendToTelegram({ type: 'newsletter', email });

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('idle');
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        ref={ref}
        className={`max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <h3 className="text-2xl font-serif text-stone-800 mb-4">
          {t.contacts.newsletter.title}
        </h3>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            placeholder={t.contacts.newsletter.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
          >
            {t.contacts.newsletter.submit}
          </button>
        </form>
        {status === 'success' && (
          <p className="text-green-600 mt-3 text-sm">{t.contacts.newsletter.success}</p>
        )}
      </div>
    </section>
  );
};

const MiniChat: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      text: message,
      timestamp: new Date(),
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    await sendToTelegram({ type: 'chat', message: newMessage.text });
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4">
          <h3 className="text-xl font-semibold text-white text-center">
            {t.contacts.chat.title}
          </h3>
        </div>

        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-center text-stone-400 mt-8">
              Напишіть ваше перше повідомлення
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="flex justify-end">
                <div className="bg-amber-100 px-4 py-2 rounded-lg max-w-xs">
                  <p className="text-stone-800">{msg.text}</p>
                  <p className="text-xs text-stone-500 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-stone-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.contacts.chat.placeholder}
              className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const MapSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        ref={ref}
        className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.6385847986487!2d30.516868315728838!3d50.450098479476824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5d6c20c6f9%3A0x47d2f5c6f2a6e3a6!2sKyiv%2C%20Ukraine!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Aruna Flow Location"
        />
      </div>
    </section>
  );
};
