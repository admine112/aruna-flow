import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, Heart, Sparkles } from 'lucide-react';
import { InstructorModal } from '../components/InstructorModal';
import { instructors, getInstructorById } from '../data/instructors';

interface AboutProps {
  onNavigate?: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInstructorClick = (instructorId: string) => {
    setSelectedInstructor(instructorId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstructor(null);
  };

  const handleBookWithInstructor = (instructorId: string) => {
    // Сохраняем выбранного инструктора в localStorage для передачи в форму
    localStorage.setItem('selectedInstructor', instructorId);
    onNavigate && onNavigate('contacts');
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white">
      <PhilosophySection />
      <TeachersSection onInstructorClick={handleInstructorClick} />
      <ValuesSection />
      
      <InstructorModal
        instructor={selectedInstructor ? getInstructorById(selectedInstructor) || null : null}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBookWithInstructor={handleBookWithInstructor}
      />
    </div>
  );
};

const PhilosophySection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-amber-50 to-rose-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">
            {t.about.title}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <PhilosophyImage />
          <PhilosophyContent />
        </div>
      </div>
    </section>
  );
};

const PhilosophyImage: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
        <img
          src="https://images.pexels.com/photos/3822719/pexels-photo-3822719.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Yoga studio"
          className="w-full h-96 md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
      </div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-300 rounded-full blur-2xl opacity-50" />
    </div>
  );
};

const PhilosophyContent: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`space-y-6 transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-serif text-stone-800">
        {t.about.philosophy.title}
      </h2>
      <p className="text-lg text-stone-600 leading-relaxed">{t.about.philosophy.text}</p>
      <div className="flex flex-wrap gap-4 pt-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
          <Heart className="text-rose-500" size={20} />
          <span className="text-sm font-medium text-stone-700">10+ років досвіду</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
          <Award className="text-amber-500" size={20} />
          <span className="text-sm font-medium text-stone-700">Сертифіковані тренери</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
          <Sparkles className="text-blue-500" size={20} />
          <span className="text-sm font-medium text-stone-700">Індивідуальний підхід</span>
        </div>
      </div>
    </div>
  );
};

interface TeachersSectionProps {
  onInstructorClick: (instructorId: string) => void;
}

const TeachersSection: React.FC<TeachersSectionProps> = ({ onInstructorClick }) => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={ref}
          className={`text-3xl md:text-4xl font-serif text-center text-stone-800 mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {t.about.teachers.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {instructors.map((instructor, index) => (
            <InstructorCard 
              key={instructor.id} 
              instructor={instructor} 
              index={index}
              onInstructorClick={onInstructorClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface InstructorCardProps {
  instructor: any;
  index: number;
  onInstructorClick: (instructorId: string) => void;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor, index, onInstructorClick }) => {
  const { ref, isVisible } = useScrollAnimation();
  const { language } = useLanguage();

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onClick={() => onInstructorClick(instructor.id)}
    >
      <div className="relative h-72 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <span className="text-6xl font-bold text-white">
            {instructor.name[language].charAt(0)}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-semibold text-white mb-1">
            {instructor.name[language]}
          </h3>
          <p className="text-amber-200 font-medium">
            {instructor.specialization[language]}
          </p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-stone-600 leading-relaxed mb-4">
          {instructor.description[language].substring(0, 120)}...
        </p>
        <div className="flex items-center justify-between">
          <span className="text-amber-600 font-medium text-sm">
            {instructor.experience[language]}
          </span>
          <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
            {language === 'uk' ? 'Детальніше →' : 'Learn more →'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ValuesSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const values = [
    {
      icon: '🧘',
      title: 'Гармонія',
      description: 'Баланс між тілом, розумом і душею',
    },
    {
      icon: '✨',
      title: 'Усвідомленість',
      description: 'Присутність у моменті тут і зараз',
    },
    {
      icon: '💚',
      title: 'Турбота',
      description: 'Індивідуальний підхід до кожного',
    },
    {
      icon: '🌱',
      title: 'Розвиток',
      description: 'Постійне вдосконалення практики',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-rose-50 to-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={ref}
          className={`text-3xl md:text-4xl font-serif text-center text-stone-800 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Наші цінності
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueCard: React.FC<{ value: any; index: number }> = ({ value, index }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105 text-center ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-5xl mb-4">{value.icon}</div>
      <h3 className="text-xl font-semibold text-stone-800 mb-2">{value.title}</h3>
      <p className="text-stone-600">{value.description}</p>
    </div>
  );
};
