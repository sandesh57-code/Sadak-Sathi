import React, { useState, useMemo } from 'react';
import { 
  Search, Settings as Filter, Calendar, MapPin, Eye, Activity, 
  CheckCircle2, Clock, AlertTriangle, ChevronRight, FileText
} from 'lucide-react';
import { reports as allReports } from '../data/reports';
import { useAuth } from '../context/AuthContext';

const MyReports = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // For demo, we'll just show all reports or a subset
  const userReports = useMemo(() => {
    return allReports.filter(report => {
      const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            report.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [searchTerm, statusFilter, severityFilter]);

  const summary = useMemo(() => ({
    total: userReports.length,
    resolved: userReports.filter(r => r.status === 'Resolved').length,
    pending: userReports.filter(r => r.status === 'Pending').length,
    critical: userReports.filter(r => r.severity === 'Critical').length
  }), [userReports]);

  const statusColors = {
    'Pending': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    'In Progress': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    'Resolved': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
  };

  const severityColors = {
    'Critical': 'bg-red-500',
    'High': 'bg-orange-500',
    'Medium': 'bg-yellow-500',
    'Low': 'bg-green-500'
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center space-x-3">
            <FileText className="text-blue-600" size={32} />
            <span>My Submitted Reports</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Track and manage your road issue submissions across Nepal.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Submitted', value: summary.total, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { label: 'Resolved', value: summary.resolved, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
            { label: 'Pending', value: summary.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
            { label: 'Critical Alerts', value: summary.critical, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search by Report ID or District..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              />
            </div>
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 md:w-40 px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-slate-600 dark:text-slate-400"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <select 
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="flex-1 md:w-40 px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold text-slate-600 dark:text-slate-400"
              >
                <option value="all">All Severity</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        {userReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userReports.map((report) => (
              <div key={report.id} className="group bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300">
                {/* Image & Badge */}
                <div className="relative h-48 overflow-hidden">
                  <img src={report.image} alt={report.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest shadow-lg ${severityColors[report.severity]}`}>
                      {report.severity}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg ${statusColors[report.status]}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                    {report.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-slate-400 mb-4">
                    <MapPin size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest">{report.district}, Nepal</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 line-clamp-1">
                    {report.description || 'Pothole reported near road junction'}
                  </h3>

                  <div className="flex items-center justify-between py-4 border-y border-slate-50 dark:border-slate-800 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Submitted</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{report.createdAt}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cluster ID</span>
                      <span className="text-sm font-bold text-blue-600">{report.clusterId}</span>
                    </div>
                  </div>

                  {/* Progress Tracker Mini */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resolution Progress</span>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                        {report.status === 'Resolved' ? '100%' : report.status === 'In Progress' ? '60%' : '20%'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${report.status === 'Resolved' ? 'bg-green-500 w-full' : report.status === 'In Progress' ? 'bg-blue-500 w-3/5' : 'bg-orange-500 w-1/5'}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="flex-1 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2">
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20">
                      <Activity size={14} />
                      <span>Track Status</span>
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
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">You haven't submitted any reports yet or your filters are too strict.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95">
              Submit Your First Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
