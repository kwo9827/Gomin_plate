import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";
import GoogleLoginButton from '../components/GoogleLoginButton'
import introImage from "../assets/intro.webp";

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
      <KakaoLoginButton />
      <GoogleLoginButton />
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
    height: "100%",
    scale: "1.1",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
};

export default Intro;
