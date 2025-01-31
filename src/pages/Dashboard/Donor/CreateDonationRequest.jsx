import Swal from "sweetalert2";
import useAddressLocation from "../../../hooks/useAddressLocation";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import Loading from "../../Loading";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const CreateDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [, userData] = useRole();
    const { districts, upazilas, fetchUpazilas } = useAddressLocation();
    const [isLoading, setIsLoading] = useState(false);

    const handleDistrictChange = (event) => {
        const districtName = event.target.value;
        fetchUpazilas(districtName);
    };

    const handleRequest = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const form = new FormData(e.target);
        const newDonationRequest = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: form.get("recipientName"),
            recipientDistrict: form.get("recipientDistrict"),
            recipientUpazila: form.get("recipientUpazila"),
            hospitalName: form.get("hospitalName"),
            fullAddress: form.get("address"),
            recipientBloodGroup: form.get("recipientBlood"),
            donationDate: form.get("donationDate"),
            donationTime: form.get("donationTime"),
            requestMessage: form.get("message"),
        };

        try {
            const { data } = await axiosSecure.post('/donation-requests', newDonationRequest);
            if (data.insertedId) {
                setIsLoading(false);
                Swal.fire({
                    title: "Success",
                    text: "Donation request created successfully!",
                    icon: "success",
                    timer: 2000,
                    willClose: () => {
                        e.target.reset();
                    },
                });
            };
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to create donation request.",
                icon: "error",
            });
            console.error(error);
            setIsLoading(false);
        }
    };

    if (loading) return <Loading />
    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Create Donation Request</title>
            </Helmet>
            <div className={`card w-full shrink-0`}>
                <form onSubmit={handleRequest} className="card-body p-2 md:p-4 lg:px-10">
                    <h2 className="text-2xl md:text-[26px] lg:text-3xl font-bold text-primary mb-2">Create Donation Request</h2>

                    <div className="w-full lg:flex lg:gap-10">
                        {/* Requester Name */}
                        <div className="form-control lg:flex-auto">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Requester Name</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                className={`input input-bordered border-primary`}
                                readOnly />
                        </div>

                        {/* Requester Email */}
                        <div className="form-control lg:flex-auto">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Requester Email Address</span>
                            </label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                className={`input input-bordered border-primary`}
                                readOnly />
                        </div>
                    </div>

                    <div className="w-full lg:flex lg:items-center lg:gap-10">
                        {/* Recipient Name */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Recipient Name</span>
                            </label>
                            <input name="recipientName" type="text" placeholder="Enter recipient name" className={`input input-bordered border-primary`} required />
                        </div>

                        {/* Recipient Blood Group */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Recipient Blood Group</span>
                            </label>
                            <select
                                name="recipientBlood"
                                className="select border-primary"
                                required
                                defaultValue="">
                                <option value="" disabled>Select recipient blood group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group, index) => (
                                    <option key={index} value={group}>{group}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="w-full md:flex md:gap-4 lg:gap-10">
                        {/* Recipient District */}
                        <div className="form-control md:flex-auto md:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Recipient District</span>
                            </label>
                            <select
                                name="recipientDistrict"
                                className="select border-primary"
                                onChange={handleDistrictChange}
                                required
                                defaultValue="">
                                <option value="" disabled>Select recipient district</option>
                                {districts.map((district) => (
                                    <option key={district._id} value={district.name}>{district.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Recipient Upazila */}
                        <div className="form-control md:flex-auto md:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Recipient Upazila</span>
                            </label>
                            <select
                                name="recipientUpazila"
                                className="select border-primary"
                                required
                                defaultValue="">
                                <option value="" disabled>Select recipient upazila</option>
                                {upazilas.map((upazila) => (
                                    <option key={upazila._id} value={upazila.name}>
                                        {upazila.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="w-full lg:flex lg:items-center lg:gap-10">
                        {/* Hospital Name */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Hospital Name</span>
                            </label>
                            <input name="hospitalName" type="text" placeholder="e.g., Dhaka Medical College Hospital" className={`input input-bordered border-primary`} required />
                        </div>

                        {/* Full Address */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Full Address</span>
                            </label>
                            <input name="address" type="text" placeholder="e.g., Zahir Raihan Rd, Dhaka" className={`input input-bordered border-primary`} required />
                        </div>
                    </div>

                    <div className="w-full md:flex md:gap-4 lg:gap-10">
                        {/* Donation Date */}
                        <div className="form-control md:flex-auto md:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Donation Date</span>
                            </label>
                            <input
                                type="date"
                                name="donationDate"
                                className={`input input-bordered border-primary`}
                                required
                            />
                        </div>

                        {/* Donation Time */}
                        <div className="form-control md:flex-auto md:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Donation Time</span>
                            </label>
                            <input
                                type="time"
                                name="donationTime"
                                className={`input input-bordered border-primary`}
                                required
                            />
                        </div>
                    </div>

                    {/* Request Message */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text lg:text-base font-medium">Request Message</span>
                        </label>
                        <textarea name="message" placeholder="Please explain why blood is needed in detail." className={`textarea border-primary`} required />
                    </div>

                    {/* Request Button */}
                    <button
                        type="submit"
                        className="btn bg-primary border-none text-white hover:bg-font_quaternary text-base uppercase px-10 mt-4"
                        disabled={userData?.status === "blocked"}
                    >
                        {
                            isLoading
                                ? <span className="loading loading-spinner loading-xs text-white"></span>
                                : "Request"
                        }
                    </button>
                    {
                        userData?.status === "blocked" &&
                        <p className="text-base lg:text-lg font-semibold font-nunito text-red-700 lg:mt-2">Your account has been temporarily blocked. Please contact support for assistance. Only active users can create donation requests.</p>
                    }
                </form>
            </div >
        </div>
    );
};

export default CreateDonationRequest;