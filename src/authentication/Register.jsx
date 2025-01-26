import Lottie from "lottie-react";
import registerLottie from "../assets/lottie/register.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios"
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../api/utils";
import Swal from "sweetalert2";

const Register = () => {
    const axiosPublic = useAxios();
    const navigate = useNavigate();
    const { createNewUser, setUser, updateUserProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);
    const [error, setError] = useState({});
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const { data } = await axiosPublic.get(`/districts`);
                setDistricts(data);
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        };
        fetchDistricts();
    }, []);

    // Fetch upazilas when a district is selected
    const handleDistrictChange = (event) => {
        const districtName = event.target.value;

        if (districtName) {
            const fetchUpazilas = async () => {
                try {
                    const { data } = await axiosPublic.get(`/upazilas/${districtName}`);
                    setUpazilas(data[0].upazilas);
                } catch (error) {
                    console.error("Error fetching upazilas:", error);
                }
            };
            fetchUpazilas();
        } else {
            setUpazilas([]); // Reset upazilas if no district is selected
        }
    };

    const validatePassword = (password) => {
        const errors = [];
        if (!/[A-Z]/.test(password)) errors.push("Must include at least one uppercase letter. ");
        if (!/[a-z]/.test(password)) errors.push("Must include at least one lowercase letter. ");
        if (password.length < 6) errors.push("Must be at least 6 characters long. ");
        return errors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const bloodGroup = form.blood.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const password = form.password.value;
        const conPassword = form.conPassword.value;
        const terms = form.terms.checked;

        const imageURL = await imageUpload(image);

        // Validate the password
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            setError({ ...error, password: passwordErrors });
            return;
        };

        if (password !== conPassword) {
            setError({ ...error, password: "Passwords didn't match." });
            return;
        };

        if (!terms) {
            setError({ ...error, terms: "Please accept our terms & conditions." });
            return;
        };

        try {
            // Create user in Firebase Authentication
            const result = await createNewUser(email, password);
            const user = result.user;
            setUser(user);

            // Update user profile in Firebase
            await updateUserProfile({ displayName: name, photoURL: imageURL });

            setLoading(false);

            // Show success message
            Swal.fire({
                title: "Registration Successful!",
                text: `Welcome, ${user.displayName}!`,
                icon: "success",
                timer: 3000,
                willClose: () => {
                    navigate("/");
                }
            });

            // Post user data to the backend
            await axiosPublic.post(`/users/${user?.email}`, {
                name: user?.displayName,
                email: user?.email,
                avatar: user?.photoURL,
                bloodGroup,
                district,
                upazila,
            });
        }
        catch (err) {
            setError({ ...error, errorMsg: err.message });
        }
    };


    return (
        <div className="container mx-auto mt-5 mb-16">
            <Helmet>
                <title>Rokto Bondhon | Register</title>
            </Helmet>
            <div className="w-11/12 mx-auto flex flex-row-reverse justify-center items-start lg:gap-10">
                <Lottie className="w-[500px] hidden lg:block mt-28" animationData={registerLottie}></Lottie>
                <div className={`w-full max-w-xl p-6 md:p-9 lg:px-4 flex flex-col items-center`}>
                    <h2 className={`text-4xl  font-bold mb-1`}>Registration</h2>
                    <p className="text-sm font-medium text-font_secondary md:mb-2 lg:mb-0">Create your account</p>
                    <Lottie className="w-64 md:w-72 lg:hidden" animationData={registerLottie}></Lottie>
                    <div className={`card w-full shrink-0`}>
                        <form onSubmit={handleRegister} className="card-body p-0 md:p-4 lg:px-8">

                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text  font-medium">Name</span>
                                </label>
                                <input name="name" type="text" placeholder="Enter your name" className={`input input-bordered border-primary`} required />
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text  font-medium">Email Address</span>
                                </label>
                                <input name="email" type="email" placeholder="Enter your email address" className={`input input-bordered border-primary`} required />
                            </div>

                            {/* Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text  font-medium">Profile Avatar</span>
                                </label>
                                <input
                                    name="image"
                                    type="file"
                                    className="file-input file-input-bordered border-primary file:bg-primary file:hover:bg-secondary file:border-none file:text-white"
                                    required
                                />
                            </div>

                            {/* Blood Group */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text  font-medium">Blood Group</span>
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
                                {/* District */}
                                <div className="form-control md:flex-auto">
                                    <label className="label">
                                        <span className="label-text  font-medium">District</span>
                                    </label>
                                    <select
                                        name="district"
                                        className="select border-primary"
                                        onChange={handleDistrictChange}
                                        required
                                        defaultValue="">
                                        <option value="" disabled>Select your district</option>
                                        {
                                            districts.map((district) => (
                                                <option key={district._id} value={district.name}>{district.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* Upazila */}
                                <div className="form-control md:flex-auto">
                                    <label className="label">
                                        <span className="label-text  font-medium">Upazila</span>
                                    </label>
                                    <select
                                        name="upazila"
                                        className="select border-primary"
                                        required
                                        defaultValue="">
                                        <option value="" disabled>Select your upazila</option>
                                        {
                                            upazilas.map((upazila) => (
                                                <option key={upazila._id} value={upazila.name}>
                                                    {upazila.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
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
                                    className={`input input-bordered border-primary`}
                                    required />
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
                            </div>

                            {/* Confirm Password */}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text  font-medium">Confirm Password</span>
                                </label>
                                <input
                                    name="conPassword"
                                    type={showConPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className={`input input-bordered border-primary`}
                                    required />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowConPassword(!showConPassword);
                                    }}
                                    className="btn btn-xs btn-ghost hover:bg-transparent absolute right-2 top-12">
                                    {
                                        showConPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />
                                    }
                                </button>
                            </div>
                            {error.password && (
                                <label className="label">
                                    <p className="text-sm font-normal text-red-700">
                                        {error.password}
                                    </p>
                                </label>
                            )}

                            {/* Terms & Conditions */}
                            <div className="form-control">
                                <label className="label justify-start cursor-pointer">
                                    <input type="checkbox" name="terms" className="checkbox w-5 h-5" />
                                    <span className="ml-3 label-text">Agree to Terms & Conditions</span>
                                </label>
                            </div>

                            {/* Register Submit Button */}
                            <div className="form-control mt-2">
                                <button 
                                    type="submit" 
                                    className="btn bg-primary border-none text-white hover:bg-secondary text-base uppercase"
                                >
                                    {
                                        loading
                                            ? <span className="loading loading-spinner loading-xs text-white"></span>
                                            : "Register"
                                    }
                                </button>
                            </div>

                            {error.terms && (
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
                            )}


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