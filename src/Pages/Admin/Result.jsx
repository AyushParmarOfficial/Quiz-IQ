import { useEffect, useRef, useState } from "react";
import { getApi } from "../../Services/Api";
import $ from 'jquery'; 
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Dropdown from "../../Components/Forms/Dropdown";


export default function Result() {

    const tableRef = useRef(null);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [filterContain, setFilterContain] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const themeMode = useSelector((state) => state.theme.mode);

    const handleData = async (url) => {
        await getApi(data, setData, url);
    }

    const featchFilterContain = async (e) => {
        await getApi(filterContain, setFilterContain, `admin/resultFilterContain`);
    }

    useEffect(() => {
        featchFilterContain();
    },[]);
    
    useEffect(() => {
        let baseUrl = "admin/results?";
        if (filter) {
            console.log(filter)
            if (filter.quiz) {
                baseUrl += `&quiz=${filter.quiz}`;
            }
            if (filter.users) {
                baseUrl += `&user=${filter.users}`;
            }
            if (filter.time) {
                baseUrl += `&time=${filter.time}`;
            }
        }
        handleData(baseUrl);
    },[filter]);

    useEffect(() => {
        if(tableRef.current) {
            $(tableRef.current).DataTable({
                data:data,
                columns: [
                    {
                        title: "ID",
                        data: 'id',
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        title: 'User Name',
                        data: 'user',
                    },
                    {
                        title: 'Quiz',
                        data: 'quiz',
                    },
                    {
                        title: 'Score',
                        data: 'score',
                        render: function (data) {
                            return data + " %";
                        }
                    },
                    {
                        title: 'Total Questions',
                        data: 'total_questions'
                    },
                    {
                        title: 'Correct Answers',
                        data: 'correct_answers'
                    },
                    {
                        title: 'Result',
                        data: 'is_passed',
                        render: function (data, type) {
                            if(data === 1) {
                                return '<span class="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Pass</span>';
                            } else {
                                return '<span class="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Fail</span>';
                            }
                        }
                    },
                    {
                        title: 'Quiz Date',
                        data: 'finish_date'
                    },
                    {
                        title: 'Quiz Time',
                        data: 'finish_time'
                    }
                ],
                destroy: true,
                jQueryUI: true
            })
        }
    },[data])

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    }

    const timePeriod = [
        {id: 'today', name: 'Today'},
        {id: 'yesterday', name: 'Yesterday'},
        {id: 'week', name: 'Week'},
        {id: 'month', name: 'Month'}
    ]

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-6xl">Results</h1>
            </div>

            <div className="flex my-3 w-full">
                <button 
                    onClick={handleShowFilter} 
                    className={` ${themeMode === "dark" ? " bg-gray-400" : "bg-gray-500 text-white"}  w-full rounded-[4px] py-1 text-xl z-10`}
                >
                    Filters
                </button>
            </div>

            <AnimatePresence>
                {showFilter && (
                    <motion.div
                        key="filter-panel"
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: 50, opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex justify-between w-full h-max rounded-[4px] overflow-hidden"
                    >
                       <div className="flex items-center">
                            Users: 
                            <Dropdown 
                                name = 'users'
                                data = {filterContain.user_names ? filterContain.user_names : []}
                                disabled = {false}
                                onChange={(e) => {
                                    setFilter({...filter, 'users': e.target.value})
                                }}
                                className="border rounded-[5px] h-[35px] ml-2"
                            />
                       </div>
                       <div className="flex items-center">
                            Quiz: 
                            <Dropdown 
                                name = 'quiz'
                                data = {filterContain.quiz_names ? filterContain.quiz_names : []}
                                disabled = {false}
                                onChange={(e) => {
                                    setFilter({...filter, 'quiz': e.target.value})
                                }}
                                className="border rounded-[5px] h-[35px] ml-2"
                            />
                       </div>
                       <div className="flex items-center">
                            Time: 
                            <Dropdown 
                                name = 'time'
                                data = {timePeriod}
                                disabled = {false}
                                onChange={(e) => {
                                    setFilter({...filter, 'time': e.target.value})
                                }}
                                className="border rounded-[5px] h-[35px] ml-2"
                            />
                       </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="w-full">
                <table ref={tableRef} className="display"></table>
            </div>
        </>
    );
}