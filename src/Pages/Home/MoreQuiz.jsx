import { HeroGeometric } from "@/Components/Ui/shadcn-io/shape-landing-hero";
import logo from "@/assets/images/loho.webp";
import { getApi } from "@/Services/Api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

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

    return (
        <>
            {/* ######################## Hero Section ########################  */}
            <div className="min-h-[70%] flex items-center justify-center pt-18 bg-transparent">
                <HeroGeometric
                    mode="dark"
                    title1={`${data?.topic?.name ? " " : "Pick a Challenge."}`}
                    title2={`${data?.topic?.name ?? " Prove Your Edge."}`}
                    description="Choose a quiz, face players worldwide, and prove what you’re capable of - one quiz, one win, one leaderboard climb at a time."
                />
            </div>

            {/* ######################## Content Section  ########################  */}
            <div className=" more-topics xl:mx-[100px] lg:mx-[80px] sm:mx-[50px] mx-[10px] mb-[20px] sm:mb-[30px] md:mb-[40px] lg:mb-[50px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  mb-[50px] w-full">
                    {loadedData?.length > 0 && loadedData.map((quiz, index) => (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={fadeUpVariants}
                        >
                            <NavLink to={`/quizzes/questions/${quiz.slug}`}>
                                <div key={index} className="card col-span-1 shadow-lg rounded-[10px] h-full">
                                    <div className="card-content rounded-[10px] bg-linear-to-r from-green-100/[0.1] via-transparent to-green-100/[0.1] h-full">
                                        <div className="xl:h-[250px] lg:h-[200px] sm:h-[150px] h-[150px] overflow-hidden rounded-t-[5px]">
                                            <img src={quiz.image ? `${import.meta.env.VITE_Image_URL}${quiz.image}` : logo} alt={quiz.name} className="xl:h-[250px] lg:h-[200px] sm:h-[150px] h-[150px] rounded-t-[5px] w-full" />
                                        </div>
                                        <div className="p-2">
                                            <h3 className="xl:text-2xl lg:text-xl md:text-xl text-lg text-start mx-[10px] text-bolder">{quiz.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center items-center">
                    {data?.quizzes?.next_page_url != null &&
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={fadeUpVariants}
                        >
                            <div onClick={loadMore} className="flex justify-center items-center p-1 rounded-[5px] bg-linear-to-b from-transparent via-transparent to-rose-500/[0.2]">
                                <div className="flex justify-center items-center rounded-[5px] p-2 border-1 px-5 hover:border-rose-500/[0.4]">
                                    <button >Load More</button>
                                </div>
                            </div>
                        </motion.div>
                    }
                </div>
            </div>
        </>
    );
}