import React from 'react';
import { User, ShieldCheck, HardHat, UserCog } from 'lucide-react';

const roles = [
  { id: 'Citizen', label: 'Citizen', icon: User, color: 'text-blue-600' },
  { id: 'Officer', label: 'Officer', icon: ShieldCheck, color: 'text-green-600' },
  { id: 'Engineer', label: 'Engineer', icon: HardHat, color: 'text-orange-600' },
  { id: 'Admin', label: 'Admin', icon: UserCog, color: 'text-purple-600' },
];

const RoleSelector = ({ selectedRole, setSelectedRole }) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {roles.map((role) => (
        <button
          key={role.id}
          type="button"
          onClick={() => setSelectedRole(role.id)}
          className={`flex items-center space-x-2 p-3 rounded-xl border-2 transition-all ${
            selectedRole === role.id
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
              : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
          }`}
        >
          <role.icon
            size={18}
            className={selectedRole === role.id ? 'text-blue-600' : 'text-slate-400'}
          />
          <span
            className={`text-sm font-semibold ${
              selectedRole === role.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {role.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;
