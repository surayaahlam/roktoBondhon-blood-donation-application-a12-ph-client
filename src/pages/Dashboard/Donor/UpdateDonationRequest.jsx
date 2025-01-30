import { Helmet } from "react-helmet-async";
import useAddressLocation from "../../../hooks/useAddressLocation";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Loading";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateDonationRequest = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { districts, upazilas, fetchUpazilas } = useAddressLocation();
    const [loading, setLoading] = useState(false);

    const handleDistrictChange = (event) => {
        const districtName = event.target.value;
        fetchUpazilas(districtName);
    };

    const { data: donationRequest, isLoading, refetch } = useQuery({
        queryKey: ['donation-request', id],
        enabled: !!id,
        queryFn: async () => {
            const response = await axiosSecure.get(`/donation-request/${id}`);
            return response.data;
        }
    });

    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(" "); // Split time and AM/PM
        let [hours, minutes] = time.split(":"); // Split hours and minutes

        if (modifier === "PM" && hours !== "12") {
            hours = String(Number(hours) + 12);
        } else if (modifier === "AM" && hours === "12") {
            hours = "00";
        }

        return `${hours.padStart(2, "0")}:${minutes}`; // Ensure two-digit hours
    };

    const handleUpdate = async e => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData(e.target);
        const updateDonationRequest = {
            recipientName: form.get("recipientName"),
            recipientDistrict: form.get("recipientDistrict") || donationRequest?.recipientDistrict,
            recipientUpazila: form.get("recipientUpazila") || donationRequest?.recipientUpazila,
            hospitalName: form.get("hospitalName"),
            fullAddress: form.get("address"),
            recipientBloodGroup: form.get("recipientBlood") || donationRequest?.recipientBloodGroup,
            donationDate: form.get("donationDate"),
            donationTime: form.get("donationTime"),
            requestMessage: form.get("message"),
        };

        try {
            const { data } = await axiosSecure.patch(`/updateDonationRequest/${id}`,
                updateDonationRequest
            );
            await refetch();
            toast.success("Donation Request updated successfully!", {
                position: "top-right",
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to update donation request.", {
                position: "top-right"
            }
            );
        }
        setLoading(false);
    };

    if (isLoading) return <Loading />
    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Update Donation Request</title>
            </Helmet>
            <div className={`card w-full shrink-0`}>
                <form onSubmit={handleUpdate} className="card-body p-2 md:p-4 lg:px-10">
                    <h2 className="text-2xl md:text-[26px] lg:text-3xl font-bold text-primary mb-2">Update Donation Request</h2>

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
                            <input
                                name="recipientName"
                                type="text"
                                defaultValue={donationRequest?.recipientName}
                                placeholder="Enter recipient name"
                                className={`input input-bordered border-primary`} />
                        </div>

                        {/* Recipient Blood Group */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Recipient Blood Group</span>
                            </label>
                            <select
                                name="recipientBlood"
                                className="select border-primary"
                                defaultValue={donationRequest?.recipientBloodGroup}>
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
                                value={donationRequest?.recipientDistrict || ""}
                            >
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
                                defaultValue={donationRequest?.recipientUpazila || ""}>
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
                            <input
                                name="hospitalName"
                                type="text"
                                defaultValue={donationRequest?.hospitalName}
                                placeholder="e.g., Dhaka Medical College Hospital"
                                className={`input input-bordered border-primary`} />
                        </div>

                        {/* Full Address */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Full Address</span>
                            </label>
                            <input
                                name="address"
                                type="text"
                                defaultValue={donationRequest?.fullAddress}
                                placeholder="e.g., Zahir Raihan Rd, Dhaka"
                                className={`input input-bordered border-primary`} />
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
                                defaultValue={donationRequest?.donationDate}
                                className={`input input-bordered border-primary`}
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
                                defaultValue={donationRequest?.donationTime && convertTo24Hour(donationRequest.donationTime)}
                                className={`input input-bordered border-primary`}
                            />
                        </div>
                    </div>

                    {/* Request Message */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text lg:text-base font-medium">Request Message</span>
                        </label>
                        <textarea
                            name="message"
                            placeholder="Please explain why blood is needed in detail."
                            defaultValue={donationRequest?.requestMessage}
                            className={`textarea border-primary`} />
                    </div>

                    {/* Request Button */}
                    <button
                        type="submit"
                        className="btn bg-primary border-none text-white hover:bg-font_quaternary text-base uppercase px-10 mt-4"
                    >
                        {
                            loading
                                ? <span className="loading loading-spinner loading-xs text-white"></span>
                                : "Update"
                        }
                    </button>
                </form>
            </div >
        </div>
    );
};

export default UpdateDonationRequest;