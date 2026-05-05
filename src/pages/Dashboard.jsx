import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReports, fetchStats } from '../services/api';
import MapView from '../components/MapView';
import SidebarFilters from '../components/SidebarFilters';
import ReportCard from '../components/ReportCard';
import StatsCards from '../components/StatsCards';
import { CardSkeleton, StatsSkeleton } from '../components/SkeletonLoader';
import { useLanguage } from '../context/LanguageContext';
import { RefreshCcw, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = ({ isSidebarOpen, setSidebarOpen }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    district: 'all',
    severity: 'all',
    status: 'all'
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 6;

  const loadData = async (force = false) => {
    setRefreshing(force);
    if (!force) setLoading(true);

    try {
      const [reportsData, statsData] = await Promise.all([
        fetchReports(force),
        fetchStats()
      ]);
      setReports(reportsData);
      setStats(statsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch =
        report.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        report.district.toLowerCase().includes(filters.search.toLowerCase());
      const matchesDistrict = filters.district === 'all' || report.district === filters.district;
      const matchesSeverity = filters.severity === 'all' || report.severity === filters.severity;
      const matchesStatus = filters.status === 'all' || report.status === filters.status;
      return matchesSearch && matchesDistrict && matchesSeverity && matchesStatus;
    });
  }, [reports, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const currentReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const handleCardClick = (report) => {
    navigate(`/report/${report.id}`, { state: { report } });
  };

  return (
    <div className="flex h-full">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <SidebarFilters
        filters={filters}
        setFilters={setFilters}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                {t('dashboard')}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                Live monitoring of road issues across Nepal.
              </p>
            </div>
            <button
              onClick={() => loadData(true)}
              className={`flex items-center space-x-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={refreshing}
            >
              <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
              <span>{refreshing ? t('loading') : 'Refresh Data'}</span>
            </button>
          </div>

          {/* Stats */}
          {loading ? <StatsSkeleton /> : stats && <StatsCards stats={stats} />}

          {/* Map */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                <span>Live Map</span>
              </h2>
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{filteredReports.length} Reports</span>
              </div>
            </div>
            {loading ? (
              <div className="h-[500px] w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            ) : (
              <MapView reports={filteredReports} />
            )}
          </div>

          {/* Reports Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                <span>{t('latestReports')}</span>
              </h2>
              {!loading && filteredReports.length > 0 && (
                <span className="text-xs font-bold text-slate-400">
                  {filteredReports.length} results
                </span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <CardSkeleton key={i} />)}
              </div>
            ) : filteredReports.length > 0 ? (
              <>
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {currentReports.map((report, idx) => (
                      <motion.div
                        key={report.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18, delay: idx * 0.04 }}
                      >
                        <ReportCard report={report} onClick={handleCardClick} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 space-x-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-500'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                  <AlertCircle className="text-slate-400" size={32} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-bold">{t('noReports')}</p>
                <button
                  onClick={() => setFilters({ search: '', district: 'all', severity: 'all', status: 'all' })}
                  className="mt-4 text-xs text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
