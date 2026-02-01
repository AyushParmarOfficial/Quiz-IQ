import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroGeometric } from "@/Components/Ui/shadcn-io/shape-landing-hero"
import { getApi } from "@/Services/Api";

const tabs = [
  { label: "Today", value: "today" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
]

export default function LeaderBoard() {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [leaderBoardData, setLeaderBoardData] = useState([]);
    const [data, setData] = useState([]);
    let baseUrl = "leaderBoard";

    const handleData = async (url) => {
        await getApi(data, setData, url);
    }

    useEffect(() => {
        setLeaderBoardData((prev) => ({...prev, [selectedTab?.value ?? 'today']: data}));
    },[data]);

    useEffect(() => {
        if (selectedTab) {
            if (leaderBoardData && leaderBoardData[selectedTab.value]) {
                setData(leaderBoardData[selectedTab.value]);
                return;
            }
            baseUrl += `?filter=${selectedTab.value}`;
        }
        handleData(baseUrl);
    },[selectedTab]);


    return (
        <>
            {/* ######################## Hero Section ########################  */}
            <div className="min-h-full flex items-center justify-center pt-18 bg-transparent">
                <HeroGeometric
                    mode="dark" 
                    title1=""
                    title2="Leader Board"
                    description="Pick a field, face global rivals, and compete to lead each category with skill strategy, and true brilliance."
                    className="min-h-[38vh] md:min-h-[50vh]"
                />  
            </div>

            {/* ######################## Content Section  ########################  */}
            <div className="mx-5 rounded-[10px] mt-[40px] bg-transparent overflow-hidden  ">
            {/* Tabs */}
            <nav className="">
                <ul className="flex m-0 p-4 list-none">
                {tabs.map((tabItem) => (
                    <motion.li
                        key={tabItem.value}
                        initial={false}
                        onClick={() => setSelectedTab(tabItem)}
                        className={`
                            relative flex-1 cursor-pointer select-none
                            px-4 py-2 text-center font-medium rounded-[10px]
                            transition-colors duration-200 
                            ${tabItem === selectedTab ? "bg-rose-500/[0.2]" : "bg-transparent"}
                        `}
                    >
                    {tabItem.label}

                    {tabItem === selectedTab && (
                        <motion.div
                            layoutId="underline"
                            className="absolute left-1 right-1 bottom-0 h-0.5 bg-rose-300 rounded-full"
                        />
                    )}
                    </motion.li>
                ))}
                </ul>
            </nav>

            {/* Content */}
            <main className="p-[16px] md:mx-25 mx-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-[10px]"
                    >
                        {selectedTab.value === "today" && (
                        <Leaderboard users={data} />
                        )}
                        {selectedTab.value === "week" && (
                        <Leaderboard users={data} />
                        )}
                        {selectedTab.value === "month" && (
                        <Leaderboard users={data} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
            </div>
        </>
  )
}

/**
 * ================= Leaderboard =================
 */

function Leaderboard({ users }) {
  return (
    <div>
      {users.map((user, index) => (
        <div key={user.user.id} className="flex justify-between px-3 py-2 rounded-md ">
          <span>#{index + 1}</span>
          <span>{user.user.name}</span>
          <span>{user.total_coins ?? 0}</span>
        </div>
      ))}
    </div>
  )
}

