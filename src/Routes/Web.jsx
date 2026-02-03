import { Route, Routes } from "react-router-dom";
import Home from "@/Pages/Home";
import OurStory from "@/Pages/Home/OurStory";
import SignIn from "@/Pages/Auth/SignIn";
import SignUp from "@/Pages/Auth/SignUp";
import Client from "@/Components/Layouts/Client";
import Admin from "@/Components/Layouts/Admin";
import Dashboard from "@/Pages/Admin/Dashboard";
import Topics from "@/Pages/Admin/Topics";
import Modes from "@/Pages/Admin/Modes";
import Quiz from "@/Pages/Admin/Quiz";
import Questions from "@/Pages/Admin/Questions";
import Result from "@/Pages/Admin/Result";
import Users from "@/Pages/Admin/Users";
import ShowQuestions from "@/Pages/Admin/Questions/ShowQuestions";
import ShowQuestion from "@/Pages/Game/ShowQuestion";
import FinishGame from "@/Pages/Game/FinishGame";
import MoreTopics from "@/Pages/Home/MoreTopics";
import MoreQuiz from "@/Pages/Home/MoreQuiz";
import LeaderBoard from "@/Pages/Home/LeaderBoard";
import Account from "@/Pages/Home/Account";

export default function Web() {
    return (
        <Routes>
            <Route path="/" element={<Client />} >
                <Route index element={<Home />} />
                <Route path="/signin/*" element={<SignIn />} />
                <Route path="/signup/*" element={<SignUp />} />
                <Route path="/account" element={<Account />} />
                <Route path="/story" element={<OurStory />} />
                <Route path="/quizzes/topics" element={<MoreTopics />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/quizzes/:topicSlug?" element={<MoreQuiz />} />
                <Route path="/quizzes/questions/:quizSlug?" element={<ShowQuestion />} />
                <Route path="/finishQuiz/*" element={<FinishGame />} />
            </Route>
            <Route path="/admin" element={<Admin />} >
                <Route index element={<Dashboard />} />
                <Route path="/admin/topics" element={<Topics />} />
                <Route path="/admin/modes" element={<Modes />} />
                <Route path="/admin/quiz" element={<Quiz />} />
                <Route path="/admin/questions" element={<Questions />} />
                <Route path="/admin/questions/show/:id" element={<ShowQuestions />} />
                <Route path="/admin/result" element={<Result />} />
                <Route path="/admin/users" element={<Users />} />
            </Route>
        </Routes>
    );
}