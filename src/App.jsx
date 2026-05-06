import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import ReportDetails from './pages/ReportDetails';
import Login from './pages/Login';
import MyReports from './pages/MyReports';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer, useToast } from './components/Toast';
import { reports } from './data/reports';

function AppContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, addToast, dismissToast } = useToast();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const hasShownAlerts = React.useRef(false);

  // Show toast notifications for critical reports on load
  React.useEffect(() => {
    if (hasShownAlerts.current) return;
    
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
      hasShownAlerts.current = true;
    }, 1500);

    return () => clearTimeout(timer);
  }, [addToast]);

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 ${isDashboard ? 'h-screen overflow-hidden' : ''}`}>
      <Navbar onMenuClick={() => setSidebarOpen(prev => !prev)} />
      
      <main className={`flex-1 ${isDashboard ? 'overflow-hidden' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/report/:id" element={<ReportDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AppContent />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
