import React from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SEO } from './components/Seo';
import { TrustStrip } from './components/TrustStrip';
import { MobileActionBar } from './components/MobileActionBar';
import { Toast } from './components/Toast';
import { MessageCircle } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { trackEvent } from './lib/analytics';

// Contact wrapper with scroll reveal
const AnimatedContact = () => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.1);

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
  const { t, whatsappUrl } = useLanguage();

  return (
    <div id="home" className="min-h-screen flex flex-col font-sans bg-gray-50">
      <SEO />
      <Navbar />
      <Header />
      <TrustStrip />

      <main className="flex-grow">
        <Services />
        <Gallery />
        <AnimatedContact />
      </main>

      <Footer />

      <MobileActionBar />
      <Toast />

      {/* Floating WhatsApp Button (desktop; phones/tablets get MobileActionBar) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { source: 'floating_button' })}
        className="hidden lg:flex fixed bottom-6 right-6 z-50 group items-center justify-center"
        aria-label={t.floating.ariaLabel}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green/60 animate-ping-few" />
        <div className="relative bg-brand-green text-white p-4 rounded-full shadow-2xl hover:bg-brand-greenHover hover:scale-110 transition-all duration-300 flex items-center gap-2 border-4 border-white/20">
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
