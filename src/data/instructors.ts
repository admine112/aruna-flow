export interface Instructor {
  id: string;
  name: {
    uk: string;
    en: string;
  };
  specialization: {
    uk: string;
    en: string;
  };
  experience: {
    uk: string;
    en: string;
  };
  education: {
    uk: string[];
    en: string[];
  };
  description: {
    uk: string;
    en: string;
  };
  methodology: {
    uk: string;
    en: string;
  };
  avatar: string;
}

export const instructors: Instructor[] = [
  {
    id: 'maria',
    name: {
      uk: 'Марія',
      en: 'Maria'
    },
    specialization: {
      uk: 'Інструктор хатха-йоги',
      en: 'Hatha Yoga Instructor'
    },
    experience: {
      uk: 'Понад 6 років викладання',
      en: 'Over 6 years of teaching'
    },
    education: {
      uk: [
        'Rishikesh Yoga Academy (Індія) - 500-годинна сертифікація',
        'Курс анатомії в йозі від Yoga Alliance',
        'Сертифікат з пранаями та медитації'
      ],
      en: [
        'Rishikesh Yoga Academy (India) - 500-hour certification',
        'Yoga Anatomy Course from Yoga Alliance',
        'Pranayama and Meditation Certificate'
      ]
    },
    description: {
      uk: 'Марія спеціалізується на дихальних практиках і корекції постави. Її заняття поєднують традиційну хатха-йогу з сучасними знаннями анатомії. Особлива увага приділяється індивідуальному підходу до кожного учня.',
      en: 'Maria specializes in breathing practices and posture correction. Her classes combine traditional hatha yoga with modern anatomical knowledge. Special attention is given to individual approach to each student.'
    },
    methodology: {
      uk: 'Медитативний підхід + сучасна анатомічна йога. Акцент на правильному диханні, усвідомленості рухів та поступовому розвитку гнучкості.',
      en: 'Meditative approach + modern anatomical yoga. Focus on proper breathing, movement awareness and gradual flexibility development.'
    },
    avatar: '/api/placeholder/150/150'
  },
  {
    id: 'andriy',
    name: {
      uk: 'Андрій',
      en: 'Andriy'
    },
    specialization: {
      uk: 'Інструктор віньяси',
      en: 'Vinyasa Instructor'
    },
    experience: {
      uk: '4 роки викладання, 8 років особистої практики',
      en: '4 years of teaching, 8 years of personal practice'
    },
    education: {
      uk: [
        'Сертифікований викладач Yoga Alliance (RYT-200)',
        'Навчання у Франції в школі Ashtanga Yoga Paris',
        'Семінари з віньяса-флоу від провідних майстрів Європи'
      ],
      en: [
        'Certified Yoga Alliance Teacher (RYT-200)',
        'Training in France at Ashtanga Yoga Paris school',
        'Vinyasa Flow seminars from leading European masters'
      ]
    },
    description: {
      uk: 'Андрій створює динамічні послідовності, які поєднують силу, потік і усвідомлення руху. Його заняття підходять як для початківців, так і для досвідчених практиків, які хочуть поглибити свою практику.',
      en: 'Andriy creates dynamic sequences that combine strength, flow and movement awareness. His classes are suitable for both beginners and experienced practitioners who want to deepen their practice.'
    },
    methodology: {
      uk: 'Динамічні зв\'язки + правильне дихання + концентрація. Авторський мікс power-йоги і балансних асан з акцентом на плавність переходів.',
      en: 'Dynamic connections + proper breathing + concentration. Author\'s mix of power yoga and balance asanas with emphasis on smooth transitions.'
    },
    avatar: '/api/placeholder/150/150'
  },
  {
    id: 'olena',
    name: {
      uk: 'Олена',
      en: 'Olena'
    },
    specialization: {
      uk: 'Медитація і майндфулнес',
      en: 'Meditation & Mindfulness'
    },
    experience: {
      uk: '10 років досвіду в медитативних практиках',
      en: '10 years of experience in meditative practices'
    },
    education: {
      uk: [
        'Психолог, Київський національний університет',
        'Сертифікат MBSR (Mindfulness-Based Stress Reduction)',
        'Навчання звукотерапії в Тибетському центрі'
      ],
      en: [
        'Psychologist, Kyiv National University',
        'MBSR Certificate (Mindfulness-Based Stress Reduction)',
        'Sound Therapy Training at Tibetan Center'
      ]
    },
    description: {
      uk: 'Олена допомагає людям знайти внутрішній спокій через практики усвідомленості. Вона працює з тілесними блоками, стресом та відновленням енергії. Її сесії поєднують психологічний підхід з древніми медитативними техніками.',
      en: 'Olena helps people find inner peace through mindfulness practices. She works with body blocks, stress and energy restoration. Her sessions combine psychological approach with ancient meditative techniques.'
    },
    methodology: {
      uk: 'Mindfulness + sound healing + тілесна терапія. Використання тибетських чаш, дихальних технік та керованих медитацій.',
      en: 'Mindfulness + sound healing + body therapy. Use of Tibetan bowls, breathing techniques and guided meditations.'
    },
    avatar: '/api/placeholder/150/150'
  }
];

export const getInstructorById = (id: string): Instructor | undefined => {
  return instructors.find(instructor => instructor.id === id);
};
