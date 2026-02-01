import { useSelector } from "react-redux";
import { HeroGeometric } from "./shadcn-io/shape-landing-hero";

export default function HeroSection() {

    const themeMode = useSelector((state) => state.theme.mode);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center pt-18 bg-transparent">
                <HeroGeometric 
                    mode={themeMode} 
                    title1="Think Fast,"
                    title2="Play Hard."
                    description="Test your knowledge across topics and see how you rank against others. Are you ready to take on the challenge?"
                />
            </div>
        </>
    );
}