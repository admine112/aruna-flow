export interface ScheduledClass {
  id: string;
  classId: string; // ссылка на YogaClass
  date: string; // дата в формате YYYY-MM-DD
  time: string; // время в формате HH:MM
  duration: number; // длительность в минутах
  instructor: string; // ID инструктора
  availableSpots: number;
  maxSpots: number;
  price: {
    uk: string;
    en: string;
  };
}

// Расписание на ближайшие дни
export const scheduledClasses: ScheduledClass[] = [
  {
    id: 'hatha-mon-08',
    classId: 'morning-hatha',
    date: '2024-10-21', // понедельник
    time: '08:00',
    duration: 75,
    instructor: 'maria',
    availableSpots: 8,
    maxSpots: 12,
    price: {
      uk: '350 грн',
      en: '350 UAH'
    }
  },
  {
    id: 'vinyasa-mon-19',
    classId: 'vinyasa-flow',
    date: '2024-10-21', // понедельник
    time: '19:00',
    duration: 90,
    instructor: 'andriy',
    availableSpots: 5,
    maxSpots: 10,
    price: {
      uk: '400 грн',
      en: '400 UAH'
    }
  },
  {
    id: 'meditation-tue-18',
    classId: 'meditation-beginners',
    date: '2024-10-22', // вторник
    time: '18:00',
    duration: 60,
    instructor: 'olena',
    availableSpots: 12,
    maxSpots: 15,
    price: {
      uk: '300 грн',
      en: '300 UAH'
    }
  },
  {
    id: 'hatha-wed-08',
    classId: 'morning-hatha',
    date: '2024-10-23', // среда
    time: '08:30',
    duration: 75,
    instructor: 'maria',
    availableSpots: 6,
    maxSpots: 12,
    price: {
      uk: '350 грн',
      en: '350 UAH'
    }
  },
  {
    id: 'vinyasa-thu-19',
    classId: 'vinyasa-flow',
    date: '2024-10-24', // четверг
    time: '19:30',
    duration: 90,
    instructor: 'andriy',
    availableSpots: 3,
    maxSpots: 10,
    price: {
      uk: '400 грн',
      en: '400 UAH'
    }
  },
  {
    id: 'meditation-fri-18',
    classId: 'meditation-beginners',
    date: '2024-10-25', // пятница
    time: '18:00',
    duration: 60,
    instructor: 'olena',
    availableSpots: 10,
    maxSpots: 15,
    price: {
      uk: '300 грн',
      en: '300 UAH'
    }
  },
  {
    id: 'hatha-sat-10',
    classId: 'morning-hatha',
    date: '2024-10-26', // суббота
    time: '10:00',
    duration: 75,
    instructor: 'maria',
    availableSpots: 4,
    maxSpots: 12,
    price: {
      uk: '350 грн',
      en: '350 UAH'
    }
  }
];

export const getScheduledClassById = (id: string): ScheduledClass | undefined => {
  return scheduledClasses.find(scheduledClass => scheduledClass.id === id);
};

export const getScheduledClassesByDate = (date: string): ScheduledClass[] => {
  return scheduledClasses.filter(scheduledClass => scheduledClass.date === date);
};

export const getScheduledClassesByInstructor = (instructorId: string): ScheduledClass[] => {
  return scheduledClasses.filter(scheduledClass => scheduledClass.instructor === instructorId);
};

// Функция для форматирования даты
export const formatDate = (dateString: string, language: 'uk' | 'en'): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  
  return date.toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US', options);
};
