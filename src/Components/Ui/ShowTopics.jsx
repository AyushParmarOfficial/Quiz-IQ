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
import 'swiper/css/effect-fade'
import Loader from "@/Components/Common/Loader";

export default function ShowTopics() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const topicRef = useRef(null);
    const topicPriviousRef = useRef(null);
    const topicNextRef = useRef(null);

    const url = "topic";

    useEffect(() => {
        const handleData = async (e) => {
            await getApi(data, setData, url, setLoading);
        }
        handleData();
    }, []);

    useEffect(() => {
        if (!topicRef.current) return;

        const swiper = topicRef.current;
        const prevEl = topicPriviousRef.current;
        const nextEl = topicNextRef.current;

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
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeUpVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <div className="flex justify-between items-end mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                                        Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-indigo-600">Topics</span>
                                    </h2>
                                    <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-lg">Find your favorite category and start playing.</p>
                                </div>

                                <NavLink to={'/quizzes/topics'} className="hidden md:flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium transition-colors">
                                    View All Topics <span aria-hidden="true">&rarr;</span>
                                </NavLink>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                                <button
                                    ref={topicPriviousRef}
                                    className="p-3 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white shadow-lg hover:scale-110 transition-all disabled:opacity-50"
                                >
                                    &#10094;
                                </button>
                            </div>

                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={24}
                                slidesPerView={1}
                                speed={800}
                                navigation={{
                                    prevEl: topicPriviousRef.current,
                                    nextEl: topicNextRef.current
                                }}
                                onInit={(swiper) => { topicRef.current = swiper }}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1280: { slidesPerView: 4 }
                                }}
                                className="pb-12 !px-1"
                            >
                                {data?.length > 0 && data.map((topic, index) => (
                                    <SwiperSlide key={index}>
                                        <NavLink to={`/quizzes/${topic.slug}`} state={{ id: topic.id, title: topic.name }} className="block h-full group perspective-1000">
                                            <div className="relative h-[320px] rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:shadow-rose-900/10 transition-all duration-300 group-hover:-translate-y-1">
                                                {/* Image */}
                                                <div className="h-48 overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                                    <img
                                                        src={topic.image ? `${import.meta.env.VITE_Image_URL}${topic.image}` : logo}
                                                        alt={topic.name}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                                            {topic.name}
                                                        </h3>
                                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2">Test your knowledge in {topic.name}.</p>
                                                    </div>
                                                    <div className="flex items-center text-sm font-bold text-rose-600 dark:text-rose-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                        Start Quiz &rarr;
                                                    </div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                                <button
                                    ref={topicNextRef}
                                    className="p-3 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white shadow-lg hover:scale-110 transition-all disabled:opacity-50"
                                >
                                    &#10095;
                                </button>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            )}
        </>
    );
}