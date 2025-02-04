import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const Funding = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data, isLoading } = useQuery({
        queryKey: ["funds", currentPage],
        queryFn: async () => {
            const res = await axiosSecure(`/funds?page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        }
    });

    const funds = data?.funds || [];
    const totalContributions = data?.totalContributions || 0;
    const totalPages = Math.ceil(totalContributions / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Funding Page</title>
            </Helmet>
            <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
                <Heading subtitle="Funding" title="Fundraising Contributions Overview" />
                <div className="text-right">
                    <button onClick={() => navigate("/give-fund")} className="btn bg-primary border-none text-white hover:bg-secondary text-sm uppercase px-7">Give Fund</button>
                </div>

                <div className="overflow-x-scroll lg:overflow-hidden mt-5">
                <table className="table-auto min-w-full border-collapse border border-primary">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className={`px-4 py-2`}>Name</th>
                            <th className={`px-4 py-2`}>Fund Amount</th>
                            <th className={`px-4 py-2`}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.map((fund) => (
                            <tr key={fund._id} className="border border-primary font-nunito font-semibold">
                                <td className={`px-4 py-2 text-center`}>{fund.name}</td>
                                <td className={`px-4 py-2 text-center`}>${fund.fundAmount}</td>
                                <td className={`px-4 py-2 text-center`}>{new Date(fund.fundingDate).toLocaleString('en-Gb').slice(0, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    isLoading &&
                    <Loading></Loading>
                }
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
        </div>
    );
};

export default Funding;