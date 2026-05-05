import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 animate-pulse">
    <div className="flex space-x-4">
      <div className="h-24 w-24 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
      <div className="flex-1 space-y-3">
        <div className="flex justify-between">
          <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-2 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="space-y-2 pt-2">
          <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-2 w-1/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse h-32"></div>
    ))}
  </div>
);
