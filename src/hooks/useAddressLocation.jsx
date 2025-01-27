import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useAddressLocation = () => {
    const axiosPublic = useAxios();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    // Fetch districts
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const { data } = await axiosPublic(`/districts`);
                setDistricts(data);
            } catch (err) {
                console.error("Error fetching districts:", err);
            }
        };
        fetchDistricts();
    }, []);

    // Fetch upazilas based on district selection
    const fetchUpazilas = async (districtName) => {
        if (!districtName) {
            setUpazilas([]);
            return;
        }
        try {
            const { data } = await axiosPublic(`/upazilas/${districtName}`);
            setUpazilas(data[0]?.upazilas || []);
        } catch (err) {
            console.error("Error fetching upazilas:", err);
        }
    };

    return { districts, upazilas, fetchUpazilas };
};

export default useAddressLocation;