import { useEffect, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { getApi } from "@/Services/Api";
import { useSelector } from "react-redux";
import Loader from "@/Components/Common/Loader";

const tabs = [
    { label: "Today", value: "today" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
]

function LeaderboardHero() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    const rotateX = useTransform(mouseY, [-200, 200], [15, -15]);
    const rotateY = useTransform(mouseX, [-200, 200], [-15, 15]);

    return (
        <div className="relative w-full py-20 md:py-32 flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            <div
                className="perspective-1000 max-w-5xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center"
                onMouseMove={onMouseMove}
                onMouseLeave={() => { x.set(0); y.set(0); }}
            >
                {/* Text Content */}
                <div className="text-center md:text-left space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 dark:text-white">
                            Hall of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500">Fame.</span>
                        </h1>
                        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto md:mx-0 font-medium">
                            Rise through the ranks and etch your name in history.
                            Compete with the best minds globally.
                        </p>
                    </motion.div>
                </div>

                {/* 3D Visual */}
                <div className="flex justify-center md:justify-end">
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative w-64 h-80 md:w-80 md:h-96 bg-white/90 dark:bg-neutral-900/90 rounded-3xl border border-neutral-200 dark:border-white/10 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                    >
                        <div style={{ transform: "translateZ(50px)" }} className="absolute inset-4 rounded-2xl border border-neutral-100 dark:border-white/5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 flex flex-col items-center justify-between py-8">
                            <div className="text-6xl animate-pulse">🏆</div>
                            <div className="text-center space-y-2">
                                <div className="h-2 w-20 bg-neutral-200 dark:bg-white/20 rounded-full mx-auto" />
                                <div className="h-2 w-12 bg-neutral-200 dark:bg-white/20 rounded-full mx-auto" />
                            </div>
                            <div className="px-4 py-2 bg-neutral-100 dark:bg-white/10 rounded-full text-xs font-bold tracking-widest text-neutral-900 dark:text-white uppercase border border-neutral-200 dark:border-white/10">
                                Top Rank
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function LeaderBoard() {
    const themeMode = useSelector((state) => state.theme.mode);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [leaderBoardData, setLeaderBoardData] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    let baseUrl = "leaderBoard";

    const handleData = async (url) => {
        await getApi(data, setData, url, setLoading);
    }

    useEffect(() => {
        setLeaderBoardData((prev) => ({ ...prev, [selectedTab?.value ?? 'today']: data }));
    }, [data]);

    useEffect(() => {
        if (selectedTab) {
            if (leaderBoardData && leaderBoardData[selectedTab.value]) {
                setData(leaderBoardData[selectedTab.value]);
                return;
            }
            baseUrl += `?filter=${selectedTab.value}`;
        }
        handleData(baseUrl);
    }, [selectedTab]);


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030303] transition-colors duration-300">
            {loading && <Loader />}
            {/* ######################## Hero Section ########################  */}
            {/* ######################## Hero Section ########################  */}
            <div className="pt-20">
                <LeaderboardHero />
            </div>

            {/* ######################## Content Section  ########################  */}
            <div className="relative z-10 -mt-10 px-4 max-w-4xl mx-auto pb-20">

                {/* Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="flex p-1 bg-white/50 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
                        {tabs.map((tabItem) => (
                            <button
                                key={tabItem.value}
                                onClick={() => setSelectedTab(tabItem)}
                                className={`
                                    relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 z-0
                                    ${tabItem === selectedTab ? "text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/5"}
                                `}
                            >
                                {tabItem === selectedTab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gradient-to-r from-rose-500 to-indigo-600 rounded-xl -z-10"
                                    />
                                )}
                                {tabItem.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTab.value}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Leaderboard users={data} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

/**
 * ================= Leaderboard =================
 */

function Leaderboard({ users }) {
    if (!users || users.length === 0) {
        return (
            <div className="text-center py-20 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No records found for this period.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {users.map((user, index) => {
                const isTop3 = index < 3;
                let rankColor = "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400";
                let borderColor = "border-gray-200 dark:border-white/5";

                // Gold
                if (index === 0) {
                    rankColor = "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-200 dark:border-yellow-500/50";
                    borderColor = "border-yellow-200 dark:border-yellow-500/50";
                }
                // Silver
                else if (index === 1) {
                    rankColor = "bg-gray-100 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-500/50";
                    borderColor = "border-slate-300 dark:border-slate-500/50";
                }
                // Bronze
                else if (index === 2) {
                    rankColor = "bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-500 border-orange-200 dark:border-orange-500/50";
                    borderColor = "border-orange-200 dark:border-orange-500/50";
                }

                return (
                    <motion.div
                        key={user.user.id || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                            relative flex items-center justify-between p-4 md:p-6 rounded-2xl 
                            backdrop-blur-xl border transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl
                            ${isTop3 ? 'bg-white/80 dark:bg-black/40' : 'bg-white/60 dark:bg-black/20'}
                            ${borderColor}
                        `}
                    >
                        {/* Rank & User Info */}
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className={`
                                flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full font-bold text-sm md:text-lg border
                                ${index === 0 ? "bg-gradient-to-br from-yellow-300 to-yellow-600 text-white border-none shadow-lg shadow-yellow-500/30" : ""}
                                ${index === 1 ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white border-none shadow-lg shadow-slate-500/30" : ""}
                                ${index === 2 ? "bg-gradient-to-br from-orange-300 to-orange-600 text-white border-none shadow-lg shadow-orange-500/30" : ""}
                                ${index > 2 ? "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400" : ""}
                            `}>
                                {index + 1}
                            </div>

                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800 dark:text-gray-100 text-base md:text-lg group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                    {user.user.name}
                                </span>
                                {isTop3 && (
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                                        {index === 0 ? "Champion" : index === 1 ? "Runner Up" : "Third Place"}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Score */}
                        <div className="flex flex-col items-end">
                            <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600 dark:from-rose-400 dark:to-indigo-400">
                                {user.total_coins ?? 0}
                            </span>
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Points</span>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

