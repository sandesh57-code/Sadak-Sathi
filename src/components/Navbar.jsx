import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Map, Bell, User, Menu, X, ChevronDown, Info, BarChart3, Home as HomeIcon } from 'lucide-react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import UserSettingsDropdown from './UserSettingsDropdown';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/dashboard', label: 'Dashboard', icon: Map },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/about', label: 'About', icon: Info },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-3 shadow-lg border-b border-slate-100 dark:border-slate-800' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Map className="text-white" size={24} />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                Sadak<span className="text-blue-600">Sathi</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-all ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => setIsSignupModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
              >
                Sign Up
              </button>
              
              <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
              
              <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                >
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                    <User size={18} />
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <UserSettingsDropdown isOpen={isUserDropdownOpen} onClose={() => setIsUserDropdownOpen(false)} />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-2xl py-6 px-4 space-y-4 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="flex items-center space-x-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-bold"
              >
                <link.icon size={20} />
                <span>{link.label}</span>
              </NavLink>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black"
              >
                Login
              </button>
              <button 
                onClick={() => setIsSignupModalOpen(true)}
                className="py-4 rounded-2xl bg-blue-600 text-white font-black"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </>
  );
};

export default Navbar;
