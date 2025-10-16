import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Clock, Send, Loader } from 'lucide-react';
import { sendToTelegram } from '../utils/api';
import { instructors, getInstructorById } from '../data/instructors';
import { yogaClasses, getClassById } from '../data/classes';
import { getScheduledClassById, formatDate } from '../data/schedule';

interface FormData {
  name: string;
  email: string;
  phone: string;
  comment: string;
  instructor?: string;
  class?: string;
  scheduledClass?: string;
}

interface ChatMessage {
  text: string;
  timestamp: Date;
  sender: 'user' | 'admin';
}

interface ContactsProps {
  onNavigate?: (page: string) => void;
}

export const Contacts: React.FC<ContactsProps> = ({ onNavigate }) => {
  return (
    <div className="pt-36 md:pt-44 min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <ContactHeader />
      <div className="pb-8 md:pb-16">
        <BookingForm onNavigate={onNavigate} />
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
  const { t, language } = useLanguage();
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
        {language === 'uk' ? 'Зв\'яжіться з нами зручним для вас способом' : 'Contact us in the way that suits you best'}
      </p>
    </div>
  );
};

interface BookingFormProps {
  onNavigate?: (page: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    comment: '',
    instructor: '',
    class: '',
    scheduledClass: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Загружаем предвыбранные данные из localStorage
  useEffect(() => {
    const selectedInstructor = localStorage.getItem('selectedInstructor');
    const selectedClass = localStorage.getItem('selectedClass');
    const selectedScheduledClass = localStorage.getItem('selectedScheduledClass');
    
    let newFormData = { ...formData };
    
    // Если выбрано запланированное занятие - приоритет у него
    if (selectedScheduledClass) {
      const scheduledClass = getScheduledClassById(selectedScheduledClass);
      if (scheduledClass) {
        const yogaClass = getClassById(scheduledClass.classId);
        newFormData.scheduledClass = selectedScheduledClass;
        newFormData.instructor = scheduledClass.instructor;
        if (yogaClass) {
          newFormData.class = scheduledClass.classId;
        }
      }
    }
    // Если выбрано обычное занятие - заполняем занятие и инструктора
    else if (selectedClass) {
      const yogaClass = getClassById(selectedClass);
      if (yogaClass) {
        newFormData.class = selectedClass;
        // Можно добавить логику для определения инструктора по умолчанию для занятия
      }
      if (selectedInstructor) {
        newFormData.instructor = selectedInstructor;
      }
    }
    // Если выбран только инструктор
    else if (selectedInstructor) {
      newFormData.instructor = selectedInstructor;
    }
    
    if (selectedInstructor || selectedClass || selectedScheduledClass) {
      setFormData(newFormData);
      
      // Очищаем localStorage после загрузки
      localStorage.removeItem('selectedInstructor');
      localStorage.removeItem('selectedClass');
      localStorage.removeItem('selectedScheduledClass');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await sendToTelegram({
        type: 'booking',
        ...formData,
      });

      if (response.ok) {
        setStatus('success');
        
        // Сохраняем данные заказа в localStorage для страницы подтверждения
        const orderData = {
          ...formData,
          timestamp: new Date().toISOString()
        };
        
        // Сохраняем данные
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        console.log('✅ Order data saved to localStorage:', orderData);
        
        // Проверяем, что данные действительно сохранились
        const savedCheck = localStorage.getItem('lastOrder');
        console.log('✅ Verification - data in localStorage:', savedCheck);
        
        // Перенаправляем на страницу подтверждения
        if (onNavigate) {
          console.log('🔄 Navigating to order-confirmation...');
          onNavigate('order-confirmation');
        }
        
        // Сбрасываем форму ПОСЛЕ навигации
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', comment: '', instructor: '', class: '', scheduledClass: '' });
        }, 500);
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
    <section id="booking-form" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-6 text-center">
          {t.contacts.form.title}
        </h2>

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

          {/* Выбор инструктора */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {language === 'uk' ? 'Бажаний інструктор (опціонально)' : 'Preferred Instructor (optional)'}
            </label>
            <select
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">
                {language === 'uk' ? 'Оберіть інструктора...' : 'Select instructor...'}
              </option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name[language]} - {instructor.specialization[language]}
                </option>
              ))}
            </select>
          </div>

          {/* Выбор занятия */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              {language === 'uk' ? 'Бажане заняття (опціонально)' : 'Preferred Class (optional)'}
            </label>
            <select
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">
                {language === 'uk' ? 'Оберіть заняття...' : 'Select class...'}
              </option>
              {yogaClasses.map((yogaClass) => (
                <option key={yogaClass.id} value={yogaClass.id}>
                  {yogaClass.name[language]} - {yogaClass.time} ({yogaClass.duration} {language === 'uk' ? 'хв' : 'min'})
                </option>
              ))}
            </select>
          </div>

          {/* Отображение выбранного запланированного занятия */}
          {formData.scheduledClass && (
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                {language === 'uk' ? 'Обране заняття' : 'Selected Class'}
              </label>
              <div className="w-full px-4 py-3 rounded-lg border border-amber-300 bg-amber-50">
                {(() => {
                  const scheduledClass = getScheduledClassById(formData.scheduledClass);
                  const yogaClass = scheduledClass ? getClassById(scheduledClass.classId) : null;
                  const instructor = scheduledClass ? getInstructorById(scheduledClass.instructor) : null;
                  
                  if (scheduledClass && yogaClass && instructor) {
                    return (
                      <div className="text-amber-800">
                        <p className="font-medium">{yogaClass.name[language]}</p>
                        <p className="text-sm">
                          {formatDate(scheduledClass.date, language)} о {scheduledClass.time}
                        </p>
                        <p className="text-sm">
                          {language === 'uk' ? 'Інструктор:' : 'Instructor:'} {instructor.name[language]}
                        </p>
                        <p className="text-sm font-medium">{scheduledClass.price[language]}</p>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          )}

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
  const { t, language } = useLanguage();
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

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700 font-medium">
                {language === 'uk' 
                  ? '⚠️ УВАГА! Адміністратор не зможе вам відповісти через цей чат.' 
                  : '⚠️ WARNING! The administrator will not be able to reply to you through this chat.'
                }
              </p>
              <p className="text-sm text-amber-600 mt-1">
                {language === 'uk'
                  ? 'Будь ласка, залиште ваші контактні дані для зворотного зв\'язку.'
                  : 'Please leave your contact details for feedback.'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-center text-stone-400 mt-8">
              {language === 'uk' ? 'Напишіть ваше перше повідомлення' : 'Write your first message'}
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
