import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getApi, postApi } from "../../Services/Api";
import { HeroGeometric } from "@/Components/Ui/shadcn-io/shape-landing-hero";

export default function ShowQuestion() {
    const { quizSlug } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState();
    const [userAnswer, setUserAnswer] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [shake, setShake] = useState(false);
    const [shuffledOptionsMap, setShuffledOptionsMap] = useState({});
    const [timer, setTimer] = useState({});
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState();

    const url = `questions/${quizSlug}${state?.userResult ? `?userResultId=${state.userResult}` : ""}`;

    // Fetch quiz questions 
    useEffect(() => {
        getApi(data, setData, url);
    }, []);

    // Animations 
    const shakeAnimation = {
        x: [1, -1, -3, 3, 1, -1, -3, 3, -1, 1, 1, 0],
        y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2, 0],
        rotate: [0, -1, 1, 0, 1, -1, 0, -1, 1, 0, -1, 0],
        transition: { duration: 0.5, ease: "easeInOut" }
    };

    // Returns current question id 
    const getQuestionId = () => data.questions?.[currentQuestion]?.id;

    // Removes error border & shake effect 
    const clearErrorEffect = () => {
        const question = document.getElementById("questions");
        question?.classList.remove("border-[2px]", "border-red-400");
        setShake(false);
    };

    // Adds error border & shake effect 
    const showErrorEffect = () => {
        const question = document.getElementById("questions");
        question?.classList.add("border-[2px]", "border-red-400");
        setShake(true);
    };

    // Move to next question 
    const nextQuestion = () => {
        const qid = getQuestionId();
        if (userAnswer[qid] === undefined) return showErrorEffect();

        clearErrorEffect();
        setCurrentQuestion((prev) =>
            prev < data.quiz.number_of_questions - 1 ? prev + 1 : prev
        );
    };

    // Move to previous question 
    const previousQuestion = () => {
        clearErrorEffect();
        setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    };

    // Skip current question 
    const skipQuestion = () => {
        clearErrorEffect();
        setCurrentQuestion((prev) =>
            prev < data.quiz.number_of_questions - 1 ? prev + 1 : prev
        );
        if (timer?.label == "quesion") setSeconds(timer?.seconds);
    };

    // Handle answer selection 
    const checkAnswer = (e) => {
        const answer = e.currentTarget.dataset.answer;
        const qid = getQuestionId();

        if (userAnswer[qid] !== undefined) return;
        setUserAnswer((prev) => ({ ...prev, [qid]: answer }));
    };

    // Get option border based on answer status 
    const getBorderClass = (option) => {
        const qid = getQuestionId();
        const selected = userAnswer[qid];
        const correct = data.questions[currentQuestion]?.answer;

        if (!selected) return "border-gray-400";
        if (option === selected && option !== correct) return "border-[4px] border-red-400";
        if (option === selected && option === correct) return "border-[4px] border-green-400";
        return "border-gray-400";
    };

    // Finish Quiz 
    const finishQuiz = () => {
        const qid = getQuestionId();
        if (userAnswer[qid] === undefined) return showErrorEffect();

        submitQuiz();
    }
    // Submit quiz answers 
    const submitQuiz = async () => {
        for (let q of data.questions) {
            if (userAnswer[q.id] === undefined) {
                setCurrentQuestion(data.questions.indexOf(q));
                return;
            }
        }
        
        const response = await postApi(userAnswer, setUserAnswer, `questions/${quizSlug}` , setError, setSuccess);
        response && navigate("/finishQuiz", { state: { apiResponse: response } });
    };



    // Shuffle options once per question 
    const shuffledOptions = useMemo(() => {
        const question = data.questions?.[currentQuestion];
        if (!question) return [];

        // For stop suffle multiple time
        if (shuffledOptionsMap[question.id]) {
            return shuffledOptionsMap[question.id];
        }

        const options = [
            { key: "a", value: question.a },
            { key: "b", value: question.b },
            { key: "c", value: question.c },
            { key: "d", value: question.d }
        ].sort(() => Math.random() - 0.5);

        setShuffledOptionsMap((prev) => ({ ...prev, [question.id]: options }));
        return options;
    }, [currentQuestion, data]);


    // Setup quiz or question timer 
    useEffect(() => {
        if (!data.quiz) return;

        const isPerQuestion = data.quiz.timing_per_questions !== null;
        const minutes = isPerQuestion
            ? data.quiz.timing_per_questions
            : data.quiz.timing_per_quiz;

        setTimer({
            label: isPerQuestion ? "question" : "quiz",
            seconds: minutes * 60
        });
        setSeconds(minutes * 60);
    }, [data]);

    // Countdown timer 
    useEffect(() => {
        if (seconds <= 0) return;

        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    // Auto-submit quiz when quiz timer ends 
    useEffect(() => {
        if (timer.label !== "quiz" || seconds !== 0) return;

        for (let q of data.questions) {
            if (userAnswer[q.id] === undefined) {
                setUserAnswer((prev) => ({...prev, [q.id]: null}));
            }
        }

        submitQuiz();
    }, [seconds]);

    // Auto-skip question when question timer ends 
    useEffect(() => {
        if (timer.label !== "question" || seconds !== 0) return;

        const qid = getQuestionId();
        if (userAnswer[qid] === undefined) {
            setUserAnswer((prev) => ({ ...prev, [qid]: null }));
        }
        setSeconds(timer.seconds);
        skipQuestion();
        
    }, [seconds]);

    // Set Seconds in every chenged questions 
    useEffect(() => {
        if (timer?.label == "question") setSeconds(timer?.seconds);
    },[currentQuestion])

    // Auto Submit When All Answered 
    useEffect(() => {
        if (!data?.quiz) return;

        const answeredCount = data.questions?.filter((q) =>
            userAnswer.hasOwnProperty(q.id)
        ).length;

        if (answeredCount === data.quiz.number_of_questions) {
            submitQuiz();
        }
    }, [userAnswer]);

    // Convert seconds to minutes
    useEffect(() => {
        const minute = Math.floor(seconds / 60);
        const second = seconds % 60;

        const formattedTime = 
            `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;

        setMinutes(formattedTime);
    }, [seconds]);


    const optionLabels = ["A", "B", "C", "D"];

    return (
        <>
            {/* ######################## Hero Section ########################  */}
            <div className="min-h-full flex items-center justify-center pt-18 bg-transparent">
                <HeroGeometric
                    mode="dark" 
                    title1=""
                    title2={data.length !== 0 && data.quiz.name}
                    description="Pick a field, face global rivals, and compete to lead each category with skill strategy, and true brilliance."
                    className="min-h-[38vh] md:min-h-[50vh]"
                />  
            </div>

            {/* ######################## Content Section  ########################  */}
            {data.questions === null  
            ?
                <div className="h-max mx-3 py-5 lg:mx-80 md:mx-30 mt-8 md:w-[70%] mb-10 flex flex-col items-center">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">You have already Play all available quizzes in this topic.</h1>
                    <div className="mt-10">
                        <NavLink
                            to={'/quizzes'}
                            className="rounded-[10px] text-xl md:text-2xl border-1 border-rose-500/[0.5] bg-linear-to-b from-transparent via-transparent to-rose-300/[0.2] p-4"
                        >
                            Explore More Quizzes
                        </NavLink>
                    </div>
                </div>
            :
                <motion.div
                    animate={shake ? shakeAnimation : {}}
                    className="flex justify-center"
                >
                    <div id="questions"className={`bg-transparent bg-linear-to-b from-transparent via-transparent to-amber-500/[0.2] h-max py-5 mx-2  mt-8 rounded-[10px] md:w-[70%] shadow-lg mb-10 w-full flex flex-col justify-center `}>
                        {data.length !== 0 && (
                            <>
                                <p className="text-center text-lg "><span className=" text-amber-500">{timer?.label == "quiz" ? "Quiz" : "Question"}</span> ends in  <span id="timming" className="text-2xl font-bold text-amber-500"> {minutes}</span></p>
                                <h1 className="mx-6 md:mx-10 py-5">{currentQuestion + 1}. {data.questions[currentQuestion]?.question}</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 mx-6 md:mx-10">
                                    {shuffledOptions.map((option,index) => (
                                        <div 
                                            className={`w-full border p-3 rounded-[10px] ${getBorderClass(option.key)}`}
                                            data-answer = {option.key}
                                            onClick={(e) => checkAnswer(e)}
                                        >
                                            {optionLabels[index]}. {option.value}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <div className="flex justify-between gap-5 mx-6 md:mx-12">
                            <div>
                                {currentQuestion !== 0 && (
                                    <button 
                                        onClick={previousQuestion}
                                        className={`border-1 border-amber-500/[0.5] px-2 py-1 rounded-[10px] text-lg` }
                                    > 
                                        Previous 
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-2 md:gap-10">
                                {data.length !==0 && data.quiz.number_of_questions - 1 !== currentQuestion && (
                                    <button 
                                            onClick={skipQuestion}
                                            className={`border-1 border-amber-500/[0.5] px-2 md:px-5 py-1 rounded-[10px] text-lg` }
                                        > 
                                            Skip 
                                        </button>
                                )}
                                {data.length !== 0 && data.quiz.number_of_questions - 1 === currentQuestion 
                                    ? (
                                        <button 
                                            onClick={finishQuiz}
                                            className={`border-1 border-amber-500/[0.5] px-2 md:px-5 py-1 rounded-[10px] text-lg` }
                                        > 
                                            Finish 
                                        </button>
                                    )
                                    : (
                                        <button 
                                            onClick={nextQuestion}
                                            className={`border-1 border-amber-500/[0.5] px-2 md:px-5 py-1 rounded-[10px] text-lg` }
                                        > 
                                            Next 
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </>
    );
}