import { HeroGeometric } from "@/Components/Ui/shadcn-io/shape-landing-hero";
import { getApi } from "@/Services/Api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Loader from "@/Components/Common/Loader";

export default function MoreTopics() {

    const [data, setData] = useState([]);
    const [loadedData, setLoadedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleData = async (url) => {
        await getApi(data, setData, url, setLoading);
    }

    useEffect(() => {
        handleData("getActiveTopics");
    }, []);

    useEffect(() => {
        if (data?.data && data.data.length > 0) {

            setLoadedData((prev) => {
                const exiestingDataId = new Set(prev.map(items => items.id));
                const uniqueNewData = data.data.filter(items => !exiestingDataId.has(items.id));

                if (uniqueNewData.length === 0) return prev;

                return [...prev, ...uniqueNewData];
            });
        }
    }, [data]);

    const loadMore = () => {
        const nextPageUrl = data?.next_page_url;
        if (!nextPageUrl) return;
        const url = new URL(nextPageUrl);
        const pageNumber = url?.searchParams.get('cursor');

        handleData(`getActiveTopics?cursor=${pageNumber}`);

    }

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.8,
                ease: "easeOut",
            },
        }
    }

    if (loading && loadedData.length === 0) {
        return <Loader />;
    }

    return (
        <>
            {/* ######################## Hero Section ########################  */}
            <div className="min-h-[70%] flex items-center justify-center pt-18 bg-transparent">
                <HeroGeometric
                    mode="dark"
                    title1="Pick a Battle,"
                    title2="Lead the Pack."
                    description="Pick a field, face global rivals, and compete to lead each category with skill strategy, and true brilliance."
                />
            </div>

            {/* ######################## Content Section  ########################  */}
            <div className="max-w-7xl mx-auto px-4 pb-24 relative z-10 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {loadedData?.length > 0 && loadedData.map((topic, index) => (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeUpVariants}
                            key={index}
                        >
                            <NavLink to={`/quizzes/${topic.slug}`} state={{ id: topic.id, title: topic.name }} className="block h-full group perspective-1000">
                                <div className="relative h-[320px] rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                        <img
                                            src={topic.image ? `${import.meta.env.VITE_Image_URL}${topic.image}` : logo}
                                            alt={topic.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
                                        <div>
                                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                                {topic.name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center text-sm font-bold text-rose-600 dark:text-rose-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            Start Quiz &rarr;
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center items-center">
                    {data?.next_page_url !== null &&
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={loadMore}
                            className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all"
                        >
                            Load More
                        </motion.button>
                    }
                </div>
            </div>
        </>
    );
}