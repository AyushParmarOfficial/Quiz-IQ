import { motion } from "framer-motion";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{
                        rotate: 360,
                        rotateX: 180,
                        rotateY: 180,
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute h-24 w-24 rounded-full border-[3px] border-transparent border-t-rose-500 border-l-rose-500/50"
                    style={{ perspective: "1000px" }}
                />

                {/* Middle Ring */}
                <motion.div
                    animate={{
                        rotate: -360,
                        rotateX: -180,
                        rotateY: 0,
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute h-16 w-16 rounded-full border-[3px] border-transparent border-t-indigo-500 border-r-indigo-500/50"
                    style={{ perspective: "1000px" }}
                />

                {/* Inner Core */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="h-4 w-4 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 shadow-[0_0_20px_rgba(244,63,94,0.5)]"
                />

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-16 text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600 uppercase"
                >
                    Loading
                </motion.div>
            </div>
        </div>
    );
}
