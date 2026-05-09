import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Bell, Shield, Moon, Sun, Languages, 
  FileText, BarChart3, HelpCircle, LogOut, ChevronRight, 
  Check, AlertCircle, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const AccountDropdown = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { isDark, setIsDark } = useTheme();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen && !showLogoutConfirm) return null;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    onClose();
    navigate('/');
  };

  const sections = [
    {
      title: "Settings",
      items: [
        { icon: Settings, label: "Account Settings", href: "#" },
        { icon: Bell, label: "Notification Preferences", href: "#", badge: 3 },
        { icon: Shield, label: "Privacy Settings", href: "#" },
      ]
    },
    {
      title: "Quick Links",
      items: [
        { icon: FileText, label: "My Reports", href: "/my-reports" },
        { icon: BarChart3, label: "Analytics", href: "/analytics" },
        { icon: HelpCircle, label: "Help Center", href: "#" },
      ]
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-0 mt-3 w-[calc(100vw-2rem)] sm:w-[22rem] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 dark:border-slate-800/50 overflow-hidden z-[100]"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            {/* User Profile Header */}
            <div className="p-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-slate-100 dark:border-slate-800/50">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                    {getInitials(user?.name)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full shadow-sm"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black text-slate-900 dark:text-white truncate tracking-tight">
                    {user?.name || "John Doe"}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                    {user?.email || "john.doe@sadaksathi.gov.np"}
                  </p>
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
                    Administrator
                  </div>
                </div>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Theme & Language Toggles - Modern Switch Style */}
              <div className="px-4 py-3 grid grid-cols-2 gap-3 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-transparent">
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center justify-center space-x-2 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                >
                  <div className={`p-1.5 rounded-lg ${isDark ? 'text-amber-500' : 'text-blue-600'}`}>
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  </div>
                  <span className="text-xs font-black text-slate-700 dark:text-slate-200">
                    {isDark ? "Light" : "Dark"}
                  </span>
                </button>

                <button 
                  onClick={() => setLang(lang === 'en' ? 'ne' : 'en')}
                  className="flex items-center justify-center space-x-2 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all"
                >
                  <div className="p-1.5 rounded-lg text-indigo-600">
                    <Languages size={16} />
                  </div>
                  <span className="text-xs font-black text-slate-700 dark:text-slate-200">
                    {lang === 'en' ? 'नेपाली' : 'English'}
                  </span>
                </button>
              </div>

              {/* Sections */}
              {sections.map((section, idx) => (
                <div key={idx} className="py-3 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                  <div className="px-5 pb-1 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
                      {section.title}
                    </span>
                  </div>
                  <div className="px-2 space-y-1">
                    {section.items.map((item, itemIdx) => (
                      <Link 
                        key={itemIdx}
                        to={item.href}
                        onClick={() => item.href !== '#' && onClose()}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 transition-all group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-500/20 group-hover:text-white transition-colors">
                            <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-sm font-bold tracking-tight">{item.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-black bg-red-500 text-white rounded-lg shadow-lg shadow-red-500/20">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Logout Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800/50">
              <button 
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/25 transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center space-x-3">
                  <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-black uppercase tracking-wider">Sign Out</span>
                </div>
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <X size={14} />
                </div>
              </button>
            </div>
          </motion.div>

        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Sign Out?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Are you sure you want to sign out of your account? You'll need to login again to access your reports.
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex-1 px-4 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all active:scale-95"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountDropdown;
