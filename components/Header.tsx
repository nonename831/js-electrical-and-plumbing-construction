import React from 'react';
import { Phone, MapPin, Zap, Droplets, Award } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a3d62] to-slate-900 z-0"></div>

      {/* Optional: subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:justify-between">

          {/* Left Side: Logo & Branding */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 flex-1 w-full">


            {/* Title & Tagline */}
            <div className="max-w-2xl relative">
              <div className="hidden lg:block absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-brand-cyan to-transparent rounded-full opacity-50"></div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t.header.titleLine1}
                <span className="block text-brand-cyan mt-1">{t.header.titleLine2}</span>
              </h1>
              <p className="mt-3 text-lg text-blue-100/90 font-medium">
                {t.header.taglinePrefix} <span className="text-white font-bold">{t.header.taglineSuffix}</span>
              </p>

              {/* Service Badges */}
              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-200 text-sm font-semibold backdrop-blur-sm transition hover:bg-amber-500/20">
                  <Award size={16} className="text-amber-400" />
                  <span>{t.header.badgeExperience}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-200 text-sm font-semibold backdrop-blur-sm transition hover:bg-blue-500/20">
                  <Zap size={16} className="text-brand-cyan fill-brand-cyan/20" />
                  <span>{t.header.badgeElectrical}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-200 text-sm font-semibold backdrop-blur-sm transition hover:bg-cyan-500/20">
                  <Droplets size={16} className="text-blue-400 fill-blue-400/20" />
                  <span>{t.header.badgePlumbing}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Contact (Desktop/Large Screens) */}
          <div className="hidden lg:flex flex-col items-end text-right pl-8 min-w-max">
            <div className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent shadow-2xl backdrop-blur-md overflow-hidden transition-transform hover:-translate-y-1 duration-300">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-slate-900/80 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-end gap-2 text-brand-cyan font-bold mb-1 tracking-wide uppercase text-xs">
                  <Phone size={14} />
                  <span>{t.header.callUs} - Jason</span>
                </div>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="block text-4xl font-bold text-white hover:text-brand-cyan transition-colors mb-3 tracking-tight">
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
