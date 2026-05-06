import React from 'react';
import LoginForm from '../components/LoginForm';
import LanguageToggle from '../components/LanguageToggle';
import DarkModeToggle from '../components/DarkModeToggle';
import { Shield, Globe, Cpu, MapPin } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Left Side - Hero / Illustration */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-blue-600 relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Background Pattern/Illustration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="/login-bg.png" 
            alt="Road Network" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1545143333-636a6619f74c?auto=format&fit=crop&q=80&w=2000';
            }}
          />
        </div>
        
        {/* Logo and Brand */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="bg-white p-2.5 rounded-2xl shadow-xl">
            <Shield className="text-blue-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight leading-none">
              Sadak<span className="text-blue-200">Sathi</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-100 opacity-80 mt-1">
              Smart Road Infrastructure
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-black mb-6 leading-[1.1]">
            Smart Road Issue <br />
            <span className="text-blue-200">Reporting System</span>
          </h2>
          <p className="text-lg text-blue-50 font-medium leading-relaxed opacity-90 mb-8">
            Leveraging AI and citizen feedback to monitor, detect, and resolve road issues across Nepal. Ensuring safer travels for every citizen through real-time data and automated analysis.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500/30 p-2 rounded-lg">
                <Cpu size={24} />
              </div>
              <div>
                <h4 className="font-bold">AI Detection</h4>
                <p className="text-sm text-blue-100 opacity-80">Automated pothole and crack identification.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500/30 p-2 rounded-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold">Geotagging</h4>
                <p className="text-sm text-blue-100 opacity-80">Precise location mapping for rapid response.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center space-x-4 text-xs font-bold text-blue-100/60 uppercase tracking-widest">
          <span>&copy; 2026 Government of Nepal</span>
          <span>•</span>
          <span>Department of Roads</span>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 relative">
        {/* Top Actions (Language & Theme) */}
        <div className="absolute top-6 right-6 flex items-center space-x-3">
          <LanguageToggle />
          <DarkModeToggle />
        </div>

        {/* Mobile Logo */}
        <div className="md:hidden mb-10 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Shield className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Sadak<span className="text-blue-600">Sathi</span>
          </h1>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Log in to your account to manage reports and access the dashboard.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 md:shadow-[0_20px_50px_rgba(8,112,184,0.07)] dark:md:shadow-none p-0 md:p-8 rounded-3xl border-0 md:border border-slate-100 dark:border-slate-800 transition-all">
            <LoginForm />
          </div>

          <div className="mt-12 text-center md:hidden">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Department of Roads, Nepal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
