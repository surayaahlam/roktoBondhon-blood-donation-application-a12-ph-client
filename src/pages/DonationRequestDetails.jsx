import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "./Loading";

const DonationRequestDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: donationRequest = {}, isLoading, refetch } = useQuery({
        queryKey: ['pending-donation-request', id],
        enabled: !!id,
        queryFn: async () => {
            const response = await axiosSecure.get(`/pending-donation-request/${id}`);
            return response.data;
        }
    });

    const handleDonate = async (e) => {
        e.preventDefault();
        const donorInfo = {
            donorName: user?.displayName,
            donorEmail: user?.email
        };
        await axiosSecure.put(`/donation-request-inprogress/${id}`,
            donorInfo
        );
        await refetch()
        toast.success("Your Donation Confirmed", {
            position: "top-center",
        });
    };

    if(isLoading) return <Loading></Loading>

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Donation Request Details</title>
            </Helmet>
            <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto">
                <Heading title="Donation Request Details" />
                <div className="card lg:card-side p-6 md:p-8 shadow-xl bg-[#ffeeee] gap-5">
                    <div className="lg:w-1/2">
                        <div className="flex flex-col justify-center gap-4 md:text-center lg:text-left">
                            <h2 className="text-3xl lg:text-[33px] font-bold text-primary">{donationRequest.recipientName}</h2>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Hospital Name:</strong> {donationRequest.hospitalName}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Address:</strong> {donationRequest.fullAddress}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Location:</strong> {donationRequest.recipientUpazila}, {donationRequest.recipientDistrict}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Blood Group:</strong> {donationRequest.recipientBloodGroup}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Date:</strong> {new Date(donationRequest.donationDate).toLocaleString('en-Gb').slice(0, 10)}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Time:</strong> {donationRequest.donationTime}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Request Message:</strong> {donationRequest.requestMessage}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Requester Name:</strong> {donationRequest.requesterName}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Requester Email:</strong> {donationRequest.requesterEmail}</p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex items-center justify-center">
                        <div className="card bg-base-100 w-full md:max-w-md shrink-0">
                            <form onSubmit={handleDonate} className="card-body p-4 md:p-8">
                                {/* Name */}
                                <div className="form-control lg:flex-auto">
                                    <label className="label">
                                        <span className="label-text lg:text-[15px] font-medium">Donor Name</span>
                                    </label>
                                    <input
                                        name="donorName"
                                        type="text"
                                        defaultValue={user?.displayName}
                                        placeholder="Enter your name"
                                        className={`input input-bordered border-primary`}
                                        readOnly />
                                </div>

                                {/* Email */}
                                <div className="form-control lg:flex-auto">
                                    <label className="label">
                                        <span className="label-text lg:text-[15px] font-medium">Donor Email Address</span>
                                    </label>
                                    <input
                                        name="donorEmail"
                                        type="email"
                                        defaultValue={user?.email}
                                        placeholder="Enter your email address"
                                        className={`input input-bordered border-primary`}
                                        readOnly />
                                </div>
                                <div className="form-control mt-6">
                                    <button
                                        type="submit"
                                        className="btn bg-primary border-none text-white hover:bg-font_quaternary text-base uppercase px-10"
                                        disabled={donationRequest.donationStatus === "inprogress"}
                                    >
                                        {
                                            donationRequest.donationStatus === "inprogress" ?
                                            "Donated" : "Donate"
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationRequestDetails;