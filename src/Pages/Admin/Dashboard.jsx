import { useSelector } from "react-redux";

export default function Dashboard() {

    const themeMode = useSelector((state) => state.theme.mode);

    return (
        <>
            <h1 className="text-6xl"> Dashboard </h1>
        </>
    )
}