import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";
import introImage from "../assets/introoooo.webp";

const Intro = () => {
  return (
    <div style={styles.backgroundContainer}>
      <div
        style={{
          ...styles.backgroundLayer,
          backgroundImage: `url("${introImage}")`,
          zIndex: 1,
          transform: "translateX(0) translateY(3%)",
        }}
      ></div>
      <div style={styles.buttoncontainer}>
        <h2 style={{ marginBottom: "1vh", fontSize: "4.5vh" }}>로그인</h2>
        <KakaoLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

const styles = {
  backgroundContainer: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "105vh",
    scale: "1.1",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  buttoncontainer: {
    position: "absolute",
    zIndex: 2,
    color: "#fff",
    right: "12vh",
    bottom: "35vh",
  },
};

export default Intro;
