import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import ScrollToTop from "../ScrollToTop";

export default function client() {

    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#030303] text-gray-50">
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