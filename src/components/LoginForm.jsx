import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { login } from '../services/auth';
import { useToast } from './Toast';
import { useAuth } from '../context/AuthContext';
import RoleSelector from './RoleSelector';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { addToast } = useToast();
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const data = await login(email, password, role);
      authLogin(data);
      addToast(`Welcome back, ${data.user.name}! Login successful.`, 'success');
      
      // Redirect based on role
      if (role === 'Citizen') {
        navigate('/');
      } else {
        // Mock redirect to admin portal
        navigate('/analytics'); // Assuming analytics is part of the admin view for now
      }
    } catch (error) {
      addToast(error.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
          Select Your Role
        </label>
        <RoleSelector selectedRole={role} setSelectedRole={setRole} />
      </div>

      <div className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail size={18} className="text-slate-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl text-slate-900 dark:text-white dark:bg-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all ${
                errors.email
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                  : 'border-slate-100 dark:border-slate-800 focus:border-blue-600'
              }`}
              placeholder="abc@company.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs font-bold text-red-600 flex items-center">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock size={18} className="text-slate-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full pl-10 pr-10 py-3 border-2 rounded-xl text-slate-900 dark:text-white dark:bg-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 transition-all ${
                errors.password
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                  : 'border-slate-100 dark:border-slate-800 focus:border-blue-600'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs font-bold text-red-600 flex items-center">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
          Remember me for 30 days
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin mr-2" />
            Authenticating...
          </>
        ) : (
          <>
            Login to Dashboard
            <ArrowRight size={18} className="ml-2" />
          </>
        )}
      </button>

      {/* Extra Links */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
        <Link
          to="/"
          className="text-sm text-slate-500 hover:text-slate-700 text-center font-bold"
        >
          &larr; Back to Home
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
