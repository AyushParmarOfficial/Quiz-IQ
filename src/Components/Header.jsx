import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features/Themes/themeSlice";
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { NavLink } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { AnimatePresence, motion} from "framer-motion"


export default function Header() {
    const themeMode = useSelector((state) => state.theme.mode);
    const [show, setShow] = useState(false);

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

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: "easeout",
            }
        }
    }
    
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
                console.error("Error : " , error);
                handleLogout();
            }
        }
    },[])

    return (
        <>
            {/* #############################################. Normal Header ############################################################### */}
            <header className="hidden  sm:block md:p-10 z-9999 fixed items-center header w-full h-[100px] bg-[#030303] opacity-90 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]">
                <div className="flex gap-6 text-sm uppercase tracking-wider text-gray-500 justify-center items-center h-full">
                    <div className="flex ml-0 ">
                        <NavLink 
                            to="" 
                            className={({ isActive }) => `
                                flex ml-0 pb-1 transition-all duration-300
                                ${isActive 
                                ? 'border-b-1 [border-image:linear-gradient(to_right,#a5b4fc,rgba(255,255,255,0.9),#fda4af)_1]' 
                                : 'border-b-1 border-transparent hover:text-white hover:text-bold'
                                }
                            `}
                        > 
                            Home 
                        </NavLink>
                    </div>
                   
                    <div className="flex ml-0">
                        <NavLink 
                            to={'/leaderboard'} 
                            className={({ isActive }) => `
                                flex ml-0 pb-1 transition-all duration-300
                                ${isActive 
                                ? 'border-b-1 [border-image:linear-gradient(to_right,#a5b4fc,rgba(255,255,255,0.9),#fda4af)_1]' 
                                : 'border-b-1 border-transparent hover:text-white hover:text-bold'
                                }
                            `}
                        > 
                            LeaderBoard 
                        </NavLink>
                    </div>

                    <div className="flex ml-0">
                        <NavLink 
                            to={'/quizzes'} 
                            className={({ isActive }) => `
                                flex ml-0 pb-1 transition-all duration-300
                                ${isActive 
                                ? 'border-b-1 [border-image:linear-gradient(to_right,#a5b4fc,rgba(255,255,255,0.9),#fda4af)_1]' 
                                : 'border-b-1 border-transparent hover:text-white hover:text-bold'
                                }
                            `}
                        > 
                            quizzes 
                        </NavLink>
                    </div>
                    
                    <div className="flex ml-0">
                        <NavLink 
                            to={'/story'} 
                            className={({ isActive }) => `
                                flex ml-0 pb-1 transition-all duration-300
                                ${isActive 
                                ? 'border-b-1 [border-image:linear-gradient(to_right,#a5b4fc,rgba(255,255,255,0.9),#fda4af)_1]' 
                                : 'border-b-1 border-transparent hover:text-white hover:text-bold'
                                }
                            `}
                        > 
                            our story 
                        </NavLink>
                    </div>

                    <div className=" flex gap-2 lg:gap-5 items-center">
                        { token ? (
                            <>
                             <div className="flex ml-0">
                                <NavLink 
                                    to={'/account'} 
                                    className={({ isActive }) => `
                                        flex ml-0 pb-1 transition-all duration-300
                                        ${isActive 
                                        ? 'border-b-1 [border-image:linear-gradient(to_right,#a5b4fc,rgba(255,255,255,0.9),#fda4af)_1]' 
                                        : 'border-b-1 border-transparent hover:text-white hover:text-bold'
                                        }
                                    `}
                                > 
                                    Account 
                                </NavLink>
                            </div>
                            <NavLink                  
                                to = "/signin"               
                                onClick={handleLogout}
                                className={({ isActive }) => `
                                flex ml-0 pb-1 transition-all duration-300
                                ${isActive 
                                ? 'border-b-1 [border-image:linear-gradient(to_right,#a5b4fc,rgba(255,255,255,0.9),#fda4af)_1]' 
                                : 'border-b-1 border-transparent hover:text-white hover:text-bold'
                                }
                            `}
                            > 
                                Log Out  
                            </NavLink>
                            </>
                        ): (
                            <NavLink 
                                to="/signin" 
                                className={({ isActive }) => `
                                flex ml-0 pb-1 transition-all duration-300
                                ${isActive 
                                ? 'border-b-1 [border-image:linear-gradient(to_right,#a5b4fc,rgba(255,255,255,0.9),#fda4af)_1]' 
                                : 'border-b-1 border-transparent hover:text-white hover:text-bold'
                                }`}
                            > 
                                Sign In  
                            </NavLink>
                        )}
                    </div>
                </div>
            </header>

            {/* #############################################.  Slider Menu  ############################################################### */}
            <header className="block sm:hidden md:p-10 z-9999 fixed items-center header w-full h-[80px] bg-transparent ">
                {/* Menu Icon */}
                <div className="flex w-full justify-end pr-3 h-full items-center">
                    <div className="flex flex-col gap-2 p-2 border-1 border-gray-500 rounded-[5px] bg-[#030303] opacity-80" onClick={Toggleslide}>
                        <span className="h-1 w-10 rounded-[5px] bg-white"/>
                        <span className="h-1 w-10 rounded-[5px] bg-white"/>
                        <span className="h-1 w-10 rounded-[5px] bg-white"/>
                    </div>
                </div>
            </header>
            {/* Menu Content  */}
            <AnimatePresence>
                {show && 
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed top-0 right-0 h-screen w-full bg-red z-50"
                    >
                        <div className="flex justify-end w-screen" onClick={() => setShow(false)}>
                            <div className="pt-[80px] px-5 text-2xl h-screen w-[60%] flex flex-col bg-[#030303] opacity-95 capitalize">
                                <NavLink 
                                    to="" 
                                    className={({ isActive }) => `
                                        flex ml-0 p-2 rounded-[5px] transition-all duration-300
                                        ${isActive 
                                        ? 'bg-gray-400/50' 
                                        : 'border-b-1 border-transparent'
                                        }
                                    `}
                                > 
                                    Home 
                                </NavLink>

                                <NavLink 
                                    to={'/leaderboard'} 
                                    className={({ isActive }) => `
                                        flex ml-0 p-2 rounded-[5px] transition-all duration-300
                                        ${isActive 
                                        ? 'bg-gray-400/50' 
                                        : 'border-b-1 border-transparent'
                                        }
                                    `}
                                > 
                                    LeaderBoard 
                                </NavLink>

                                <NavLink 
                                    to={'/quizzes'} 
                                    className={({ isActive }) => `
                                        flex ml-0 p-2 rounded-[5px] transition-all duration-300
                                        ${isActive 
                                        ? 'bg-gray-400/50' 
                                        : 'border-b-1 border-transparent'
                                        }
                                    `}
                                > 
                                    quizzes 
                                </NavLink>

                                <NavLink 
                                    to={'/story'} 
                                    className={({ isActive }) => `
                                        flex ml-0 p-2 rounded-[5px] transition-all duration-300
                                        ${isActive 
                                        ? 'bg-gray-400/50' 
                                        : 'border-b-1 border-transparent'
                                        }
                                    `}
                                > 
                                    our story 
                                </NavLink>
                                
                                { token ? (
                                    <>
                                        <NavLink 
                                            to={'/account'} 
                                            className={({ isActive }) => `
                                                flex ml-0 p-2 rounded-[5px] transition-all duration-300
                                                ${isActive 
                                                ? 'bg-gray-400/50' 
                                                : 'border-b-1 border-transparent'
                                            }`}
                                        > 
                                            Account 
                                        </NavLink>
                                        <NavLink                  
                                            to = "/signin"               
                                            onClick={handleLogout}
                                            className={({ isActive }) => `
                                                flex ml-0 p-2 rounded-[5px] transition-all duration-300
                                                ${isActive 
                                                ? 'bg-gray-400/50' 
                                                : 'border-b-1 border-transparent'
                                            }`}
                                        > 
                                            Log Out  
                                        </NavLink>
                                    </>
                                ): (
                                    <NavLink 
                                        to="/signin" 
                                        className={({ isActive }) => `
                                        flex ml-0 p-2 rounded-[5px] transition-all duration-300
                                        ${isActive 
                                        ? 'bg-gray-400/50' 
                                        : 'border-b-1 border-transparent'
                                        }`}
                                    > 
                                        Sign In  
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}