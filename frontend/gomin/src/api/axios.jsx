import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
    // const token = useSelector((state) => state.member.accessToken);

    // config.headers.Authorization = `Bearer ${token}`;

    config.headers.Authorization = `Bearer test`;

    return config;
});

export default api;