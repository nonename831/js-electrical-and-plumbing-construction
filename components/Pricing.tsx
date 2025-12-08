import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Pricing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 px-4 bg-slate-50 relative overflow-hidden scroll-mt-20">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{t.pricing.sectionTitle}</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t.pricing.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.pricing.items.map((item, index) => (
            <div
              key={index}
              className={`
                bg-white rounded-3xl p-8 transition-all duration-300 flex flex-col
                ${index === 1 ? 'shadow-2xl ring-2 ring-brand-blue scale-105 z-10' : 'shadow-xl hover:shadow-2xl border border-gray-100'}
              `}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-bold shadow-md uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-8">{item.description}</p>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-baseline mb-4">
                  {item.isStartingPrice && <span className="text-gray-400 mr-1 font-medium">{t.pricing.from}</span>}
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{item.price}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="font-medium">{t.pricing.professional}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="font-medium">Warranty Included</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};