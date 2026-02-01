import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import TextInput from "../../Components/Forms/TextInput";
import InputLable from "../../Components/Forms/InputLable";
import InputError from "../../Components/Forms/InputError";
import SubmitBtn from "../../Components/Forms/SubmitBtn";

export default function SignUp() {
    const themeMode = useSelector((state) => state.theme.mode);
    const [errors, setErrors] = useState([]);   
    const [data,setData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const reset = () => {
        setData({
            name: "",
            mobile: "",
            email: "",
            password: "",
            password_confirmation: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
            }); 

            const result = await response.json();

            if (response.ok) {
                if (result.statusCode === 422) {
                    setErrors(result.errors);
                } else {
                    reset();
                    window.location.href = "/signin";
                }
            } 
        } catch (error) {
            console.error("Error during sign up:", error);
        }
    }
    return (
        <>
            <div className="card md:mt-[130px] mb-auto md:mb-[15px] flex justify-center">
                <div className={`w-full mx-auto md:mx-25  ${themeMode === 'dark' ? 'shadow-lg/10 shadow-white':'shadow-lg'} p-5 px-auto lg:px-25 md:px-15 rounded-[30px]`}>
                    <div className="user flex justify-center">
                        <FaUserCircle 
                            size={100} 
                            className={` ${themeMode === 'dark' ? 'shadow-md/10 shadow-white':'shadow-xl/30'} text-shadow-lg  p-1.5 rounded-full`}
                        />
                    </div>
                    <div className="mt-[10px]">
                        <h1 className={` ${themeMode === 'dark' ? ' text-shadow-sm/30 text-shadow-white':'text-shadow-lg'} text-center  text-xl lg:text-6xl md:text-3xl`}>Welcome Back </h1>
                        <p className={` ${themeMode === 'dark' ? ' text-shadow-sm/30 text-shadow-white':'text-shadow-lg'} text-center    `}>Please sign in to Continue </p>
                    </div>
                    <div className="login_form lg:mt-[75px] md:mt-[40px] mt-[35px]">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group relative mb-[40px]">
                                <InputLable 
                                    value="Name" 
                                    classname={` ${themeMode === 'dark' ? 'text-gray-300 text-shadow-lg/10 text-shadow-white':'text-gray-700'} text-shadow-lg w-max absolute text-[14px] md:text-[18px] top-[-25px] md:top-[-30px] left-[10px] py-[5px] z-1`}
                                />
                                <TextInput 
                                    name="name" 
                                    id="name"
                                    onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                                    className={` ${themeMode === 'dark' ? 'shadow-lg/10 shadow-white':''} w-full p-[10px]`} 
                                    required  
                                />
                                <InputError message={errors.name && errors.name[0]} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="form-group relative mb-[40px] w-full">
                                    <InputLable 
                                        value="Mobile Number" 
                                        classname={` ${themeMode === 'dark' ? 'text-gray-300 text-shadow-lg/10 text-shadow-white':'text-gray-700'} text-shadow-lg w-max absolute text-[14px] md:text-[18px] top-[-25px] md:top-[-30px] left-[10px] py-[5px] z-1`}
                                    />
                                    <TextInput 
                                        name="mobile" 
                                        id="mobile"
                                        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                                        className={` ${themeMode === 'dark' ? 'shadow-lg/10 shadow-white':''} w-full p-[10px]`} 
                                        required  
                                    />
                                    <InputError message={errors.mobile && errors.mobile[0]} />
                                </div>
                                <div className="form-group relative mb-[40px]">
                                    <InputLable 
                                        value="Email Id" 
                                        classname={` ${themeMode === 'dark' ? 'text-gray-300 text-shadow-lg/10 text-shadow-white':'text-gray-700'} text-shadow-lg w-max absolute text-[14px] md:text-[18px] top-[-25px] md:top-[-30px] left-[10px] py-[5px] z-1`}
                                    />
                                    <TextInput 
                                        name="email" 
                                        id="email" 
                                        type="email"
                                        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                                        className={` ${themeMode === 'dark' ? 'shadow-lg/10 shadow-white':''} w-full p-[10px]`} 
                                        required  
                                    />
                                    <InputError message={errors.email && errors.email[0]} />
                                </div>
                                <div className="form-group relative mb-[40px]">
                                    <InputLable 
                                        value="Password" 
                                        classname={` ${themeMode === 'dark' ? 'text-gray-300 text-shadow-lg/10 text-shadow-white':'text-gray-700'} text-shadow-lg w-max absolute text-[14px] md:text-[18px] top-[-25px] md:top-[-30px] left-[10px] py-[5px] z-1`}
                                    />
                                    <TextInput 
                                        name="password" 
                                        id="password" 
                                        type="password"
                                        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                                        className={` ${themeMode === 'dark' ? 'shadow-lg/10 shadow-white':''} focus:border-yellow-400  w-full p-[10px]`} 
                                        required  
                                    />
                                    <InputError message={errors.password && errors.password[0]} />
                                </div>
                                <div className="form-group relative mb-[40px]">
                                    <InputLable 
                                        value="Confirm Password" 
                                        classname={` ${themeMode === 'dark' ? 'text-gray-300 text-shadow-lg/10 text-shadow-white':'text-gray-700'} text-shadow-lg w-max absolute text-[14px] md:text-[18px] top-[-25px] md:top-[-30px] left-[10px] py-[5px] z-1`}
                                    />
                                    <TextInput 
                                        name="password_confirmation" 
                                        id="password_confirmation" 
                                        type="password" 
                                        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
                                        className={` ${themeMode === 'dark' ? 'shadow-lg/10 shadow-white':''} focus:border-yellow-400  w-full p-[10px]`} 
                                        required  
                                    />
                                </div>
                            </div>
                            <div className="submit ">
                                <SubmitBtn  
                                    value="Sign Up" 
                                    className={` ${themeMode === 'dark' ? 'bg-[#575b5b] shadow-white' : 'bg-[#c3d8de]'}  shadow-lg/20 w-full rounded-[30px] py-2 text-xl`} 
                                />
                            </div>
                        </form>
                        <div className="my-5 text-shadow-lg/30 flex space-between items-center">
                            <div className="w-full">
                                <hr /> 
                            </div>
                            <h3 className="px-2">or</h3> 
                            <div className="w-full">
                                <hr />
                            </div>
                        </div>
                        <div className="w-full mb-auto md:mb-[15px] flex text-center">
                            <NavLink 
                                to={'/signin'} 
                                className={` ${themeMode === 'dark' ? 'bg-[#575b5b] shadow-white' : 'bg-[#c3d8de]'} shadow-lg/20 w-full rounded-[30px] py-2 text-xl`} 
                            > 
                                Sign In 
                            </NavLink>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}