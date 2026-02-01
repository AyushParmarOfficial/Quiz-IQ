import { useEffect, useRef, useState } from "react";
import { getApi, postApi } from "../../Services/Api";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import $ from 'jquery'; 
import InputLable from "../../Components/Forms/InputLable";
import TextInput from "../../Components/Forms/TextInput";
import Checkbox from "../../Components/Forms/CheckBox";

export default function Topics() {
    
    const themeMode = useSelector((state) => state.theme.mode);
    const tableRef = useRef(null);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState([]);
    const [add, setAdd] = useState([]);
    const [id, setId] = useState(null);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [show, setShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const url = "admin/topic";
    
    const handleData = async (e) => {
        await getApi(data, setData, url);
    }

    useEffect(()=> {
        handleData();
    },[]);

    useEffect(() => {
        if(tableRef.current) {
            $(tableRef.current).DataTable({
                data: data,  
                columns: [
                    { 
                        title: 'ID',
                        data: 'id', 
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        } 
                    },
                    { 
                        title: 'Name', 
                        data: 'name' 
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
                        render: function (row) {
                            return `<button class="edit-button" data-id="${row.id}">Edit</button>`;
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
        }
        return () => {
            if (tableRef.current) {
                $(tableRef.current).off('click', '.edit-button');
            }
        };
    },[data]);

    useEffect(() => {
        errorTost();
    },[error]);

    useEffect(() => {
        successToast();
    },[success]);

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


    const editTopic = async (e) => {
        e.preventDefault();

        const url2 = `admin/topic/${id}`;

        const formData = new FormData();
        Object.entries(edit).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await postApi(formData, setEdit, url2, setError, setSuccess, true);
        closeModal();    
        handleData();
    }

    const addTopic = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(add).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await postApi(formData, setAdd, url, setError, setSuccess, true);
        closeAddModal();    
        handleData();
        setAdd([]);
    }

    const openModal = async (id) => {
        setId(id);
        const topic = `admin/topic/${id}`;
        await getApi(edit, setEdit, topic);
        setShow(true);
        setSuccess([]);
        setError([]);
    };
    const closeModal = () => {
        setShow(false)
        setEdit([]);
    };

    const openAddModal = async () => {
        setAddShow(true);
        setSuccess([]);
        setError([]);
    };
    const closeAddModal = () => {
        setAddShow(false)
        setAdd([]);
    };
    
    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-between">
                <h1 className="text-6xl">Topics</h1>
                <button onClick={openAddModal} className={`${themeMode === 'dark' ? "text-black font-medium bg-gray-200 " : " text-white bg-gray-700"} p-2 rounded-[5px]`}>Add Topics</button>
            </div>
            <div className="w-full">
                <table ref={tableRef} className="display"></table>
            </div>

            {/* Add Modal  */}
            {addShow && (
                <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${themeMode === 'dark' ? "bg-black" : "bg-white"}  p-6 rounded-lg shadow-lg w-96`}>
                        <h2 className="text-xl font-bold mb-4">Add Topic </h2>
                        <div className="text-gray-500 mb-4">
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
                            </div>

                            {add.image ? (
                                <img
                                src={ add.image && URL.createObjectURL(add.image)}
                                alt="preview"
                                className="mt-2 w-full h-35 object-cover rounded-md"
                                />
                            ): (
                                <div className="mt-2 w-full h-24 object-cover rounded-md text-white flex items-center justify-center bg-gray-400">
                                    Image
                                </div>
                            )}

                        </div>

                        <div className="flex gap-2 justify-end">  
                            <button
                                onClick={closeAddModal}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={addTopic}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal  */}
            {show && (
                <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${themeMode === 'dark' ? "bg-black" : "bg-white"}  p-6 rounded-lg shadow-lg w-96`}>
                        <h2 className="text-xl font-bold mb-4">Edit Topic </h2>
                        <div className="text-gray-500 mb-4">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="text-start">
                                    <InputLable value="Name" />
                                </div>

                                <div className="text-end">
                                    <TextInput 
                                        name="name" 
                                        id="name" 
                                        value={edit.name}
                                        onChange={(e) => setEdit({ ...edit, [e.target.name]: e.target.value })}
                                        className="shadow-none border border-gray-500 "
                                        required
                                    />
                                </div>

                                <div className="text-start">
                                    <InputLable value="Status" />
                                </div>

                                <div className="text-start">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <Checkbox 
                                            name = "status"
                                            className="sr-only peer" 
                                            checked={edit.status === 1 ? true : false}
                                            onChange={(e) => setEdit((prev) => ({ ...prev, [e.target.name]: e.target.checked ? 1 : 0 }))}
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    </label>    
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
                            </div>
                            {edit.image ? (
                                <img
                                src={ edit.image instanceof File ?  URL.createObjectURL(edit.image) : `${import.meta.env.VITE_Image_URL}${edit.image}`}
                                alt="preview"
                                className="mt-2 w-full h-35 object-cover rounded-md"
                                />
                            ): (
                                <div className="mt-2 w-full h-24 object-cover rounded-md text-white flex items-center justify-center bg-gray-400">
                                    Image
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={editTopic}
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