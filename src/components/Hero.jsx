import React from 'react';
import { ArrowRight, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';

const Hero = ({ onReportClick }) => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 pb-24 md:pt-24 md:pb-32 transition-colors duration-300">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6 border border-blue-100 dark:border-blue-800 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              <span className="text-xs font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest">
                AI-Powered Infrastructure Monitoring
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8">
              Smart Road Issue <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Reporting System
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              Empowering citizens to report road defects using AI. We detect, cluster, and route issues to the right authorities for rapid response in Nepal.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onReportClick}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-10 rounded-2xl shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center group"
              >
                <span>Report Issue Now</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              
              <button className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold py-5 px-10 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-slate-700 transition-all flex items-center justify-center">
                <span>View Live Analytics</span>
                <ChevronRight className="ml-1 text-slate-400" size={18} />
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
              <div className="flex items-center space-x-2 text-slate-500">
                <ShieldCheck className="text-green-500" size={20} />
                <span className="text-sm font-bold">Government Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <MapPin className="text-blue-500" size={20} />
                <span className="text-sm font-bold">Nationwide Coverage</span>
              </div>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(37,99,235,0.15)] border-8 border-white dark:border-slate-900 transition-all duration-500 hover:scale-[1.02]">
              <img 
                src="/login-bg.png" 
                alt="AI Road Detection" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1545143333-636a6619f74c?auto=format&fit=crop&q=80&w=1200';
                }}
              />
              
              {/* Overlay Tags */}
              <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce-slow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse block"></span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Alert</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Critical Pothole detected</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-blue-600/90 backdrop-blur-md p-4 rounded-2xl shadow-xl animate-float">
                <div className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">Location</p>
                    <p className="text-xs font-bold">Koteshwor, Kathmandu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
