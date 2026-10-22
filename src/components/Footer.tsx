import React from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { BUSINESS_NAME } from '../siteData';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';
import { copyPhoneOnDesktop } from '../lib/phone';

const YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const links = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    // Extra bottom padding below lg so the fixed call/WhatsApp bar doesn't cover the text
    <footer className="bg-brand-dark text-white pt-12 pb-28 lg:pb-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1.4fr_1fr_1.4fr] text-center md:text-left">
        {/* Brand */}
        <div>
          <p className="text-xl font-extrabold tracking-tight">{BUSINESS_NAME[language]}</p>
          <p className="mt-2 text-sm text-blue-100/70">
            {t.header.taglinePrefix} {t.header.taglineSuffix}
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label={t.footer.links}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-cyan mb-3">{t.footer.links}</h3>
          <ul className="space-y-2 text-sm">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} className="text-gray-200 hover:text-brand-cyan transition-colors">{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-cyan mb-3">{t.footer.contact}</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <a
                href={CONTACT_INFO.telUrl}
                onClick={e => { trackEvent('phone_click', { source: 'footer' }); copyPhoneOnDesktop(e, t.phoneCopy); }}
                className="inline-flex items-center gap-2 font-semibold hover:text-brand-cyan transition-colors"
              >
                <Phone size={14} className="text-brand-cyan" />
                {CONTACT_INFO.contactName} · {CONTACT_INFO.phone}
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Clock size={14} className="text-brand-cyan" />
              {t.contact.hours}
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <MapPin size={14} className="text-brand-cyan" />
              {CONTACT_INFO.area}, Johor
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
        &copy; {YEAR} JS Electrical & Plumbing Construction. <span className="whitespace-nowrap">{t.footer.rights}</span>
      </div>
    </footer>
  );
};
