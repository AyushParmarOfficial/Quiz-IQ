import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import ScrollToTop from "../ScrollToTop";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Client() {
    const themeMode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        const root = window.document.documentElement;
        if (themeMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [themeMode]);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#030303] text-gray-900 dark:text-gray-50 transition-colors duration-300">
                <ScrollToTop />

                <Header />

                <main className="page-content flex-grow">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>
    );
}