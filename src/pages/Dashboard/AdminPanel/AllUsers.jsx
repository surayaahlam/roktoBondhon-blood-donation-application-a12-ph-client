import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiMoreVertical } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");
    const itemsPerPage = 5;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["users", currentPage, statusFilter],
        queryFn: async () => {
            const res = await axiosSecure(`/users?page=${currentPage}&limit=${itemsPerPage}&status=${statusFilter}`);
            return res.data;
        }
    });

    const users = data?.users || [];
    const totalUsers = data?.totalUsers || 0;
    const totalPages = Math.ceil(totalUsers / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Handle User Actions
    const handleAction = async (id, action) => {
        await axiosSecure.patch(`/users/${id}`, { action });
        refetch(); // Refresh data
    };

    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | All Users</title>
            </Helmet>


            <div className="flex items-center justify-between mb-5 lg:mb-8 mt-2 md:mt-4 mx-2 md:mx-4 lg:mx-8">
                <h2 className="text-2xl md:text-[26px] lg:text-3xl font-bold text-primary">All Users</h2>
                {/* Filter Dropdown */}
                <div className="flex items-center gap-2">
                    <label className="label">
                        <span className="label-text lg:text-base font-medium">Filter by Status:</span>
                    </label>
                    <select
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="select border-primary"
                    >
                        <option value="all">All Users</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>

            <div className="p-2 pr-0 md:p-4 lg:px-8 overflow-x-scroll lg:overflow-hidden">
                <table className="table-auto min-w-full border-collapse border border-primary">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className={`px-4 py-2`}>Avatar</th>
                            <th className={`px-4 py-2`}>Email</th>
                            <th className={`px-4 py-2`}>Name</th>
                            <th className={`px-4 py-2`}>Role</th>
                            <th className={`px-4 py-2`}>Status</th>
                            <th className={`px-4 py-2`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border border-primary font-nunito font-medium">
                                <td className={`px-4 py-2 flex items-center justify-center`}>
                                    <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
                                </td>
                                <td className={`px-4 py-2 text-center`}>{user.email}</td>
                                <td className={`px-4 py-2 text-center`}>{user.name}</td>
                                <td className={`px-4 py-2 text-center`}>{user.role}</td>
                                <td className={`${user.status === "blocked" ? "text-red-500" : "text-green-500"} px-4 py-2 text-center`}>
                                    {user.status === "blocked" ? "Blocked" : "Active"}
                                </td>
                                <td className={`px-4 py-2 text-center`}>
                                    {
                                        user.role === "Admin"
                                            ? ""
                                            :
                                            (<div className="dropdown dropdown-end">
                                                <button className="btn btn-sm">
                                                    <FiMoreVertical />
                                                </button>
                                                <ul className="dropdown-content z-50 menu shadow bg-white border w-40 lg:w-44">
                                                    {user.status === "active" && (
                                                        <li>
                                                            <button
                                                                onClick={() => handleAction(user._id, "block")}
                                                                className="text-red-500 text-base"
                                                            >Block</button>
                                                        </li>
                                                    )}
                                                    {user.status === "blocked" && (
                                                        <li>
                                                            <button
                                                                onClick={() => handleAction(user._id, "unblock")} 
                                                                className="text-green-500 text-base"
                                                            >Unblock</button>
                                                        </li>
                                                    )}
                                                    {user.role === "Donor" && (
                                                        <li>
                                                            <button
                                                                onClick={() => handleAction(user._id, "makeVolunteer")} 
                                                                className="text-blue-500 text-base"
                                                            >Make Volunteer</button>
                                                        </li>
                                                    )}
                                                    {user.role !== "Admin" && (
                                                        <li>
                                                            <button
                                                                onClick={() => handleAction(user._id, "makeAdmin")} 
                                                                className="text-yellow-500 text-base"
                                                            >Make Admin</button>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>)
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {pages.length > 0 ? (
                    <div className="mt-20 flex justify-center space-x-2">
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
                    <p className="text-center text-gray-500">No Pages Available</p>
                )}
            </div>
        </div>
    );
};

export default AllUsers;