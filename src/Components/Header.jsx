import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/Themes/themeSlice";
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { NavLink } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

export default function Header() {
    const themeMode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const token = localStorage.getItem('token');

    const Toggleslide = () => {
        setShow((show) => !show);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const timeLeft = decoded.exp * 1000 - Date.now();
                if (timeLeft <= 0) {
                    handleLogout();
                } else {
                    const timer = setTimeout(() => handleLogout(), timeLeft);
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                console.error("Error : ", error);
                handleLogout();
            }
        }
    }, [])

    const navLinkClass = ({ isActive }) => `
        relative px-4 py-2 text-sm font-medium transition-colors duration-200
        ${isActive
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-neutral-600 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400'
        }
    `;

    return (
        <>
            {/* Desktop Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm border-b border-neutral-200 dark:border-white/10 h-16"
                        : "bg-transparent h-20"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-2">
                        <NavLink to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
                            QUIZ.IQ
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink to="" className={navLinkClass}>Home</NavLink>
                        <NavLink to="/leaderboard" className={navLinkClass}>Leaderboard</NavLink>
                        <NavLink to="/quizzes" className={navLinkClass}>Quizzes</NavLink>
                        <NavLink to="/story" className={navLinkClass}>Our Story</NavLink>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={handleThemeToggle}
                            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-300"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={themeMode}
                                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {themeMode === 'light' ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>

                        {token ? (
                            <div className="flex items-center gap-3">
                                <NavLink to="/account" className={navLinkClass}>Account</NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/signin"
                                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                            >
                                Sign In
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={handleThemeToggle}
                            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-300"
                        >
                            {themeMode === 'light' ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
                        </button>
                        <button
                            className="flex flex-col gap-1.5 p-2"
                            onClick={Toggleslide}
                        >
                            <span className="w-6 h-0.5 bg-neutral-800 dark:bg-white rounded-full"></span>
                            <span className="w-6 h-0.5 bg-neutral-800 dark:bg-white rounded-full"></span>
                            <span className="w-6 h-0.5 bg-neutral-800 dark:bg-white rounded-full"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {show && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setShow(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-neutral-950 shadow-2xl z-50 md:hidden p-6 border-l border-neutral-200 dark:border-neutral-800"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setShow(false)}
                                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
                                >
                                    <svg className="w-6 h-6 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="flex flex-col gap-2">
                                <NavLink to="" onClick={() => setShow(false)} className={({ isActive }) => `p-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>
                                    Home
                                </NavLink>
                                <NavLink to="/leaderboard" onClick={() => setShow(false)} className={({ isActive }) => `p-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>
                                    Leaderboard
                                </NavLink>
                                <NavLink to="/quizzes" onClick={() => setShow(false)} className={({ isActive }) => `p-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>
                                    Quizzes
                                </NavLink>
                                <NavLink to="/story" onClick={() => setShow(false)} className={({ isActive }) => `p-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>
                                    Our Story
                                </NavLink>
                            </nav>

                            <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                                {token ? (
                                    <div className="flex flex-col gap-3">
                                        <NavLink to="/account" onClick={() => setShow(false)} className="p-3 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                                            Account
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-2.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <NavLink
                                        to="/signin"
                                        onClick={() => setShow(false)}
                                        className="block w-full text-center py-2.5 rounded-full bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-500/30"
                                    >
                                        Sign In
                                    </NavLink>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}