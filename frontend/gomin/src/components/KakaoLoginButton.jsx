import React from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../store/slices/authSlice";

const KakaoLoginButton = () => {
  const dispatch = useDispatch();

  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = "https://www.gomin.my/oauth/kakao/callback"; // 리다이렉트 URI

    // URL에서 redirectUrl 파라미터 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = searchParams.get("redirectUrl");

    // state 파라미터에 redirectUrl 포함
    const state = redirectUrl || "";

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = kakaoAuthUrl;

    // 기존 전달 코드
    // dispatch(kakaoLogin({ clientId, redirectUri }));
  };

  return (
    <button
      onClick={handleKakaoLogin}
      style={{
        position: "absolute",
        left: "calc(50% - 5vh)", // 잠시 왼쪽으로
        background: "#FEE500",
        height: "7vh", // 화면 세로 크기에 비례하도록 설정
        width: "7vh", // 가로 크기도 세로와 동일하게 설정
        border: "none",
        borderRadius: "50%", // 원형으로 만들기
        color: "#000",
        fontWeight: "bold",
        fontSize: "3vh", // 반응형 폰트 크기
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: "2",
      }}
    >
      K
    </button>
  );
};

export default KakaoLoginButton;
