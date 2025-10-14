export interface YogaClass {
  id: string;
  name: {
    uk: string;
    en: string;
  };
  instructor: string; // instructor id
  time: string;
  duration: number; // minutes
  level: {
    uk: string;
    en: string;
  };
  description: {
    uk: string;
    en: string;
  };
  methodology: {
    uk: string;
    en: string;
  };
  benefits: {
    uk: string[];
    en: string[];
  };
  whatToBring: {
    uk: string[];
    en: string[];
  };
}

export const yogaClasses: YogaClass[] = [
  {
    id: 'morning-hatha',
    name: {
      uk: 'Ранкова Хатха Йога',
      en: 'Morning Hatha Yoga'
    },
    instructor: 'maria',
    time: '08:00',
    duration: 75,
    level: {
      uk: 'Для початківців та середнього рівня',
      en: 'For beginners and intermediate'
    },
    description: {
      uk: 'Легка ранкова практика, спрямована на розкриття суглобів і запуск енергії на весь день. Ідеально підходить для тих, хто хоче розпочати день з усвідомленості та гармонії.',
      en: 'Light morning practice aimed at opening joints and launching energy for the whole day. Perfect for those who want to start the day with awareness and harmony.'
    },
    methodology: {
      uk: 'Класична хатха-йога з акцентом на дихання і гнучкість. Статичні пози, глибоке дихання, медитативний підхід.',
      en: 'Classical hatha yoga with emphasis on breathing and flexibility. Static poses, deep breathing, meditative approach.'
    },
    benefits: {
      uk: [
        'Покращення гнучкості та рухливості суглобів',
        'Зниження рівня стресу та тривожності',
        'Підвищення енергії на весь день',
        'Покращення концентрації та фокусу',
        'Зміцнення м\'язів кора'
      ],
      en: [
        'Improved flexibility and joint mobility',
        'Reduced stress and anxiety levels',
        'Increased energy for the whole day',
        'Better concentration and focus',
        'Strengthened core muscles'
      ]
    },
    whatToBring: {
      uk: [
        'Зручний одяг для йоги',
        'Килимок для йоги (є в студії)',
        'Пляшку води',
        'Рушник (за бажанням)'
      ],
      en: [
        'Comfortable yoga clothes',
        'Yoga mat (available in studio)',
        'Water bottle',
        'Towel (optional)'
      ]
    }
  },
  {
    id: 'vinyasa-flow',
    name: {
      uk: 'Віньяса Флоу',
      en: 'Vinyasa Flow'
    },
    instructor: 'andriy',
    time: '19:00',
    duration: 90,
    level: {
      uk: 'Середній та високий рівень',
      en: 'Intermediate and advanced'
    },
    description: {
      uk: 'Динамічна практика, що поєднує рух і дихання в єдиний потік. Кожен рух синхронізований з диханням, створюючи медитативний танець тіла та розуму.',
      en: 'Dynamic practice that combines movement and breathing into a single flow. Each movement is synchronized with breathing, creating a meditative dance of body and mind.'
    },
    methodology: {
      uk: 'Авторський мікс power-йоги і балансних асан. Динамічні зв\'язки, правильне дихання, концентрація на плавності переходів.',
      en: 'Author\'s mix of power yoga and balance asanas. Dynamic connections, proper breathing, focus on smooth transitions.'
    },
    benefits: {
      uk: [
        'Розвиток сили та витривалості',
        'Покращення координації та балансу',
        'Детоксикація через активний рух',
        'Розвиток ментальної стійкості',
        'Покращення серцево-судинної системи'
      ],
      en: [
        'Development of strength and endurance',
        'Improved coordination and balance',
        'Detoxification through active movement',
        'Mental resilience development',
        'Cardiovascular system improvement'
      ]
    },
    whatToBring: {
      uk: [
        'Зручний спортивний одяг',
        'Килимок для йоги з хорошим зчепленням',
        'Рушник для поту',
        'Вода для регідратації'
      ],
      en: [
        'Comfortable sportswear',
        'Yoga mat with good grip',
        'Sweat towel',
        'Water for rehydration'
      ]
    }
  },
  {
    id: 'meditation-beginners',
    name: {
      uk: 'Медитація для початківців',
      en: 'Meditation for Beginners'
    },
    instructor: 'olena',
    time: '18:00',
    duration: 60,
    level: {
      uk: 'Всі рівні',
      en: 'All levels'
    },
    description: {
      uk: 'Практика усвідомленості для заспокоєння розуму та відновлення внутрішньої рівноваги. Ідеально для тих, хто хоче навчитися медитувати або поглибити свою практику.',
      en: 'Mindfulness practice for calming the mind and restoring inner balance. Perfect for those who want to learn to meditate or deepen their practice.'
    },
    methodology: {
      uk: 'Майндфулнес, тілесне дихання, звукотерапія. Використання тибетських чаш, керованих медитацій та дихальних технік.',
      en: 'Mindfulness, body breathing, sound therapy. Use of Tibetan bowls, guided meditations and breathing techniques.'
    },
    benefits: {
      uk: [
        'Зниження стресу та тривожності',
        'Покращення якості сну',
        'Підвищення емоційної стабільності',
        'Розвиток концентрації уваги',
        'Відновлення енергетичного балансу'
      ],
      en: [
        'Stress and anxiety reduction',
        'Improved sleep quality',
        'Increased emotional stability',
        'Attention concentration development',
        'Energy balance restoration'
      ]
    },
    whatToBring: {
      uk: [
        'Зручний одяг',
        'Подушку для медитації (є в студії)',
        'Плед або шаль',
        'Відкритий розум та готовність до практики'
      ],
      en: [
        'Comfortable clothes',
        'Meditation cushion (available in studio)',
        'Blanket or shawl',
        'Open mind and readiness to practice'
      ]
    }
  }
];

export const getClassById = (id: string): YogaClass | undefined => {
  return yogaClasses.find(yogaClass => yogaClass.id === id);
};
