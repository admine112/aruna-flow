import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Home } from './pages/Home';
import { Schedule } from './pages/Schedule';
import { About } from './pages/About';
import { Contacts } from './pages/Contacts';
import { OrderConfirmation } from './pages/OrderConfirmation';

type Page = 'home' | 'schedule' | 'about' | 'contacts' | 'order-confirmation';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'schedule':
        return <Schedule onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'contacts':
        return <Contacts onNavigate={handleNavigate} />;
      case 'order-confirmation':
        return <OrderConfirmation onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="pb-20 md:pb-0">{renderPage()}</main>
        <MobileNav currentPage={currentPage} onNavigate={handleNavigate} />
      </div>
    </LanguageProvider>
  );
}

export default App;
