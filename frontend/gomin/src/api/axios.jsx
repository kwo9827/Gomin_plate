import axios from 'axios';
import { useSelector } from 'react-redux';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {

    // const token = useSelector((state) => state.member?.accessToken || "");

    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // } else {
    //     config.headers.Authorization = `Bearer test`;
    // }

    config.headers.Authorization = `Bearer test`;

    return config;
});

export default api;