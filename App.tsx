
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { SiteImages, CLINIC_INFO } from './types';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  // تحديث الصورة الرئيسية بصورة الدكتور الجديدة
  const [siteImages, setSiteImages] = useState<SiteImages>({
    hero: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800&h=1000',
    clinic: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    surgery: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    colon: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const handleImageUpdate = (target: string, url: string) => {
    setSiteImages(prev => ({ ...prev, [target]: url }));
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 font-cairo">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow pt-20 page-transition">
        <Routes>
          <Route path="/" element={<Home siteImages={siteImages} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/201118250389`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce"
        aria-label="WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.038 3.041l-.694 2.54 2.6-.681c.747.473 1.8.803 2.831.803 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.585-5.763-5.775-5.763zm3.426 8.21c-.149.418-.846.764-1.156.811-.277.041-.638.079-1.026-.047-.245-.08-1.55-.584-2.11-.832-.17-.076-.289-.138-.415-.22-.387-.253-.665-.544-.888-.87-.222-.326-.307-.643-.284-1.018.022-.375.143-.651.373-.87.23-.22.441-.301.59-.301.149 0 .284.004.375.011l.143.016c.15.011.23.023.333.242l.375.911c.038.094.072.184.102.263.076.202.124.331.023.532-.1.201-.15.301-.25.402-.1.101-.202.21-.301.301-.1.091-.214.187-.091.391.124.204.55.908 1.181 1.463.541.474 1.001.621 1.204.723.204.102.323.087.442-.053.12-.139.511-.59.651-.791.139-.201.278-.17.471-.091l1.103.543c.192.091.32.15.39.263.071.113.071.652-.078 1.071z"/>
        </svg>
      </a>

      <Footer />
      <ChatBot onImageUpdate={handleImageUpdate} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
