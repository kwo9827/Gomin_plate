import axios from "axios";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
    console.log("들어온거확인인");
    const token = useSelector((state) => state.member.accessToken);

    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // } else {
    //     config.headers.Authorization = `Bearer test`;
    // }
    console.log("동작확인");
    console.log("axios 파일에서의 토큰 찍기 : ", token);

    config.headers.Authorization = `Bearer ${token}`;
    console.log("헤더1 : ", config.headers.Authorization);

    config.headers.Authorization = `Bearer test`;
    console.log("헤더2 : ", config.headers.Authorization);

    return config;
});

export default api;
