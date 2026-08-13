import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, Zap, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

type Category = 'electrical' | 'plumbing';

interface GalleryImage {
  src: string;
  category: Category;
  captionZh: string;
  captionEn: string;
  objectPosition?: string;
}

const BASE = `${import.meta.env.BASE_URL}assets/images`;

const IMAGES: GalleryImage[] = [
  { src: `${BASE}/electrical-1.webp`, category: 'electrical', captionZh: '安装配电箱', captionEn: 'DB Box Installation' },
  { src: `${BASE}/electrical-2.webp`, category: 'electrical', captionZh: '安装插头', captionEn: 'Socket Installation' },
  { src: `${BASE}/electrical-3.webp`, category: 'electrical', captionZh: '安装灯具', captionEn: 'Light Fixture Installation', objectPosition: 'top' },
  { src: `${BASE}/electrical-4.webp`, category: 'electrical', captionZh: '安装风扇', captionEn: 'Ceiling Fan Installation' },
  { src: `${BASE}/plumbing-1.webp`, category: 'plumbing', captionZh: '安装热水器', captionEn: 'Water Heater Installation', objectPosition: '50% 20%' },
  { src: `${BASE}/plumbing-2.webp`, category: 'plumbing', captionZh: '水管维修', captionEn: 'Pipe Repair', objectPosition: '50% 10%' },
  { src: `${BASE}/plumbing-3.webp`, category: 'plumbing', captionZh: '安装马桶', captionEn: 'Toilet Installation', objectPosition: 'top' },
  { src: `${BASE}/plumbing-4.webp`, category: 'plumbing', captionZh: '安装洗手盆', captionEn: 'Basin Installation', objectPosition: 'top' },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  image: GalleryImage;
  caption: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ image, caption, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
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
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ✅ #5 左右切换按钮 */}
      {hasPrev && (
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft size={28} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
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
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('electrical');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const filtered = IMAGES.filter(img => img.category === activeCategory);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextImage = useCallback(() => setLightboxIndex(i => (i !== null && i < filtered.length - 1 ? i + 1 : i)), [filtered.length]);

  const tabs: { key: Category; labelZh: string; labelEn: string; icon: React.ReactNode }[] = [
    { key: 'electrical', labelZh: '电力工程', labelEn: 'Electrical Works', icon: <Zap size={16} /> },
    { key: 'plumbing', labelZh: '水喉工程', labelEn: 'Plumbing Works', icon: <Droplets size={16} /> },
  ];

  return (
    <section id="gallery" className="py-16 pb-24 px-4 bg-white scroll-mt-20">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold tracking-wider uppercase mb-4">
            {language === 'zh' ? '工程案例' : 'Our Work'}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {language === 'zh' ? '实际工程照片' : 'Project Gallery'}
          </h2>
          <p className="mt-2 text-gray-500">
            {language === 'zh' ? '真实施工记录，品质有目共睹' : 'Real work, real quality'}
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveCategory(tab.key); setLightboxIndex(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-150 ${activeCategory === tab.key
                  ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue hover:text-brand-blue'
                }`}
            >
              {tab.icon}
              {language === 'zh' ? tab.labelZh : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <div
              key={img.src}
              onClick={() => openLightbox(i)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-100 shadow-sm hover:shadow-lg transition-all duration-150 hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                {activeCategory === 'electrical' ? <Zap size={32} /> : <Droplets size={32} />}
              </div>
              <img
                src={img.src}
                alt={language === 'zh' ? img.captionZh : img.captionEn}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 group-hover:scale-105"
                style={{ objectPosition: img.objectPosition ?? 'center' }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/50 transition-all duration-150 flex items-center justify-center">
                <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <p className="text-white text-xs font-semibold truncate">
                  {language === 'zh' ? img.captionZh : img.captionEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm">{language === 'zh' ? '照片即将上传' : 'Photos coming soon'}</p>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          image={filtered[lightboxIndex]}
          caption={language === 'zh' ? filtered[lightboxIndex].captionZh : filtered[lightboxIndex].captionEn}
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