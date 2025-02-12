import axios from "axios";
import { ERROR_MESSAGES } from "../constants/errorMessages";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  // const token = useSelector((state) => state.member.accessToken);

   const token = localStorage.getItem("accessToken");
  // config.headers.Authorization = `Bearer ${token}`;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // config.headers.Authorization = `Bearer test`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 프론트엔드 단 에러
    if (!error.response) {
      alert("서버와의 연결이 끊겼습니다.");
      window.location.href = "/";
      return Promise.reject(error);
    }

    // 에러 코드에 따른 alert 발생
    const errorCode = error.response?.data?.error?.code;
    alert(ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.DEFAULT);

    const authErrors = ["A001"]; // 로그인 필요
    const oauthErrors = ["O001", "O002", "O003", "O004", "O005"];

    // 페이지 이동이 필요한 에러 (인증, 권한)
    if ([...authErrors, ...oauthErrors].includes(errorCode)) {
      console.log("문제나서 홈으로");
      window.location.href = "/";
    }
    // 홈 이동이 필요한 에러
    else if (["S003", "S004", "S005", "R001", "R005"].includes(errorCode)) {
      window.location.href = "/home";
    }

    // 단순 알림만 필요한 에러 (좋아요, 답변 관련)
    // R003(이미 좋아요 누름), R004(자신의 답변 좋아요) 등

    // 그 외 에러는 Promise.reject로 전달하여 각 컴포넌트에서 처리할 수 있도록 함
    return Promise.reject(error);
  }
);

export default api;
