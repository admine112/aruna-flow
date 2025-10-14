import React from 'react';
import { Modal } from './Modal';
import { useLanguage } from '../context/LanguageContext';
import { Instructor } from '../data/instructors';
import { GraduationCap, Award, Heart } from 'lucide-react';

interface InstructorModalProps {
  instructor: Instructor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InstructorModal: React.FC<InstructorModalProps> = ({
  instructor,
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();

  if (!instructor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {instructor.name[language].charAt(0)}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">
            {instructor.name[language]}
          </h2>
          <p className="text-amber-600 font-medium">
            {instructor.specialization[language]}
          </p>
          <p className="text-stone-600 text-sm mt-1">
            {instructor.experience[language]}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-stone-700 leading-relaxed">
            {instructor.description[language]}
          </p>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="flex items-center text-lg font-semibold text-stone-800 mb-3">
            <GraduationCap className="mr-2 text-amber-600" size={20} />
            {language === 'uk' ? 'Освіта та сертифікати' : 'Education & Certificates'}
          </h3>
          <ul className="space-y-2">
            {instructor.education[language].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-stone-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Methodology */}
        <div className="mb-6">
          <h3 className="flex items-center text-lg font-semibold text-stone-800 mb-3">
            <Heart className="mr-2 text-amber-600" size={20} />
            {language === 'uk' ? 'Методика викладання' : 'Teaching Methodology'}
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            {instructor.methodology[language]}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 border-t border-stone-200">
          <p className="text-stone-600 text-sm mb-3">
            {language === 'uk' 
              ? 'Хочете потрапити на заняття до цього інструктора?' 
              : 'Want to join this instructor\'s class?'
            }
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            {language === 'uk' ? 'Записатися на заняття' : 'Book a Class'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
