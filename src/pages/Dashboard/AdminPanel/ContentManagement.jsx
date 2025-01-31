import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../Loading";
import useRole from "../../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineLibraryAdd, MdDelete, MdUnpublished, MdCheckCircle } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const ContentManagement = () => {
    const [role] = useRole();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["view-blogs", currentPage, statusFilter],
        queryFn: async () => {
            const res = await axiosSecure(`/view-blogs?page=${currentPage}&limit=${itemsPerPage}&status=${statusFilter}`);
            return res.data;
        }
    });

    const blogs = data?.blogs || [];
    const totalBlogs = data?.totalBlogs || 0;
    const totalPages = Math.ceil((totalBlogs || 0) / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Handle blog status 
    const handleStatusChange = async (id, status) => {
        try {
            await axiosSecure.patch(`/update-blog-status/${id}?status=${status}`);
            await refetch();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Handle donation request deletion
    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/blog/${id}`);
            await refetch();
            toast.success("Blog deleted successfully!", {
                position: "top-right",
            });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.message || "Failed to delete blog.", {
                position: "top-center",
            });
        }
    };

    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Content Management</title>
            </Helmet>

            <div className="flex items-center justify-between mb-5 lg:mb-8 mt-2 md:mt-4 mx-2 md:mx-4 lg:mx-8">
                <h2 className="text-2xl md:text-[26px] lg:text-3xl font-bold text-primary">Content Management</h2>
                {/* Add Blog Button */}
                <div>
                    <button
                        title="Add Blog"
                        onClick={() => navigate(`/dashboard/content-management/add-blog`)}
                        className="btn btn-ghost hover:bg-transparent text-primary">
                        <MdOutlineLibraryAdd size={27}></MdOutlineLibraryAdd>
                    </button>
                </div>
            </div>

            {/* Filter Dropdown */}
            <div className="flex lg:justify-end mx-2 md:mx-4 lg:mx-8">
                <div className="flex items-center gap-2">
                    <label className="label">
                        <span className="label-text lg:text-base font-medium">Filter by Status:</span>
                    </label>
                    <select
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="select border-primary"
                    >
                        <option value="">All</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="p-2 pr-0 md:p-4 lg:px-8 overflow-x-scroll">
                <table className="table-auto min-w-full border-collapse border border-primary">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className={`px-4 py-2`}>Title</th>
                            <th className={`px-4 py-2`}>Status</th>
                            <th className={`px-4 py-2`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr className="border border-primary font-nunito font-medium" key={blog._id}>
                                <td className={`px-4 py-2`}>{blog.title}</td>
                                <td className={`px-4 py-2 text-center ${blog.status === "draft" ? "text-yellow-500" : "text-green-500"}`}>{blog.status}</td>
                                <td className={`px-4 py-2 text-center flex items-center justify-center`}>
                                    {role === "Admin" && (
                                        <>
                                            {blog.status === "draft" ? (
                                                <button
                                                    title="Publish"
                                                    className="btn btn-ghost p-0 px-1 hover:bg-transparent text-success"
                                                    onClick={() => handleStatusChange(blog._id, "published")}
                                                >
                                                    <MdCheckCircle size={20}></MdCheckCircle>
                                                </button>
                                            ) : (
                                                <button
                                                    title="Un Publish"
                                                    className="btn btn-ghost p-0 px-1 hover:bg-transparent text-warning"
                                                    onClick={() => handleStatusChange(blog._id, "draft")}
                                                >
                                                    <MdUnpublished size={20}></MdUnpublished>
                                                </button>
                                            )}
                                            <button
                                                title="Delete"
                                                onClick={() => handleDelete(blog._id)}
                                                className="btn btn-ghost p-0 px-1 hover:bg-transparent text-error"
                                            >
                                                <MdDelete size={20}></MdDelete>
                                            </button>
                                        </>
                                    )}
                                    <button
                                        title="View"
                                        onClick={() => navigate(`/dashboard/content-management/view-blog/${blog._id}`)}
                                        className="btn btn-ghost p-0 px-1 hover:bg-transparent text-info"
                                    >
                                        <FaEye size={20}></FaEye>
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
                <p className="text-center text-gray-500">No blogs available</p>
            )}
        </div>
    );
};

export default ContentManagement;