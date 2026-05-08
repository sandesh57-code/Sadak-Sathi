import React from 'react';
import { CheckCircle2, Clock, Loader2, Wrench, Shield } from 'lucide-react';

const STEPS = [
  { label: 'Submitted',    icon: Clock },
  { label: 'Under Review', icon: Shield },
  { label: 'Assigned',     icon: Loader2 },
  { label: 'In Progress',  icon: Wrench },
  { label: 'Resolved',     icon: CheckCircle2 },
];

const STATUS_INDEX = {
  'Pending':      0,
  'Under Review': 1,
  'Assigned':     2,
  'In Progress':  3,
  'Resolved':     4,
};

const ProgressTracker = ({ status = 'Pending', compact = false }) => {
  const activeIdx = STATUS_INDEX[status] ?? 0;

  if (compact) {
    const pct = Math.round(((activeIdx) / (STEPS.length - 1)) * 100);
    const barColor =
      status === 'Resolved'   ? 'bg-green-500' :
      status === 'In Progress'? 'bg-blue-500'  :
      status === 'Assigned'   ? 'bg-indigo-500':
      status === 'Under Review'? 'bg-purple-500':
      'bg-orange-500';

    return (
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Resolution Progress
          </span>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            {pct}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full ${barColor} transition-all duration-700`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-200 dark:bg-slate-700 z-0" />
        <div
          className="absolute top-5 left-5 h-0.5 bg-blue-500 z-0 transition-all duration-700"
          style={{ width: `calc(${(activeIdx / (STEPS.length - 1)) * 100}% - 10px)` }}
        />
        {STEPS.map((step, idx) => {
          const isCompleted = idx < activeIdx;
          const isActive    = idx === activeIdx;
          const StepIcon    = step.icon;
          return (
            <div key={idx} className="flex flex-col items-center z-10 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isCompleted ? 'bg-blue-600 border-blue-600 text-white' :
                isActive    ? 'bg-white dark:bg-slate-900 border-blue-600 text-blue-600 shadow-lg shadow-blue-500/20' :
                              'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'
              }`}>
                <StepIcon size={16} className={isActive ? 'animate-pulse' : ''} />
              </div>
              <span className={`mt-2 text-[9px] font-black uppercase tracking-wider text-center leading-tight ${
                isCompleted ? 'text-blue-600' :
                isActive    ? 'text-slate-900 dark:text-white' :
                              'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
