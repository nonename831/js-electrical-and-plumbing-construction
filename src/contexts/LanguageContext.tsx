import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CONTACT_INFO, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['zh'];
  // WhatsApp link with a greeting pre-filled in the current language
  whatsappUrl: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'language';

// Storage can throw (private mode, blocked site data) — fall back to zh.
const readStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'zh' ? stored : 'zh';
  } catch {
    return 'zh';
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start in zh to match the prerendered HTML, then apply a remembered choice after hydration
  const [language, setLanguageState] = useState<Language>('zh');

  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored !== 'zh') setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // not persisted; the choice still applies for this visit
    }
  };

  const t = TRANSLATIONS[language];
  const value = {
    language,
    setLanguage,
    t,
    whatsappUrl: `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(t.whatsappMessage)}`,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
