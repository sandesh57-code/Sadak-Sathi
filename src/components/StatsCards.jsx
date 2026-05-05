import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, CheckCircle, Network, AlertTriangle } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const { t } = useLanguage();

  const cards = [
    { 
      label: t('totalReports'), 
      value: stats.total, 
      icon: <FileText className="text-blue-600" />, 
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-100 dark:border-blue-800'
    },
    { 
      label: t('resolvedReports'), 
      value: stats.resolved, 
      icon: <CheckCircle className="text-green-600" />, 
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-100 dark:border-green-800'
    },
    { 
      label: t('activeClusters'), 
      value: stats.activeClusters, 
      icon: <Network className="text-purple-600" />, 
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-100 dark:border-purple-800'
    },
    { 
      label: t('criticalAlerts'), 
      value: stats.criticalAlerts, 
      icon: <AlertTriangle className="text-red-600" />, 
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-100 dark:border-red-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className={`p-5 rounded-2xl border ${card.bg} ${card.border} transition-transform hover:scale-[1.02] duration-200 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
              {card.icon}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LIVE</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {card.value.toLocaleString()}
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
              {card.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
