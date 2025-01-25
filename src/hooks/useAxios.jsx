import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;