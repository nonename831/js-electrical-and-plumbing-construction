import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Fact strip that overlaps the bottom edge of the hero
export const TrustStrip: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative z-20 px-4 -mt-10 md:-mt-12 animate-fade-in-up">
      <ul className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 [&>li]:border-slate-100">
        {t.trust.map((item, i) => (
          <li
            key={i}
            className={`px-4 py-5 md:py-6 text-center ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 1 ? 'md:border-r' : ''}`}
          >
            <p className="text-xl min-[380px]:text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight whitespace-nowrap">{item.value}</p>
            <p className="mt-1 text-xs md:text-sm text-slate-500 font-medium">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
