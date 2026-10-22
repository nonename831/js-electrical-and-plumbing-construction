import React from 'react';
import { Phone, MapPin, Zap, Droplets, Award, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../lib/analytics';
import { copyPhoneOnDesktop } from '../lib/phone';

export const Header: React.FC = () => {
  const { t, whatsappUrl } = useLanguage();

  const badges = [
    {
      icon: <Award size={16} className="text-amber-400" />,
      label: t.header.badgeExperience,
      shortLabel: t.header.badgeExperienceShort,
      classes: 'bg-amber-500/10 border-amber-400/20 text-amber-200',
    },
    {
      icon: <Zap size={16} className="text-brand-cyan fill-brand-cyan/20" />,
      label: t.header.badgeElectrical,
      shortLabel: t.header.badgeElectrical,
      classes: 'bg-blue-500/10 border-blue-400/20 text-blue-200',
    },
    {
      icon: <Droplets size={16} className="text-blue-400 fill-blue-400/20" />,
      label: t.header.badgePlumbing,
      shortLabel: t.header.badgePlumbing,
      classes: 'bg-cyan-500/10 border-cyan-400/20 text-cyan-200',
    },
  ];

  return (
    <header className="relative bg-slate-900 text-white overflow-hidden animate-fade-in-up">
      {/* Background: real job photo under the brand gradient */}
      <img
        src={`${import.meta.env.BASE_URL}assets/images/hero-bg.webp`}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[50%_30%] z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-[#0a3d62]/85 to-slate-900/90 lg:bg-gradient-to-r lg:from-slate-900/95 lg:via-[#0a3d62]/80 lg:to-slate-900/60 z-0" />
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-20 md:pb-24 short:pt-5 short:pb-14 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:justify-between">

          {/* Left: Branding */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 flex-1 w-full">
            <div className="max-w-2xl relative">
              {/* Eyebrow label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4 short:mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                {CONTACT_INFO.area}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl short:text-3xl font-extrabold tracking-tight text-white leading-tight text-balance">
                {t.header.titleLine1}
                {t.header.titleLine2 && (
                  <span className="block text-brand-cyan mt-1">{t.header.titleLine2}</span>
                )}
              </h1>
              <p className="mt-3 text-lg text-blue-100/90 font-medium">
                {t.header.taglinePrefix}{' '}
                <span className="text-white font-bold">{t.header.taglineSuffix}</span>
              </p>

              {/* Badges with staggered pop-in */}
              <div className="mt-6 short:mt-3 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                {badges.map((badge, i) => (
                  <div
                    key={i}
                    className={`animate-badge-pop flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold backdrop-blur-sm ${badge.classes}`}
                    style={{ animationDelay: `${300 + i * 180}ms` }}
                  >
                    {badge.icon}
                    <span className="sm:hidden">{badge.shortLabel}</span>
                    <span className="hidden sm:inline">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Call / WhatsApp CTAs (below lg the contact card is hidden) */}
              <div className="mt-8 short:mt-4 grid grid-cols-2 gap-3 w-full max-w-sm mx-auto lg:hidden">
                <a
                  href={CONTACT_INFO.telUrl}
                  onClick={e => { trackEvent('phone_click', { source: 'header_mobile' }); copyPhoneOnDesktop(e, t.phoneCopy); }}
                  className="flex items-center justify-center gap-2 bg-brand-blue text-white py-3.5 rounded-full font-bold shadow-lg active:scale-95 transition-all"
                >
                  <Phone size={18} className="fill-current" />
                  {t.header.callUs}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'header_mobile' })}
                  className="flex items-center justify-center gap-2 bg-brand-green text-white py-3.5 rounded-full font-bold shadow-lg active:scale-95 transition-all"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
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
                  <span>{t.header.callUs} - {CONTACT_INFO.contactName}</span>
                </div>
                <a
                  href={CONTACT_INFO.telUrl}
                  onClick={e => { trackEvent('phone_click', { source: 'header_card' }); copyPhoneOnDesktop(e, t.phoneCopy); }}
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
