import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated as checkAuth, getCurrentUser, logout as clearAuth } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  const login = (userData) => {
    setUser(userData.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Sync state if localStorage changes (e.g. from another tab or manual edits)
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
      setIsAuthenticated(checkAuth());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
