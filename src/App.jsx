import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import ReportDetails from './pages/ReportDetails';
import { ToastContainer, useToast } from './components/Toast';
import { reports } from './data/reports';

function AppContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, addToast, dismissToast } = useToast();

  // Show toast notifications for critical reports on load
  useEffect(() => {
    const criticalReports = reports.filter(r => r.severity === 'Critical' && r.status === 'Pending');
    const timer = setTimeout(() => {
      criticalReports.slice(0, 2).forEach((report, i) => {
        setTimeout(() => {
          addToast(
            `⚠️ Critical Alert: ${report.id} in ${report.district} requires immediate attention.`,
            'critical'
          );
        }, i * 1500);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar onMenuClick={() => setSidebarOpen(prev => !prev)} />

      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={<Dashboard isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />}
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/report/:id" element={<ReportDetails />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="hidden sm:block py-4 px-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>&copy; 2026 SadakSathi Project Nepal</span>
            <span className="text-slate-200 dark:text-slate-700">|</span>
            <span>Department of Roads, Government of Nepal</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Open Data</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Authorities</a>
            <span className="text-blue-600">Built with AI &hearts;</span>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
