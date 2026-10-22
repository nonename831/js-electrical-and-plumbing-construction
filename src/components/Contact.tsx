import React from 'react';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { AREAS_SERVED, CONTACT_INFO } from '../siteData';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';
import { copyPhoneOnDesktop } from '../lib/phone';

export const Contact: React.FC = () => {
  const { t, whatsappUrl } = useLanguage();
  const onPhoneClick = (source: string) => (e: React.MouseEvent) => {
    trackEvent('phone_click', { source });
    copyPhoneOnDesktop(e, t.phoneCopy);
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_minmax(0,28rem)] gap-10 lg:gap-16 items-center">

        {/* Left: headline + actions */}
        <div className="text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blueText text-sm font-bold tracking-wider uppercase mb-4">
            {t.contact.title}
          </span>
          <h2 className="text-[1.4rem] min-[380px]:text-2xl md:text-4xl lg:text-[2rem] xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            {t.contact.subtitle}
          </h2>
          <p className="mt-4 text-gray-500 font-medium text-balance">
            <span className="inline-block w-2 h-2 mr-2 align-middle bg-green-500 rounded-full animate-pulse" />
            {t.contact.response}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'contact_section' })}
              className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-greenHover text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle size={22} />
              {t.contact.chatButton}
            </a>
            <a
              href={CONTACT_INFO.telUrl}
              onClick={onPhoneClick('contact_call_button')}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-dark border-2 border-brand-dark/15 hover:border-brand-blue hover:text-brand-blue px-8 py-4 rounded-full text-lg font-bold transition-colors"
            >
              <Phone size={20} />
              {t.header.callUs}
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-700 font-semibold flex items-center justify-center lg:justify-start gap-2">
            <Clock size={16} className="text-brand-blue" />
            {t.contact.hours}
          </p>
        </div>

        {/* Right: contact card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-brand-blue text-white text-2xl font-extrabold flex items-center justify-center">
              {CONTACT_INFO.contactName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-500 font-medium">{t.contact.callOrWhatsapp}</p>
              <p className="text-lg font-bold text-slate-900">{CONTACT_INFO.contactName}</p>
            </div>
          </div>
          <a
            href={CONTACT_INFO.telUrl}
            onClick={onPhoneClick('contact_section')}
            className="mt-5 block text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight hover:text-brand-dark transition-colors"
          >
            {CONTACT_INFO.phone}
          </a>

          <div className="my-6 border-t border-slate-100" />

          <h3 className="flex items-center gap-2 font-bold text-slate-900">
            <MapPin size={18} className="text-brand-blue" />
            {t.contact.serviceArea}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {t.contact.covering} <span className="font-semibold text-brand-dark">{CONTACT_INFO.area}</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {AREAS_SERVED.filter(area => area !== CONTACT_INFO.area).map(area => (
              <li key={area} className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
