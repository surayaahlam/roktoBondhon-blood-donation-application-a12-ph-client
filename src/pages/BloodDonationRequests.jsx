import { useNavigate } from "react-router-dom";
import Heading from "../components/shared/Heading";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import { Helmet } from "react-helmet-async";

const BloodDonationRequests = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxios();

    const { data: donationRequests = [], isLoading } = useQuery({
        queryKey: ["pending-donation-requests"],
        queryFn: async () => {
            const res = await axiosPublic('/pending-donation-requests');
            return res.data;
        }
    });

    if (isLoading) return <Loading></Loading>

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Donation Requests</title>
            </Helmet>
            <div className="w-10/12 md:w-11/12 lg:w-9/12 mx-auto">
                <Heading title="Blood Donation Requests" />

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {donationRequests.map(request => (
                        <div key={request._id} className="flex flex-col gap-2 text-center card p-6 bg-[#ffeeee] shadow-md border rounded-xl ">
                            <h2 className="text-3xl font-bold text-primary">{request.recipientName}</h2>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Location:</strong> {request.recipientUpazila}, {request.recipientDistrict}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Blood Group:</strong> {request.recipientBloodGroup}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Date:</strong> {new Date(request.donationDate).toLocaleString('en-Gb').slice(0, 10)}</p>
                            <p className="font-nunito text-base text-font_secondary"><strong className="font-roboto text-font_primary">Time:</strong> {request.donationTime}</p>
                            <div>
                                <button
                                    onClick={() => navigate(`/donation-request-details/${request._id}`)}
                                    className="btn bg-primary border-none text-white hover:bg-secondary text-sm uppercase px-10 mt-2">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BloodDonationRequests;