import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Spotlight } from "./Spotlight";

export default function HeroSection() {

    const themeMode = useSelector((state) => state.theme.mode);

    return (
        <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-transparent antialiased bg-grid-white/[0.02] relative overflow-hidden pt-20 md:pt-0">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill={themeMode === 'dark' ? "white" : "#6366f1"}
            />
            <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
                    Think Fast, <br /> is the new trend.
                </h1>
                <p className="mt-4 font-normal text-base text-neutral-600 dark:text-neutral-300 max-w-lg text-center mx-auto">
                    Test your knowledge across topics and see how you rank against others.
                    Challenge your friends, earn badges, and become the ultimate quiz master.
                </p>
                <div className="flex justify-center mt-8 gap-4">
                    <NavLink to="/quizzes" className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Start Playing
                    </NavLink>
                    <NavLink to="/leaderboard" className="px-8 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm text-neutral-800 dark:text-neutral-200 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300">
                        Leaderboard
                    </NavLink>
                </div>
            </div>
        </div>
    );
}