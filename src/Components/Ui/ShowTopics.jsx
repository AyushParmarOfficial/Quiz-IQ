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

export default function ShowTopics() {

    const [data, setData] = useState([]);

    const topicRef = useRef(null);
    const topicPriviousRef = useRef(null);
    const topicNextRef = useRef(null);

    const url = "topic";

    useEffect(() => {
        const handleData = async (e) => {
            await getApi(data, setData, url);
        }
        handleData();
    },[]);

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


    return (
        <>
            {data && data.length > 0 && (
                <div className="gaming_topic mb-[100px] xl:mx-[100px] lg:mx-[80px] sm:mx-[50px] mx-[10px] ">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.2}}
                        variants={fadeUpVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <div className=" mx-[20px] mt-[5px] flex justify-between items-center mb-6 md:mb-8 ">
                                <h1
                                    className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight"
                                >
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-b from-white/90 via-white/90 to-indigo-300">
                                        Topics
                                    </span>
                                </h1>

                                <div className="bg-clip-text text-transparent bg-gradient-to-b from-white/90 via-white/90 to-indigo-800">
                                    <NavLink to={'/quizzes/topics'}><span className="text-sm sm:text-lg md:text-2xl ">View More</span></NavLink>
                                </div>
                            </div>
                        </motion.div>
                        <div className=" text-center mx-[25px]">
                            <motion.div variants={itemVariants}>
                                <div className="flex gap-1 items-center my-[20px]">
                                    {/* Previous Btn  */}
                                    <button
                                        ref={topicPriviousRef}
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-indigo-800 via-white/90 to-indigo-800"
                                    >
                                        &#10094; 
                                    </button>

                                    <Swiper
                                        modules={[ Navigation, Pagination ]}
                                        spaceBetween={20}
                                        slidesPerView={4}
                                        speed={1000}
                                        navigation={{
                                            prevEl: topicPriviousRef.current,
                                            nextEl: topicNextRef.current
                                        }}
                                        onInit={(swiper) => {topicRef.current = swiper}}
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 1,
                                                spaceBetween: 20,
                                            },
                                            500: {
                                                slidesPerView: 2,
                                                spaceBetween: 30,
                                            },
                                            1024: {
                                                slidesPerView: 3,
                                                spaceBetween: 30,
                                            },
                                            1440: {
                                                slidesPerView: 4,
                                                spaceBetween: 30,
                                            }
                                        }}  
                                    >
                                        {data?.length > 0 && data.map((topic,index) => (
                                            <SwiperSlide key={index}>
                                                <NavLink to={`/quizzes/${topic.slug}`} state={{id: topic.id, title: topic.name}} >
                                                    <div key={index} className="card shadow-lg rounded-[10px] h-full ">
                                                        <div className="card-content rounded-[10px] bg-linear-to-r from-green-100/[0.1] via-transparent to-green-100/[0.1] h-full">
                                                            <div className="xl:h-[250px] lg:h-[200px] sm:h-[150px] h-[150px] overflow-hidden rounded-t-[5px]">
                                                                <img src={topic.image ?`${import.meta.env.VITE_Image_URL}${topic.image}` : logo } alt={topic.name} className="xl:h-[250px] lg:h-[200px] sm:h-[150px] h-[150px] rounded-t-[5px] w-full"/>
                                                            </div>  
                                                            <div className="p-2">
                                                                <h3 className="xl:text-2xl lg:text-xl md:text-xl text-lg text-start mx-[10px] text-bolder ">{topic.name}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </SwiperSlide>
                                        ))} 
                                    </Swiper>

                                    {/* Next Btn  */}
                                    <button
                                        ref={topicNextRef}
                                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-indigo-800 via-white/90 to-indigo-800"
                                    >
                                        &#10095;
                                    </button>
                                </div>

                            </motion.div>
                        </div>

                        
                    </motion.div>
                </div>
            )}
        </>
    );
}