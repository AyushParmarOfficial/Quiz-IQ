import { deleteApi, getApi } from "../../Services/Api";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import $ from 'jquery'; 
import { useNavigate } from "react-router-dom";
import Dropdown from "../../Components/Forms/Dropdown";
import ConfirmDelete from "../../Components/Admin/ConfirmDelete";


export  default function Questions() {

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState([]);
    const [deleteQuestionsQuizId, setDeleteQuestionsQuizId] = useState([]);
    const [filterContain, setFilterContain] = useState([]);
    const [deleteShow, setDeleteShow] = useState(false);
    const [filter, setFilter] = useState({});
    const tableRef = useRef(null);
    const navigate = useNavigate();
    const url = 'admin/questions';

    const handleData = async () => {
        const parametter = url + '?' + `${filter.topic ? "topic=" + filter.topic : ''}`;
        await getApi(data, setData, parametter);
    }

    const fetchFilterContain = async () => {
        await getApi(filterContain, setFilterContain, `admin/questionFilterContains`);
    }

    useEffect(() => {
        fetchFilterContain();
    },[]);

    useEffect(() => {
        handleData();
    }, [filter]);

    useEffect(() => {
        if(tableRef.current) {
            $(tableRef.current).DataTable({
                data: data,
                columns: [
                    {
                        title: 'ID',
                        data: 'id',
                        render: function (_data, _type, _row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        title: "Name",
                        data: "name"
                    },
                    {
                        title: "Topic",
                        data: "topic"
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
                        title: "Actions",
                        data: null,
                        render: function (_data, _type, row) {
                            return `<button id="clearQuestion" class="bg-red-600 rounded-[5px] p-2 text-white text-center" data-id="${row.id}">Clear Questions</button>
                            <button id="addQuestion" class="bg-gray-600 rounded-[5px] p-2 text-white text-center" data-id="${row.id}"> Add Questions </button>`;
                        }   
                    }
                ],
                destroy: true,
                jQueryUI: true
            });
            $(tableRef.current).on('click', '#clearQuestion', function () {
                const id = $(this).data('id');
                openDeleteModal(id);
            });
            $(tableRef.current).on('click', '#addQuestion', function () {
                const id = $(this).data('id');
                addQuestion(id);
            });
        }

        return () => {
            if (tableRef.current) {
                $(tableRef.current).off('click', '#clearQuestion');
                $(tableRef.current).off('click', '#addQuestion');
            }
        }
    },[data]);

    useEffect(() => {
        successToast();
    },[success]);

    const addQuestion = (id) => {
        navigate(`/admin/questions/show/${id}`);
    }

    const successToast = () => {
        if(!success) return;
        toast.success(success, { autoClose: 1500, position: "top-center" })
    }

    const openDeleteModal = (id) => {
        setDeleteShow(true);
        setDeleteQuestionsQuizId(id);
        setSuccess([]);
    }

    const closeDeleteModal = () => {
        setDeleteShow(false);
    }
    return (
        <>
            <ToastContainer />

            <div className="flex items-center justify-between">
                <h1 className="text-6xl">Questions</h1>
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

            {deleteShow && (
                <>
                    <div className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex justify-center items-center z-50">
                        <ConfirmDelete 
                            name="Question"
                            message= {`Are you sure to delete this quiz questions, This is Permanent Delete.`}
                            closeDeleteModal= {closeDeleteModal}
                            deleteUrl={`admin/questions/clearAllQuestionsInQuiz/${deleteQuestionsQuizId}`}
                            setSuccess={setSuccess}
                            handleData={handleData}
                        />                        
                    </div>
                </>
            )}
        </>
    );
}