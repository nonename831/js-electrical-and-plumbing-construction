import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ZoomIn, Zap, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Language } from '../types';

type Category = 'electrical' | 'plumbing';

interface GalleryImage {
  src: string;
  category: Category;
  caption: Record<Language, string>;
  objectPosition?: string;
}

const BASE = `${import.meta.env.BASE_URL}assets/images`;

// Grid uses the 600px `-thumb` variant; the lightbox loads the full image.
const thumbOf = (src: string) => src.replace(/\.webp$/, '-thumb.webp');

const SWIPE_THRESHOLD = 50;

const IMAGES: GalleryImage[] = [
  { src: `${BASE}/electrical-1.webp`, category: 'electrical', caption: { zh: '安装配电箱', en: 'DB Box Installation' } },
  { src: `${BASE}/electrical-2.webp`, category: 'electrical', caption: { zh: '安装插头', en: 'Socket Installation' } },
  { src: `${BASE}/electrical-3.webp`, category: 'electrical', caption: { zh: '安装灯具', en: 'Light Fixture Installation' }, objectPosition: 'top' },
  { src: `${BASE}/electrical-4.webp`, category: 'electrical', caption: { zh: '安装风扇', en: 'Ceiling Fan Installation' } },
  { src: `${BASE}/plumbing-1.webp`, category: 'plumbing', caption: { zh: '安装热水器', en: 'Water Heater Installation' }, objectPosition: '50% 20%' },
  { src: `${BASE}/plumbing-2.webp`, category: 'plumbing', caption: { zh: '水管维修', en: 'Pipe Repair' }, objectPosition: '50% 10%' },
  { src: `${BASE}/plumbing-3.webp`, category: 'plumbing', caption: { zh: '安装马桶', en: 'Toilet Installation' }, objectPosition: 'top' },
  { src: `${BASE}/plumbing-4.webp`, category: 'plumbing', caption: { zh: '安装洗手盆', en: 'Basin Installation' }, objectPosition: 'top' },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  image: GalleryImage;
  caption: string;
  labels: { close: string; prev: string; next: string };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const Lightbox: React.FC<LightboxProps> = ({ image, caption, labels, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > SWIPE_THRESHOLD && hasPrev) onPrev();
    if (dx < -SWIPE_THRESHOLD && hasNext) onNext();
  };

  // Runs once per open: move focus in, lock page scroll, and restore focus
  // to the trigger on close. Kept separate from the key handler so that
  // navigating between images doesn't bounce focus out and back in.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, []);

  // Escape / arrow keys, and trap Tab within the modal so keyboard users
  // can't reach page content hidden behind the overlay.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();

      const container = containerRef.current;
      if (e.key === 'Tab' && container) {
        const nodes = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        // Focus can drop to <body> when the prev/next button it was on
        // unmounts at either end of the list — pull it back inside.
        if (!container.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      // Above the sticky navbar and floating WhatsApp button (both z-50)
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={caption}
          className="w-full object-cover max-h-[70vh]"
          style={{ objectPosition: image.objectPosition ?? 'center' }}
        />
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="text-slate-700 font-semibold text-sm">{caption}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Prev / next */}
      {hasPrev && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onPrev(); }}
          aria-label={labels.prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft size={28} />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onNext(); }}
          aria-label={labels.next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const Gallery: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('electrical');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const filtered = IMAGES.filter(img => img.category === activeCategory);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextImage = useCallback(() => setLightboxIndex(i => (i !== null && i < filtered.length - 1 ? i + 1 : i)), [filtered.length]);

  const tabs: { key: Category; label: string; icon: React.ReactNode }[] = [
    { key: 'electrical', label: t.gallery.tabElectrical, icon: <Zap size={16} /> },
    { key: 'plumbing', label: t.gallery.tabPlumbing, icon: <Droplets size={16} /> },
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 px-4 bg-white scroll-mt-20">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold tracking-wider uppercase mb-4">
            {t.gallery.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            {t.gallery.title}
          </h2>
          <p className="mt-2 text-gray-500 text-balance">
            {t.gallery.subtitle}
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              aria-pressed={activeCategory === tab.key}
              onClick={() => { setActiveCategory(tab.key); setLightboxIndex(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-150 ${activeCategory === tab.key
                  ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-100 shadow-sm hover:shadow-lg transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <span className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                {activeCategory === 'electrical' ? <Zap size={32} /> : <Droplets size={32} />}
              </span>
              <img
                src={thumbOf(img.src)}
                alt={img.caption[language]}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
                style={{ objectPosition: img.objectPosition ?? 'center' }}
                onError={e => { e.currentTarget.style.opacity = '0'; }}
              />
              <span className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/50 group-focus-visible:bg-brand-dark/50 transition-all duration-150 flex items-center justify-center">
                <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150" />
              </span>
              {/* Always visible on touch screens (no hover); hover/focus reveal on desktop */}
              <span className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-150 text-left">
                <span className="block text-white text-xs font-semibold truncate" aria-hidden="true">
                  {img.caption[language]}
                </span>
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm">{t.gallery.empty}</p>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          image={filtered[lightboxIndex]}
          caption={filtered[lightboxIndex].caption[language]}
          labels={t.gallery}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filtered.length - 1}
        />
      )}
    </section>
  );
};
