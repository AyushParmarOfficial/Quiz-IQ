import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getApi } from "../../../Services/Api";
import $ from 'jquery'; 
import AddQuestion from "./AddQuestions";
import EditQuestions from "./EditQuestions";
import ConfirmDelete from "../../../Components/Admin/ConfirmDelete";

export default function ShowQuestions() {

    const {id} = useParams();
    const themeMode = useSelector((state) => state.theme.mode);
    const tableRef = useRef(null);
    const [data, setData] = useState([]);
    const [add, setAdd] = useState([]);
    const [edit, setEdit] = useState([]);
    const [deleteQuestion, setDeleteQuestion] = useState(null);
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const url = `admin/quiz-questions/${id}`;

    const handleData = async () => {
        await getApi(data, setData, url);
    }

    useEffect(() => {
        handleData();
    },[]);

    useEffect(() => {
        if(tableRef.current) {
            $(tableRef.current).DataTable({
                data: data.questions,
                columns: [
                    {
                        title: 'ID',
                        data: 'id',
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        title: "Questions",
                        data: "question"
                    },
                    {
                        title: "A",
                        data: "a"
                    },
                    {
                        title: "B",
                        data: "b"
                    },
                    {
                        title: "C",
                        data: "c"
                    },
                    {
                        title: "D",
                        data: "d"
                    },
                    {
                        title: "Answer",
                        data: "answer",
                        render: function (data) {
                            return data.toUpperCase();
                        }
                    },
                    {
                        title: "Level",
                        data: "level"
                    },
                    {
                        title: "Mode",
                        data: "mode"
                    },
                    {
                        title: "Actions",
                        data: null,
                        render: function (row) {
                            return ` 
                                <div class="flex gap-5">
                                    <button data-id="${row.id}" class="edit-buttons px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"> Edit</button>
                                    <button data-id="${row.id}" class="delete-button px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"> Delete</button>
                                </div>
                            `
                        }
                    }
                ],
                destroy: true,
                jQueryUI: true
            });
            
            $(tableRef.current).on('click', '.edit-buttons', function () {
                const id = $(this).data('id');
                openEditModal(id);
            });

            $(tableRef.current).on('click','.delete-button', function () {
                const id = $(this).data('id');
                openDeleteModal(id);
            })
        }
        return () => {
            if (tableRef.current) {
                $(tableRef.current).off('click', '.edit-buttons');
                $(tableRef.current).off('click', '.delete-button');
            }
        }
    },[data]);

    useEffect(() => {
        errorTost();
    },[error]);

    useEffect(() => {
        successToast();
    },[success]);

    const errorTost = () => {
        if(!error) return;
        if(typeof error === "object") {
            Object.values(error).forEach(errMsgArray => {
                if(Array.isArray(errMsgArray)) {
                    errMsgArray.forEach(msg => {
                        toast.error(msg, { autoClose: 1500, position: "top-center" });
                    })
                }
            })
        } else {
            toast.error(error, { autoClose: 1500, position: "top-center" });
        }
    }

    const successToast = () => {
        if(!success) return;
        toast.success(success, {autoClose: 1500, position: "top-center" })
    }

    const openModal = () => {
        setShow(true);
        setSuccess([]);
        setError([]);
    }

    const closeModal = () => setShow(false);

    const openEditModal = async (questionId) => {
        const url1 = `admin/quiz-questions/${id}/${questionId}`;
        await getApi(edit, setEdit, url1);
        setEditShow(true);
        setSuccess([]);
        setError([]);
    }

    const closeEditModal = () => setEditShow(false);

    const openDeleteModal = (id) => {
        setDeleteShow(true);
        setDeleteQuestion(id);
        setSuccess([]);
    }

    const closeDeleteModal = () => setDeleteShow(false);

    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-between">
                <h1 className="text-6xl">Show Questions </h1>
                <div className="flex gap-5 ">
                    <NavLink 
                        to="/admin/questions" 
                        className={`${themeMode === 'dark' && 'font-medium '} p-2 rounded-[5px] bg-blue-500 text-white text-center`} 
                    > 
                    Back 
                    </NavLink>
                    <NavLink 
                        onClick={openModal}
                        className={`${themeMode === 'dark' ? 'text-black font-medium bg-gray-200' : 'text-white bg-gray-700'} p-2 rounded-[5px] text-center`}
                    >
                        Add Question
                    </NavLink>
                </div>
            </div>

            {/* <div className="flex items-center justify-between mt-5 mb-3 text-3xl bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center">
                    Topic: 
                    <span className="ml-2 font-semibold">{data && data.quiz?.topic}</span>
                </div>
                <div className="flex items-center">
                    Quiz: 
                    <span className="ml-2 font-semibold">{data && data.quiz?.name}</span>
                </div>
            </div> */}

            <div className="w-full">
                <table ref={tableRef} className="display"></table>
            </div>

            {/* Add Modal */}
            {show && (
                <>
                    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
                        <AddQuestion 
                            closeModal={closeModal} 
                            handleData={handleData} 
                            setError={setError}
                            setSuccess={setSuccess}
                            add={add}
                            setAdd={setAdd}
                            levels={data.levels}
                        />
                    </div>
                </>
            )}

            {/* Edit Modal  */}
            {editShow && (
                <>
                    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
                        <EditQuestions
                            closeEditModal={closeEditModal}
                            handleData={handleData}
                            setError={setError}
                            setSuccess={setSuccess}
                            edit={edit}
                            setEdit={setEdit}
                            levels={data.levels}
                        />
                    </div>
                </>
            )}

            {/* Delete Modal  */}
            {deleteShow && (
                <>
                    <div className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex justify-center items-center z-50">
                        <ConfirmDelete 
                            name="Question"
                            message= {`Are you sure to delete this question, This is Permanent Delete.`}
                            closeDeleteModal= {closeDeleteModal}
                            deleteUrl={`admin/questions/${deleteQuestion}`}
                            setSuccess={setSuccess}
                            handleData={handleData}
                        />                        
                    </div>
                </>
            )}
        </>
    );
}