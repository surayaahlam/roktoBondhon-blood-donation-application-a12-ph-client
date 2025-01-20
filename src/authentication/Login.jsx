import Lottie from "lottie-react";
import loginLottie from "../assets/lottie/login.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="container mx-auto mt-5 mb-16">
            <Helmet>
                <title>Rokto Bondhon | Login</title>
            </Helmet>
            <div className="w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-center">
                <Lottie className="w-[550px] hidden md:block" animationData={loginLottie}></Lottie>
                <div className={`w-full max-w-xl p-6 md:p-9 flex flex-col items-center`}>
                    <h2 className={`text-4xl font-lato font-bold`}>Welcome Back</h2>
                    <p className="text-sm font-medium text-font_secondary md:mb-2">Login your account</p>
                    <Lottie className="w-64 md:hidden" animationData={loginLottie}></Lottie>
                    <div className={`card bg-base-100 w-full shrink-0`}>
                        <form onSubmit='' className="card-body p-0 lg:p-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-lato font-medium">Email Address</span>
                                </label>
                                <input name="email" type="email" placeholder="Enter your email address" className={`input input-bordered border-primary`} required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-lato font-medium">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`input input-bordered border-primary`}
                                    required />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-xs btn-ghost hover:bg-transparent absolute right-2 top-12">
                                    {
                                        showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />
                                    }
                                </button>
                                {/* {error.login && (
                                    <label className="label">
                                        <p className="text-sm font-normal text-red-700">
                                            {error.login}
                                        </p>
                                    </label>
                                )} */}
                            </div>
                            <div className="form-control mt-4">
                                <button type="submit" className="btn bg-button border-none text-white hover:bg-secondary text-base font-bold">Login</button>
                            </div>
                            <div className="form-control items-center">
                                <label className="label">
                                    <p className="text-sm font-normal">
                                        Don't Have An Account? <Link to="/register" className="link link-hover text-[15px] text-primary hover:scale-110 font-bold">Register</Link>
                                    </p>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;