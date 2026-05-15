import React, { useState, useRef } from 'react';
import {
  Upload, X, Image as ImageIcon, MapPin, ChevronDown,
  AlertTriangle, CheckCircle2, Send, Info
} from 'lucide-react';
import LocationPicker from './LocationPicker';

const DISTRICTS = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Butwal'];

const SEVERITIES = [
  { value: 'Low',      color: 'bg-green-500',  ring: 'ring-green-400',  text: 'text-green-700 dark:text-green-400' },
  { value: 'Medium',   color: 'bg-yellow-500', ring: 'ring-yellow-400', text: 'text-yellow-700 dark:text-yellow-400' },
  { value: 'High',     color: 'bg-orange-500', ring: 'ring-orange-400', text: 'text-orange-700 dark:text-orange-400' },
  { value: 'Critical', color: 'bg-red-500',    ring: 'ring-red-400',    text: 'text-red-700 dark:text-red-400' },
];

const INITIAL = {
  images: [],
  imagePreviews: [],
  lat: '',
  lng: '',
  district: '',
  description: '',
  severity: 'Medium',
};

const ReportSubmissionForm = ({ onSubmit }) => {
  const [form, setForm]     = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  /* ── helpers ── */
  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleImageFiles = async (files) => {
    const validFiles = Array.from(files).filter(f => f && f.type.startsWith('image/'));
    if (!validFiles.length) return;

    const newPreviews = await Promise.all(validFiles.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }));

    setForm(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles],
      imagePreviews: [...prev.imagePreviews, ...newPreviews]
    }));
    setErrors(prev => ({ ...prev, images: '' }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleImageFiles(e.dataTransfer.files);
  };

  const validate = () => {
    const errs = {};
    if (form.images.length === 0) errs.images = 'Please upload at least one pothole image.';
    if (!form.district)    errs.district    = 'Please select a district.';
    if (!form.lat)         errs.location    = 'Latitude is required.';
    if (!form.lng)         errs.location    = (errs.location || '') + ' Longitude is required.';
    if (!form.description.trim()) errs.description = 'Please describe the road issue.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800)); // simulate network

    const newReport = {
      id:          `REP-${Date.now().toString().slice(-5)}`,
      district:    form.district,
      lat:         parseFloat(form.lat),
      lng:         parseFloat(form.lng),
      severity:    form.severity,
      status:      'Pending',
      clusterId:   `CL-${Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0')}`,
      image:       form.imagePreviews[0] || null,
      images:      form.imagePreviews,
      createdAt:   new Date().toISOString().slice(0, 10),
      description: form.description.trim(),
      department:  `${form.district} Road Division`,
      userSubmitted: true,
    };

    onSubmit(newReport);
    setForm(INITIAL);
    setErrors({});
    setSubmitting(false);
  };

  /* ── render ── */
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm p-8 space-y-8"
    >
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Submit New Road Issue Report
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Fill in the details below and our AI system will analyse the severity automatically in production.
        </p>
      </div>

      {/* ── 1. Image upload ── */}
      <div>
        <label className="block text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
          Pothole Images <span className="text-red-500">*</span>
        </label>

        {form.imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {form.imagePreviews.map((preview, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 group h-32">
                <img
                  src={preview}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== idx),
                        imagePreviews: prev.imagePreviews.filter((_, i) => i !== idx)
                      }));
                    }}
                    className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
            dragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
              : errors.images
              ? 'border-red-400 bg-red-50 dark:bg-red-900/10'
              : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
        >
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-4">
            <Upload size={26} className="text-blue-600" />
          </div>
          <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
            Drag &amp; drop images here or <span className="text-blue-600 underline underline-offset-2">browse</span>
          </p>
          <p className="text-xs text-slate-400 mt-1 font-medium">Supports JPG, PNG, WEBP</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageFiles(e.target.files)}
          />
        </div>
        {errors.images && <p className="text-red-500 text-xs font-semibold mt-2">{errors.images}</p>}
      </div>

      {/* ── 2. GPS Location ── */}
      <div>
        <label className="block text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
          GPS Location <span className="text-red-500">*</span>
        </label>
        <LocationPicker
          lat={form.lat}
          lng={form.lng}
          onChange={(lat, lng) => {
            setForm(prev => ({ ...prev, lat, lng }));
            setErrors(prev => ({ ...prev, location: '' }));
          }}
          error={errors.location}
        />
      </div>

      {/* ── 3. District ── */}
      <div>
        <label className="block text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
          District <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={form.district}
            onChange={(e) => set('district', e.target.value)}
            className={`w-full appearance-none px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-slate-700 dark:text-slate-300 transition-all pr-10 ${
              errors.district ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="">Select a district...</option>
            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        {errors.district && <p className="text-red-500 text-xs font-semibold mt-2">{errors.district}</p>}
      </div>

      {/* ── 4. Description ── */}
      <div>
        <label className="block text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Describe the road issue or pothole condition..."
          className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all resize-none ${
            errors.description ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'
          }`}
        />
        {errors.description && <p className="text-red-500 text-xs font-semibold mt-2">{errors.description}</p>}
      </div>

      {/* ── 5. Severity ── */}
      <div>
        <label className="block text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
          Severity <span className="text-slate-400 font-medium normal-case tracking-normal">(optional — AI auto-detects in production)</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {SEVERITIES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => set('severity', s.value)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl border-2 font-bold text-sm transition-all ${
                form.severity === s.value
                  ? `border-transparent ${s.color} text-white shadow-lg`
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${form.severity === s.value ? 'bg-white/80' : s.color}`} />
              <span>{s.value}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-start space-x-2 text-slate-400">
          <Info size={14} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium">In production, severity is auto-detected by AI from your uploaded image.</p>
        </div>
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95"
      >
        {submitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Submitting Report...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Submit Report</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ReportSubmissionForm;
