import React from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SEO } from './components/Seo';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from './constants';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div id="home" className="min-h-screen flex flex-col font-sans bg-gray-50">
      <SEO />

      {/* Navbar at the top */}
      <Navbar />

      {/* Header (Hero Branding) */}
      <Header />

      <main className="flex-grow">
        <Services />
        {/* Pricing Section Removed */}
        <Contact />
      </main>
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        {/* Ping Animation Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping group-hover:animate-none"></span>

        <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center gap-2 border-4 border-white/20">
          <MessageCircle size={28} className="fill-white text-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-lg">
            {t.floating.chat}
          </span>
        </div>
      </a>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;