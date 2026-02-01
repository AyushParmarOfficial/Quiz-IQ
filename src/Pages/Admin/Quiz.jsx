import { useEffect, useRef, useState } from "react";
import { getApi, postApi } from "../../Services/Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import $ from 'jquery'; 
import InputLable from "../../Components/Forms/InputLable";
import TextInput from "../../Components/Forms/TextInput";
import Checkbox from "../../Components/Forms/CheckBox";
import Dropdown from "../../Components/Forms/Dropdown";

export default function Quiz() {

    const themeMode = useSelector((state) => state.theme.mode);
    const tableRef = useRef(null);
    const [data, setData] = useState([]);
    const [add, setAdd] = useState([]);
    const [edit, setEdit] = useState([]);
    const [id, setId] = useState([]);
    const [topic, setTopic] = useState([]);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [filterContain, setFiterContain] = useState([]);
    const [filter, setFilter] = useState({});
    const [show, setShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const [showFiled, setShowFiled] = useState(false);
    const navigate = useNavigate();
    const url = "admin/quiz";

    const handleData = async (e) => {
        const parametter = url + '?' + `${filter.topic ? "topic=" + filter.topic : ''}`;
        await getApi(data, setData, parametter);
    }
    
    const fetchFilterContain = async () => {
        await getApi(filterContain, setFiterContain, `admin/quizFilterContains`);
    }
    
    useEffect(() => {
        fetchFilterContain();
    },[]);

    useEffect(() => {
        handleData();
    },[filter]);

    useEffect(() => {
        if(tableRef.current) {
            $(tableRef.current).DataTable({
                data: data,
                columns: [  
                    {
                        title: 'ID',
                        data:'id',
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        title: 'Name',
                        data: 'name',
                        render: function (data, type, row) {
                            return data === null || data === '' ? "N/A" : data;
                        }
                    },
                    {
                        title: 'Topics',
                        data: 'topic'
                    },
                    {
                        title: 'Levels',
                        data: 'levels'
                    },
                    {
                        title: 'Timing Per Quiz',
                        data: 'timing_per_quiz',
                        render: function (data, type, row) {
                            return data === null || data === '' ? "N/A" : data;
                        }
                    },
                    {
                        title: 'Timing Per Questions',
                        data: 'timing_per_questions',
                        render: function (data, type, row) {
                            return data === null || data === '' ? "N/A" : data;
                        }
                    },
                    {
                        title: 'Marks Per Question',
                        data: 'marks_per_questions',

                    },
                    {
                        title: 'Status',
                        data: 'status',
                        render: function (data, type, row) {
                            if(type === 'display') {
                                if(data === 1) {
                                    return '<span class="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Active</span>';
                                } else {
                                    return '<span class="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Inactive</span>';
                                }
                            }
                            return data ;
                        }
                    },
                    {
                        title: 'Actions',
                        data: null,
                        render: function (row) {
                            return `<button class="edit-button" data-id="${row.id}">Edit</button>
                            <button id="addQuestion" class="bg-gray-600 rounded-[5px] p-2 text-white text-center" data-id="${row.id}"> Add Questions </button>`;
                        }
                    }
                ],
                destroy: true,
                jQueryUI: true
            });

            $(tableRef.current).on('click', '.edit-button', function () {
                const id = $(this).data('id');
                openModal(id);
            })
            $(tableRef.current).on('click', '#addQuestion', function () {
                const id = $(this).data('id');
                addQuestion(id);
            });
        }
        return () => {
            if (tableRef.current) {
                $(tableRef.current).off('click', '.edit-button');
                $(tableRef.current).off('click', '#addQuestion');
            }
        }
    },[data]);

    useEffect(() => {
        errorTost();
    },[error]);

    useEffect(() => {
        successToast();
    },[success]);


    useEffect(()=> {
        if (edit.timing_per_questions === undefined || edit.timing_per_questions === null || edit.timing_per_questions === "") {
            setShowFiled(false);
        } else {
            setShowFiled(true);
        }
    },[edit]);

    const addQuestion = (id) => {
        navigate(`/admin/questions/show/${id}`);
    }

    const apiCall = async () => {
        const topicUrl = `admin/activeTopics`;
        topic.length === 0 && await getApi(topic, setTopic, topicUrl);
    }
    
    const errorTost = () => {
        if (!error) return;
        if (typeof error === "object") {
            Object.values(error).forEach(errMsgArray => {
                if (Array.isArray(errMsgArray)) {
                    errMsgArray.forEach(msg => {
                        toast.error(msg, { autoClose: 1500, position: "top-center" });
                    });
                }
            });
        } else {
            toast.error(error, { autoClose: 1500, position: "top-center" });
        }
    }

    const successToast = () => {
        if(!success) return;
        toast.success(success, { autoClose: 1500, position: "top-center" })
    }

    const addQuiz = async (e) => {
        e.preventDefault();

        let value = showFiled ? add.timing_per_questions : add.timing_per_quiz ;

        if ( value === undefined || value === null || value === "") {
            setError("Timming filed is Required");
            return ;
        }

        const formData = new FormData();
        Object.entries(add).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await postApi(formData, setAdd, url, setError, setSuccess, true);
        handleData();
        fetchFilterContain();
        setAdd([]);
        closeAddModal();
    }

    const editQuiz = async (e) => {
        e.preventDefault();

        const url2 = `admin/quiz/${id}`;

        showFiled ? delete edit.timing_per_quiz : delete edit.timing_per_questions;

        const formData = new FormData();
        Object.entries(edit).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await postApi(formData, setEdit, url2, setError, setSuccess, true);
        handleData();
        fetchFilterContain();
        setEdit([]);
        closeModal();
    }

    const openModal = async (id) => {
        setId(id);
        const url3 = `admin/quiz/${id}`;
        await getApi(edit, setEdit, url3);
        await apiCall();
        setShow(true);
        setSuccess([]);
        setError([]);
    }

    const closeModal = () => {
        setShow(false)
        setShowFiled(false)
        setAdd([]);
        setTopic([]);
    };

    const openAddModal = async () => {
        setAddShow(true)
        await apiCall();
        setSuccess([]);
        setError([]);
    };

    const closeAddModal = () => {
        setAddShow(false)
        setShowFiled(false)
        setAdd([]);
        setTopic([]);

    }

    const toggleTimmingOption = () => {
        showFiled  
        ? edit.timing_per_quiz = edit.timing_per_questions 
        : edit.timing_per_questions = edit.timing_per_quiz   ;
        setShowFiled(!showFiled);
    }

    return (
        <>  
        <ToastContainer />
            <div className="flex items-center justify-between">
                <h1 className="text-6xl">Quiz</h1>
                <button onClick={openAddModal} className={`${themeMode === 'dark' ? 'text-black font-medium bg-gray-200' : 'text-white bg-gray-700'} p-2 rounded-[5px]`}>Add Quiz</button>
            </div>

            <div className="flex items-center justify-end mt-5 mb-3">
                <div className="flex items-center">
                    Topics: 
                    <Dropdown 
                        name = "topics"
                        data = {filterContain ? filterContain : []}
                        disabled = {false}
                        onChange={(e) =>{
                            setFilter({...filter, 'topic': e.target.value})
                        }}
                        className="border rounded-[5px] h-[35px] ml-2"
                    />
                </div>
            </div>
            
            <div className="w-full">
                <table ref={tableRef} className="display"></table>
            </div>

            {/* Add Modal  */}
            {addShow && (
                <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${themeMode === 'dark' ? "bg-black" : "bg-white"}  p-6 rounded-lg shadow-lg w-max`}>
                        <h2 className="text-xl font-bold mb-4">Add Quiz </h2>
                        <div className="flex gap-10 px-6">
                            <div className="text-gray-500 mb-4 pr-10 border-r">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="text-start">
                                        <InputLable value="Name" />
                                    </div>

                                    <div className="text-end">
                                        <TextInput 
                                            name="name" 
                                            id="name" 
                                            onChange={(e) => setAdd({ ...add, [e.target.name]: e.target.value })}
                                            className="shadow-none border border-gray-500 "
                                        />
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Topic" />
                                    </div>

                                    <div className="text-start flex flex-col gap-0.5">
                                        <div className="w-full">
                                            <Dropdown 
                                                name = "topics"
                                                data = {topic}
                                                onChange={(e) =>{
                                                    setAdd({...add, [e.target.name]: e.target.value })
                                                }}
                                                className="border rounded-[5px] h-[35px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Levels" />
                                    </div>

                                    <div className="text-start flex flex-col gap-0.5">
                                        <div className="w-full">
                                            <TextInput 
                                                name="levels"
                                                id="levels"
                                                onChange={(e) => setAdd({...add, [e.target.name]: e.target.value })}
                                                className="shadow-none border border-gray-500 "
                                            />
                                        </div>
                                    </div>


                                    <div className="text-start">
                                        <InputLable value="Marks Per Questions" />
                                    </div>

                                    <div className="text-end">
                                        <TextInput 
                                            name="marks_per_questions" 
                                            id="marks_per_questions" 
                                            onChange={(e) => setAdd({ ...add, [e.target.name]: e.target.value })}
                                            className="shadow-none border border-gray-500 "
                                        />
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Image" />
                                    </div>
    
                                    <div className="text-start">
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={(e) => setAdd({ ...add, image: e.target.files[0] })}
                                            className="border rounded-[5px] p-2 w-full"
                                        />
                                        
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Status" />
                                    </div>

                                    <div className="text-start">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <Checkbox 
                                                name="status"
                                                className="sr-only peer"
                                                checked="true"
                                                onChange={(e) =>
                                                    setAdd((prev) => ({ ...prev, status: e.target.checked ? 1 : 0 }))
                                                }
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                        </label>    
                                    </div>

                                </div>
                            </div>
                            <div className="text-gray-500 mb-4">

                                {/* Slider  */}
                                <div className="flex flex-col mb-3 ">
                                    <div className={`${showFiled ? "rounded-bl-[5px]" : "rounded-br-[5px]"} rounded-tl-[5px] rounded-tr-[5px] text-2xl font-bold text-center w-full bg-yellow-500 text-black py-2`} >
                                        Timing
                                    </div>

                                    <div className="flex">
                                        <div className={`${!showFiled ? "bg-yellow-500 text-white rounded-bl-[5px] rounded-br-[5px]" : "rounded-[5px]"} text-2xl font-bold text-center w-full py-2 `} onClick={() => setShowFiled(!showFiled)}>
                                            Quiz
                                        </div>
                                        <div className={ `${showFiled ? "bg-yellow-500 text-white rounded-bl-[5px] rounded-br-[5px]" : "rounded-[5px]"} text-2xl font-bold text-center w-full py-2 `} onClick={() => setShowFiled(!showFiled)}>
                                            Questions
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">

                                    {showFiled ? (
                                        <>
                                            <div className="text-start">
                                                <InputLable value="Timing per Questions (In Mintue)" />
                                            </div>

                                            <div className="text-end">
                                                <TextInput 
                                                    name="timing_per_questions" 
                                                    id="timing_per_questions" 
                                                    type="number"
                                                    onChange={(e) => setAdd({ ...add, [e.target.name]: e.target.value })}
                                                    className="timming shadow-none border border-gray-500 "
                                                />
                                            </div>
                                        </>
                                        ) : (
                                        <>
                                            <div className="text-start md:w-[220px]">
                                                <InputLable value="Timing Per Quiz (In Mintue)" />
                                            </div>

                                            <div className="text-end">
                                                <TextInput 
                                                    name="timing_per_quiz" 
                                                    id="timing_per_quiz" 
                                                    type="number"
                                                    onChange={(e) => setAdd({ ...add, [e.target.name]: e.target.value })}
                                                    className="timming shadow-none border border-gray-500 "
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {add.image ? (
                                    <img
                                    src={ add.image && URL.createObjectURL(add.image)}
                                    alt="preview"
                                    className="mt-4 w-full h-40 object-cover rounded-md"
                                    />
                                ): (
                                    <div className="mt-4 w-full h-40 object-cover rounded-md text-white flex items-center justify-center bg-gray-400">
                                        Image
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end">  
                            <button
                                onClick={closeAddModal}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={addQuiz}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {show && (
                <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${themeMode === 'dark' ? "bg-black" : "bg-white"}  p-6 rounded-lg shadow-lg w-max`}>
                        <h2 className="text-xl font-bold mb-4">Edit Quiz </h2>
                        <div className="flex gap-10 px-6">
                            <div className="text-gray-500 mb-4 pr-10 border-r">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="text-start">
                                        <InputLable value="Name" />
                                    </div>

                                    <div className="text-end">
                                        <TextInput 
                                            name="name" 
                                            id="name" 
                                            value ={edit.name}
                                            onChange={(e) => setEdit({ ...edit, [e.target.name]: e.target.value })}
                                            className="shadow-none border border-gray-500 "
                                        />
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Topic" />
                                    </div>

                                    <div className="text-start flex flex-col gap-0.5">
                                        <div className="w-full">
                                            <Dropdown 
                                                name = "topic_id"
                                                data = {topic}
                                                select={edit.topic_id}
                                                onChange={(e) =>{
                                                    setEdit({...edit, [e.target.name]: e.target.value })
                                                }}
                                                className="border rounded-[5px] h-[35px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Level" />
                                    </div>

                                    <div className="text-start flex flex-col gap-0.5">
                                        <div className="w-full">
                                            <TextInput 
                                                name="levels"
                                                id="levels"
                                                value={edit.levels}
                                                onChange={(e) => setEdit({...edit, [e.target.name]: e.target.value })}
                                                className="shadow-none border border-gray-500 "
                                            />
                                        </div>
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Marks Per Questions" />
                                    </div>

                                    <div className="text-end">
                                        <TextInput 
                                            name="marks_per_questions" 
                                            id="marks_per_questions" 
                                            value={edit.marks_per_questions}
                                            onChange={(e) => setEdit({ ...edit, [e.target.name]: e.target.value })}
                                            className="shadow-none border border-gray-500 "
                                        />
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Image" />
                                    </div>
    
                                    <div className="text-start">
                                        <input
                                            type="file"
                                            name="images"
                                            accept="image/*"
                                            onChange={(e) => setEdit({ ...edit, image: e.target.files[0] })}
                                            className="border rounded-[5px] p-2 w-full"
                                        />
                                        
                                    </div>

                                    <div className="text-start">
                                        <InputLable value="Status" />
                                    </div>

                                    <div className="text-start">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <Checkbox 
                                                name="status"
                                                className="sr-only peer"
                                                checked={edit.status === 1 ? true : false}
                                                onChange={(e) =>
                                                    setEdit((prev) => ({ ...prev, status: e.target.checked ? 1 : 0 }))
                                                }
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                        </label>    
                                    </div>

                                </div>
                            </div>
                            <div className="text-gray-500 mb-4">

                                {/* Slider  */}
                                <div className="flex flex-col mb-3 ">
                                    <div className={`${showFiled ? "rounded-bl-[5px]" : "rounded-br-[5px]"} rounded-tl-[5px] rounded-tr-[5px] text-2xl font-bold text-center w-full bg-yellow-500 text-black py-2`} >
                                        Timing
                                    </div>

                                    <div className="flex">
                                        <div className={`${!showFiled ? "bg-yellow-500 text-white rounded-bl-[5px] rounded-br-[5px]" : "rounded-[5px]"} text-2xl font-bold text-center w-full py-2 `} onClick={toggleTimmingOption}>
                                            Quiz
                                        </div>
                                        <div className={ `${showFiled ? "bg-yellow-500 text-white rounded-bl-[5px] rounded-br-[5px]" : "rounded-[5px]"} text-2xl font-bold text-center w-full py-2 `} onClick={toggleTimmingOption}>
                                            Questions
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-5">
                                    {showFiled ? (
                                        <>
                                            <div className="text-start">
                                                <InputLable value="Timing per Questions (In Mintue)" />
                                            </div>

                                            <div className="text-end">
                                                <TextInput 
                                                    name="timing_per_questions" 
                                                    id="timing_per_questions" 
                                                    value={edit.timing_per_questions}
                                                    onChange={(e) => setEdit({ ...edit, [e.target.name]: e.target.value })}
                                                    className="shadow-none border border-gray-500 "
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            
                                            <div className="text-start md:w-[220px]">
                                                <InputLable value="Timing per Quiz (In Mintue)" />
                                            </div>

                                            <div className="text-end">
                                                <TextInput 
                                                    name="timing_per_quiz" 
                                                    id="timing_per_quiz"
                                                    value={edit.timing_per_quiz}
                                                    onChange={(e) => setEdit({ ...edit, [e.target.name]: e.target.value })}
                                                    className="shadow-none border border-gray-500 "
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                {edit.image ? (
                                    <img
                                    src={ edit.image instanceof File ?  URL.createObjectURL(edit.image) : `${import.meta.env.VITE_Image_URL}${edit.image}`}
                                    alt="preview"
                                    className="mt-4 w-full h-40 object-cover rounded-md"
                                    />
                                ): (
                                    <div className="mt-4 w-full h-40 object-cover rounded-md text-white flex items-center justify-center bg-gray-400">
                                        Image
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="flex gap-2 justify-end">  
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={editQuiz}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}