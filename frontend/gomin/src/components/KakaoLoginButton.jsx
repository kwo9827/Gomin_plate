import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../store/slices/authSlice";

const KakaoLoginButton = () => {
  const dispatch = useDispatch();

  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = "https://www.gomin.my/oauth/kakao/callback"; // 리다이렉트 URI
    dispatch(kakaoLogin({ clientId, redirectUri }));
  };

  return (
    <button
      onClick={handleKakaoLogin}
      style={{
        background: "#FEE500",
        height: "5vh",  // 화면 세로 크기에 비례하도록 설정
        width: "5vh",   // 가로 크기도 세로와 동일하게 설정
        maxWidth: "60px", // 최대 크기 제한
        maxHeight: "60px", 
        minWidth: "40px", // 최소 크기 제한
        minHeight: "40px", 
        border: "none",
        borderRadius: "50%", // 원형으로 만들기
        color: "#000",
        fontWeight: "bold",
        fontSize: "1rem",  // 반응형 폰트 크기
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      K
    </button>
  );
};

export default KakaoLoginButton;
