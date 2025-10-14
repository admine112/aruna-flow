import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Home, Calendar, Info, Mail } from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLanguage();

  const navItems = [
    { key: 'home', label: t.nav.home, icon: Home },
    { key: 'schedule', label: t.nav.schedule, icon: Calendar },
    { key: 'about', label: t.nav.about, icon: Info },
    { key: 'contacts', label: t.nav.contacts, icon: Mail },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50">
      <nav className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.key;

          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'text-amber-600 scale-105'
                  : 'text-stone-500 hover:text-amber-500'
              }`}
            >
              <Icon size={20} className={isActive ? 'mb-1' : 'mb-1 opacity-70'} />
              <span className={`text-xs ${isActive ? 'font-medium' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
