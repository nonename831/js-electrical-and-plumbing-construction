import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';

// Past this scroll offset the hero's own call/WhatsApp buttons are out of view
const SHOW_AFTER_PX = 480;

// Fixed call / WhatsApp bar for phones and tablets (replaces the floating bubble below lg)
export const MobileActionBar: React.FC = () => {
  const { t, whatsappUrl } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] px-4 pt-3 pb-3 transition-all duration-300 ${visible ? 'translate-y-0 visible' : 'translate-y-full invisible'}`}
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
        <a
          href={CONTACT_INFO.telUrl}
          onClick={() => trackEvent('phone_click', { source: 'mobile_bar' })}
          className="flex items-center justify-center gap-2 bg-brand-blue text-white py-3 rounded-full font-bold shadow-md active:scale-95 transition-transform"
        >
          <Phone size={18} className="fill-current" />
          {t.header.callUs}
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { source: 'mobile_bar' })}
          className="flex items-center justify-center gap-2 bg-brand-green text-white py-3 rounded-full font-bold shadow-md active:scale-95 transition-transform"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  );
};
