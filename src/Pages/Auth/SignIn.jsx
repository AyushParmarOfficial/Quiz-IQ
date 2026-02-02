import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { HeroGeometric } from "@/Components/Ui/shadcn-io/shape-landing-hero";

import TextInput from "../../Components/Forms/TextInput";
import InputLable from "../../Components/Forms/InputLable";
import InputError from "../../Components/Forms/InputError";
import SubmitBtn from "../../Components/Forms/SubmitBtn";

export default function SignIn() {
    const themeMode = useSelector((state) => state.theme.mode);
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [searchParams] = useSearchParams();
    const path = searchParams.get("path");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();


            if (response.ok) {
                if (result.statusCode === 401) {
                    setErrors(result);
                } else {
                    localStorage.setItem('token', result.access_token);
                    if (result.user.user_type === 'a') {
                        window.location.href = "/admin";
                    } else {
                        window.location.href = path ?? "/";
                    }
                }
            }

        } catch (error) {
            console.error("Error during sign up:", error);
        }
    }
    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#030303] transition-colors duration-300">
            {/* Background Hero */}
            <div className="absolute inset-0 z-0">
                <HeroGeometric
                    mode={themeMode}
                    title1=""
                    title2=""
                    description=""
                    className="min-h-full"
                />
            </div>

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="backdrop-blur-xl bg-white/80 dark:bg-black/60 border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-8 md:p-10 transform perspective-1000">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
                            <FaUserCircle
                                size={80}
                                className="relative text-gray-700 dark:text-gray-200 drop-shadow-lg"
                            />
                        </div>
                        <h1 className="mt-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                            Please sign in to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <TextInput
                                name="username"
                                id="username"
                                placeholder="Email or Mobile"
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                className="w-full px-5 py-4 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                                required
                            />
                            <label className="absolute -top-2.5 left-4 px-2 bg-white/0 backdrop-blur-3xl text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                Username
                            </label>
                        </div>

                        <div className="relative group">
                            <TextInput
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                className="w-full px-5 py-4 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                                required
                            />
                            <label className="absolute -top-2.5 left-4 px-2 bg-white/0 backdrop-blur-3xl text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                Password
                            </label>
                            <InputError message={errors.error} />
                        </div>

                        <div className="pt-4">
                            <SubmitBtn
                                value="Sign In"
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            />
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                            </div>
                            <span className="relative z-10 px-4 bg-transparent text-sm text-gray-400">
                                or
                            </span>
                        </div>

                        <NavLink
                            to={'/signup'}
                            className="block w-full py-3.5 text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-300 font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-all duration-200"
                        >
                            Create an Account
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}