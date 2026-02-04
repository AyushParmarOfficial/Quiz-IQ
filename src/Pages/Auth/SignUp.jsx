import { FaUserCircle, FaUser, FaPhone, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { HeroGeometric } from "@/Components/Ui/shadcn-io/shape-landing-hero";

import InputGroup from "../../Components/Forms/InputGroup";
import InputError from "../../Components/Forms/InputError";
import SubmitBtn from "../../Components/Forms/SubmitBtn";

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState({
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
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#030303] transition-colors duration-300 py-10 md:py-20">
            {/* Background Hero */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <HeroGeometric
                    badge=""
                    title1=""
                    title2=""
                    description=""
                    className="min-h-full"
                />
            </div>

            <div className="relative z-10 w-full max-w-2xl px-4 mt-16">
                <div className="backdrop-blur-xl bg-white/80 dark:bg-black/60 border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-6 md:p-10 transform perspective-1000">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
                            <FaUserCircle
                                size={80}
                                className="relative text-gray-700 dark:text-gray-200 drop-shadow-lg"
                            />
                        </div>
                        <h1 className="mt-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                            Create Account
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                            Join us to start your journey
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            {/* Name */}
                            <div>
                                <InputGroup
                                    label="Name"
                                    icon={<FaUser className="w-5 h-5" />}
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                    required
                                    className="bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus:ring-indigo-500"
                                />
                                {errors.name && <InputError message={errors.name[0]} className="mt-1" />}
                            </div>

                            {/* Mobile */}
                            <div>
                                <InputGroup
                                    label="Mobile"
                                    icon={<FaPhone className="w-5 h-5" />}
                                    name="mobile"
                                    id="mobile"
                                    placeholder="Mobile Number"
                                    value={data.mobile}
                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                    required
                                    className="bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus:ring-indigo-500"
                                />
                                {errors.mobile && <InputError message={errors.mobile[0]} className="mt-1" />}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <InputGroup
                                label="Email"
                                icon={<FaEnvelope className="w-5 h-5" />}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                value={data.email}
                                onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                required
                                className="bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus:ring-indigo-500"
                            />
                            {errors.email && <InputError message={errors.email[0]} className="mt-1" />}
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {/* Password */}
                            <div>
                                <InputGroup
                                    label="Password"
                                    icon={<FaLock className="w-5 h-5" />}
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                    required
                                    className="bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus:ring-indigo-500"
                                />
                                {errors.password && <InputError message={errors.password[0]} className="mt-1" />}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputGroup
                                    label="Confirm Password"
                                    icon={<FaCheckCircle className="w-5 h-5" />}
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                                    required
                                    className="bg-white/50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <SubmitBtn
                                value="Sign Up"
                                isLoading={isLoading}
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
                            to={'/signin'}
                            className="block w-full py-3.5 text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-300 font-semibold hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-all duration-200"
                        >
                            Sign In
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}