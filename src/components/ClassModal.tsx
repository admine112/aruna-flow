import React from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../context/LanguageContext';
import { YogaClass } from '../data/classes';
import { getInstructorById } from '../data/instructors';
import { Clock, Users, Target, Gift, User } from 'lucide-react';

interface ClassModalProps {
  yogaClass: YogaClass | null;
  isOpen: boolean;
  onClose: () => void;
  onInstructorClick: (instructorId: string) => void;
  onBookClass?: (classId: string, instructorId?: string) => void;
}

export const ClassModal: React.FC<ClassModalProps> = ({
  yogaClass,
  isOpen,
  onClose,
  onInstructorClick,
  onBookClass,
}) => {
  const { language } = useLanguage();

  if (!yogaClass) return null;

  const instructor = getInstructorById(yogaClass.instructor);

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
              <Clock className="mr-1" size={16} />
              {yogaClass.time}
            </div>
            <div className="flex items-center">
              <Users className="mr-1" size={16} />
              {yogaClass.duration} {language === 'uk' ? 'хв' : 'min'}
            </div>
          </div>
        </div>

        {/* Instructor */}
        {instructor && (
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
        )}

        {/* Level */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Target className="mr-2 text-amber-600" size={20} />
            <span className="font-semibold text-stone-800">
              {language === 'uk' ? 'Рівень складності' : 'Difficulty Level'}
            </span>
          </div>
          <p className="text-stone-700 ml-7">{yogaClass.level[language]}</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-stone-700 leading-relaxed">
            {yogaClass.description[language]}
          </p>
        </div>

        {/* Methodology */}
        <div className="mb-6">
          <h3 className="font-semibold text-stone-800 mb-2">
            {language === 'uk' ? 'Методика' : 'Methodology'}
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            {yogaClass.methodology[language]}
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h3 className="flex items-center font-semibold text-stone-800 mb-3">
            <Gift className="mr-2 text-amber-600" size={20} />
            {language === 'uk' ? 'Користь від практики' : 'Benefits'}
          </h3>
          <ul className="space-y-2">
            {yogaClass.benefits[language].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-stone-700 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to bring */}
        <div className="mb-6">
          <h3 className="font-semibold text-stone-800 mb-3">
            {language === 'uk' ? 'Що взяти з собою' : 'What to Bring'}
          </h3>
          <ul className="space-y-2">
            {yogaClass.whatToBring[language].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-stone-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 border-t border-stone-200">
          <button
            onClick={() => {
              onBookClass && onBookClass(yogaClass.id, yogaClass.instructor);
              onClose();
            }}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            {language === 'uk' ? 'Записатися на заняття' : 'Book This Class'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
