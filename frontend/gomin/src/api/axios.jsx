import axios from 'axios';
import { useSelector } from 'react-redux';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = useSelector((state) => state.member.accessToken);

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default api;