import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CONTACT_INFO } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const navLinks = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-gray-200'
        : 'bg-white py-3 shadow-sm border-b border-gray-100'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Left: Logo & Brand Name */}
          <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <img
              src="logo.png"
              alt="JS Electrical Logo"
              className="h-10 md:h-14 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Desktop Center: Links */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-brand-blue font-bold transition-colors text-base uppercase tracking-wide relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language Switcher */}
            <div
              onClick={toggleLanguage}
              className="relative w-20 h-10 bg-slate-200 rounded-full cursor-pointer p-1 shadow-inner transition-colors hover:bg-slate-300 group"
              title={language === 'en' ? "Switch to Chinese" : "Switch to English"}
            >
              <div className="absolute inset-0 flex justify-between items-center px-3 text-xs font-bold text-gray-500 select-none">
                <span className={language === 'zh' ? 'opacity-0' : 'opacity-100'}>中</span>
                <span className={language === 'en' ? 'opacity-0' : 'opacity-100'}>EN</span>
              </div>
              <div
                className={`
                      relative z-10 bg-white w-8 h-8 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
                      ${language === 'en' ? 'translate-x-10' : 'translate-x-0'}
                    `}
              >
                <span className="text-xs font-extrabold text-brand-dark select-none">
                  {language === 'en' ? 'EN' : '中'}
                </span>
              </div>
            </div>

            {/* Call Button */}
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 bg-brand-dark hover:bg-brand-blue text-white px-6 py-2.5 rounded-full text-base font-bold shadow-md transition-all transform hover:scale-105"
            >
              <Phone size={20} className="fill-current" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle & Language */}
          <div className="flex items-center gap-3 md:hidden ml-auto">
            {/* Compact Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-bold text-slate-700 active:bg-slate-200 transition-colors border border-slate-200"
            >
              {language === 'en' ? 'EN' : '中'}
            </button>

            <button
              onClick={toggleMenu}
              className="text-brand-dark hover:text-brand-blue p-2 transition-colors rounded-full hover:bg-slate-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Improved Transition & Layout */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl transition-all duration-300 ease-in-out transform origin-top ${isOpen
          ? 'opacity-100 translate-y-0 visible scale-y-100'
          : 'opacity-0 -translate-y-4 invisible scale-y-95 pointer-events-none'
          }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-center text-lg font-bold text-slate-800 hover:text-brand-blue hover:bg-slate-50 py-4 rounded-xl transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}

          <div
            className={`pt-4 mt-2 transition-all duration-500 delay-200 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
          >
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-3 bg-brand-blue text-white px-4 py-4 rounded-xl text-lg font-bold w-full shadow-lg hover:shadow-brand-blue/30 active:scale-95 transition-all"
            >
              <Phone size={20} className="fill-current" />
              {t.header.callUs}
            </a>
          </div>
        </div>

        {/* Decorative bottom gradient line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-dark via-brand-blue to-brand-cyan"></div>
      </div>
    </nav>
  );
};