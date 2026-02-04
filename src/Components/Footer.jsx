import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {

    const { pathname } = useLocation();

    const paths = ['/signin', '/signup'];
    const showFullFooter = !paths.includes(pathname);

    if (!showFullFooter) return null;

    return (
        <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <NavLink to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-rose-500/20">
                                Q
                            </div>
                            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
                                QUIZ.IQ
                            </span>
                        </NavLink>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">
                            Elevate your cognitive baseline. Master curated challenges built for the modern thinker.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-gray-100 mb-4">Platform</h3>
                        <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><NavLink to="/quizzes" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">All Quizzes</NavLink></li>
                            <li><NavLink to="/leaderboard" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Leaderboard</NavLink></li>
                            <li><NavLink to="/challenges" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Daily Challenges</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-gray-100 mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><NavLink to="/about" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">About Us</NavLink></li>
                            <li><NavLink to="/story" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Our Story</NavLink></li>
                            <li><NavLink to="/careers" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Careers</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-gray-100 mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><NavLink to="/privacy" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Privacy Policy</NavLink></li>
                            <li><NavLink to="/terms" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Terms of Service</NavLink></li>
                            <li><NavLink to="/cookies" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Cookie Policy</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        © {new Date().getFullYear()} QUIZ.IQ. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {/* Social Icons placeholder */}
                        <a href="https://github.com/AyushParmarOfficial" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <span className="sr-only">GitHub</span>
                            <FaGithub className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/ayush-parmar-web-developer/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <FaLinkedin className="w-5 h-5" />
                        </a>
                        <a href="https://www.instagram.com/ayushparmar0856/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            <span className="sr-only">Instagram</span>
                            <FaInstagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}