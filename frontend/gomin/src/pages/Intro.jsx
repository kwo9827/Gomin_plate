import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";
import introImage from "../assets/intro.webp";

const Intro = () => {
  return (
    <div 
      style={{
        backgroundImage: `url(${introImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <div 
        style={{
          position: "absolute",
          bottom: "33%",
          left: "50%",
          transform: "translateX(80%)", // 이 부분을 추가하여 가로 중앙 정렬
        }}
      >
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Intro;
