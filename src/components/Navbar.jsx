import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Map, BarChart3, Moon, Sun, Languages, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const { lang, setLang, t } = useLanguage();
  const { isDark, setIsDark } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={onMenuClick}
              className="p-2 mr-2 text-slate-500 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Map className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t('title')}
              </span>
            </NavLink>
            
            <div className="hidden lg:flex ml-10 space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center space-x-1 px-1 pt-1 text-sm font-medium transition-colors border-b-2 ${
                    isActive 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200'
                  }`
                }
              >
                <Map size={18} />
                <span>{t('dashboard')}</span>
              </NavLink>
              <NavLink 
                to="/analytics" 
                className={({ isActive }) => 
                  `flex items-center space-x-1 px-1 pt-1 text-sm font-medium transition-colors border-b-2 ${
                    isActive 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200'
                  }`
                }
              >
                <BarChart3 size={18} />
                <span>{t('analytics')}</span>
              </NavLink>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'ne' : 'en')}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center space-x-1"
              title={t('language')}
            >
              <Languages size={20} />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              title={isDark ? t('lightMode') : t('darkMode')}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="hidden sm:block h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
            
            <div className="hidden sm:flex items-center space-x-1 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
