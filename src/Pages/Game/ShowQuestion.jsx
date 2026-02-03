import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getApi, postApi } from "../../Services/Api";
import { useSelector } from "react-redux";
import { HeroGeometric } from "@/Components/Ui/shadcn-io/shape-landing-hero";
import Loader from "@/Components/Common/Loader";

export default function ShowQuestion() {
    const { quizSlug } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const themeMode = useSelector((state) => state.theme.mode);

    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState();
    const [userAnswer, setUserAnswer] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [shake, setShake] = useState(false);
    const [shuffledOptionsMap, setShuffledOptionsMap] = useState({});
    const [timer, setTimer] = useState({});
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState("00:00");
    const [loading, setLoading] = useState(true);

    const url = `questions/${quizSlug}${state?.userResult ? `?userResultId=${state.userResult}` : ""}`;

    // Fetch quiz questions 
    useEffect(() => {
        getApi(data, setData, url, setLoading);
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
        setShake(false);
    };

    // Adds error border & shake effect 
    const showErrorEffect = () => {
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
    const getOptionClass = (option) => {
        const qid = getQuestionId();
        const selected = userAnswer[qid];
        const correct = data.questions[currentQuestion]?.answer;

        const baseClass = "relative w-full p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform preserve-3d group";

        if (!selected) return `${baseClass} bg-white dark:bg-black/40 border-gray-200 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-500/50`;

        if (option === selected && option !== correct) {
            return `${baseClass} bg-red-500/10 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-red-600 dark:text-red-400`;
        }
        if (option === selected && option === correct) {
            return `${baseClass} bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] text-green-600 dark:text-green-400`;
        }
        // Correct answer but not selected (optional: show correct answer)
        // if (selected && option === correct) return `${baseClass} bg-green-500/10 border-green-500`

        return `${baseClass} bg-white dark:bg-black/40 border-gray-200 dark:border-white/10 opacity-50`;
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

        const response = await postApi(userAnswer, setUserAnswer, `questions/${quizSlug}`, setError, setSuccess, false, setLoading);
        response && navigate("/finishQuiz", { state: { apiResponse: response } });
    };

    // Shuffle options once per question 
    const shuffledOptions = useMemo(() => {
        const question = data.questions?.[currentQuestion];
        if (!question) return [];

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
                setUserAnswer((prev) => ({ ...prev, [q.id]: null }));
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
    }, [currentQuestion])

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
        const formattedTime = `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
        setMinutes(formattedTime);
    }, [seconds]);


    const optionLabels = ["A", "B", "C", "D"];

    if (loading && (!data?.questions)) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#030303] transition-colors duration-300">
            {loading && <Loader />}
            {/* ######################## Hero Section ########################  */}
            <div className="fixed inset-0 z-0">
                <HeroGeometric
                    mode={themeMode}
                    title1=""
                    title2=""
                    description=""
                    className="min-h-screen"
                />
            </div>

            {/* ######################## Content Section  ########################  */}
            <div className="relative z-10 min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center">

                {data.questions === null
                    ?
                    <div className="backdrop-blur-md bg-white/80 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl p-8 max-w-2xl w-full text-center">
                        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-rose-500 mb-6">
                            Quiz Completed
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                            You have already played all available quizzes in this topic.
                        </p>
                        <NavLink
                            to={'/quizzes'}
                            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
                        >
                            Explore More Quizzes
                        </NavLink>
                    </div>
                    :
                    <div className="w-full max-w-4xl perspective-1000">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, rotateX: -10, y: 50 }}
                                animate={shake ? shakeAnimation : { opacity: 1, rotateX: 0, y: 0 }}
                                exit={{ opacity: 0, rotateX: 10, y: -50 }}
                                transition={{ duration: 0.4 }}
                                className={`w-full backdrop-blur-xl bg-white/80 dark:bg-[#0a0a0a]/60 border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden`}
                            >
                                {data.length !== 0 && (
                                    <div className="p-6 md:p-10">
                                        {/* Header: Timer & Progress */}
                                        <div className="flex justify-between items-center mb-8">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-sm md:text-base">
                                                    {currentQuestion + 1}
                                                </span>
                                                <span className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">
                                                    / {data.quiz.number_of_questions}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                                                <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                                    {timer?.label == "quiz" ? "Quiz End" : "Time Left"}
                                                </span>
                                                <div className="w-px h-4 bg-amber-500/30"></div>
                                                <span className="text-lg md:text-xl font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                                                    {minutes}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Question */}
                                        <div className="mb-8 md:mb-12">
                                            <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white leading-relaxed">
                                                {data.questions[currentQuestion]?.question}
                                            </h1>
                                        </div>

                                        {/* Options Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            {shuffledOptions.map((option, index) => (
                                                <motion.div
                                                    key={option.key}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className={getOptionClass(option.key)}
                                                    data-answer={option.key}
                                                    onClick={(e) => checkAnswer(e)}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm transition-colors duration-300
                                                            ${userAnswer[getQuestionId()] === option.key
                                                                ? 'bg-current text-white'
                                                                : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:bg-indigo-500 group-hover:text-white'
                                                            }`}
                                                        >
                                                            {optionLabels[index]}
                                                        </div>
                                                        <span className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-200">
                                                            {option.value}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="flex justify-between items-center mt-10 md:mt-12 pt-6 border-t border-gray-200 dark:border-white/5">
                                            <button
                                                onClick={previousQuestion}
                                                disabled={currentQuestion === 0}
                                                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200
                                                    ${currentQuestion === 0
                                                        ? 'opacity-0 pointer-events-none'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                                                    }`}
                                            >
                                                Previous
                                            </button>

                                            <div className="flex gap-4">
                                                {data.length !== 0 && data.quiz.number_of_questions - 1 !== currentQuestion && (
                                                    <button
                                                        onClick={skipQuestion}
                                                        className="px-6 py-2.5 rounded-xl font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
                                                    >
                                                        Skip
                                                    </button>
                                                )}

                                                <button
                                                    onClick={data.length !== 0 && data.quiz.number_of_questions - 1 === currentQuestion ? finishQuiz : nextQuestion}
                                                    className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300 transform active:scale-95"
                                                >
                                                    {data.length !== 0 && data.quiz.number_of_questions - 1 === currentQuestion ? "Finish Quiz" : "Next Question"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                }
            </div>
        </div>
    );
}