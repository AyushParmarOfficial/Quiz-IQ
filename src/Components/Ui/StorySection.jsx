import React from "react";
import { motion } from "framer-motion";

export default function StorySection({ title, subtitle, description, icon, gradient, align = "left", tech = [] }) {
    return (
        <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${align === "right" ? "md:flex-row-reverse" : ""}`}>

            {/* Visual Side */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: align === "left" ? -5 : 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full relative group"
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`} />
                <div className="relative h-[400px] w-full bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-white/10 shadow-2xl flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05]" />

                    {/* Abstract Visual Representation */}
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-rose-500/20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            {icon}
                        </div>
                        <div className="flex gap-3 flex-wrap justify-center max-w-[80%]">
                            {tech.map((t, i) => (
                                <span key={i} className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 rounded-full border border-neutral-200 dark:border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
                initial={{ opacity: 0, x: align === "left" ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-6"
            >
                <div>
                    <span className={`inline-block mb-4 text-sm font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                        {subtitle}
                    </span>
                    <h2 className="text-4xl font-bold text-neutral-900 dark:text-white leading-tight">
                        {title}
                    </h2>
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {description}
                </p>
            </motion.div>
        </div>
    );
}
