import React from 'react';
import { Calendar, MapPin, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const severityColors = {
  Critical: 'bg-red-500',
  High: 'bg-orange-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500'
};

const statusIcons = {
  Pending: <Clock size={14} className="text-slate-400" />,
  'In Progress': <AlertCircle size={14} className="text-blue-500" />,
  Resolved: <CheckCircle2 size={14} className="text-green-500" />
};

const ReportCard = ({ report, onClick }) => {
  const { t } = useLanguage();

  return (
    <div 
      onClick={() => onClick(report)}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
    >
      <div className="flex space-x-4">
        <div className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-900">
          <img 
            src={report.image} 
            alt={report.district} 
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-md text-[8px] font-bold text-white uppercase ${severityColors[report.severity]}`}>
            {t(report.severity.toLowerCase())}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex justify-between items-start mb-1">
            <span className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-widest">{report.id}</span>
            <div className="flex items-center space-x-1 text-[10px] font-semibold text-slate-500">
              {statusIcons[report.status]}
              <span>{t(report.status.toLowerCase().replace(' ', ''))}</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 truncate">
            {report.district}
          </h3>

          <div className="mt-auto space-y-1.5">
            <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400">
              <MapPin size={12} className="mr-1 text-slate-400" />
              <span className="truncate">{report.department}</span>
            </div>
            <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400">
              <Calendar size={12} className="mr-1 text-slate-400" />
              <span>{report.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
