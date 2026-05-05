import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageToggle = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'ne' : 'en')}
      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all text-sm font-bold ${className}`}
      title="Toggle Language / भाषा बदल्नुहोस्"
    >
      <Languages size={16} />
      <span className="uppercase">{lang === 'en' ? 'EN' : 'ने'}</span>
    </button>
  );
};

export default LanguageToggle;
