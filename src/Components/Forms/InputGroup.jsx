import React from 'react';

export default function InputGroup({ label, icon, rightElement, className = "", ...props }) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider ml-1">
                    {label}
                </label>
            )}
            <div className="relative group/input">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within/input:text-rose-500 transition-colors pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    {...props}
                    className={`w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl py-3 ${icon ? 'pl-12' : 'pl-4'} ${rightElement ? 'pr-12' : 'pr-4'} text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:ring-2 focus:ring-rose-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
                />
                {rightElement && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-500 transition-colors cursor-pointer">
                        {rightElement}
                    </div>
                )}
            </div>
        </div>
    );
}
