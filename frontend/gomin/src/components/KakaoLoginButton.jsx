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
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        color: "#000",
        fontWeight: "bold",
      }}
    >
      카카오 로그인
    </button>
  );
};

export default KakaoLoginButton;
