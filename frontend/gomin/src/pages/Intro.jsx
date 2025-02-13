import React, { useContext, useState, useEffect } from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";
import introImage from "../assets/introoooo.webp";
import BgmContext from "../context/BgmProvider";

const Intro = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // iOS 디바이스 감지
    const detectIOS = () => {
      const ua = navigator.userAgent;
      setIsIOS(/iPad|iPhone|iPod/.test(ua) && !window.MSStream);
    };
    detectIOS();

    // beforeinstallprompt 이벤트 리스너 추가
    window.addEventListener('beforeinstallprompt', (e) => {
      // 기본 동작 방지
      e.preventDefault();
      // 이벤트 저장
      setInstallPrompt(e);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeinstallprompt', () => { });
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;

    // 설치 프롬프트 표시
    installPrompt.prompt();

    // 사용자의 선택 결과 확인
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('사용자가 앱 설치를 수락했습니다');
      } else {
        console.log('사용자가 앱 설치를 거부했습니다');
      }
      // 프롬프트 초기화
      setInstallPrompt(null);
    });
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
      </div>
      {/* 안드로이드/크롬용 설치 버튼 */}
      {installPrompt && (
        <button
          style={styles.installButton}
          onClick={handleInstallClick}
        >
          앱 설치하기
        </button>
      )}

      {/* iOS용 안내 메시지 */}
      {isIOS && (
        <div style={styles.iosInstallPrompt}>
          이 앱을 설치하려면, 하단 공유 버튼을 누른 후 "홈 화면에 추가"를 선택하세요.
        </div>
      )}
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
  installButton: {
    padding: "10px 15px",
    backgroundColor: "#4285f4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
    width: "100%",
    textAlign: "center",
  },
  iosInstallPrompt: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "4px",
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "white",
  }
};

export default Intro;