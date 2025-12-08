import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white text-center py-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <p className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} JS Electrical & Plumbing Construction. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};