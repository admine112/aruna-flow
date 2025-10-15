import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Calendar, User } from 'lucide-react';
import { ClassModal } from '../components/ClassModal';
import { InstructorModal } from '../components/InstructorModal';
import { ScheduledClassModal } from '../components/ScheduledClassModal';
import { yogaClasses, getClassById } from '../data/classes';
import { getInstructorById } from '../data/instructors';
import { scheduledClasses, getScheduledClassById, formatDate } from '../data/schedule';

interface ScheduleProps {
  onNavigate: (page: string) => void;
}

interface ClassItem {
  id: number;
  day: string;
  time: string;
  name: string;
  instructor: string;
  type: 'yoga' | 'meditation' | 'stretching';
  level: string;
  duration: number;
}

export const Schedule: React.FC<ScheduleProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
  const [selectedScheduledClass, setSelectedScheduledClass] = useState<string | null>(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [isScheduledClassModalOpen, setIsScheduledClassModalOpen] = useState(false);

  const handleClassClick = (classId: string) => {
    setSelectedClass(classId);
    setIsClassModalOpen(true);
  };

  const handleInstructorClick = (instructorId: string) => {
    setSelectedInstructor(instructorId);
    setIsInstructorModalOpen(true);
    setIsClassModalOpen(false);
  };

  const handleCloseClassModal = () => {
    setIsClassModalOpen(false);
    setSelectedClass(null);
  };

  const handleCloseInstructorModal = () => {
    setIsInstructorModalOpen(false);
    setSelectedInstructor(null);
  };

  const handleBookClass = (classId: string, instructorId?: string) => {
    // Сохраняем выбранное занятие и инструктора в localStorage
    localStorage.setItem('selectedClass', classId);
    if (instructorId) {
      localStorage.setItem('selectedInstructor', instructorId);
    }
    onNavigate('contacts');
  };

  const handleBookWithInstructor = (instructorId: string) => {
    localStorage.setItem('selectedInstructor', instructorId);
    onNavigate('contacts');
  };

  const handleScheduledClassClick = (scheduledClassId: string) => {
    setSelectedScheduledClass(scheduledClassId);
    setIsScheduledClassModalOpen(true);
  };

  const handleCloseScheduledClassModal = () => {
    setIsScheduledClassModalOpen(false);
    setSelectedScheduledClass(null);
  };

  const handleBookScheduledClass = (scheduledClassId: string) => {
    localStorage.setItem('selectedScheduledClass', scheduledClassId);
    onNavigate('contacts');
  };

  const classes: ClassItem[] = [
    {
      id: 1,
      day: 'Monday',
      time: '08:00',
      name: 'Hatha Yoga',
      instructor: 'Anna Sonechko',
      type: 'yoga',
      level: t.schedule.level.beginner,
      duration: 60,
    },
    {
      id: 2,
      day: 'Monday',
      time: '18:00',
      name: 'Vinyasa Flow',
      instructor: 'Dmytro Svitlov',
      type: 'yoga',
      level: t.schedule.level.intermediate,
      duration: 75,
    },
    {
      id: 3,
      day: 'Tuesday',
      time: '09:00',
      name: 'Morning Meditation',
      instructor: 'Sofia Kvitka',
      type: 'meditation',
      level: t.schedule.level.all,
      duration: 30,
    },
    {
      id: 4,
      day: 'Tuesday',
      time: '19:00',
      name: 'Stretching & Relaxation',
      instructor: 'Sofia Kvitka',
      type: 'stretching',
      level: t.schedule.level.all,
      duration: 60,
    },
    {
      id: 5,
      day: 'Wednesday',
      time: '07:30',
      name: 'Sunrise Yoga',
      instructor: 'Anna Sonechko',
      type: 'yoga',
      level: t.schedule.level.all,
      duration: 60,
    },
    {
      id: 6,
      day: 'Wednesday',
      time: '18:30',
      name: 'Power Yoga',
      instructor: 'Dmytro Svitlov',
      type: 'yoga',
      level: t.schedule.level.advanced,
      duration: 90,
    },
    {
      id: 7,
      day: 'Thursday',
      time: '09:00',
      name: 'Gentle Yoga',
      instructor: 'Anna Sonechko',
      type: 'yoga',
      level: t.schedule.level.beginner,
      duration: 60,
    },
    {
      id: 8,
      day: 'Thursday',
      time: '20:00',
      name: 'Evening Meditation',
      instructor: 'Sofia Kvitka',
      type: 'meditation',
      level: t.schedule.level.all,
      duration: 45,
    },
    {
      id: 9,
      day: 'Friday',
      time: '08:00',
      name: 'Yoga Therapy',
      instructor: 'Sofia Kvitka',
      type: 'yoga',
      level: t.schedule.level.all,
      duration: 60,
    },
    {
      id: 10,
      day: 'Friday',
      time: '18:00',
      name: 'Vinyasa Flow',
      instructor: 'Dmytro Svitlov',
      type: 'yoga',
      level: t.schedule.level.intermediate,
      duration: 75,
    },
    {
      id: 11,
      day: 'Saturday',
      time: '10:00',
      name: 'Weekend Yoga',
      instructor: 'Anna Sonechko',
      type: 'yoga',
      level: t.schedule.level.all,
      duration: 90,
    },
    {
      id: 12,
      day: 'Saturday',
      time: '16:00',
      name: 'Deep Stretching',
      instructor: 'Sofia Kvitka',
      type: 'stretching',
      level: t.schedule.level.all,
      duration: 60,
    },
    {
      id: 13,
      day: 'Sunday',
      time: '10:00',
      name: 'Restorative Yoga',
      instructor: 'Anna Sonechko',
      type: 'yoga',
      level: t.schedule.level.all,
      duration: 75,
    },
    {
      id: 14,
      day: 'Sunday',
      time: '17:00',
      name: 'Mindfulness Meditation',
      instructor: 'Sofia Kvitka',
      type: 'meditation',
      level: t.schedule.level.all,
      duration: 45,
    },
  ];

  const filteredClasses =
    activeFilter === 'all'
      ? classes
      : classes.filter((classItem) => classItem.type === activeFilter);

  const filters = [
    { key: 'all', label: t.schedule.filter.all },
    { key: 'yoga', label: t.schedule.filter.yoga },
    { key: 'meditation', label: t.schedule.filter.meditation },
    { key: 'stretching', label: t.schedule.filter.stretching },
  ];

  const scrollToBooking = () => {
    onNavigate('contacts');
    setTimeout(() => {
      const formSection = document.getElementById('booking-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="pt-36 md:pt-44 min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScheduleHeader />

          <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105'
                    : 'bg-white text-stone-600 hover:bg-amber-50 shadow-md hover:shadow-lg'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:gap-6">
            {scheduledClasses.map((scheduledClass, index) => (
              <ScheduledClassCard
                key={scheduledClass.id}
                scheduledClass={scheduledClass}
                index={index}
                onBook={scrollToBooking}
                onScheduledClassClick={handleScheduledClassClick}
              />
            ))}
          </div>
        </div>
      </section>

      <ClassModal
        yogaClass={selectedClass ? getClassById(selectedClass) || null : null}
        isOpen={isClassModalOpen}
        onClose={handleCloseClassModal}
        onInstructorClick={handleInstructorClick}
        onBookClass={handleBookClass}
      />

      <InstructorModal
        instructor={selectedInstructor ? getInstructorById(selectedInstructor) || null : null}
        isOpen={isInstructorModalOpen}
        onClose={handleCloseInstructorModal}
        onBookWithInstructor={handleBookWithInstructor}
      />

      <ScheduledClassModal
        scheduledClass={selectedScheduledClass ? getScheduledClassById(selectedScheduledClass) || null : null}
        isOpen={isScheduledClassModalOpen}
        onClose={handleCloseScheduledClassModal}
        onBookScheduledClass={handleBookScheduledClass}
        onInstructorClick={handleInstructorClick}
      />
    </div>
  );
};

const ScheduleHeader: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`text-center mb-12 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
        {t.schedule.title}
      </h1>
      <p className="text-lg text-stone-600 max-w-2xl mx-auto">
        {t.hero.description}
      </p>
    </div>
  );
};

const ClassCard: React.FC<{
  classItem: ClassItem;
  index: number;
  onBook: () => void;
  onClassClick?: (classId: string) => void;
}> = ({ classItem, index, onBook, onClassClick }) => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const typeColors = {
    yoga: 'from-amber-400 to-amber-600',
    meditation: 'from-rose-400 to-rose-600',
    stretching: 'from-emerald-400 to-emerald-600',
  };

  const typeBgColors = {
    yoga: 'bg-amber-50',
    meditation: 'bg-rose-50',
    stretching: 'bg-emerald-50',
  };

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] overflow-hidden cursor-pointer ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onClick={() => onClassClick && onClassClick(classItem.id.toString())}
    >
      <div className="flex flex-col md:flex-row">
        <div
          className={`p-6 md:w-48 flex flex-col justify-center items-center md:items-start ${typeBgColors[classItem.type]}`}
        >
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-stone-800">{classItem.day}</p>
            <p className="text-3xl font-bold text-stone-900 mt-1">{classItem.time}</p>
            <p className="text-sm text-stone-600 mt-2">{classItem.duration} min</p>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-semibold text-stone-800">{classItem.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${typeColors[classItem.type]}`}
                >
                  {t.schedule.filter[classItem.type]}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-amber-600" />
                  <span>{classItem.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-amber-600" />
                  <span>{classItem.level}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onBook}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              {t.schedule.book}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduledClassCard: React.FC<{
  scheduledClass: any;
  index: number;
  onBook: () => void;
  onScheduledClassClick: (scheduledClassId: string) => void;
}> = ({ scheduledClass, index, onBook, onScheduledClassClick }) => {
  const { language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  
  const yogaClass = getClassById(scheduledClass.classId);
  const instructor = getInstructorById(scheduledClass.instructor);
  
  if (!yogaClass || !instructor) return null;

  const formattedDate = formatDate(scheduledClass.date, language);
  const spotsLeft = scheduledClass.availableSpots;
  const isAlmostFull = spotsLeft <= 3;
  const isFull = spotsLeft === 0;

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] overflow-hidden cursor-pointer ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onClick={() => onScheduledClassClick(scheduledClass.id)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-48 flex flex-col justify-center items-center md:items-start bg-gradient-to-br from-amber-50 to-amber-100">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-stone-800">{formattedDate}</p>
            <p className="text-2xl font-bold text-amber-700 mt-1">{scheduledClass.time}</p>
            <p className="text-sm text-stone-600 mt-2">
              {scheduledClass.duration} {language === 'uk' ? 'хв' : 'min'}
            </p>
            <div className="mt-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                isFull 
                  ? 'bg-red-500' 
                  : isAlmostFull 
                    ? 'bg-orange-500' 
                    : 'bg-green-500'
              }`}>
                {isFull 
                  ? (language === 'uk' ? 'Заповнено' : 'Full')
                  : `${spotsLeft} ${language === 'uk' ? 'місць' : 'spots'}`
                }
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-semibold text-stone-800 hover:text-amber-600 transition-colors">
                  {yogaClass.name[language]}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-amber-400 to-amber-600">
                  {scheduledClass.price[language]}
                </span>
              </div>

              <p className="text-stone-600 mb-3 leading-relaxed">
                {yogaClass.description[language].substring(0, 120)}...
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-amber-600" />
                  <span className="hover:text-amber-600 transition-colors">
                    {instructor.name[language]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-amber-600" />
                  <span>{yogaClass.level[language]}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onScheduledClassClick(scheduledClass.id);
                }}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200 transition-all duration-300 text-sm"
              >
                {language === 'uk' ? 'Детальніше' : 'Learn More'}
              </button>
              {!isFull && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBook();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  {language === 'uk' ? 'Записатися' : 'Book Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
