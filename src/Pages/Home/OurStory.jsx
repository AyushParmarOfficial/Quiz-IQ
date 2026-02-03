import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Palette, Rocket, Zap, Brain, Layout, Layers, Box } from "lucide-react";
import StorySection from "@/Components/Ui/StorySection";
import TechCard from "@/Components/Ui/TechCard";

export default function OurStory() {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="bg-neutral-50 dark:bg-[#030303] min-h-screen transition-colors duration-300 overflow-hidden">

            {/* SEO Meta Tags (Simulated structure for React) */}
            <header className="sr-only">
                <h1>Our Story - The Journey of Building Quiz IQ</h1>
                <p>Discover how Quiz IQ evolved from a React learning project into a modern, portfolio-worthy web application featuring 3D UI and advanced state management.</p>
            </header>

            <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[100px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl px-4"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold text-sm tracking-widest uppercase mb-8">
                        The Developer Journey
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-neutral-900 dark:text-white mb-8 tracking-tight leading-tight">
                        Crafting the <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">
                            Future of Learning.
                        </span>
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        What started as a simple React experiment has blossomed into <span className="text-neutral-900 dark:text-white font-bold">Quiz IQ</span>—a platform where learning meets pure, beautiful design.
                    </p>
                </motion.div>
            </div>

            {/* #################### Main Content #################### */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-32">

                {/* Chapter 1: The Genesis */}
                <StorySection
                    icon={<Brain className="text-white" size={24} />}
                    title="The Genesis"
                    subtitle="Where Logic Meets Creativity"
                    description={`
                        This project was never just about writing code, it was about 
                        creating a sense of connection. What began as a way to deepen 
                        my mastery of React quickly evolved into something more meaningful. 
                        I became passionate about building an application that felt alive, 
                        responsive, and intuitive.
                        Along the way, I focused on solving real problems
                        managing data efficiently, keeping users genuinely engaged,
                        and designing interactions that feel natural rather than forced.
                        The goal was to craft an experience that isn’t just functional, 
                        but enjoyable something users want to explore, not just use.
                    `}
                    gradient="from-orange-500 to-rose-500"
                    align="left"
                    tech={['React Hooks', 'State Management', 'Component Architecture']}
                />

                {/* Chapter 2: The Design Evolution */}
                <StorySection
                    icon={<Palette className="text-white" size={24} />}
                    title="Designing Depth"
                    subtitle="Beyond Flat Interfaces"
                    description={`
                        Flat screens can feel lifeless. We wanted the software to feel 
                        tangible, something you don’t just see, but experience. 
                        That’s where the 3D elements come in. Cards rise with your 
                        touch, colors respond to movement, and every interaction carries
                        a subtle, satisfying sense of weight.
                        Whether in light or dark mode, the interface adapts thoughtfully, 
                        easy on the eyes, yet engaging for the mind.
                        The goal was to create an environment that feels dynamic and 
                        immersive, transforming everyday interactions into moments of delight.
                    `}
                    gradient="from-rose-500 to-indigo-600"
                    align="right"
                    tech={['Tailwind CSS', 'Framer Motion', '3D Transforms', 'Responsive Design']}
                />

                {/* Chapter 3: The Tech Stack */}
                <div className="relative">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-6"
                        >
                            Built With <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">Modern Power.</span>
                        </motion.h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            We chose the strongest tools in the box. Rock-solid performance, zero lag, and a smooth ride all the way.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <TechCard
                            icon={<Zap size={32} />}
                            title="Vite Engine"
                            desc="Lightning fast HMR and optimized production builds for instant page loads."
                        />
                        <TechCard
                            icon={<Layout size={32} />}
                            title="React Ecosystem"
                            desc="Component-based architecture with advanced hooks and context API."
                        />
                        <TechCard
                            icon={<Layers size={32} />}
                            title="Tailwind CSS"
                            desc="Utility-first styling allowing for rapid, consistent, and beautiful UI development."
                        />
                        <TechCard
                            icon={<Box size={32} />}
                            title="Framer Motion"
                            desc="Production-ready animation library powering the complex 3D interactions."
                        />
                    </div>
                </div>

                {/* Chapter 4: The Future */}
                <div className="relative bg-neutral-900 dark:bg-black rounded-[3rem] p-8 md:p-16 overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-indigo-600/20" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <Rocket className="mx-auto text-rose-500 mb-6" size={48} />
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What's Next?</h2>
                        <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                            This is only chapter one. I am dreaming big, real-time battles with friends, smart AI questions tailored just for you, and deeper insights into your skills. The journey is just getting started.
                        </p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-white font-medium backdrop-blur-md">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Active Development
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


