import React, { useEffect, useState } from 'react';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';

const iconMap = {
  critical: <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />,
  success: <CheckCircle size={18} className="text-green-500 flex-shrink-0" />,
  info: <Info size={18} className="text-blue-500 flex-shrink-0" />,
};

const bgMap = {
  critical: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
  success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
  info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
};

export const Toast = ({ id, message, type = 'info', onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div className={`flex items-start space-x-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md max-w-sm w-full ${bgMap[type]} animate-[slideIn_0.3s_ease]`}>
      {iconMap[type]}
      <p className="flex-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{message}</p>
      <button onClick={() => onDismiss(id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }) => (
  <div className="fixed bottom-6 right-6 z-[9999] flex flex-col space-y-3">
    {toasts.map(toast => (
      <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
    ))}
  </div>
);

// Hook to use toasts
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, addToast, dismissToast };
};
