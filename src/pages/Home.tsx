import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Users, Home as HomeIcon, Clock, Heart, Star } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="pt-36 md:pt-44">
      <HeroSection onNavigate={onNavigate} />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
};

const HeroSection: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const scrollToContacts = () => {
    onNavigate('contacts');
    setTimeout(() => {
      const formSection = document.getElementById('booking-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-stone-50">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-300 to-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-rose-200 to-amber-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left space-y-6 animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-800 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl text-amber-700 font-light">
              {t.hero.subtitle}
            </p>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button
                onClick={scrollToContacts}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {t.hero.cta}
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-white text-amber-700 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-amber-200"
              >
                {t.about.title}
              </button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Yoga at sunrise"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-400 rounded-full blur-2xl opacity-50" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-rose-300 rounded-full blur-2xl opacity-50" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

const BenefitsSection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const benefits = [
    {
      icon: Users,
      title: t.benefits.professional.title,
      description: t.benefits.professional.description,
    },
    {
      icon: HomeIcon,
      title: t.benefits.space.title,
      description: t.benefits.space.description,
    },
    {
      icon: Clock,
      title: t.benefits.schedule.title,
      description: t.benefits.schedule.description,
    },
    {
      icon: Heart,
      title: t.benefits.approach.title,
      description: t.benefits.approach.description,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={ref}
          className={`text-3xl md:text-4xl font-serif text-center text-stone-800 mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {t.benefits.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BenefitCard: React.FC<{ benefit: any; index: number }> = ({ benefit, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = benefit.icon;

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-amber-50 to-rose-50 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
        <Icon className="text-white" size={28} />
      </div>
      <h3 className="text-xl font-semibold text-stone-800 mb-2">{benefit.title}</h3>
      <p className="text-stone-600 leading-relaxed">{benefit.description}</p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const testimonials = [
    {
      text: t.testimonials.testimonial1.text,
      name: t.testimonials.testimonial1.name,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      text: t.testimonials.testimonial2.text,
      name: t.testimonials.testimonial2.name,
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      text: t.testimonials.testimonial3.text,
      name: t.testimonials.testimonial3.name,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-stone-50 to-amber-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2
          ref={ref}
          className={`text-3xl md:text-4xl font-serif text-center text-stone-800 mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {t.testimonials.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: any; index: number }> = ({ testimonial, index }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-stone-600 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
      <div className="flex items-center space-x-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <p className="font-semibold text-stone-800">{testimonial.name}</p>
      </div>
    </div>
  );
};
