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
    },[]);

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
                <div className="gaming_quiz mb-0 xl:mx-[100px] lg:mx-[80px] sm:mx-[50px] mx-[10px] ">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.3}}
                        variants={fadeUpVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <div className=" mx-[20px] mt-[5px] flex justify-between items-center mb-6 md:mb-8 ">
                                <h1
                                    className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight"
                                >
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-b from-white/90 via-white/90  to-amber-500/[0.5]">
                                        All Quizzes
                                    </span>
                                </h1>

                                <div className="flex gap-5">
                                    {/* Previous Btn  */}
                                    <button
                                        ref={quizPriviousRef}
                                        className="text-2xl font-bold p-2 rounded-[5px] bg-amber-500/[0.05] hover:bg-amber-500/[0.2] border-1"
                                    >
                                        &#10094; 
                                    </button>

                                    {/* Next Btn  */}
                                    <button
                                        ref={quizNextRef}
                                        className="text-2xl font-bold p-2 rounded-[5px] bg-amber-500/[0.05] hover:bg-amber-500/[0.2] border-1"
                                    >
                                        &#10095;
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                        <div className=" text-center mx-[25px]">
                            <motion.div variants={itemVariants}>
                                <div className="flex gap-5 items-center my-[20px]">
                                    <Swiper
                                        modules={[ Navigation, Pagination ]}
                                        spaceBetween={20}
                                        slidesPerView={4}
                                        centeredSlides={false}
                                        speed={1000}
                                        navigation={{
                                            prevEl: quizPriviousRef.current,
                                            nextEl: quizNextRef.current
                                        }}
                                        onInit={(swiper) => {quizRef.current = swiper}}
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
                                        {data?.length > 0 && data.map((quiz,index) => (
                                            <SwiperSlide key={index}>
                                                <NavLink to={`/quizzes/questions/${quiz.slug}`}>
                                                    <div key={index} className="card shadow-lg rounded-[10px] h-full ">
                                                        <div className="card-content rounded-[10px] bg-linear-to-r from-green-100/[0.1] via-transparent to-green-100/[0.1] h-full">
                                                            <div className="xl:h-[250px] lg:h-[200px] sm:h-[150px] h-[150px] overflow-hidden rounded-t-[5px]">
                                                                <img src={quiz.image ?`${import.meta.env.VITE_Image_URL}${quiz.image}` : logo } alt={quiz.name} className="xl:h-[250px] lg:h-[200px] sm:h-[150px] h-[150px] rounded-t-[5px] w-full"/>
                                                            </div>  
                                                            <div className="p-2">
                                                                <h3 className="xl:text-2xl lg:text-xl md:text-xl text-lg text-start mx-[10px] text-bolder ">{quiz.name}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                            </motion.div>
                        </div>

                        <div className="flex justify-center">
                            <motion.div variants={itemVariants}>
                                <NavLink to={'/quizzes'} state={{title: "All Quizzes"}}>
                                    <div className="p-1 md:p-2 rounded-[5px] bg-linear-to-b from-transparent via-transparent to-amber-300/[0.1]">
                                        <div className="btn p-1 xl:p-3 px-2 xl:px-10 rounded-[5px] border border-amber-500/[0.2] hover:border-amber-500/[0.4]">
                                            <span className="text-sm sm:text-lg md:text-xl ">View More</span>
                                        </div>
                                    </div>
                                </NavLink>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}