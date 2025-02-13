import React, { useState, useEffect } from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";
import introImage from "../assets/introoooo.webp";
import BgmContext from "../context/BgmProvider";

// 쿠키 설정 함수
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};

// 쿠키 가져오기 함수
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// iOS 체크 함수
const isIOS = () => {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

const Intro = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallButtonVisible, setInstallButtonVisible] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // iOS 디바이스 체크
    setIsIOSDevice(isIOS());

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallButtonVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("사용자가 앱 설치를 수락했습니다");
        } else {
          console.log("사용자가 앱 설치를 거부했습니다");
        }
        setDeferredPrompt(null);
      });
    } else {
      alert("이 브라우저에서는 앱 설치를 지원하지 않거나 이미 설치되었습니다.");
    }
  };

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

        {/* iOS가 아니고 설치 버튼이 보여야 할 때만 표시 */}
        {!isIOSDevice && (
          <div style={styles.installButtonContainer}>
            <button
              id="install-button"
              style={styles.installButton}
              onClick={handleInstallClick}
            >
              앱 설치
            </button>
          </div>
        )}
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
  installButtonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  installButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.5rem",
    width: "100%",
  },
};

export default Intro;