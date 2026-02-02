import { getApi } from "@/Services/Api";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import logo from "../../assets/images/i2.png";
import { NavLink, useLocation, useParams } from "react-router-dom";


function QuizHero({ title, description }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
    const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

    return (
        <div className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] -z-10" />

            <div
                className="perspective-1000 max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center"
                onMouseMove={onMouseMove}
                onMouseLeave={() => { x.set(0); y.set(0); }}
            >
                <div className="text-center md:text-left space-y-6 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
                            {title || "Explore"} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                                {title ? "Challenges." : "Quizzes."}
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto md:mx-0 font-medium leading-relaxed">
                            {description || "Dive into a world of knowledge. Select a quiz, test your limits, and climb the leaderboard."}
                        </p>
                    </motion.div>
                </div>

                <div className="flex justify-center md:justify-end order-1 md:order-2">
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative w-72 h-80 md:w-96 md:h-[400px] bg-white/80 dark:bg-neutral-900/80 rounded-3xl border border-neutral-200 dark:border-white/10 shadow-2xl shadow-rose-500/20 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <div style={{ transform: "translateZ(40px)" }} className="absolute inset-4 rounded-2xl border border-neutral-100 dark:border-white/5 bg-gradient-to-br from-rose-500/5 to-orange-500/5 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="text-7xl animate-bounce">🎯</div>
                            <div className="px-5 py-2 bg-rose-500 rounded-full text-white text-sm font-bold shadow-lg shadow-rose-500/30">
                                Ready to Play?
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function MoreQuiz() {
    const location = useLocation();
    const { topicSlug } = useParams();
    const stateData = location.state ?? " ";
    const [data, setData] = useState([]);
    const [loadedData, setLoadedData] = useState([]);

    const handleData = async (url) => {
        await getApi(data, setData, url);
    }

    useEffect(() => {
        let url = `getActiveQuiz?`;
        if (stateData.order) {
            url += `order=${stateData.order}`;
        }
        if (topicSlug) {
            url += `&slug=${topicSlug}`
        };
        handleData(url);
    }, []);

    useEffect(() => {
        if (data?.quizzes?.data && data.quizzes.data.length > 0) {

            setLoadedData((prev) => {
                const exiestingDataId = new Set(prev.map(items => items.id));
                const uniqueNewData = data.quizzes.data.filter(items => !exiestingDataId.has(items.id));

                if (uniqueNewData.length === 0) return prev;

                return [...prev, ...uniqueNewData];
            });
        }
    }, [data]);

    const loadMore = () => {
        const nextPageUrl = data?.quizzes?.next_page_url;
        if (!nextPageUrl) return;
        const url = new URL(nextPageUrl);
        const pageNumber = url?.searchParams.get('cursor');

        handleData(`getActiveQuiz?order=${stateData.order}&cursor=${pageNumber}`);

    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#030303] transition-colors duration-300">
            <div className="pt-20">
                <QuizHero
                    title={data?.topic?.name}
                    description={data?.topic?.description}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-24 -mt-10 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {loadedData?.length > 0 && loadedData.map((quiz, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <NavLink to={`/quizzes/questions/${quiz.slug}`} className="block h-full group perspective-1000">
                                <div className="relative h-[320px] bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2">

                                    {/* Image Background */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={quiz.image ? `${import.meta.env.VITE_Image_URL}${quiz.image}` : logo}
                                            alt={quiz.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                                            <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                <span className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-full shadow-lg">
                                                    Play Now
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white leading-tight mb-2 drop-shadow-md">{quiz.name}</h3>
                                            <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Test your skills and climb the ranks with this challenge.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="flex justify-center mt-16">
                    {data?.quizzes?.next_page_url != null &&
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={loadMore}
                            className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all"
                        >
                            Load More Quizzes
                        </motion.button>
                    }
                </div>
            </div>
        </div>
    );
}