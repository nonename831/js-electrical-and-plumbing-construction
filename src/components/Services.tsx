import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ServiceItem } from '../types';
import { Category, showGalleryCategory } from './Gallery';
import { photoSrcSet } from '../lib/images';

// Real job photo + gallery tab for each service, by position in TRANSLATIONS.services.items
const SERVICE_MEDIA: { photo: string; position?: string; category: Category }[] = [
  { photo: 'electrical-1', category: 'electrical' },
  { photo: 'electrical-4', position: '50% 5%', category: 'electrical' },
  { photo: 'plumbing-2', position: '50% 15%', category: 'plumbing' },
  { photo: 'plumbing-3', position: '50% 20%', category: 'plumbing' },
];

// ── Individual service card ─────────────────────────────────────────────────
interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  viewWorkLabel: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, viewWorkLabel }) => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const media = SERVICE_MEDIA[index];

  // Staggered delay per card
  const delay = `${index * 120}ms`;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? delay : '0ms',
      }}
      className={`
        group relative bg-white rounded-3xl
        flex md:flex-col
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

      {/* Photo: left strip on phones, top banner from md */}
      <div className="relative w-28 shrink-0 md:w-full md:aspect-[2/1] overflow-hidden bg-slate-100">
        <img
          src={`${import.meta.env.BASE_URL}assets/images/${media.photo}-thumb.webp`}
          srcSet={photoSrcSet(media.photo)}
          sizes="(min-width: 768px) 490px, 112px"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: media.position ?? 'center' }}
        />
      </div>

      <div className="flex-1 min-w-0 p-5 md:p-8 md:pt-0 flex flex-col items-start">
        {/* Icon tile overlapping the photo's bottom edge (desktop) */}
        <div className="hidden md:flex -mt-8 mb-5 relative w-16 h-16 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-lg ring-4 ring-white group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
          <service.icon size={30} strokeWidth={1.8} />
        </div>

        <h3 className="flex items-center gap-2 text-lg md:text-2xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
          <service.icon size={20} strokeWidth={2} className="md:hidden shrink-0 text-brand-blue" />
          {service.title}
        </h3>
        <p className="mt-2 md:mt-3 text-gray-600 leading-relaxed text-sm md:text-base text-pretty">
          {service.description}
        </p>
        <a
          href="#gallery"
          onClick={() => showGalleryCategory(media.category)}
          className="mt-3 md:mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:gap-2 transition-all"
        >
          {viewWorkLabel}
          <ArrowRight size={16} />
        </a>
      </div>

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
      <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blueText text-sm font-bold tracking-wider uppercase mb-4">
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
            <ServiceCard key={index} service={service} index={index} viewWorkLabel={t.services.viewWork} />
          ))}
        </div>
      </div>
    </section>
  );
};