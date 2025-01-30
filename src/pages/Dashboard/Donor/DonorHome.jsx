import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { FaEye, FaCheckSquare, FaLongArrowAltRight } from "react-icons/fa";
import { MdCancel, MdDelete, MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import useMyDonationRequests from "../../../hooks/useMyDonationRequests";


const DonorHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { recentDonationRequests, isRecentLoading, handleStatusUpdate, modernDelete } = useMyDonationRequests(user?.email)

    
    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Dashboard</title>
            </Helmet>
            <div className="mt-2 mb-8 lg:mb-12 flex flex-col justify-center lg:items-center px-2 md:px-4 lg:px-0">
                <h2 className="text-3xl lg:text-5xl font-extrabold text-primary mb-2 lg:text-center">Welcome {user?.displayName} !</h2>
                <p className="text-base lg:text-lg font-semibold font-nunito lg:text-center">Manage your donation requests and make a difference.</p>
            </div>

            <h2 className="text-2xl text-font_primary font-semibold mb-2 lg:text-center ml-2 md:ml-4 lg:ml-0">Recent Donation Request</h2>
            <div className="pl-2 md:pl-4 lg:px-8 overflow-x-scroll">
                <table className="table-auto min-w-full border-collapse border border-primary">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className={`px-4 py-2`}>Recipient Name</th>
                            <th className={`px-4 py-2`}>Location</th>
                            <th className={`px-4 py-2`}>Date</th>
                            <th className={`px-4 py-2`}>Time</th>
                            <th className={`px-4 py-2`}>Blood Group</th>
                            <th className={`px-4 py-2`}>Status</th>
                            <th className={`px-4 py-2`}>Donor Info</th>
                            <th className={`px-4 py-2`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentDonationRequests.map((request) => (
                            <tr key={request._id} className="border border-primary font-nunito font-medium">
                                <td className={`px-4 py-2 text-center`}>{request.recipientName}</td>
                                <td className={`px-4 py-2 text-center`}>
                                    {request.recipientDistrict}, {request.recipientUpazila}
                                </td>
                                <td className={`px-4 py-2 text-center`}>{new Date(request.donationDate).toLocaleString('en-Gb').slice(0, 10)}</td>
                                <td className={`px-4 py-2 text-center`}>{request.donationTime}</td>
                                <td className={`px-4 py-2 text-center`}>{request.recipientBloodGroup}</td>
                                <td className={`px-4 py-2 text-center`}>{request.donationStatus}</td>
                                <td className={`px-4 py-2 text-center`}>
                                    {request.donationStatus === 'inprogress' &&
                                        `${request.requesterName}, ${request.requesterEmail}`}
                                </td>
                                <td className={`px-4 py-2 text-center flex items-center justify-center`}>
                                    {request.donationStatus === 'inprogress' && (
                                        <>
                                            <button title="Done"
                                                className="btn btn-ghost p-0 px-1 hover:bg-transparent text-success"
                                                onClick={() => handleStatusUpdate(request._id, 'done')}
                                            >
                                                <FaCheckSquare size={20} />
                                            </button>
                                            <button title="Cancel"
                                                className="btn btn-ghost p-0 px-1 hover:bg-transparent text-error"
                                                onClick={() => handleStatusUpdate(request._id, 'canceled')}
                                            >
                                                <MdCancel size={20} />
                                            </button>
                                        </>
                                    )}
                                    <button title="Edit"
                                        className="btn btn-ghost p-0 px-1 hover:bg-transparent text-[#3f00e7]"
                                        onClick={() => navigate(`/dashboard/update-donation-request/${request._id}`)}
                                    >
                                        <MdEditSquare size={20} />
                                    </button>
                                    <button title="Delete"
                                        className="btn btn-ghost p-0 px-1 hover:bg-transparent text-warning"
                                        onClick={() => modernDelete(request._id)}
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                    <button title="View"
                                        className="btn btn-ghost p-0 px-1 hover:bg-transparent text-info"
                                        onClick={() => navigate(`/donation-request-details/${request._id}`)}
                                    >
                                        <FaEye size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    isRecentLoading &&
                    <Loading></Loading>
                }
            </div>
            <div className="mt-4 flex items-center ml-2 md:ml-4 lg:ml-8">
                <button
                    onClick={() => navigate(`/dashboard/my-donation-requests`)}
                    className="btn bg-primary border-none text-white hover:bg-secondary text-sm uppercase px-7">
                    View All My Request
                    <FaLongArrowAltRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default DonorHome;