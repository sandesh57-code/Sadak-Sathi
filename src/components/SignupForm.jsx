import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import RoleSelector from './RoleSelector';
import { useToast } from './Toast';

const SignupForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Citizen'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      addToast('Account created successfully! Please login.', 'success');
      if (onSuccess) onSuccess();
    } catch (error) {
      addToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
          Select Your Role
        </label>
        <RoleSelector selectedRole={formData.role} setSelectedRole={handleRoleChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Madan Bhandari"
              className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all dark:bg-slate-900 ${errors.fullName ? 'border-red-500' : 'border-slate-100 dark:border-slate-800 focus:border-blue-500'}`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-500 mt-1 font-bold">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all dark:bg-slate-900 ${errors.phone ? 'border-red-500' : 'border-slate-100 dark:border-slate-800 focus:border-blue-500'}`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1 font-bold">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
            className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl focus:outline-none transition-all dark:bg-slate-900 ${errors.email ? 'border-red-500' : 'border-slate-100 dark:border-slate-800 focus:border-blue-500'}`}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500 mt-1 font-bold">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-2.5 border-2 rounded-xl focus:outline-none transition-all dark:bg-slate-900 ${errors.password ? 'border-red-500' : 'border-slate-100 dark:border-slate-800 focus:border-blue-500'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1 font-bold">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-2.5 border-2 rounded-xl focus:outline-none transition-all dark:bg-slate-900 ${errors.confirmPassword ? 'border-red-500' : 'border-slate-100 dark:border-slate-800 focus:border-blue-500'}`}
            />
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 font-bold">{errors.confirmPassword}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70 mt-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default SignupForm;
