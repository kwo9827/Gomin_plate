import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socialLogin } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log(code);
      dispatch(socialLogin({ provider: "kakao", code }))
        .then(() => {
          navigate("/"); // 로그인 후 홈으로 이동
        })
        .catch((error) => {
          console.error("소셜 로그인 실패:", error);
        });
    }
  }, [dispatch, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;
