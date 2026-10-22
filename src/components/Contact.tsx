import React from 'react';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { AREAS_SERVED, CONTACT_INFO } from '../siteData';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';
import { copyPhoneOnDesktop } from '../lib/phone';

export const Contact: React.FC = () => {
  const { t, whatsappUrl } = useLanguage();

  return (
    <section id="contact" className="py-16 md:py-24 px-4 max-w-4xl mx-auto scroll-mt-20">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-brand-dark p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {t.contact.title}
          </h2>
          <p className="text-blue-200 text-balance">{t.contact.subtitle}</p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-blue-100 p-3 rounded-full text-brand-blue mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-lg mb-1">{t.contact.callOrWhatsapp}</h3>
              <p className="text-gray-600 mb-2">{CONTACT_INFO.contactName}</p>
              <a
                href={CONTACT_INFO.telUrl}
                onClick={e => { trackEvent('phone_click', { source: 'contact_section' }); copyPhoneOnDesktop(e, t.phoneCopy); }}
                className="text-brand-blue font-semibold text-lg hover:underline"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-blue-100 p-3 rounded-full text-brand-blue mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-lg mb-1">{t.contact.serviceArea}</h3>
              <p className="text-gray-600">{t.contact.covering}</p>
              <p className="text-brand-dark font-semibold mt-1">{CONTACT_INFO.area}</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
                {AREAS_SERVED.filter(area => area !== CONTACT_INFO.area).map(area => (
                  <li key={area} className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'contact_section' })}
              className="
                group inline-flex items-center justify-center gap-3
                bg-brand-green text-white px-8 py-4 rounded-full
                text-lg font-bold shadow-lg
                hover:bg-brand-greenHover hover:shadow-xl
                md:hover:-translate-y-1
                transition-all duration-300
                w-full md:w-auto
              "
            >
              <MessageCircle size={24} className="group-hover:animate-pulse" />
              <span>{t.contact.chatButton}</span>
            </a>

            <p className="mt-5 text-sm text-slate-700 font-semibold flex items-center justify-center gap-2">
              <Clock size={16} className="text-brand-blue" />
              {t.contact.hours}
            </p>
            <p className="mt-2 text-sm text-gray-500 font-medium text-center text-balance">
              <span className="inline-block w-2 h-2 mr-2 align-middle bg-green-500 rounded-full animate-pulse" />
              {t.contact.response}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
