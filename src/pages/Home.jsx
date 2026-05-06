import React from 'react';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import MapPreview from '../components/MapPreview';
import { Shield, Zap, Globe, Clock, Mail, MessageSquare } from 'lucide-react';

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero onReportClick={() => console.log('Open Report Modal/Page')} />

      {/* Impact Stats */}
      <StatsSection />

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
              Next-Gen Infrastructure Management
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-lg">
              Combining citizen participation with artificial intelligence for a safer Nepal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="group p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl transition-all duration-300">
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Map Preview */}
      <MapPreview />

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Globe className="text-white" size={24} />
                </div>
                <span className="text-2xl font-black tracking-tighter">SadakSathi</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transforming road infrastructure management in Nepal through citizen empowerment and AI-driven insights.
              </p>
              <div className="flex items-center space-x-4">
                {[Mail, MessageSquare, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Live Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Public Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-slate-400 text-sm mb-4">Stay updated with latest road safety reports.</p>
              <div className="flex items-center bg-slate-800 rounded-xl p-1">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-transparent border-none focus:ring-0 text-sm px-3 flex-1"
                />
                <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <p>&copy; 2026 SadakSathi Project Nepal. Department of Roads.</p>
            <div className="flex items-center space-x-6">
              <span>Department of Roads</span>
              <span>Open Data Portal</span>
              <span className="text-blue-500">Built with ❤️ for Nepal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
