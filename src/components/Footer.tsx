import React from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';

const YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    // Extra bottom padding on mobile so the floating WhatsApp button doesn't cover the text
    <footer className="bg-brand-dark text-white text-center pt-8 pb-28 md:pb-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-sm text-gray-200 mb-6">
          <a
            href={CONTACT_INFO.telUrl}
            onClick={() => trackEvent('phone_click', { source: 'footer' })}
            className="flex items-center gap-2 font-semibold hover:text-brand-cyan transition-colors"
          >
            <Phone size={14} className="text-brand-cyan" />
            {CONTACT_INFO.contactName} · {CONTACT_INFO.phone}
          </a>
          <span className="flex items-center gap-2">
            <Clock size={14} className="text-brand-cyan" />
            {t.contact.hours}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-brand-cyan" />
            {CONTACT_INFO.area}, Johor
          </span>
        </div>
        <p className="text-gray-300 text-sm">
          &copy; {YEAR} JS Electrical & Plumbing Construction. <span className="whitespace-nowrap">{t.footer.rights}</span>
        </p>
      </div>
    </footer>
  );
};
