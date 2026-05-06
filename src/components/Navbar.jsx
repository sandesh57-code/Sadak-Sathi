import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Globe, Bell, User, Menu, X, ChevronDown, 
  Layers as LayoutDashboard, BarChart3, FileText, Info, Info as HelpCircle, User as LogOut 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import UserSettingsDropdown from './UserSettingsDropdown';

const Navbar = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: Globe },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/my-reports', label: 'My Reports', icon: FileText, authRequired: true },
    { to: '/#how-it-works', label: 'How It Works', icon: HelpCircle },
    { to: '/#about', label: 'About', icon: Info },
  ];

  const handleLinkClick = (link) => {
    if (link.authRequired && !isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (link.to.startsWith('/#')) {
      const id = link.to.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(link.to);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg py-3' 
            : 'bg-white dark:bg-slate-900 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform">
                <Globe size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">SadakSathi</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mt-1">Smart Road Monitoring</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => handleLinkClick(link)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 ${
                    location.pathname === link.to 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <link.icon size={16} />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {!isAuthenticated ? (
                <div className="hidden sm:flex items-center space-x-3">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors px-4 py-2"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-black px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 p-1 pl-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl hover:shadow-md transition-all"
                    >
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300 hidden sm:block">My Account</span>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        JD
                      </div>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 animate-in fade-in zoom-in duration-200">
                        <UserSettingsDropdown onClose={() => setIsProfileOpen(false)} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => handleLinkClick(link)}
                  className="w-full flex items-center space-x-3 p-4 rounded-2xl text-left font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <link.icon size={20} className="text-blue-600" />
                  <span>{link.label}</span>
                </button>
              ))}
              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <button 
                    onClick={() => { setIsLoginModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="p-4 rounded-2xl font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => { setIsSignupModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="p-4 rounded-2xl font-black text-white bg-blue-600"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSwitchToSignup={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true); }}
      />
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
        onSwitchToLogin={() => { setIsSignupModalOpen(false); setIsLoginModalOpen(true); }}
      />
    </>
  );
};

export default Navbar;
