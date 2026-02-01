import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { postApi } from "../../../Services/Api";
import InputLable from "../../../Components/Forms/InputLable";
import TextInput from "../../../Components/Forms/TextInput";
import TextArea from "../../../Components/Forms/TextArea";
import RadioButton from "../../../Components/Forms/RadioButton";

export default function EditQuestions({closeEditModal, handleData, setError, setSuccess, edit, setEdit, levels}) {

    const {id} = useParams();
    const questionId = edit.id;
    const themeMode = useSelector((state) => state.theme.mode);
    
    const textStyle = "shadow-none border border-gray-500 p-2";

    const editQuestion = async (e) => {
        e.preventDefault();
        const url = `admin/quiz-questions/${id}/${questionId}`;
        await postApi(edit, setEdit, url, setError, setSuccess);
        closeEditModal();
        handleData();
    }

    
    return (
        <>
            <div className={`${themeMode === 'dark' ? "bg-black" : "bg-white"} flex flex-col p-6 rounded-lg shadow-lg`}>

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl">Edit Question</h1>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-[50px] ">
                    {/* ###################################################### Left Form ########################################## */}
                    <div className=" grid gap-2 px-[35px] border-r border-gray-400">

                        {/* Question Textarea */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="Question" />
                            </div>
                            <div className="col-span-3">
                                <TextArea 
                                    name="question"
                                    id="question"
                                    value={edit.question}
                                    onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    className={textStyle}
                                />
                            </div>
                        </div>

                        {/* Option A */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="A" />
                            </div>
                            <div className="col-span-3">
                                <TextInput
                                    name="a"
                                    id="a"
                                    value={edit.a}
                                    onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    className={textStyle}
                                />
                            </div>
                        </div>

                        {/* Option B */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="B" />
                            </div>
                            <div className="col-span-3">
                                <TextInput
                                    name="b"
                                    id="b"
                                    value={edit.b}
                                    onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    className={textStyle}
                                />
                            </div>
                        </div>

                        {/* Option C */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="C" />
                            </div>
                            <div className="col-span-3">
                                <TextInput
                                    name="c"
                                    id="c"
                                    value={edit.c}
                                    onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    className={textStyle}
                                />
                            </div>
                        </div>

                        {/* Option D */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="D" />
                            </div>
                            <div className="col-span-3">
                                <TextInput
                                    name="d"
                                    id="d"
                                    value={edit.d}
                                    onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    className={textStyle}
                                />
                            </div>
                        </div>
                    </div>

                    {/*###################################################### Right Form  ################################################*/}
                    <div className="grid gap-2 px-[35px]">

                        {/* Description Textarea */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="Description"/>
                            </div>
                            <div className="col-span-3">
                                <TextArea 
                                    name="description"
                                    id="description"
                                    value={edit.description}
                                    onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    className={`h-[60px] ${textStyle}`}
                                />
                            </div>
                        </div>

                        {/* Level Dropdown */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="Level" />
                            </div>
                            <div className="col-span-3">
                                <select 
                                    name="level"
                                    id="level"
                                    value={edit.level}
                                    onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    className={`w-full h-[40px] px-2 border border-gray-500 rounded-lg ${textStyle}`}
                                >
                                    <option value="">Select Level</option>
                                    {levels && levels.map((level) => (
                                        <option key={level.id} value={level.id}>{level.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Mode Radio Buttons */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="Mode" />
                            </div>
                            <div className="col-span-3">
                                <div className="flex gap-5">
                                    <div className="flex items-center gap-1">
                                        <RadioButton 
                                            name="mode"
                                            value="easy"
                                            checked={edit.mode === "easy"}
                                            onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                        />
                                        <InputLable value="Easy"/>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioButton 
                                            name="mode"
                                            value="medium"
                                            checked={edit.mode === "medium"}
                                            onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                        />
                                        <InputLable value="Medium"/>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioButton 
                                            name="mode"
                                            value="hard"
                                            checked={edit.mode === "hard"}
                                            onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                        />
                                        <InputLable value="Hard"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Answer Radio Buttons */}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <div className="col-span-1">
                                <InputLable value="Answer" />
                            </div>
                            <div className="flex gap-5 col-span-3">
                                <div className="flex items-center gap-3">
                                    <RadioButton 
                                        name="answer"
                                        value="a"
                                        checked={edit.answer === "a"}
                                        onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    />
                                    <InputLable value="A"/>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioButton 
                                        name="answer"
                                        value="b"
                                        checked={edit.answer === "b"}
                                        onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    />
                                    <InputLable value="B"/>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioButton 
                                        name="answer"
                                        value="c"
                                        checked={edit.answer === "c"}
                                        onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    />
                                    <InputLable value="C"/>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioButton 
                                        name="answer"
                                        value="d"
                                        checked={edit.answer === "d"}
                                        onChange={(e) => setEdit({...edit, [e.target.name]:e.target.value})}
                                    />
                                    <InputLable value="D"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="flex gap-5">
                        <button 
                            onClick={closeEditModal}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                        <button 
                            onClick={editQuestion}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Edit
                        </button>
                    </div>
                </div>

            </div>

        </>
    );
}