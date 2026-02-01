import { useSelector } from "react-redux";
import { deleteApi, postApi } from "../../Services/Api";

export default function ConfirmDelete({name, message, closeDeleteModal, deleteUrl, setSuccess, handleData}) {
    
    const themeMode = useSelector((state) => state.theme.mode);

    const deleteQuestions = async (e) => {
        e.preventDefault();
        const url = deleteUrl;
        await deleteApi(url, setSuccess);
        closeDeleteModal();
        handleData();
    }

    return (
        <div className={`${themeMode === 'dark' ? 'bg-black' : 'bg-white'} rounded-lg p-4`}>
            <div className="text-red-500 text-3xl ">
                Delete {name}
            </div>
            <div className="text-gray-500 my-3">
                {message}
            </div>

            <div className="flex justify-end">
                <div className="flex gap-5">
                    <button
                        onClick={closeDeleteModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        Close
                    </button>
                    <button
                        onClick={deleteQuestions}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}