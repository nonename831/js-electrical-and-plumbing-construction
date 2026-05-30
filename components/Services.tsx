import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// ── Scroll-reveal hook ──────────────────────────────────────────────────────
function useScrollReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ── Individual service card ─────────────────────────────────────────────────
interface ServiceCardProps {
  service: { title: string; description: string; icon: React.ElementType };
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);

  // Staggered delay per card
  const delay = `${index * 120}ms`;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transitionDelay: visible ? delay : '0ms',
      }}
      className={`
        group relative bg-white rounded-3xl p-8 flex flex-col items-start
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

      {/* ── Icon wrapper with animation ── */}
      <div className="mb-6 relative">
        {/* Glow blob */}
        <div className="absolute inset-0 bg-brand-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon circle */}
        <div
          className={`
            relative p-4 rounded-2xl
            bg-slate-50 text-brand-blue
            group-hover:bg-brand-blue group-hover:text-white
            transition-colors duration-300
            ${hovered ? 'animate-icon-bounce' : ''}
          `}
          style={{
            // CSS keyframe injected via <style> below
            animation: hovered ? 'iconBounce 0.5s ease' : 'none',
          }}
        >
          <service.icon size={32} strokeWidth={1.8} />
        </div>

        {/* Orbiting ring — appears on hover */}
        <div
          className={`
            absolute inset-0 rounded-2xl border-2 border-brand-cyan/40
            transition-all duration-300
            ${hovered ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}
          `}
        />
      </div>

      {/* Text */}
      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-base">
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
        text-center max-w-3xl mx-auto mb-16
        transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold tracking-wider uppercase mb-4">
        {t.services.sectionTitle}
      </span>
      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
        {t.services.mainTitle}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
        {t.services.description}
      </p>
    </div>
  );
};

// ── Main export ─────────────────────────────────────────────────────────────
export const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-10 bg-slate-50 relative scroll-mt-20 overflow-hidden">
      {/* keyframe for icon bounce */}
      <style>{`
        @keyframes iconBounce {
          0%   { transform: scale(1) rotate(0deg); }
          25%  { transform: scale(1.2) rotate(-8deg); }
          50%  { transform: scale(0.95) rotate(6deg); }
          75%  { transform: scale(1.1) rotate(-3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.services.items.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};