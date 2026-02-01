import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/Themes/themeSlice";
import { NavLink, useLocation } from "react-router-dom";

export default function Footer() {

    const themeMode = useSelector((state) => state.theme.mode);
    const { pathname } = useLocation();
    const dispatch = useDispatch(); 

    const paths = ['/signin', '/signup'];
    const showFullFooter = ! paths.includes(pathname);
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    }

    const Logo = ({ size = 100, className = "" }) => {
        return (
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                aria-label="Quiz Website Logo"
                role="img"
            >
                <defs>
                    <linearGradient id="logo-gradiant" x1="0%" y1="0%" x2="100%" y2="100%">
                    {/* Main color from your original code */}
                    <stop offset="0%" stopColor="#fff" /> 
                    <stop offset="50%" stopColor="#fff" /> 

                    {/* Lighter or different shade for the gradient effect */}
                    <stop offset="100%" stopColor="#ffa1ad" />
                    </linearGradient>
                </defs>
                {/* Outer Circular Ring */}
                <path 
                d="M80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20C60.25 20 69.35 25.12 74.8 32.95" 
                stroke={`url(#logo-gradiant)`}
                strokeWidth="6" 
                strokeLinecap="round"
                />
                
                {/* Central Lightning Bolt */}
                <path 
                d="M55 35L40 55H50L45 75L65 45H55L60 30" 
                fill={`url(#logo-gradiant)`}
                />
            </svg>
        );
    }
    return (
        <>
            {showFullFooter && 
                <footer className="bg-black text-white pt-10 px-10 pb-5 flex flex-col items-center bg-linear-to-t from-white/[0.2] via-transparent">
                    <div className="flex flex-col mb-[30px] lg:mb-[50px] lg:flex-row gap-10 lg:gap-25 justify-start md:justify-center items-start lg:items-center w-full">
                        <div className="flex flex-col md:flex-row gap-5 md:gap-1 items-start w-full md:w-max">
                            <div className="flex flex-col justify-start items-center lg:mt-[-15px] mt-[-20px]  w-full md:w-max">
                                <Logo size={150} className="hover:scale-125 transition-transform  transition duration-900 ease-in-out" />
                                
                                <p className=" text-xl font-bold text-center tracking-widest hover:bg-clip-text hover:text-transparent hover:bg-linear-to-t from-rose-300/[0.5] via-white/90 to-white/90">QUIZ.IQ</p>
                            </div>
                            <div className="flex flex-col justify-start items-start w-full">
                                <p className="text-gray-50 text-xl text-start text-bold mt-2 md:mt-0 w-full hover:bg-clip-text hover:text-transparent hover:bg-linear-to-t from-rose-300/[0.5] via-white/90 to-white/90">
                                    Elevate Your Intellect. Achieve Mental Peak.
                                </p>
                                <p className="text-gray-500 mt-5 max-w-[550px] lg:max-w-[450px] hover:text-gray-400">Master curated challenges built for the modern thinker. Elevate your  
                                    cognitive baseline and visualize your journey toward self-mastery
                                    with every insight gained. Step into the arena and refine your intellect today.
                                </p>

                            </div>
                        </div>
                        <div className="flex flex-col justify-start md:ml-10 lg:ml-0">
                            <p className="uppercase mt-1 hover:bg-clip-text hover:text-transparent hover:bg-linear-to-t from-rose-300/[0.5] via-white/90 to-white/90"> Explore</p>
                            <nav className="flex gap-3 md:gap-2 flex-col justify-center mt-3 text-sm uppercase tracking-wider text-gray-500">
                                <NavLink to="/" className="hover:text-white">Home</NavLink>
                                <NavLink to="/leaderboard" className="hover:text-white">Leaderboard</NavLink>
                                <NavLink to="/quizzes" className="hover:text-white">Quizzes</NavLink>
                                <NavLink to="/story" className="hover:text-white">Our Story</NavLink>
                            </nav>
                        </div>                    
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-500 w-full text-center text-sm text-gray-400">
                        © 2026 QUIZ.IQ. All rights reserved.
                    </div>
                </footer>
            }
        </>
    );
}