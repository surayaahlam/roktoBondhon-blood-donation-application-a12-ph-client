import { Helmet } from "react-helmet-async";
import Loading from "../../Loading";
import useAuth from "../../../hooks/useAuth";
import { TbEdit } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import useAddressLocation from "../../../hooks/useAddressLocation";
import { imageUpload } from "../../../api/utils";
import { toast } from "react-toastify";

const Profile = () => {
    const { user, loading, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditable, setIsEditable] = useState(false);
    const { districts, upazilas, fetchUpazilas } = useAddressLocation();

    const { data: userData, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/${user?.email}`);
            return data;
        },
    });

    const handleDistrictChange = (event) => {
        const districtName = event.target.value;
        fetchUpazilas(districtName);
    };

    const handleEdit = () => setIsEditable(true);

    const [image, setImage] = useState(user?.photoURL);
    // Handle image file selection
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = await imageUpload(file);
            setImage(imageURL);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const avatar = image;
        const bloodGroup = form.blood.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        const updatedUser = {
            name,
            avatar,
            bloodGroup,
            district,
            upazila
        };

        try {
            await updateUserProfile({ displayName: name, photoURL: image })
            const { data } = await axiosSecure.patch(`/updatedUser/${user?.email}`,
                updatedUser
            );
            toast.success("Profile updated successfully!", {
                position: "top-center",
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile.", {
                position: "top-center"
            }
            );
        }
        await refetch();
        setIsEditable(false);
    };



    if (isLoading) return <Loading />
    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Profile</title>
            </Helmet>
            <div className={`card w-full shrink-0`}>
                <form onSubmit={handleSave} className="card-body p-2 md:p-4 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl md:text-[26px] lg:text-3xl font-bold text-primary">My Profile</h2>
                        {!isEditable &&
                            <div onClick={handleEdit} className="btn btn-ghost hover:bg-transparent text-primary">
                                <TbEdit size={27}></TbEdit>
                            </div>
                        }
                    </div>

                    <div className="w-full lg:flex lg:gap-10">
                        {/* Name */}
                        <div className="form-control lg:flex-auto">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                defaultValue={user?.displayName}
                                placeholder="Enter your name"
                                className={`input input-bordered border-primary`} 
                                readOnly={!isEditable}/>
                        </div>

                        {/* Email */}
                        <div className="form-control lg:flex-auto">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Email Address</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                defaultValue={user?.email}
                                placeholder="Enter your email address"
                                className={`input input-bordered border-primary`}
                                readOnly />
                        </div>
                    </div>

                    <div className="w-full lg:flex lg:items-center lg:gap-10">
                        {/* Image */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Profile Avatar</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <img src={image} alt="Avatar" className="w-20 h-20 rounded-full"></img>
                                {isEditable &&
                                    <input
                                        name="avatar"
                                        type="file"
                                        className="file-input file-input-bordered border-primary file:bg-primary file:hover:bg-secondary file:border-none file:text-white w-full md:flex-auto"
                                        onChange={handleImageChange}
                                    />
                                }
                            </div>
                        </div>

                        {/* Blood Group */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Blood Group</span>
                            </label>
                            {isEditable ?
                                <select
                                    name="blood"
                                    className="select border-primary"
                                    defaultValue={userData?.bloodGroup}>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                                :
                                <input
                                    type="text"
                                    defaultValue={userData?.bloodGroup}
                                    className={`input input-bordered border-primary`}
                                    readOnly />
                            }
                        </div>
                    </div>

                    {/* District and Upazila */}
                    <div className="w-full md:flex md:gap-4 lg:gap-10">
                        {/* District */}
                        <div className="form-control md:flex-auto md:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">District</span>
                            </label>
                            {isEditable ?
                                <select
                                    name="district"
                                    className="select border-primary"
                                    onBlur={handleDistrictChange}
                                    defaultValue={userData?.district}>
                                    {
                                        districts.map((district) => (
                                            <option key={district._id} value={district.name}>{district.name}</option>
                                        ))
                                    }
                                </select>
                                :
                                <input
                                    type="text"
                                    defaultValue={userData?.district}
                                    className={`input input-bordered border-primary`}
                                    readOnly />
                            }
                        </div>

                        {/* Upazila */}
                        <div className="form-control md:flex-auto md:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Upazila</span>
                            </label>
                            {isEditable ?
                                <select
                                    name="upazila"
                                    className="select border-primary"
                                    defaultValue={userData?.upazila}>
                                    {
                                        upazilas.map((upazila) => (
                                            <option key={upazila._id} value={upazila.name}>
                                                {upazila.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                :
                                <input
                                    type="text"
                                    defaultValue={userData?.upazila}
                                    className={`input input-bordered border-primary`}
                                    readOnly />
                            }
                        </div>
                    </div>

                    {/* Submit Button */}
                    {
                        isEditable &&
                        < div className="mt-4 self-end flex gap-2">
                            <button 
                                type="submit"
                                className="btn bg-primary border-none text-white hover:bg-font_quaternary text-base uppercase px-10"
                            >
                                {
                                    loading
                                        ? <span className="loading loading-spinner loading-xs text-white"></span>
                                        : "Save"
                                }
                            </button>
                            <button onClick={() => setIsEditable(false)} className="btn bg-font_secondary border-none text-white hover:bg-font_quaternary text-base uppercase px-7">Cancel</button>
                        </div>
                    }
                </form>
            </div >
        </div >
    );
};

export default Profile;