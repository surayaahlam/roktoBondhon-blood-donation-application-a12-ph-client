import Lottie from "lottie-react";
import registerLottie from "../assets/lottie/register.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);

    return (
        <div className="container mx-auto mt-5 mb-16">
            <Helmet>
                <title>Rokto Bondhon | Register</title>
            </Helmet>
            <div className="w-11/12 mx-auto flex flex-row-reverse justify-center">
                <Lottie className="w-[450px] hidden lg:block" animationData={registerLottie}></Lottie>
                <div className={`w-full max-w-xl p-6 md:p-9 flex flex-col items-center`}>
                    <h2 className={`text-4xl font-lato font-bold mb-1`}>Registration</h2>
                    <p className="text-sm font-medium text-font_secondary md:mb-2 lg:mb-0">Create your account</p>
                    <Lottie className="w-64 md:w-72 lg:hidden" animationData={registerLottie}></Lottie>
                    <div className={`card w-full shrink-0`}>
                        <form onSubmit="" className="card-body p-0 md:p-4 lg:px-8">

                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-lato font-medium">Name</span>
                                </label>
                                <input name="name" type="text" placeholder="Enter your name" className={`input input-bordered border-primary`} required />
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-lato font-medium">Email Address</span>
                                </label>
                                <input name="email" type="email" placeholder="Enter your email address" className={`input input-bordered border-primary`} required />
                            </div>

                            {/* Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-lato font-medium">Profile Avatar</span>
                                </label>
                                <input
                                    name="photo"
                                    type="file"
                                    className="file-input file-input-bordered border-primary file:bg-primary file:border-primary file:text-white"
                                    required
                                />
                            </div>

                            {/* Blood Group */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-lato font-medium">Blood Group</span>
                                </label>
                                <select
                                    name="blood"
                                    className="select border-primary"
                                    required
                                    defaultValue="">
                                    <option value="" disabled>Select your blood group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            {/* District and Upazila */}
                            <div className="w-full md:flex gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-lato font-medium">District</span>
                                    </label>
                                    <select
                                        name="district"
                                        className="select border-primary"
                                        required
                                        defaultValue="">
                                        <option value="" disabled>Select your district</option>
                                        <option value="A+">A+</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-lato font-medium">Upazila</span>
                                    </label>
                                    <select
                                        name="upazila"
                                        className="select border-primary"
                                        required
                                        defaultValue="">
                                        <option value="" disabled>Select your upazila</option>
                                        <option value="A+">A+</option>
                                    </select>
                                </div>


                            </div>

                            {/* Password */}
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
                            </div>

                            {/* Confirm Password */}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-lato font-medium">Confirm Password</span>
                                </label>
                                <input
                                    name="conPassword"
                                    type={showConPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className={`input input-bordered border-primary`}
                                    required />
                                <button
                                    onClick={() => setShowConPassword(!showConPassword)}
                                    className="btn btn-xs btn-ghost hover:bg-transparent absolute right-2 top-12">
                                    {
                                        showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />
                                    }
                                </button>
                            </div>
                            {/* {error.password && (
                                <label className="label">
                                    <p className="text-sm font-normal text-red-700">
                                        {error.password}
                                    </p>
                                </label>
                            )} */}

                            {/* Terms & Conditions */}
                            <div className="form-control">
                                <label className="label justify-start cursor-pointer">
                                    <input type="checkbox" name="terms" className="checkbox w-5 h-5" />
                                    <span className="ml-3 label-text">Agree to Terms & Conditions</span>
                                </label>
                            </div>

                            {/* Register Button */}
                            <div className="form-control mt-4">
                                <button type="submit" className="btn bg-primary border-none text-white hover:bg-font_secondary text-base font-lato">Register</button>
                            </div>
                            {/* {error.terms && (
                                <label className="label">
                                    <p className="text-sm font-normal text-red-700">
                                        {error.terms}
                                    </p>
                                </label>
                            )}
                            {error.errorMsg && (
                                <label className="label">
                                    <p className="text-sm font-normal text-red-700">
                                        {error.errorMsg}
                                    </p>
                                </label>
                            )} */}


                            <div className="form-control items-center">
                                <label className="label">
                                    <p className="text-sm font-normal">
                                        Already Have An Account? <Link to="/login" className="link link-hover text-[15px] text-button hover:scale-110 font-bold">Login</Link>
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

export default Register;