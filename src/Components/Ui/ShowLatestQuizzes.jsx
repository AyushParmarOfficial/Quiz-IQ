import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { getApi } from "../../Services/Api"
import { motion } from "framer-motion"
import logo from "../../assets/images/i2.png"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"
import 'swiper/css/pagination'
import Loader from "@/Components/Common/Loader";

export default function ShowLatestQuizzes() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const latestQuizRef = useRef(null);
    const latestQuizPriviousRef = useRef(null);
    const latestQuizNextRef = useRef(null);

    const url = "latestQuiz";

    useEffect(() => {
        const handleData = async (e) => {
            await getApi(data, setData, url, setLoading);
        }
        handleData();
    }, []);

    useEffect(() => {
        if (!latestQuizRef.current) return;

        const swiper = latestQuizRef.current;
        const prevEl = latestQuizPriviousRef.current;
        const nextEl = latestQuizNextRef.current;

        if (prevEl && nextEl) {
            swiper.params.navigation.prevEl = prevEl;
            swiper.params.navigation.nextEl = nextEl;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [data]);

    const fadeUpVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0,
                delayChildren: 0.2
            },
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: -120,
            transition: {
                duration: 1.8,
                ease: "easeOut",
            },
        },
    }

    if (loading && data.length === 0) {
        return <Loader />;
    }

    return (
        <>
            {data && data.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUpVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-6 gap-4">
                                <div>
                                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">
                                            Fresh Drops.
                                        </span>
                                    </h2>
                                    <p className="text-lg text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
                                        The latest challenges hot off the press.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex gap-2">
                                        <button
                                            ref={latestQuizPriviousRef}
                                            className="w-12 h-12 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white"
                                        >
                                            &#10094;
                                        </button>
                                        <button
                                            ref={latestQuizNextRef}
                                            className="w-12 h-12 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white"
                                        >
                                            &#10095;
                                        </button>
                                    </div>
                                    <NavLink to={'/quizzes'} state={{ order: "desc", title: "Latest Quizzes" }} className="px-6 py-2 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-semibold transition-colors">
                                        View All
                                    </NavLink>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={24}
                                slidesPerView={1}
                                speed={800}
                                navigation={{
                                    prevEl: latestQuizPriviousRef.current,
                                    nextEl: latestQuizNextRef.current
                                }}
                                onInit={(swiper) => { latestQuizRef.current = swiper }}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1280: { slidesPerView: 4 }
                                }}
                                className="!overflow-hidden !pb-4"
                            >
                                {data?.length > 0 && data.map((latestQuiz, index) => (
                                    <SwiperSlide key={index}>
                                        <NavLink to={`/quizzes/questions/${latestQuiz.slug}`} className="group relative block h-[280px] overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-xl transition-all duration-300">
                                            {/* Image Background */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src={latestQuiz.image ? `${import.meta.env.VITE_Image_URL}${latestQuiz.image}` : logo}
                                                    alt={latestQuiz.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-70 group-hover:opacity-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                            </div>

                                            {/* Floating Badge for Latest */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-500/40">
                                                    New
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                                <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                                                    <h3 className="text-xl font-bold text-white leading-tight">
                                                        {latestQuiz.name}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 line-clamp-2">
                                                        Test your knowledge.
                                                    </p>
                                                    <div className="mt-3 flex items-center text-rose-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                                        Play Now &rarr;
                                                    </div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </>
    );
}