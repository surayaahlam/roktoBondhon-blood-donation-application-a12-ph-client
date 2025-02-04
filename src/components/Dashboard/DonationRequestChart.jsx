import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonationRequestsChart = () => {
    const axiosSecure = useAxiosSecure();
    const [timeframe, setTimeframe] = useState("daily");

    const { data: chart = {}, isLoading } = useQuery({
        queryKey: ["chart"],
        queryFn: async () => {
            const res = await axiosSecure.get("/chart");
            return res.data;
        }
    });

    const chartData = chart[`${timeframe}Requests`] || [];

    return (
        <div className="p-6 bg-white rounded-xl shadow-md border">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Donation Requests Overview</h2>

                <select
                    className="select border-primary"
                    onChange={(e) => setTimeframe(e.target.value)}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            {isLoading ? (
                <p>Loading chart...</p>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="rgb(239, 161, 160)" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default DonationRequestsChart;
