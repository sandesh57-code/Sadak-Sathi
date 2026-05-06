import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { Activity, Clock, MapPin, BarChart3 as PieIcon } from 'lucide-react';

const Analytics = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const analyticsData = await fetchAnalytics();
      setData(analyticsData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold animate-pulse">{t('loading')}</p>
      </div>
    </div>
  );

  const chartColors = {
    grid: isDark ? '#1e293b' : '#f1f5f9',
    text: isDark ? '#94a3b8' : '#64748b'
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            {t('analytics')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Data-driven insights into road maintenance and reporting efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Severity Distribution */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <PieIcon className="text-blue-600" size={20} />
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">Severity Distribution</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.severityDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.severityDist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {data.severityDist.map(item => (
                <div key={item.name} className="flex items-center space-x-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resolution Time */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="text-orange-500" size={20} />
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">Resolution Time (Days)</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.resolutionTime}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 10 }} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="time" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reports by District */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="text-green-600" size={20} />
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">Reports by District</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.districtReports}>
                  <defs>
                    <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="reports" stroke="#22c55e" fillOpacity={1} fill="url(#colorReports)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Activity className="text-purple-600" size={20} />
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">Monthly Report Trend</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="stepAfter" dataKey="reports" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black mb-2">Driving Safety with Data</h2>
              <p className="text-blue-100 font-medium opacity-80 max-w-lg">
                The SadakSathi AI analysis helps authorities prioritize road repairs where they matter most, reducing accidents by up to 30% in clustered zones.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-black">98%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">AI Accuracy</div>
              </div>
              <div className="w-[1px] h-10 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-black">24h</div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Avg Response</div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
