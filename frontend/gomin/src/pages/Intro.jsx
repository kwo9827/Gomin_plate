import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";

/** 서비스에 접근하면 제일 먼저 나타나는 인트로 화면 */
const Intro = () => {
  return (
    <div>
      인트로 페이지
      <KakaoLoginButton />
    </div>
  );
};

export default Intro;
