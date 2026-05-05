import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Filter, X } from 'lucide-react';

const SidebarFilters = ({ filters, setFilters, isOpen, onClose }) => {
  const { t } = useLanguage();

  const districts = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Butwal", "Biratnagar"];
  const severities = ["Critical", "High", "Medium", "Low"];
  const statuses = ["Pending", "In Progress", "Resolved"];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`
      fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="h-full flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t('reports')}
            </h2>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
              {t('search')}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder={t('search')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
              District
            </label>
            <select
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white appearance-none cursor-pointer"
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
            >
              <option value="all">{t('allDistricts')}</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
              {t('severity')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {severities.map(s => (
                <button
                  key={s}
                  onClick={() => handleFilterChange('severity', filters.severity === s ? 'all' : s)}
                  className={`
                    px-3 py-2 rounded-lg text-xs font-medium transition-all border
                    ${filters.severity === s 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-500'}
                  `}
                >
                  {t(s.toLowerCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
              {t('status')}
            </label>
            <div className="space-y-2">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => handleFilterChange('status', filters.status === s ? 'all' : s)}
                  className={`
                    w-full px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all border flex items-center justify-between
                    ${filters.status === s 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' 
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-500'}
                  `}
                >
                  <span>{t(s.toLowerCase().replace(' ', ''))}</span>
                  {filters.status === s && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              Reported a pothole? Check status using Report ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
