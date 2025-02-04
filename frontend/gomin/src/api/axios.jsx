import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // 환경 변수 적용
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    // if (token) {
    //     // config.headers.Authorization = `Bearer ${token}`;
    //     config.headers.Authorization = `Bearer test`;
    // }

    config.headers.Authorization = `Bearer test`;

    return config;
});

export default api;