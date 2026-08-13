import React from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SEO } from './components/Seo';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from './constants';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { trackEvent } from './lib/analytics';

// Global scroll-reveal styles injected once
const GlobalAnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Navbar slides in from top */
    nav {
      animation: fadeInDown 0.4s ease both;
    }

    /* Header hero fades up */
    header {
      animation: fadeInUp 0.6s ease 0.1s both;
    }

    /* Contact section */
    #contact {
      animation: none; /* handled by IntersectionObserver in component */
    }
  `}</style>
);

// Contact wrapper with scroll reveal
const AnimatedContact = () => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <Contact />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div id="home" className="min-h-screen flex flex-col font-sans bg-gray-50">
      <GlobalAnimationStyles />
      <SEO />
      <Navbar />
      <Header />

      <main className="flex-grow">
        <Services />
        <Gallery />
        <AnimatedContact />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { source: 'floating_button' })}
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping group-hover:animate-none" />
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

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;