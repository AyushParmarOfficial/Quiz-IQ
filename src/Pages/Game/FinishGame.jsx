import { HeroGeometric } from '@/Components/Ui/shadcn-io/shape-landing-hero';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

export default function FinishGame() {

    const { state } = useLocation();
    const [data, setData] = useState([]);
    const themeMode = useSelector((state) => state.theme.mode);

    const apiResponse = state?.apiResponse;

    useEffect(() => {
        data.length !== 0 && data.data.user_result.is_passed === 1 && setTimeout(fullScreenFireworks, 1500);
        data.length !== 0 && sideFireworks();
    }, [data]);

    useEffect(() => {
        if (apiResponse) {
            setData(apiResponse);
        }
    }, []);

    const fullScreenFireworks = () => {
        const duration = 1 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        const randomInRange = (min, max) =>
        Math.random() * (max - min) + min

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 100 * (timeLeft / duration)
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        }, 200)
    }

    const sideFireworks = () => {
        const end = Date.now() + 1 * 1000 // 1 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#8cfffb", "#89e49aff"];
        const failColors = ["#f30808ff", "#dd4040ff", "#e6b6b6ff", "#ff0000ff", "#f40909ff"];
        const frame = () => {
            if (Date.now() > end) return
            confetti({  
                particleCount: 2,
                angle: 20 + Math.random() * 20,
                spread: 200,
                startVelocity: 80,
                origin: { x: 0, y: 0.5 },
                colors: data.length === 0 ? colors : data.data.user_result.is_passed === 1 ? colors : failColors,
            })
            confetti({
                particleCount: 2,
                angle: 160 + Math.random() * 20,
                spread: 200,
                startVelocity: 80,
                origin: { x: 1, y: 0.5 },
                colors: data.length === 0 ? colors : data.data.user_result.is_passed === 1 ? colors : failColors,
            })
            requestAnimationFrame(frame)
        }
        frame()
    }

    return (
        <>
            {/* ######################## Hero Section ########################  */}
            <div className="min-h-full flex items-center justify-center pt-18 bg-transparent">
                <HeroGeometric
                    mode="dark" 
                    title1=""
                    title2="Game Over"
                    description="Thank you for playing!"
                    className="min-h-[30vh] lg:min-h-[40vh]"
                />  
            </div>

            {/* ######################## Content Section  ########################  */}
            <div className="flex items-center justify-center z-40 w-full">
                <div className={`${themeMode !== 'dark' && 'bg-gray-800 text-gray-200'} w-full text-center md:w-1/2 lg:w-1/3 p-6 max-md:mx-2 rounded-lg shadow-lg`}>
                    {data.length !== 0 ? (
                        <div className="mt-4 text-center"> 
                            <div className='flex justify-between items-center flex-col h-[150px] md:h-[200px] w-full mb-4 p-4 rounded-md bg-linear-to-b from-transparent via-transparent to-rose-400/[0.1]'>
                                <pre className="whitespace-pre-wrap mt-2 text-6xl">{data.data.user_result.score}%</pre>
                                <h2 className="text-3xl font-semibold text-rose-400">Congratulations!</h2>
                            </div>

                            {data.data.user_result.coin_earned !== null && (
                                <p className="mt-2 text-2xl">You have earned <strong className='text-yellow-500'>{data.data.user_result.coin_earned} coins.</strong></p>
                            )}
                            <div className="mt-10">
                                {data.data.user_result.is_passed === 1 
                                    ? data.data.next_round === false 
                                        ? <>
                                            <p className="my-4 text-xl lg:text-2xl">You have completed all available quizzes in this Topic.</p>
                                            <div className="mt-10">
                                                <NavLink 
                                                    to={'/quizzes'}
                                                    className="rounded-[10px] text-xl md:text-2xl border-1 border-rose-500/[0.5] bg-linear-to-b from-transparent via-transparent to-rose-300/[0.2] p-4"
                                                >
                                                    Explore More Quizzes
                                                </NavLink>
                                            </div>
                                        </>
                                        : <NavLink 
                                            to={`/quizzes/questions/${data.data.quiz.slug}`}
                                            className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                                        >
                                            Next Round
                                        </NavLink>
                                    : <NavLink
                                        to={`/quizzes/questions/${data.data.quiz.slug}`} 
                                        state={{userResult:  data.data.user_result.id}}
                                        className="mt-4 bg-red-500/90 text-white py-2 px-4 rounded" 
                                    >
                                        Retry   
                                    </NavLink>
                                }
                            </div>
                        </div>
                    ) : (
                        <p>Loading result...</p>
                    )}
                </div>
            </div>
        </>
    );
}
