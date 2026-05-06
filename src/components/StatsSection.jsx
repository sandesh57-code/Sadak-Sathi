import React from 'react';
import { FileText, CheckCircle2, Layers, AlertTriangle } from 'lucide-react';

const stats = [
  { 
    label: 'Total Reports', 
    value: '12,482', 
    icon: FileText, 
    color: 'text-blue-600', 
    bg: 'bg-blue-50 dark:bg-blue-900/20' 
  },
  { 
    label: 'Resolved Issues', 
    value: '8,921', 
    icon: CheckCircle2, 
    color: 'text-green-600', 
    bg: 'bg-green-50 dark:bg-green-900/20' 
  },
  { 
    label: 'Active Clusters', 
    value: '432', 
    icon: Layers, 
    color: 'text-orange-600', 
    bg: 'bg-orange-50 dark:bg-orange-900/20' 
  },
  { 
    label: 'Critical Alerts', 
    value: '127', 
    icon: AlertTriangle, 
    color: 'text-red-600', 
    bg: 'bg-red-50 dark:bg-red-900/20' 
  },
];

const StatsSection = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
            Platform Impact in Nepal
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Real-time data monitoring road conditions and infrastructure health across major districts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <stat.icon size={28} className={stat.color} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
