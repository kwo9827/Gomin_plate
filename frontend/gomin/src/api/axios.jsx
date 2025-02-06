import axios from "axios";
import { store } from "../store"; // store import 경로 확인 필요

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = store.getState().member?.accessToken; // Redux store에서 직접 가져오기

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
