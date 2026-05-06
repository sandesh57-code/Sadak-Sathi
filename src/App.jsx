import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { ToastContainer, useToast } from './components/Toast';

function AppContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, addToast, dismissToast } = useToast();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 ${isDashboard ? 'h-screen overflow-hidden' : ''}`}>
      <Navbar onMenuClick={() => setSidebarOpen(prev => !prev)} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />} />
        </Routes>
      </main>

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
