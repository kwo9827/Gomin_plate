import axios from "axios";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  /**테스트할때 주석하기 */
  //   const token = useSelector((state) => state.member?.accessToken || "");

  // if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  // } else {
  //     config.headers.Authorization = `Bearer test`;
  // }

  /**테스트할때 주석하기 */
  // config.headers.Authorization = `Bearer ${token}`;

  /**테스트할때 주석풀기 */
  config.headers.Authorization = `Bearer test`;

  return config;
});

export default api;
