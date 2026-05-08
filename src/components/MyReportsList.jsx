import React, { useState, useMemo } from 'react';
import {
  Search, Filter, Eye, Activity, MapPin,
  FileText, ChevronRight, Calendar
} from 'lucide-react';
import ProgressTracker from './ProgressTracker';

const SEVERITY_COLORS = {
  Critical: 'bg-red-500',
  High:     'bg-orange-500',
  Medium:   'bg-yellow-500',
  Low:      'bg-green-500',
};

const STATUS_COLORS = {
  'Pending':      'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  'Under Review': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  'Assigned':     'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  'In Progress':  'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'Resolved':     'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
};

const MyReportsList = ({ reports, onSubmitNew }) => {
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatusFilter]     = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return reports.filter(r => {
      const matchSearch   = r.id.toLowerCase().includes(search.toLowerCase()) ||
                            r.district.toLowerCase().includes(search.toLowerCase());
      const matchStatus   = statusFilter   === 'all' || r.status   === statusFilter;
      const matchSeverity = severityFilter === 'all' || r.severity === severityFilter;
      return matchSearch && matchStatus && matchSeverity;
    });
  }, [reports, search, statusFilter, severityFilter]);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by Report ID or District..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 md:w-44 px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-slate-600 dark:text-slate-400"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="flex-1 md:w-44 px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-slate-600 dark:text-slate-400"
            >
              <option value="all">All Severity</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-slate-400 font-medium mt-3">
          Showing <span className="font-black text-slate-700 dark:text-slate-200">{filtered.length}</span> of {reports.length} reports
        </p>
      </div>

      {/* Reports Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((report) => (
            <div
              key={report.id}
              className="group bg-white dark:bg-slate-900 rounded-[28px] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                {report.image ? (
                  <img
                    src={report.image}
                    alt={report.id}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FileText size={40} />
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest shadow-lg ${SEVERITY_COLORS[report.severity]}`}>
                    {report.severity}
                  </span>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${STATUS_COLORS[report.status]}`}>
                    {report.status}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                  {report.id}
                </div>
                {report.userSubmitted && (
                  <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                    My Report
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center space-x-1.5 text-slate-400 mb-3">
                  <MapPin size={12} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{report.district}, Nepal</span>
                </div>

                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 line-clamp-2 leading-relaxed">
                  {report.description || 'Pothole reported near road junction'}
                </p>

                <div className="flex items-center justify-between py-3 border-y border-slate-50 dark:border-slate-800 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 flex items-center space-x-1">
                      <Calendar size={10} /><span>Submitted</span>
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{report.createdAt}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Cluster</span>
                    <span className="text-xs font-bold text-blue-600">{report.clusterId}</span>
                  </div>
                </div>

                {/* Progress Tracker (compact) */}
                <div className="mb-5">
                  <ProgressTracker status={report.status} compact />
                </div>

                {/* Expandable full tracker */}
                {expanded === report.id && (
                  <div className="mb-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Status Timeline</p>
                    <ProgressTracker status={report.status} />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5">
                    <Eye size={13} />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => setExpanded(expanded === report.id ? null : report.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-blue-500/20"
                  >
                    <Activity size={13} />
                    <span>Track Status</span>
                    <ChevronRight size={12} className={`transition-transform ${expanded === report.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
            <FileText size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Reports Found</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 text-center max-w-xs">
            {reports.length === 0
              ? "You haven't submitted any reports yet."
              : 'No reports match your current filters.'}
          </p>
          {reports.length === 0 && (
            <button
              onClick={onSubmitNew}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
            >
              Submit Your First Report
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReportsList;
