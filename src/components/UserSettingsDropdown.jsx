import React from 'react';
import { 
  User, 
  Settings, 
  Languages, 
  Moon, 
  Sun, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const UserSettingsDropdown = ({ isOpen, onClose }) => {
  const { lang, setLang } = useLanguage();
  const { isDark, setIsDark } = useTheme();

  if (!isOpen) return null;

  const menuItems = [
    { icon: User, label: 'My Profile', color: 'text-blue-600' },
    { icon: Settings, label: 'Account Settings', color: 'text-slate-600' },
    { 
      icon: Languages, 
      label: 'Language', 
      value: lang === 'en' ? 'English' : 'नेपाली',
      onClick: () => setLang(lang === 'en' ? 'ne' : 'en')
    },
    { 
      icon: isDark ? Sun : Moon, 
      label: isDark ? 'Light Mode' : 'Dark Mode',
      onClick: () => setIsDark(!isDark)
    },
    { icon: Bell, label: 'Notification Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <>
      {/* Overlay to close when clicking outside */}
      <div className="fixed inset-0 z-[80]" onClick={onClose} />
      
      <div className="absolute top-16 right-0 z-[90] w-72 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform origin-top-right transition-all">
        {/* User Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              JD
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">John Doe</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">john@sadaksathi.gov.np</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick || onClose}
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <item.icon size={18} className={item.color || 'text-slate-500 dark:text-slate-400'} />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
              </div>
              <div className="flex items-center space-x-1">
                {item.value && (
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                    {item.value}
                  </span>
                )}
                <ChevronRight size={14} className="text-slate-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-slate-100 dark:border-slate-800">
          <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-bold">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSettingsDropdown;
