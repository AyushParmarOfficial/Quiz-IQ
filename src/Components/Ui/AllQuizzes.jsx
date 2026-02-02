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

export default function AllQuizzes() {

    const [data, setData] = useState([]);
    const quizRef = useRef(null);
    const quizPriviousRef = useRef(null);
    const quizNextRef = useRef(null);
    const url = "allQuiz";

    useEffect(() => {
        const handleData = async (e) => {
            await getApi(data, setData, url);
        }
        handleData();
    }, []);

    useEffect(() => {
        if (!quizRef.current) return;

        const swiper = quizRef.current;
        const prevEl = quizPriviousRef.current;
        const nextEl = quizNextRef.current;

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

    return (
        <>
            {data && data.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeUpVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
                                        Explore
                                        <span className="text-indigo-600 dark:text-indigo-400"> Everything.</span>
                                    </h2>
                                    <p className="text-neutral-500 dark:text-neutral-400 mt-3 text-lg">
                                        Dive into our full collection of quizzes.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex gap-2">
                                        <button
                                            ref={quizPriviousRef}
                                            className="w-12 h-12 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white"
                                        >
                                            &#10094;
                                        </button>
                                        <button
                                            ref={quizNextRef}
                                            className="w-12 h-12 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white"
                                        >
                                            &#10095;
                                        </button>
                                    </div>
                                    <NavLink to={'/quizzes'} state={{ title: "All Quizzes" }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">
                                        Browse Library
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
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
                                    prevEl: quizPriviousRef.current,
                                    nextEl: quizNextRef.current
                                }}
                                onInit={(swiper) => { quizRef.current = swiper }}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 4 },
                                    1280: { slidesPerView: 4 }
                                }}
                                className="!overflow-hidden !pb-4"
                            >
                                {data?.length > 0 && data.map((quiz, index) => (
                                    <SwiperSlide key={index}>
                                        <NavLink to={`/quizzes/questions/${quiz.slug}`} className="group relative block h-[280px] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                                            {/* Image Background */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src={quiz.image ? `${import.meta.env.VITE_Image_URL}${quiz.image}` : logo}
                                                    alt={quiz.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-70 group-hover:opacity-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                            </div>

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                                <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                                                    <div className="mb-2 inline-flex items-center rounded-lg bg-indigo-600 px-2 py-1 text-xs font-bold text-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                        Start Quiz
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white leading-tight">
                                                        {quiz.name}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 line-clamp-2">
                                                        Check your skills in this {quiz.name} challenge.
                                                    </p>
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