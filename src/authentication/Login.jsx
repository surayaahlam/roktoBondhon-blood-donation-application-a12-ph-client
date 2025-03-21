import Lottie from "lottie-react";
import loginLottie from "../assets/lottie/login.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { userLogin, setUser } = useAuth();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        const { email, password } = formData; // Get email & password from state

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                setLoading(false);
                Swal.fire({
                    title: "Login Successful!",
                    text: `Welcome back, ${user.displayName}!`,
                    icon: "success",
                    timer: 3000,
                    willClose: () => {
                        navigate(location.state?.from || "/");
                    }
                });
            })
            .catch((err) => {
                setError({ ...error, login: "Your email or password is incorrect. Please try again." })
                setLoading(false);
            });
    };

    const handleRoleLogin = (role) => {
        if (role === "admin") {
            setFormData({
                email: "surayaahlam@gmail.com",
                password: "Sa1234"
            });
        } else if (role === "volunteer") {
            setFormData({
                email: "rahim@gmail.com",
                password: "Ra1234"
            });
        }
    };


    return (
        <div className="container mx-auto mt-5 mb-16">
            <Helmet>
                <title>Rokto Bondhon | Login</title>
            </Helmet>
            <div className="w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-center">
                <Lottie className="w-[550px] hidden md:block" animationData={loginLottie}></Lottie>
                <div className={`w-full max-w-xl p-6 md:p-9 flex flex-col items-center`}>
                    <h2 className={`text-4xl  font-bold`}>Welcome Back</h2>
                    <p className="text-sm font-medium text-font_secondary md:mb-2">Login your account</p>
                    <Lottie className="w-64 md:hidden" animationData={loginLottie}></Lottie>
                    <div className={`card bg-base-100 w-full shrink-0`}>
                        <form onSubmit={handleLogin} className="card-body p-0 lg:p-8">

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text  font-medium">Email Address</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Update state
                                    className="input input-bordered border-primary"
                                    required
                                />
                                {/* <input name="email" type="email" placeholder="Enter your email address" className={`input input-bordered border-primary`} required /> */}
                            </div>

                            {/* Password */}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text  font-medium">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={formData.password} // Controlled input
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Update state
                                    className="input input-bordered border-primary"
                                    required
                                />
                                {/* <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`input input-bordered border-primary`}
                                    required /> */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowPassword(!showPassword);
                                    }}
                                    className="btn btn-xs btn-ghost hover:bg-transparent absolute right-2 top-12">
                                    {
                                        showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />
                                    }
                                </button>
                                {error.login && (
                                    <label className="label">
                                        <p className="text-sm font-normal text-red-700">
                                            {error.login}
                                        </p>
                                    </label>
                                )}
                            </div>

                            {/* Login Submit Button */}
                            <div className="form-control mt-4">
                                <button
                                    type="submit"
                                    className="btn bg-button border-none text-white hover:bg-secondary text-base font-bold uppercase"
                                >
                                    {
                                        loading
                                            ? <span className="loading loading-spinner loading-xs text-white"></span>
                                            : "Login"
                                    }
                                </button>
                            </div>

                            <div className="form-control items-center">
                                <label className="label">
                                    <p className="text-sm font-normal">
                                        Don't Have An Account? <Link to="/register" className="link link-hover text-[15px] text-primary hover:scale-110 font-bold">Register</Link>
                                    </p>
                                </label>
                            </div>

                            {/* Admin and Volunteer Login Buttons */}
                            <div className="flex gap-4 self-center">
                                <button
                                    type="button"
                                    onClick={() => handleRoleLogin("admin")}
                                    className="btn bg-primary text-white hover:bg-secondary text-sm font-bold"
                                >
                                    Admin Login
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRoleLogin("volunteer")}
                                    className="btn bg-primary text-white hover:bg-secondary text-sm font-bold"
                                >
                                    Volunteer Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;