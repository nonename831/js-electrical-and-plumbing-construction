import React from 'react';
import { Plus, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';

// Common questions as a native <details> accordion (keyboard and screen-reader friendly)
export const Faq: React.FC = () => {
  const { t, whatsappUrl } = useLanguage();

  return (
    <section id="faq" className="bg-white px-4 pb-16 md:pb-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto border-t border-slate-100 pt-16 md:pt-24 grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
        <div className="text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blueText text-sm font-bold tracking-wider uppercase mb-4">
            {t.faq.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">{t.faq.title}</h2>
          <p className="mt-6 text-slate-500">{t.faq.more}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'faq' })}
            className="mt-2 inline-flex items-center gap-2 font-bold text-brand-green hover:text-brand-greenHover transition-colors"
          >
            <MessageCircle size={18} />
            {t.faq.ask}
          </a>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <details
              key={i}
              open={i === 0}
              className="group rounded-2xl border border-slate-200 bg-slate-50/60 open:bg-white open:shadow-lg open:shadow-slate-900/5 open:border-brand-blue/20 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 md:px-6 py-4 md:py-5 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="shrink-0 w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center transition-transform duration-200 group-open:rotate-45">
                  <Plus size={18} />
                </span>
              </summary>
              <p className="px-5 md:px-6 pb-5 -mt-1 text-slate-600 leading-relaxed text-pretty">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
