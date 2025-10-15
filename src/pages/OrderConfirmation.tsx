import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { CheckCircle, Phone, Clock, User, Calendar } from 'lucide-react';
import { getInstructorById } from '../data/instructors';
import { getClassById } from '../data/classes';
import { getScheduledClassById, formatDate } from '../data/schedule';

interface OrderData {
  name: string;
  email: string;
  phone: string;
  instructor?: string;
  class?: string;
  scheduledClass?: string;
  preferredDate?: string;
  preferredTime?: string;
  comment?: string;
  timestamp: string;
}

interface OrderConfirmationProps {
  onNavigate: (page: string) => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Загружаем данные заказа из localStorage
    const savedOrderData = localStorage.getItem('lastOrder');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    }
  }, []);

  if (!orderData) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600 mb-4">
            {language === 'uk' ? 'Дані замовлення не знайдено' : 'Order data not found'}
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            {language === 'uk' ? 'На головну' : 'Go Home'}
          </button>
        </div>
      </div>
    );
  }

  const instructor = orderData.instructor ? getInstructorById(orderData.instructor) : null;
  const yogaClass = orderData.class ? getClassById(orderData.class) : null;
  const scheduledClass = orderData.scheduledClass ? getScheduledClassById(orderData.scheduledClass) : null;

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
              {language === 'uk' ? 'Замовлення прийнято!' : 'Order Received!'}
            </h1>
            <p className="text-lg text-stone-600">
              {language === 'uk' 
                ? 'Дякуємо за ваше замовлення. Наш спеціаліст зв\'яжеться з вами найближчим часом.'
                : 'Thank you for your order. Our specialist will contact you shortly.'
              }
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-semibold text-stone-800 mb-6">
              {language === 'uk' ? 'Деталі замовлення' : 'Order Details'}
            </h2>

            <div className="space-y-4">
              {/* Customer Info */}
              <div className="flex items-center p-4 bg-stone-50 rounded-lg">
                <User className="mr-3 text-amber-600" size={20} />
                <div>
                  <p className="font-medium text-stone-800">{orderData.name}</p>
                  <p className="text-sm text-stone-600">{orderData.email}</p>
                  <p className="text-sm text-stone-600">{orderData.phone}</p>
                </div>
              </div>

              {/* Scheduled Class Info */}
              {scheduledClass && (
                <div className="flex items-start p-4 bg-amber-50 rounded-lg">
                  <Calendar className="mr-3 text-amber-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-stone-800">
                      {language === 'uk' ? 'Заброньоване заняття' : 'Booked Class'}
                    </p>
                    {yogaClass && (
                      <p className="text-stone-700">{yogaClass.name[language]}</p>
                    )}
                    <p className="text-sm text-stone-600">
                      {formatDate(scheduledClass.date, language)} о {scheduledClass.time}
                    </p>
                    <p className="text-sm text-amber-700 font-medium">
                      {scheduledClass.price[language]}
                    </p>
                  </div>
                </div>
              )}

              {/* Instructor Info */}
              {instructor && (
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <User className="mr-3 text-purple-600" size={20} />
                  <div>
                    <p className="font-medium text-stone-800">
                      {language === 'uk' ? 'Інструктор' : 'Instructor'}
                    </p>
                    <p className="text-stone-700">{instructor.name[language]}</p>
                    <p className="text-sm text-stone-600">{instructor.specialization[language]}</p>
                  </div>
                </div>
              )}

              {/* General Class Info (if no scheduled class) */}
              {yogaClass && !scheduledClass && (
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="mr-3 text-blue-600" size={20} />
                  <div>
                    <p className="font-medium text-stone-800">
                      {language === 'uk' ? 'Тип заняття' : 'Class Type'}
                    </p>
                    <p className="text-stone-700">{yogaClass.name[language]}</p>
                    <p className="text-sm text-stone-600">{yogaClass.level[language]}</p>
                  </div>
                </div>
              )}

              {/* Preferred Date and Time */}
              {(orderData.preferredDate || orderData.preferredTime) && (
                <div className="flex items-start p-4 bg-green-50 rounded-lg">
                  <Calendar className="mr-3 text-green-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-stone-800 mb-1">
                      {language === 'uk' ? 'Бажаний час заняття' : 'Preferred Class Time'}
                    </p>
                    {orderData.preferredDate && (
                      <p className="text-stone-700">
                        📆 {orderData.preferredDate}
                      </p>
                    )}
                    {orderData.preferredTime && (
                      <p className="text-stone-700">
                        ⏰ {orderData.preferredTime}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Comment */}
              {orderData.comment && (
                <div className="p-4 bg-stone-50 rounded-lg">
                  <p className="font-medium text-stone-800 mb-2">
                    {language === 'uk' ? 'Коментар' : 'Comment'}
                  </p>
                  <p className="text-stone-700">{orderData.comment}</p>
                </div>
              )}

              {/* Order Time */}
              <div className="flex items-center p-4 bg-stone-50 rounded-lg">
                <Clock className="mr-3 text-stone-600" size={20} />
                <div>
                  <p className="font-medium text-stone-800">
                    {language === 'uk' ? 'Час замовлення' : 'Order Time'}
                  </p>
                  <p className="text-sm text-stone-600">
                    {new Date(orderData.timestamp).toLocaleString(language === 'uk' ? 'uk-UA' : 'en-US')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center">
              <Phone className="mr-2 text-green-600" size={24} />
              {language === 'uk' ? 'Що далі?' : 'What\'s Next?'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-stone-800">
                    {language === 'uk' ? 'Очікуйте дзвінка' : 'Wait for Our Call'}
                  </p>
                  <p className="text-sm text-stone-600">
                    {language === 'uk' 
                      ? 'Наш спеціаліст зателефонує вам протягом 30 хвилин для підтвердження деталей'
                      : 'Our specialist will call you within 30 minutes to confirm the details'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-amber-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-stone-800">
                    {language === 'uk' ? 'Підтвердження бронювання' : 'Booking Confirmation'}
                  </p>
                  <p className="text-sm text-stone-600">
                    {language === 'uk' 
                      ? 'Ми підтвердимо час, дату та всі деталі вашого заняття'
                      : 'We will confirm the time, date and all details of your class'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-stone-800">
                    {language === 'uk' ? 'Підготовка до заняття' : 'Class Preparation'}
                  </p>
                  <p className="text-sm text-stone-600">
                    {language === 'uk' 
                      ? 'Ми надішлемо вам всю необхідну інформацію для підготовки'
                      : 'We will send you all the necessary information for preparation'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="text-center space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all mr-4"
            >
              {language === 'uk' ? 'На головну' : 'Go Home'}
            </button>
            <button
              onClick={() => onNavigate('schedule')}
              className="px-8 py-3 bg-stone-200 text-stone-700 rounded-lg font-medium hover:bg-stone-300 transition-all"
            >
              {language === 'uk' ? 'Переглянути розклад' : 'View Schedule'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
