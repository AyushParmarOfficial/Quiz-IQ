import React from 'react';

export default function InputGroup({ label, value, onChange, icon, type = "text", disabled = false }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider ml-1">
                {label}
            </label>
            <div className="relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within/input:text-rose-500 transition-colors pointer-events-none">
                    {icon}
                </div>
                <input
                    type={type}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className={`w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                    placeholder={`Enter ${label}...`}
                />
            </div>
        </div>
    );
}
