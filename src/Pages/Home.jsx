import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSection from "@/Components/Ui/HeroSection";
import ShowTopics from "@/Components/Ui/ShowTopics";
import ShowLatestQuizzes from "@/Components/Ui/ShowLatestQuizzes";
import AllQuizzes from "@/Components/Ui/AllQuizzes";
export default function Home() {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <>
        {/* Hero Section  */}
        <HeroSection />

        {/* Topic Section  */}
        <ShowTopics />

        {/* Latest Quiz Section  */}
        <ShowLatestQuizzes />

        {/* All Quizzes  */}
        <AllQuizzes />
    </>
  );
}