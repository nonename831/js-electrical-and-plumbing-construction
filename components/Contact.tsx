import React, { useEffect } from 'react';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  // ✅ Fix WhatsApp back-navigation stacking issue (Safari / Chrome mobile)
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return (
    <section id="contact" className="py-10 px-4 max-w-4xl mx-auto scroll-mt-20">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-brand-dark p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {t.contact.title}
          </h2>
          <p className="text-blue-200">{t.contact.subtitle}</p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-blue-100 p-3 rounded-full text-brand-blue mb-4">
                <Phone size={24} />
              </div>
              <h4 className="font-bold text-lg mb-1">
                {t.contact.callOrWhatsapp}
              </h4>
              <p className="text-gray-600 mb-2">
                {CONTACT_INFO.contactName}
              </p>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="text-brand-blue font-semibold text-lg hover:underline"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-blue-100 p-3 rounded-full text-brand-blue mb-4">
                <MapPin size={24} />
              </div>
              <h4 className="font-bold text-lg mb-1">
                {t.contact.serviceArea}
              </h4>
              <p className="text-gray-600">{t.contact.covering}</p>
              <p className="text-brand-dark font-semibold mt-1">
                {CONTACT_INFO.area}
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
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
              <MessageCircle
                size={24}
                className="group-hover:animate-pulse"
              />
              <span>{t.contact.chatButton}</span>
            </a>

            <p className="mt-5 text-sm text-gray-400 font-medium flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {t.contact.response}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
