import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CONTACT_INFO } from '../constants';
import { trackEvent } from '../lib/analytics';
import { copyPhoneOnDesktop } from '../lib/phone';

const SECTION_IDS = ['services', 'gallery', 'faq', 'contact'];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the nav link of the section crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
          else setActiveSection(current => (current === entry.target.id ? null : current));
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsOpen(open => !open);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'zh' : 'en');

  const navLinks = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 animate-fade-in-down ${scrolled
      ? 'bg-white/95 backdrop-blur-md shadow-md py-2 short:py-1 border-b border-gray-200'
      : 'bg-white py-3 short:py-1 shadow-sm border-b border-gray-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 short:h-14">

          {/* Left: Logo */}
          <a href="#home" className="flex items-center gap-3 flex-shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/logo.webp`}
              alt={t.nav.logoAlt}
              draggable={false}
              width="241"
              height="56"
              className="h-10 md:h-14 short:h-10 w-auto object-contain"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </a>

          {/* Desktop Center: Links */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-6 px-4 xl:flex-none xl:px-0 xl:gap-10 xl:absolute xl:left-1/2 xl:-translate-x-1/2">
            {navLinks.map(link => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'location' : undefined}
                  className={`${active ? 'text-brand-blue' : 'text-gray-600'} hover:text-brand-blue font-bold transition-colors text-base uppercase tracking-wide relative group`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full ${active ? 'w-full' : 'w-0'}`} />
                </a>
              );
            })}
          </div>

          {/* Right: Language + Call */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              type="button"
              onClick={toggleLanguage}
              className="relative w-20 h-10 bg-slate-200 rounded-full cursor-pointer p-1 shadow-inner transition-colors hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              aria-label={t.nav.switchLanguage}
              title={t.nav.switchLanguage}
            >
              <div className="absolute inset-0 flex justify-between items-center px-3 text-xs font-bold text-gray-500 select-none">
                <span className={language === 'zh' ? 'opacity-0' : 'opacity-100'}>中</span>
                <span className={language === 'en' ? 'opacity-0' : 'opacity-100'}>EN</span>
              </div>
              <div className={`relative z-10 bg-white w-8 h-8 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${language === 'en' ? 'translate-x-10' : 'translate-x-0'}`}>
                <span className="text-xs font-extrabold text-brand-dark select-none">
                  {language === 'en' ? 'EN' : '中'}
                </span>
              </div>
            </button>
            <a
              href={CONTACT_INFO.telUrl}
              onClick={e => { trackEvent('phone_click', { source: 'navbar_desktop' }); copyPhoneOnDesktop(e, t.phoneCopy); }}
              className="flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-6 py-2.5 rounded-full text-base font-bold shadow-md transition-all transform hover:scale-105"
            >
              <Phone size={20} className="fill-current" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden ml-auto">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t.nav.switchLanguage}
              className="min-h-[44px] px-3 flex items-center justify-center gap-1 bg-slate-100 rounded-lg text-sm font-bold active:bg-slate-200 transition-colors border border-slate-200 select-none"
            >
              <span className={language === 'zh' ? 'text-brand-dark' : 'text-slate-500'}>中</span>
              <span className="text-slate-300">/</span>
              <span className={language === 'en' ? 'text-brand-dark' : 'text-slate-500'}>EN</span>
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              className="text-brand-dark hover:text-brand-blue p-2 transition-colors rounded-full hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl transition-all duration-300 ease-in-out transform origin-top ${isOpen
        ? 'opacity-100 translate-y-0 visible scale-y-100'
        : 'opacity-0 -translate-y-4 invisible scale-y-95 pointer-events-none'}`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
              className={`block text-center text-lg font-bold ${activeSection === link.href.slice(1) ? 'text-brand-blue bg-slate-50' : 'text-slate-800'} hover:text-brand-blue hover:bg-slate-50 py-4 rounded-xl transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className={`pt-4 mt-2 transition-all duration-500 delay-200 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <a
              href={CONTACT_INFO.telUrl}
              onClick={e => { trackEvent('phone_click', { source: 'navbar_mobile' }); copyPhoneOnDesktop(e, t.phoneCopy); }}
              className="flex items-center justify-center gap-3 bg-brand-blue text-white px-4 py-4 rounded-xl text-lg font-bold w-full shadow-lg active:scale-95 transition-all"
            >
              <Phone size={20} className="fill-current" />
              {t.header.callUs}
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-dark via-brand-blue to-brand-cyan" />
      </div>
    </nav>
  );
};
