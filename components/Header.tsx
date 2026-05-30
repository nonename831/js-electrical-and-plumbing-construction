import React from 'react';
import { Phone, MapPin, Zap, Droplets, Award } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  const badges = [
    {
      icon: <Award size={16} className="text-amber-400" />,
      label: t.header.badgeExperience,
      classes: 'bg-amber-500/10 border-amber-400/20 text-amber-200 hover:bg-amber-500/20',
    },
    {
      icon: <Zap size={16} className="text-brand-cyan fill-brand-cyan/20" />,
      label: t.header.badgeElectrical,
      classes: 'bg-blue-500/10 border-blue-400/20 text-blue-200 hover:bg-blue-500/20',
    },
    {
      icon: <Droplets size={16} className="text-blue-400 fill-blue-400/20" />,
      label: t.header.badgePlumbing,
      classes: 'bg-cyan-500/10 border-cyan-400/20 text-cyan-200 hover:bg-cyan-500/20',
    },
  ];

  return (
    <header className="relative bg-slate-900 text-white overflow-hidden">
      <style>{`
        @keyframes badgePop {
          0%   { opacity: 0; transform: translateY(20px) scale(0.7); }
          60%  { opacity: 1; transform: translateY(-6px) scale(1.08); }
          80%  { transform: translateY(3px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .badge-animate {
          opacity: 0;
          animation: badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a3d62] to-slate-900 z-0" />
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:justify-between">

          {/* Left: Branding */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 flex-1 w-full">
            <div className="max-w-2xl relative">
              <div className="hidden lg:block absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-brand-cyan to-transparent rounded-full opacity-50" />

              {/* ✅ Eyebrow label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                {CONTACT_INFO.area}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t.header.titleLine1}
                <span className="block text-brand-cyan mt-1">{t.header.titleLine2}</span>
              </h1>
              <p className="mt-3 text-lg text-blue-100/90 font-medium">
                {t.header.taglinePrefix}{' '}
                <span className="text-white font-bold">{t.header.taglineSuffix}</span>
              </p>

              {/* Badges with staggered pop-in */}
              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
                {badges.map((badge, i) => (
                  <div
                    key={i}
                    className={`badge-animate flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold backdrop-blur-sm transition-all duration-150 hover:scale-105 hover:shadow-lg ${badge.classes}`}
                    style={{ animationDelay: `${300 + i * 180}ms` }}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact card (desktop only) */}
          <div className="hidden lg:flex flex-col items-end text-right pl-8 min-w-max">
            <div className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent shadow-2xl backdrop-blur-md overflow-hidden transition-transform hover:-translate-y-1 duration-150">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              <div className="relative bg-slate-900/80 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-end gap-2 text-brand-cyan font-bold mb-1 tracking-wide uppercase text-xs">
                  <Phone size={14} />
                  <span>{t.header.callUs} - Jason</span>
                </div>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="block text-4xl font-bold text-white hover:text-brand-cyan transition-colors duration-150 mb-3 tracking-tight"
                >
                  {CONTACT_INFO.phone}
                </a>
                <div className="flex items-center justify-end gap-2 text-sm text-gray-300 bg-white/5 py-1.5 px-3 rounded-lg">
                  <MapPin size={14} className="text-brand-blue" />
                  <span>{CONTACT_INFO.area}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};