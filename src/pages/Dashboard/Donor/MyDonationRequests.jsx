import { Helmet } from "react-helmet-async";
import useMyDonationRequests from "../../../hooks/useMyDonationRequests";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading";
import { FaEye, FaCheckSquare, FaEdit } from "react-icons/fa";
import { MdCancel, MdDelete } from "react-icons/md";
import { useEffect } from "react";

const MyDonationRequests = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        donationRequests,
        refetch,
        totalRequests,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        isLoading,
        handleStatusUpdate,
        modernDelete
    } = useMyDonationRequests(user?.email);

    useEffect(() => {
        refetch();
    }, [statusFilter, currentPage]);

    const totalPages = Math.ceil((totalRequests?.count || 0) / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | My Donation Requests</title>
            </Helmet>

            <div className="flex items-center justify-between mb-5 lg:mb-8 mt-2 md:mt-4 mx-2 md:mx-4 lg:mx-8">
                <h2 className="text-2xl md:text-[26px] lg:text-3xl font-bold text-primary">My Donation Requests</h2>
                {/* Filter Dropdown */}
                <div className="flex items-center gap-2">
                    <label className="label">
                        <span className="label-text lg:text-base font-medium">Filter by Status:</span>
                    </label>
                    <select
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="select border-primary"
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>

            <div className="p-2 pr-0 md:p-4 lg:px-8 overflow-x-scroll">
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
                        {donationRequests.map((request) => (
                            <tr key={request._id} className="border border-primary font-nunito font-medium">
                                <td className={`px-4 py-2 text-center`}>{request.recipientName}</td>
                                <td className={`px-4 py-2 text-center`}>
                                    {request.recipientUpazila}, {request.recipientDistrict}
                                </td>
                                <td className={`px-4 py-2 text-center`}>{new Date(request.donationDate).toLocaleString('en-Gb').slice(0, 10)}</td>
                                <td className={`px-4 py-2 text-center`}>{request.donationTime}</td>
                                <td className={`px-4 py-2 text-center`}>{request.recipientBloodGroup}</td>
                                <td className={`px-4 py-2 text-center 
                                    ${request.donationStatus === "canceled" && "text-red-500"} 
                                    ${request.donationStatus === "done" && "text-green-500"} 
                                    ${request.donationStatus === "inprogress" && "text-[#3f00e7]"} 
                                    ${request.donationStatus === "pending" && "text-yellow-500"}`}>
                                    {request.donationStatus}
                                </td>
                                <td className={`px-4 py-2 text-center`}>
                                    {request.donationStatus === 'inprogress' &&
                                        `${request.donorName}, ${request.donorEmail}`}
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
                                        className="btn btn-ghost p-0 px-1 hover:bg-transparent text-neutral"
                                        onClick={() => navigate(`/dashboard/update-donation-request/${request._id}`)}
                                    >
                                        <FaEdit size={20} />
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
                    isLoading &&
                    <Loading></Loading>
                }
            </div>
            {/* Pagination */}
            {pages.length > 0 ? (
                <div className="mt-4 flex justify-center space-x-2">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border rounded transition text-base ${currentPage === page ? "bg-primary text-white font-medium" : "bg-font_tertiary hover:bg-secondary hover:text-white"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">You have no donation request</p>
            )}
        </div>
    );
};

export default MyDonationRequests;