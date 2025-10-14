import React from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../context/LanguageContext';
import { ScheduledClass, formatDate } from '../data/schedule';
import { getClassById } from '../data/classes';
import { getInstructorById } from '../data/instructors';
import { Clock, Users, Calendar, DollarSign, User, MapPin } from 'lucide-react';

interface ScheduledClassModalProps {
  scheduledClass: ScheduledClass | null;
  isOpen: boolean;
  onClose: () => void;
  onBookScheduledClass: (scheduledClassId: string) => void;
  onInstructorClick: (instructorId: string) => void;
}

export const ScheduledClassModal: React.FC<ScheduledClassModalProps> = ({
  scheduledClass,
  isOpen,
  onClose,
  onBookScheduledClass,
  onInstructorClick,
}) => {
  const { language } = useLanguage();

  if (!scheduledClass) return null;

  const yogaClass = getClassById(scheduledClass.classId);
  const instructor = getInstructorById(scheduledClass.instructor);

  if (!yogaClass || !instructor) return null;

  const formattedDate = formatDate(scheduledClass.date, language);
  const spotsLeft = scheduledClass.availableSpots;
  const isAlmostFull = spotsLeft <= 3;
  const isFull = spotsLeft === 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">
            {yogaClass.name[language]}
          </h2>
          <div className="flex items-center justify-center space-x-4 text-sm text-stone-600">
            <div className="flex items-center">
              <Calendar className="mr-1" size={16} />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1" size={16} />
              {scheduledClass.time}
            </div>
            <div className="flex items-center">
              <Users className="mr-1" size={16} />
              {scheduledClass.duration} {language === 'uk' ? 'хв' : 'min'}
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div className={`p-4 rounded-lg mb-6 ${
          isFull 
            ? 'bg-red-50 border border-red-200' 
            : isAlmostFull 
              ? 'bg-orange-50 border border-orange-200'
              : 'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className={`mr-2 ${
                isFull ? 'text-red-600' : isAlmostFull ? 'text-orange-600' : 'text-green-600'
              }`} size={20} />
              <span className={`font-medium ${
                isFull ? 'text-red-800' : isAlmostFull ? 'text-orange-800' : 'text-green-800'
              }`}>
                {isFull 
                  ? (language === 'uk' ? 'Місць немає' : 'Fully booked')
                  : `${spotsLeft} ${language === 'uk' ? 'вільних місць' : 'spots left'}`
                }
              </span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-1 text-amber-600" size={16} />
              <span className="font-bold text-amber-700">
                {scheduledClass.price[language]}
              </span>
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="mb-6 p-4 bg-amber-50 rounded-lg">
          <h3 className="flex items-center text-lg font-semibold text-stone-800 mb-2">
            <User className="mr-2 text-amber-600" size={20} />
            {language === 'uk' ? 'Інструктор' : 'Instructor'}
          </h3>
          <button
            onClick={() => onInstructorClick(instructor.id)}
            className="text-left w-full hover:bg-amber-100 p-2 rounded transition-colors"
          >
            <p className="font-medium text-amber-700 hover:text-amber-800">
              {instructor.name[language]}
            </p>
            <p className="text-sm text-stone-600">
              {instructor.specialization[language]}
            </p>
            <p className="text-xs text-amber-600 mt-1">
              {language === 'uk' ? '→ Дізнатися більше про інструктора' : '→ Learn more about instructor'}
            </p>
          </button>
        </div>

        {/* Class Description */}
        <div className="mb-6">
          <p className="text-stone-700 leading-relaxed mb-4">
            {yogaClass.description[language]}
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-stone-800 mb-2">
                {language === 'uk' ? 'Рівень' : 'Level'}
              </h4>
              <p className="text-stone-600">{yogaClass.level[language]}</p>
            </div>
            <div>
              <h4 className="font-semibold text-stone-800 mb-2">
                {language === 'uk' ? 'Тривалість' : 'Duration'}
              </h4>
              <p className="text-stone-600">
                {scheduledClass.duration} {language === 'uk' ? 'хвилин' : 'minutes'}
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6 p-3 bg-stone-50 rounded-lg">
          <div className="flex items-center">
            <MapPin className="mr-2 text-stone-600" size={16} />
            <span className="text-sm text-stone-700">
              {language === 'uk' 
                ? 'Студія Aruna Flow, вул. Хрещатик 25, Київ' 
                : 'Aruna Flow Studio, 25 Khreshchatyk St, Kyiv'
              }
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 border-t border-stone-200">
          {isFull ? (
            <div className="text-center">
              <p className="text-red-600 font-medium mb-3">
                {language === 'uk' 
                  ? 'На це заняття вже немає місць' 
                  : 'This class is fully booked'
                }
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-stone-300 text-stone-600 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                {language === 'uk' ? 'Місць немає' : 'Fully Booked'}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-stone-600 text-sm mb-3">
                {language === 'uk' 
                  ? `Забронювати місце на ${formattedDate} о ${scheduledClass.time}?` 
                  : `Book a spot for ${formattedDate} at ${scheduledClass.time}?`
                }
              </p>
              <button
                onClick={() => {
                  onBookScheduledClass(scheduledClass.id);
                  onClose();
                }}
                className={`px-6 py-3 text-white rounded-lg font-medium hover:shadow-lg transition-all ${
                  isAlmostFull 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
                    : 'bg-gradient-to-r from-amber-500 to-amber-600'
                }`}
              >
                {language === 'uk' ? 'Забронювати місце' : 'Book This Class'}
                {isAlmostFull && (
                  <span className="ml-2 text-xs">
                    ({spotsLeft} {language === 'uk' ? 'місць' : 'left'})
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
