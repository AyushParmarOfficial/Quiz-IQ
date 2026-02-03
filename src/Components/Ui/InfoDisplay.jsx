import React from 'react';

export default function InfoDisplay({ icon, label, value }) {
    return (
        <div className="group p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 hover:border-rose-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-1.5 text-neutral-500 dark:text-neutral-400 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">
                {icon}
                <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-neutral-900 dark:text-white font-medium pl-8 text-lg">
                {value || "Not Set"}
            </div>
        </div>
    );
}
