import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  FileText, CheckCircle2, Clock, AlertTriangle,
  Plus, ChevronUp, BarChart2
} from 'lucide-react';
import { reports as seedReports } from '../data/reports';
import MyReportsList from '../components/MyReportsList';
import ReportSubmissionForm from '../components/ReportSubmissionForm';

const LS_KEY = 'myReports';

/* ── Helpers ───────────────────────────────────────────── */
const loadFromLS = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveToLS = (data) => {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
};

/* ── Component ─────────────────────────────────────────── */
const MyReports = () => {
  const [userReports, setUserReports] = useState(() => loadFromLS() ?? []);
  const [showForm, setShowForm]       = useState(false);
  const [toast, setToast]             = useState(null);
  const formRef                       = useRef(null);

  // Merge seed data (global) + user submissions for display
  const allReports = useMemo(
    () => [...userReports, ...seedReports],
    [userReports]
  );

  // Persist user submissions on change
  useEffect(() => {
    saveToLS(userReports);
  }, [userReports]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // Summary stats (based on merged list)
  const summary = useMemo(() => ({
    total:    allReports.length,
    pending:  allReports.filter(r => r.status === 'Pending').length,
    resolved: allReports.filter(r => r.status === 'Resolved').length,
    critical: allReports.filter(r => r.severity === 'Critical').length,
  }), [allReports]);

  const handleSubmit = useCallback((newReport) => {
    setUserReports(prev => [newReport, ...prev]);
    setShowForm(false);
    setToast({ message: '✅ Report submitted successfully!', type: 'success' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const STAT_CARDS = [
    {
      label: 'Total Submitted',
      value: summary.total,
      icon: BarChart2,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Pending Reports',
      value: summary.pending,
      icon: Clock,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      label: 'Resolved Reports',
      value: summary.resolved,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Critical Reports',
      value: summary.critical,
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20 transition-colors duration-300">
      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed top-24 right-6 z-9999 flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border font-semibold text-sm animate-[slideIn_0.3s_ease] ${
            toast.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center space-x-3">
              <FileText className="text-blue-600" size={32} />
              <span>My Reports</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
              Track and manage your road issue submissions across Nepal.
            </p>
          </div>
          <button
            onClick={scrollToForm}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 self-start sm:self-auto"
          >
            <Plus size={20} />
            <span>Submit New Report</span>
          </button>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STAT_CARDS.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center`}>
                  <card.icon size={22} className={card.color} />
                </div>
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {card.value}
                </span>
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                {card.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── My Submitted Reports ── */}
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-5 flex items-center space-x-2">
            <span>My Submitted Reports</span>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-0.5 rounded-full">
              {allReports.length}
            </span>
          </h2>
          <MyReportsList reports={allReports} onSubmitNew={scrollToForm} />
        </div>

        {/* ── Submit Report Form ── */}
        <div ref={formRef}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Submit New Report
            </h2>
            <button
              onClick={() => setShowForm(prev => !prev)}
              className="flex items-center space-x-1.5 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ChevronUp
                size={18}
                className={`transition-transform duration-300 ${showForm ? '' : 'rotate-180'}`}
              />
              <span>{showForm ? 'Collapse Form' : 'Expand Form'}</span>
            </button>
          </div>

          {showForm && (
            <ReportSubmissionForm onSubmit={handleSubmit} />
          )}

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-10 rounded-4xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-slate-900 flex flex-col items-center justify-center space-y-3 transition-all group"
            >
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={26} className="text-blue-600" />
              </div>
              <div className="text-center">
                <p className="font-black text-slate-800 dark:text-slate-200">Click to Open Submission Form</p>
                <p className="text-sm text-slate-400 font-medium mt-1">Report a new pothole or road defect</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReports;
