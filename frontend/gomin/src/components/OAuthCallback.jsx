import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { socialLogin } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      const provider = location.pathname.split("/")[2];

      console.log(`Provider: ${provider}, Code: ${code}`);

      if (code) {
        dispatch(socialLogin({ provider, code }))
          .then(() => {
            navigate("/home"); // 로그인 후 홈으로 이동
          })
          .catch((error) => {
            console.error("소셜 로그인 실패:", error);
          });
      }
      isFirstRender.current = false;
    }
  }, [dispatch, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;
