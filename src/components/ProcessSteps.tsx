import React from 'react';
import { MessageCircle, CalendarCheck, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';

const ICONS = [MessageCircle, CalendarCheck, Wrench];

// How a job goes, in three steps, on a dark band between Services and Gallery
export const ProcessSteps: React.FC = () => {
  const { t, whatsappUrl } = useLanguage();

  return (
    <section id="process" className="relative bg-brand-dark text-white py-16 md:py-20 px-4 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-cyan text-sm font-bold tracking-wider uppercase mb-4">
            {t.process.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">{t.process.title}</h2>
        </div>

        <ol className="relative grid gap-6 md:grid-cols-3 md:gap-8">
          {/* connector line behind the step icons (desktop) */}
          <div aria-hidden="true" className="hidden md:block absolute top-7 left-[16.7%] right-[16.7%] border-t-2 border-dashed border-white/20" />
          {t.process.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li key={i} className="relative flex md:flex-col items-start md:items-center gap-4 md:text-center">
                <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-lg ring-8 ring-brand-dark">
                  <Icon size={26} strokeWidth={1.8} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-cyan text-brand-dark text-xs font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-bold">{step.title}</h3>
                  <p className="mt-1 text-blue-100/80 text-sm md:text-base text-pretty">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 md:mt-12 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'process' })}
            className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-greenHover text-white px-7 py-3.5 rounded-full font-bold shadow-lg transition-colors w-full sm:w-auto"
          >
            <MessageCircle size={20} />
            {t.process.cta}
          </a>
        </div>
      </div>
    </section>
  );
};
