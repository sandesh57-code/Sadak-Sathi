import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import MapPreview from '../components/MapPreview';
import { 
  Shield, Activity as Zap, Globe, Clock, Mail, MessageSquare, 
  MapPin, CheckCircle2, Activity, Users, FileText, 
  Settings, Activity as TrendingUp, ChevronRight, ArrowRight
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI Severity Detection',
      desc: 'Our neural networks analyze report images to categorize issue severity automatically.',
      color: 'bg-yellow-500'
    },
    {
      icon: Globe,
      title: 'Geo Clustering',
      desc: 'Multiple reports of the same issue are automatically clustered into a single work order.',
      color: 'bg-blue-500'
    },
    {
      icon: Shield,
      title: 'Authority Routing',
      desc: 'Issues are instantly routed to the specific department (Local, Provincial, or National).',
      color: 'bg-green-500'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      desc: 'Citizens can track the resolution status of their reported issues in real-time.',
      color: 'bg-purple-500'
    }
  ];

  const steps = [
    {
      title: 'Report Issue',
      desc: 'Upload pothole image, GPS auto-detection, and add description.',
      icon: MapPin,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'AI Analysis',
      desc: 'Automatic classification into Low, Medium, High, or Critical.',
      icon: Activity,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Geo Clustering',
      desc: 'Nearby reports are merged into clusters for efficient planning.',
      icon: Globe,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
    {
      title: 'Authority Routing',
      desc: 'Reports sent directly to the correct municipality or department.',
      icon: Settings,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Repair Tracking',
      desc: 'Officers update repair progress which you can track in real-time.',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'Resolution',
      desc: 'Issue is fixed and citizen receives a final notification.',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <Hero onReportClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} />

      {/* Impact Stats */}
      <StatsSection />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
              How SadakSathi Works
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-lg">
              A seamless flow from citizen reporting to administrative resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="group relative p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">
                  {i + 1}
                </div>
                <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <step.icon size={32} className={step.color} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-12 rounded-[24px] shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center mx-auto group active:scale-95">
              <span>Start Reporting</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                About SadakSathi
              </h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
                SadakSathi is an AI-powered smart road issue reporting system developed to help citizens report potholes and road damage efficiently. By bridge the gap between citizens and authorities, we ensure faster responses and safer roads for everyone in Nepal.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  { title: 'Improve Safety', icon: Shield },
                  { title: 'Reduce Accidents', icon: TrendingUp },
                  { title: 'Faster Response', icon: Zap },
                  { title: 'Data-Driven', icon: FileText }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 font-bold">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                      <item.icon size={18} />
                    </div>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white">Collaborative Effort</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Developed as an academic smart city project for the citizens of Nepal.</p>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="h-48 bg-blue-600 rounded-[40px] flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-4xl font-black">98%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Accuracy</div>
                  </div>
                </div>
                <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-[40px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1545143333-636a6619f74c?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Road" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-[40px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1515162305114-8d3ad083836d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="City" />
                </div>
                <div className="h-48 bg-indigo-600 rounded-[40px] flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-4xl font-black">12k+</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Reports</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Map Preview */}
      <MapPreview />

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Globe size={24} />
                </div>
                <span className="text-2xl font-black tracking-tighter">SadakSathi</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Transforming road infrastructure management in Nepal through citizen empowerment and AI-driven insights. Join us in building a safer future.
              </p>
              <div className="flex items-center space-x-4">
                {[Mail, MessageSquare, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-slate-500">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-bold">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">How it works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-slate-500">Support</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-bold">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Report Issue</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-slate-500">Newsletter</h4>
              <p className="text-slate-400 text-sm font-medium mb-6">Stay updated with latest road safety reports and infrastructure news.</p>
              <div className="flex items-center bg-slate-800 rounded-[20px] p-2 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-transparent border-none focus:ring-0 text-sm px-3 flex-1 font-medium"
                />
                <button className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <p>&copy; 2026 SadakSathi Project Nepal. Smart City Initiative.</p>
            <div className="flex items-center space-x-8">
              <span>Department of Roads</span>
              <span className="text-blue-500">Built with ❤️ in Nepal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
