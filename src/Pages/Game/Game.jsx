import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getApi } from "../../Services/Api";
import { MdLock } from "react-icons/md";

export default function Game() {
    
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [game, setGame] = useState([]);
    const [mode, setMode] = useState([]);
    const [selectedMode, setSelectedMode] = useState(1);
    const [showLevels, setShowLevels] = useState([]);

    const handleData = async () => {
        const url = `game/${id}`;
        await getApi(data, setData, url);
    }
    
    useEffect(() => {
        handleData();
    },[]);

    useEffect(() => {
        data.mode && setMode(data.mode);
        data.game && setGame(data.game);
    },[data]);
    
    useEffect(() => {
        Object.keys(game).forEach((key) => {
            game[key].forEach((item) => {
                if (item.result.length > 0) {
                    setShowLevels((prev) => [...prev, item.result[0].next_level]);
                }
            });
        });
    },[game])

    // set mode id first 
    useEffect(() => {
        mode.map((modeData) => {
            Object.keys(game).map((key) => {
                game[key][0]?.mode_id === modeData.id && setSelectedMode(modeData.id);
            });
        });
    },[game,mode])

    const showLevelNumber = (level, quiz_id) => (
        <NavLink 
            key={`${level}`} 
            className="bg-gray-500 text-white text-2xl md:text-4xl rounded-[20px] h-[50px] w-[50px] md:h-[100px] md:w-[100px] grid place-items-center"
            to={`/questions/${quiz_id}`}
        >
            {level}
        </NavLink>

    )

    const shoeLock = (level, quiz_id) => (
        <div  className="bg-gray-500 text-white text-2xl md:text-4xl rounded-[20px] h-[50px] w-[50px] md:h-[100px] md:w-[100px] grid place-items-center">
            <MdLock />
        </div>
    )

    const shoeLevels = () => {
        if (!selectedMode || !game ) return null;

        return Object.keys(game).map((key) => 
            game[key].map((data,index) => {
                let id = game[key][index].id;
                if (game[key][index].mode_id == selectedMode) {
                    return (
                        <>
                            { game[key][index].result.length !== 0 
                                ? (
                                    showLevelNumber(game[key][index].level, game[key][index].id)
                                )
                                : game[key][index].level == 1 
                                    ? showLevelNumber(game[key][index].level, game[key][index].id)
                                    : showLevels && showLevels.includes(game[key][index].id)
                                        ? showLevelNumber(game[key][index].level, game[key][index].id)
                                        : shoeLock()
                            }
                        </>
                    );
                }
                return null;
            })
        )
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center z-40 mt-5 md:mt-30">
                <div className="flex justify-around items-end  w-full">
                    {mode.map((modeData) => (
                        <>
                            {game && Object.keys(game).map((key) => (
                                <>
                                    {game[key][0]?.mode_id === modeData.id && (
                                        <div  className={`flex justify-between items-center ${selectedMode === modeData.id && "border-b-4 border-b-gray-500 "}`} key={modeData.id}>
                                            <h1 className="text-4xl" onClick={() => {setSelectedMode(modeData.id)}} >{modeData.name}</h1>
                                        </div>
                                    )}
                                </>
                                )
                            )}
                        </>
                    ))}
                </div>
                <div className="mt-[50px] grid grid-cols-4 gap-5">
                    {shoeLevels()}
                </div>
            </div>
        </>
    );
}