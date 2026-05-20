import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Tag, Hash, Building2, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MapView from '../components/MapView';

const severityColors = {
  Critical: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' },
  High:     { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  Medium:   { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-500' },
  Low:      { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
};

const statusConfig = {
  Pending:     { icon: <Clock size={16} />, color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800' },
  'In Progress': { icon: <AlertTriangle size={16} />, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  Resolved:    { icon: <CheckCircle2 size={16} />, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3 py-4 border-b border-slate-100 dark:border-slate-800 last:border-none">
    <div className="mt-0.5 text-slate-400">{icon}</div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const ReportDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const report = state?.report;

  if (!report) {
    return (
      <main className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <p className="text-slate-500 mb-4 font-bold">Report not found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  const sev = severityColors[report.severity] || severityColors.Low;
  const sta = statusConfig[report.status] || statusConfig.Pending;

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image + Badges */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-72 sm:h-96">
              <img
                src={report.image}
                alt={`Pothole in ${report.district}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${sev.bg} ${sev.text}`}>
                    <span className={`inline-block w-2 h-2 rounded-full ${sev.dot} mr-1.5`}></span>
                    {report.severity}
                  </span>
                  <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${sta.bg} ${sta.color}`}>
                    {sta.icon}
                    <span className="ml-1">{report.status}</span>
                  </span>
                </div>
                <h1 className="text-3xl font-black text-white">{report.district}</h1>
                <p className="text-white/70 text-sm mt-1">{report.id}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">Description</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {report.description || 'No additional description provided for this report.'}
              </p>
            </div>

            {/* Mini Map */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Location</h3>
              <MapView reports={[report]} />
            </div>
          </div>

          {/* Right: Metadata */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Report Details</h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <InfoRow icon={<Hash size={16} />}     label={t('reportId')}  value={report.id} />
                <InfoRow icon={<MapPin size={16} />}   label={t('location')}  value={report.district} />
                <InfoRow icon={<Tag size={16} />}      label={t('clusterId')} value={report.clusterId} />
                <InfoRow icon={<Calendar size={16} />} label={t('date')}      value={report.createdAt} />
                <InfoRow icon={<Building2 size={16} />} label="Department"    value={report.department} />
              </div>
            </div>

            {/* AI Severity Card */}
            <div className={`rounded-3xl p-6 border ${sev.bg} ${sev.text.replace('text-', 'border-').replace('-600', '-200').replace('-400', '-800')}`}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">AI Severity Score</p>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sev.dot} text-white`}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <p className={`text-2xl font-black ${sev.text}`}>{report.severity}</p>
                  <p className="text-xs font-medium opacity-60">AI Classified</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl hover:opacity-90 transition-opacity"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportDetails;
