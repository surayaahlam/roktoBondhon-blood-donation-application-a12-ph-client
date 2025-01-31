import { useQuery } from "@tanstack/react-query";
import Heading from "../components/shared/Heading";
import useAddressLocation from "../hooks/useAddressLocation";
import useAxios from "../hooks/useAxios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
    const axiosPublic = useAxios();
    const { districts, upazilas, fetchUpazilas } = useAddressLocation();
    const [bloodGroup, setBloodGroup] = useState("");
    const [district, setDistrict] = useState("");
    const [upazila, setUpazila] = useState("");

    const handleDistrictChange = (event) => {
        const districtName = event.target.value;
        setDistrict(districtName); // Ensure district state is updated here
        fetchUpazilas(districtName);
    };

    const { data: donors = [], isLoading, refetch } = useQuery({
        queryKey: ["donors", bloodGroup, district, upazila],
        queryFn: async () => {
            const encodedBloodGroup = encodeURIComponent(bloodGroup);
            const encodedDistrict = encodeURIComponent(district);
            const encodedUpazila = encodeURIComponent(upazila);

            const res = await axiosPublic(`/search/donors?bloodGroup=${encodedBloodGroup}&district=${encodedDistrict}&upazila=${encodedUpazila}`);
            return res.data;
        },
        enabled: false,
    });

    const handleSearch = () => {
        refetch();
    };

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Search Page</title>
            </Helmet>
            <div className="w-10/12 md:w-11/12 lg:w-9/12 mx-auto">
                <Heading subtitle="Search Page" title="Search For Blood Donors Near You" />
                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                    <div className="md:w-5/6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        <select
                            className="select border-primary"
                            defaultValue=""
                            onChange={(e) => setBloodGroup(e.target.value)}
                        >
                            <option value="" disabled>Select Blood Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>

                        <select
                            className="select border-primary"
                            defaultValue=""
                            onChange={handleDistrictChange}
                        >
                            <option value="" disabled>Select District</option>
                            {districts.map((district) => (
                                <option key={district._id} value={district.name}>{district.name}</option>
                            ))}
                        </select>

                        <select
                            className="select border-primary"
                            defaultValue=""
                            onChange={(e) => setUpazila(e.target.value)}
                        >
                            <option value="" disabled>Select Upazila</option>
                            {upazilas.map((upazila) => (
                                <option key={upazila._id} value={upazila.name}>{upazila.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="btn bg-primary border-none text-white hover:bg-secondary text-sm uppercase px-7 w-full md:w-1/6">
                        Search
                    </button>
                </div>

                {isLoading && <p className="mt-6 lg:mt-10 text-lg font-nunito text-center font-medium">Loading donors...</p>}

                {donors.length > 0 && (
                    <div className="mt-6 lg:mt-10 overflow-x-scroll lg:overflow-hidden">
                        <table className="table-auto min-w-full border-collapse border border-primary">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="px-4 py-2">Avatar</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Blood Group</th>
                                    <th className="px-4 py-2">Location</th>
                                    <th className="px-4 py-2">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donors.map((donor) => (
                                    <tr className="border border-primary font-nunito font-medium" key={donor._id}>
                                        <td className="px-4 py-2 flex items-center justify-center">
                                            <img src={donor.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
                                        </td>
                                        <td className="px-4 py-2 text-center">{donor.name}</td>
                                        <td className="px-4 py-2 text-center">{donor.bloodGroup}</td>
                                        <td className="px-4 py-2 text-center">{donor.upazila}, {donor.district}</td>
                                        <td className="px-4 py-2 text-center">{donor.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {!isLoading && donors.length === 0 && <p className="mt-6 lg:mt-10 text-base font-nunito text-center font-medium">No donors found</p>}
            </div>
        </div>
    );
};

export default SearchPage;
