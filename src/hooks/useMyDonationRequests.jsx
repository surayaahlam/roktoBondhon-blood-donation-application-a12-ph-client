import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";

const useMyDonationRequests = (email) => {
    const axiosSecure = useAxiosSecure();
    const [statusFilter, setStatusFilter] = useState(""); // Status filter
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of requests per page

    // Fetch all donation requests
    const { data: donationRequests = [], isLoading, refetch } = useQuery({
        queryKey: ["donation-requests", email],
        queryFn: async () => {
            const response = await axiosSecure(`/donation-requests/${email}?status=${statusFilter}&page=${currentPage}&limit=${itemsPerPage}`);
            return response.data;
        },
    });

    // Fetch total donation request count for pagination
    const { data: totalRequests = 0 } = useQuery({
        queryKey: ["donation-requests-count", email, statusFilter],
        queryFn: async () => {
            const response = await axiosSecure(`/donation-requests/count/${email}?status=${statusFilter}`);
            return response.data;
        },
    });

    // Fetch recent 3 donation requests
    const { data: recentDonationRequests = [], isLoading: isRecentLoading, refetch: refetchRecent } = useQuery({
        queryKey: ["donation-requests", email, "recent3"],
        queryFn: async () => {
            const response = await axiosSecure(`/donation-requests/${email}?recent3=true`);
            return response.data;
        },
    });

    // Handle donation status update
    const handleStatusUpdate = async (id, status) => {
        try {
            await axiosSecure.patch(`/update-donation-request-status/${id}?status=${status}`);
            await refetch();
            await refetchRecent();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Handle donation request deletion
    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/donation-request/${id}`);
            await refetch();
            await refetchRecent();
            toast.success("Your donation request deleted successfully!", {
                position: "top-right",
            });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.message || "Failed to delete donation request.", {
                position: "top-center",
            });
        }
    };

    // Modern delete confirmation with SweetAlert2
    const modernDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
            }
        });
    };

    return {
        donationRequests,
        refetch,
        totalRequests,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        recentDonationRequests,
        isLoading,
        isRecentLoading,
        handleStatusUpdate,
        modernDelete
    };
};

export default useMyDonationRequests;