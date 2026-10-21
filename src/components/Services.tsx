import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ServiceItem } from '../types';

// ── Individual service card ─────────────────────────────────────────────────
interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  // Staggered delay per card
  const delay = `${index * 120}ms`;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? delay : '0ms',
      }}
      className={`
        group relative bg-white rounded-3xl p-6 md:p-8
        grid grid-cols-[auto_1fr] items-center gap-x-4 md:flex md:flex-col md:items-start
        shadow-sm hover:shadow-2xl hover:shadow-brand-blue/10
        border border-slate-100 hover:border-brand-blue/20
        overflow-hidden cursor-default
        transition-all duration-500
        ${visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
        }
        hover:-translate-y-1
      `}
    >
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Icon */}
      <div className="md:mb-6 p-3 md:p-4 rounded-2xl bg-slate-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
        <service.icon size={32} strokeWidth={1.8} className="w-7 h-7 md:w-8 md:h-8" />
      </div>

      {/* Text */}
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 md:mb-3 group-hover:text-brand-blue transition-colors">
        {service.title}
      </h3>
      <p className="col-span-2 mt-3 md:mt-0 text-gray-600 leading-relaxed text-base text-pretty">
        {service.description}
      </p>

    </div>
  );
};

// ── Section heading with scroll reveal ─────────────────────────────────────
const SectionHeading: React.FC = () => {
  const { t } = useLanguage();
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`
        text-center max-w-3xl mx-auto mb-12
        transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold tracking-wider uppercase mb-4">
        {t.services.sectionTitle}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight text-balance">
        {t.services.mainTitle}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-balance">
        {t.services.description}
      </p>
    </div>
  );
};

// ── Main export ─────────────────────────────────────────────────────────────
export const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 relative scroll-mt-20 overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
          {t.services.items.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};