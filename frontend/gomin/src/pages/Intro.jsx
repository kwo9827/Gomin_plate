import React, { useContext, useState } from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";
import introImage from "../assets/introoooo.webp";
import BgmContext from "../context/BgmProvider";

const Intro = () => {
  const { isMuted, toggleMute } = useContext(BgmContext);
  const [isHovered, setIsHovered] = useState(false);

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

      {/* 🔊 음소거 버튼 */}
      <button
        onClick={toggleMute}
        style={{
          ...styles.muteButton,
          opacity: isHovered ? 1 : 0.6,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <i className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
      </button>

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
  muteButton: { 
    position: "absolute", 
    top: "20px", 
    right: "20px", 
    zIndex: 3, 
    background: "transparent",
    color: "white", 
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    opacity: 0.6,
    transition: "opacity 0.3s",
  },
};

export default Intro;
