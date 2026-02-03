import React from "react";
import { motion } from "framer-motion";

export default function TechCard({ icon, title, desc }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 hover:border-indigo-500/30 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800/50 group"
        >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
        </motion.div>
    );
}
