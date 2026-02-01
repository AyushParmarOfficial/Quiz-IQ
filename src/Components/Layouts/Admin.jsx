import { FaBars, FaUserCircle } from "react-icons/fa";
import { 
    MdQuiz, 
    MdTopic, 
    MdDarkMode, 
    MdLightMode, 
    MdAutoStories,
    MdModelTraining, 
    MdOutlineQuestionAnswer,
    MdOutlineClose
} from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../Features/Themes/themeSlice";
import { useState } from "react";
import 'datatables.net-dt'; 
import '../../assets/css/dataTable.css';

export default function Admin() {

    const [modal, setModal] = useState(false);
    const themeMode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch(); 

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    const openLinks = () => setModal(true);
    const closeLinks = () => setModal(false);

    return (
        <>
            <div className={`${themeMode === 'dark' ? "bg-zinc-950" : "bg-white "} relative isolate flex min-h-svh w-full  max-lg:flex-col  `}>
                {/* main navbar  */}
                <div className={`  fixed inset-y-0 left-0 w-64 max-lg:hidden z-40 `}>
                    <nav className={`${themeMode === 'dark' ? "text-white-950":"text-gray-500" } flex h-full min-h-0  flex-col`}>
                        <div className={` ${themeMode === 'dark' ? "border-white/10":"border-zinc-950/10" } flex flex-col border-b border-r h-full p-4 [&>[data-slot=section]+[data-slot=section]]:mt-2.5`}>
                            <div data-slot="section" className="flex flex-col gap-5.5">
                                <h1 className="w-full text-3xl">
                                    <NavLink to="/admin"> Quiz Game </NavLink>
                                </h1>
                            </div>
                            <div className="flex flex-1 flex-col overflow-y-auto py-4 pt-[35px] [&>[data-slot=section]+[data-slot=section]]:mt-8">
                                <div data-slot="section" className="flex flex-col gap-5.5">
                                    <span className={`${themeMode === 'dark' ? "border-white/10":"border-zinc-950/10" } relative text-lg text-start border-b`}>
                                        Admin Penal 
                                    </span>
                                    <span className="relative mt-[15px] ">
                                        <NavLink to="/admin/topics" className="flex gap-1">
                                            <MdTopic size={24} />Topics
                                        </NavLink>
                                    </span>
                                    <span className="relative ">
                                        <NavLink to="/admin/modes" className="flex gap-1">
                                            <MdModelTraining size={24} /> Modes
                                        </NavLink>
                                    </span>
                                </div>
                                <div data-slot="section" className="flex flex-col gap-5.5">
                                    <span className={`${themeMode === 'dark' ? "border-white/10":"border-zinc-950/10" } relative text-lg text-start border-b`}>
                                        Game
                                    </span>
                                    <span className="relative mt-[15px] ">
                                        <NavLink to="/admin/quiz" className="flex gap-1">
                                            <MdQuiz size={24} /> Quiz
                                        </NavLink>
                                    </span>
                                    <span className="relative  ">
                                        <NavLink to="/admin/questions" className="flex gap-1">
                                            <MdOutlineQuestionAnswer size={24} />Questions
                                        </NavLink>
                                    </span>
                                    
                                    <span className="relative ">
                                        <NavLink to="/admin/result" className="flex gap-1">
                                            <MdAutoStories size={24} /> Result 
                                        </NavLink>
                                    </span>
                                </div>
                                <div data-slot="section" className="flex flex-col gap-5.5">
                                    <span className={`${themeMode === 'dark' ? "border-white/10":"border-zinc-950/10" } relative text-lg text-start border-b`}>
                                        Users
                                    </span>
                                    <span className="relative mt-[15px] ">
                                        <NavLink to="/admin/users" className="flex gap-1">
                                            <FaUserCircle  size={24} /> Users
                                        </NavLink>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* mobile view navbar */}
                {modal && (
                    <div className={`${themeMode === 'dark' ? "bg-zinc-950" : "bg-white"} fixed inset-y-0 left-0 w-full lg:hidden z-40 bg-white`}>
                        <nav className={`${themeMode === 'dark' ? "text-white-950":"text-gray-500" } flex h-full min-h-0  flex-col`}>
                            <div className={` ${themeMode === 'dark' ? "border-white/10":"border-zinc-950/10" } flex flex-col border-b border-r h-full p-4 [&>[data-slot=section]+[data-slot=section]]:mt-2.5`}>
                                <div data-slot="section" className="flex gap-1">
                                    <h1 className="w-full text-3xl">
                                        <NavLink to="/admin" onClick={closeLinks}> Quiz Game </NavLink>
                                    </h1>
                                    <div className="flex justify-end">
                                        <span onClick={closeLinks} className="cursor-pointer">
                                            <MdOutlineClose size={24} />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col overflow-y-auto py-4 pt-[35px] [&>[data-slot=section]+[data-slot=section]]:mt-8">
                                    <div data-slot="section" className="flex flex-col gap-5.5">
                                        <span className={`${themeMode === 'dark' ? "border-white/10":"border-zinc-950/10" } relative text-lg text-start border-b`}>
                                            Admin Penal 
                                        </span>
                                        <span className="relative mt-[15px] ">
                                            <NavLink to="/admin/topics" className="flex gap-1" onClick={closeLinks}>
                                                <MdTopic size={24} />Topics
                                            </NavLink>
                                        </span>
                                        <span className="relative ">
                                            <NavLink to="/admin/modes" className="flex gap-1" onClick={closeLinks}>
                                                <MdModelTraining size={24} /> Modes
                                            </NavLink>
                                        </span>
                                    </div>
                                    <div data-slot="section" className="flex flex-col gap-5.5">
                                        <span className={`${themeMode === 'dark' ? "border-white/10":"border-zinc-950/10" } relative text-lg text-start border-b`}>
                                            Game
                                        </span>
                                        <span className="relative mt-[15px] ">
                                            <NavLink to="/admin/quiz" className="flex gap-1" onClick={closeLinks}>
                                                <MdQuiz size={24} /> Quiz
                                            </NavLink>
                                        </span>
                                        <span className="relative  ">
                                            <NavLink to="/admin/questions" className="flex gap-1" onClick={closeLinks}>
                                                <MdOutlineQuestionAnswer size={24} />Questions
                                            </NavLink>
                                        </span>
                                        
                                        <span className="relative ">
                                            <NavLink to="/admin/result" className="flex gap-1" onClick={closeLinks}>
                                                <MdAutoStories size={24} /> Result 
                                            </NavLink>
                                        </span>
                                    </div>
                                    <div data-slot="section" className="flex flex-col gap-5.5">
                                        <span className={`${themeMode === 'dark' ? "border-white/10":"border-zinc-950/10" } relative text-lg text-start border-b`}>
                                            Users
                                        </span>
                                        <span className="relative mt-[15px] ">
                                            <NavLink to="/admin/users" className="flex gap-1" onClick={closeLinks}>
                                                <FaUserCircle  size={24} /> Users
                                            </NavLink>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
                <header className={`${themeMode === 'dark' ? "text-white":" text-gray-500" } fixed flex items-center mt-[20px] w-full`}>
                    <div className={`${modal && 'hidden'} py-2.5 px-3 lg:hidden`}>
                        <span className="relative " onClick={openLinks}>
                            <FaBars size={22} />
                        </span>
                    </div>
                    <div className="mr-[20px] min-w-0 flex-1">
                        <nav className="flex flex-1 items-center gap-4 py-2.5">
                            <div aria-hidden="true" className="-ml-4 flex-1"></div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleThemeToggle}
                                    className={`p-2 m-2 rounded-full transition-colors duration-300 
                                            ${themeMode === 'light' ? 'bg-gray-200 text-[#515d61]' : 'bg-gray-800 "text-[#ada6a6]"'}`}
                                >
                                    {themeMode === 'light' ? 
                                        <MdDarkMode size={22} /> : 
                                        <MdLightMode size={22} />
                                    }
                                </button>


                                <NavLink                                 
                                    className="font-bold"
                                    onClick={handleLogout}
                                > 
                                    Log Out  
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                </header>
                <main className=" page-content flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64">
                    <div className={`${themeMode === 'dark' ? "":"lg:ring-zinc-950/5 lg:shadow-xs lg:ring-1 " } grow p-6 lg:rounded-lg  lg:p-10  `}>
                        <div className="mt-[50px]">
                                <Outlet />  
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}