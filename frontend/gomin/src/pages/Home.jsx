import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreadExists } from "../store/slices/notificationSlice";
import { countLike } from "../store/slices/memberSlice";
import { fetchSushiByToken } from "../store/slices/sushiSlice";
import { useLocation } from "react-router-dom";
import { useNotificationSSE } from "../hooks/useNotificationSSE";
import { useLikeCountSSE } from "../hooks/useLikeCountSSE";

import Rail from "../components/Rail";
import PostSushiBell from "../components/PostSushiBell";
import NotificationBell from "../components/NotificationBell";
import NotificationModal from "../components/NotificationModal";
import SushiUnlock from "../components/SushiUnlock";
import PostSushi from "./PostSushi";
import SushiUnlockBar from "../components/SushiUnlockBar";

import { useSpring, animated } from "@react-spring/web";

//이미지 파일
import bgImg from "../assets/home/back.webp";
import deskImg from "../assets/home/rail.webp";
import masterImg from "../assets/home/master.webp";
import SushiView from "./SushiView";

import plate from "../assets/sounds/plate.mp3";

import { setIsNew } from "../store/slices/memberSlice";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const [token, setToken] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSushiUnlockOpen, setIsSushiUnlockOpen] = useState(false);
  const [isPostSushiOpen, setIsPostSushiOpen] = useState(false);
  const [isSushiViewOpen, setIsSushiViewOpen] = useState(false);
  const [selectedSushiData, setSelectedSushiData] = useState(null);

  const audioRef = useRef(null);

  // ✅ `handleSetIsNew` 함수 정의
  const handleSetIsNew = (value) => {
    dispatch(setIsNew(value));
  };

  const handleSushiClick = (sushiData) => {
    setSelectedSushiData(sushiData);
    setIsSushiViewOpen(true);
  };

  const [imagesLoaded, setImagesLoaded] = useState({
    bg: false,
    desk: false,
    master: false,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openNotification = () => setIsNotificationOpen(true);
  const closeNotification = () => setIsNotificationOpen(false);

  const openPostSushi = () => setIsPostSushiOpen(true);
  const closePostSushi = () => setIsPostSushiOpen(false);

  const openSushiUnlock = () => setIsSushiUnlockOpen(true);
  const closeSushiUnlock = () => setIsSushiUnlockOpen(false);

  const hasUnread = useSelector(
    (state) => state.notification.hasUnread ?? false
  );
  const loading = useSelector(
    (state) => state.notification.status === "loading"
  );

  useLikeCountSSE();
  useNotificationSSE();

  useEffect(() => {
    // 현재 URL 경로에서 '/share/' 뒤의 값을 추출
    const pathParts = location.pathname.split("/");

    // URL이 '/share/{token}' 형식인지 확인
    if (pathParts[1] === "share" && pathParts.length > 2) {
      const tokenFromUrl = pathParts[2]; // 'share' 뒤에 오는 값이 토큰
      setToken(tokenFromUrl);
    }
  }, [location]);

  // 토큰을 사용하여 초밥 데이터 불러오기
  useEffect(() => {
    if (token) {
      dispatch(fetchSushiByToken(token)).then((response) => {
        console.log("Fetched Sushi Data:", response.payload); // 데이터 확인
        // 초밥 데이터가 성공적으로 불러와졌다면 모달 열기
        if (response.payload) {
          setSelectedSushiData(response.payload.data); // 불러온 초밥 데이터를 상태에 저장
          setIsSushiViewOpen(true); // 모달 열기
        }
      });
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(fetchUnreadExists());
    dispatch(countLike());
  }, [dispatch]);

  const handleImageLoad = (image) => {
    setImagesLoaded((prevState) => ({ ...prevState, [image]: true }));
  };

  // 배경 이미지 로드 완료 처리
  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = bgImg;
    bgImage.onload = () => handleImageLoad("bg");

    const masterImage = new Image();
    masterImage.src = masterImg;
    masterImage.onload = () => handleImageLoad("master");

    const deskImage = new Image();
    deskImage.src = deskImg;
    deskImage.onload = () => handleImageLoad("desk");
  }, []);

  const allImagesLoaded = Object.values(imagesLoaded).every((loaded) => loaded);

  // 홈화면 새로고침 처리
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedHome");

    if (!hasVisited && !hasRefreshed) {
      //방문 기록 저장
      sessionStorage.setItem("hasVisitedHome", "true");
      setTimeout(() => {
        setHasRefreshed(true);
        window.location.reload();
      }, 100);
    } else {
      // fade out
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hasRefreshed]);

  // 초밥 모달이 열릴 때 소리 재생
  useEffect(() => {
    if (isSushiViewOpen && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play();
    }
  }, [isSushiViewOpen]);

  const bgSpring = useSpring({
    opacity: allImagesLoaded ? 1 : 0,
    transform: allImagesLoaded ? "translateY(0)" : "translateY(-50%)",
    config: { tension: 170, friction: 26 },
    delay: 500,
  });

  const masterSpring = useSpring({
    opacity: allImagesLoaded ? 1 : 0,
    transform: allImagesLoaded ? "scale(1)" : "scale(0.8)",
    config: { tension: 170, friction: 26 },
    delay: 1500,
  });

  const deskSpring = useSpring({
    opacity: allImagesLoaded ? 1 : 0,
    transform: allImagesLoaded ? "translateY(0)" : "translateY(50%)",
    config: { tension: 170, friction: 26 },
    delay: 1000,
  });

  return (
    <>
      {/* 배경 이미지 */}
      <div style={styles.backgroundContainer}>
        <animated.div
          style={{
            ...styles.backgroundLayer,
            backgroundImage: `url("${bgImg}")`,
            zIndex: 1,
            opacity: bgSpring.opacity,
            transform: bgSpring.transform,
          }}
          onLoad={() => handleImageLoad("bg")}
        ></animated.div>
        {/* 고양이마스터 */}
        <animated.div
          style={{
            ...styles.backgroundLayer,
            backgroundImage: `url("${masterImg}")`,
            zIndex: 2,
            opacity: masterSpring.opacity,
            transform: masterSpring.transform,
          }}
          onLoad={() => handleImageLoad("master")}
        ></animated.div>
        {/* 알림 : 새로운 알림이 있을 때, 없을 떄 */}
        <NotificationBell onClick={openNotification} hasUnread={hasUnread} />

        {/* 책상과 그 위의 요소들 */}
        <animated.div style={{
          ...styles.deskContainer,
          opacity: deskSpring.opacity,
          transform: deskSpring.transform,
        }}>
          {/* 책상 */}
          <img
            src={deskImg}
            alt="Desk"
            style={styles.deskImage}
            onLoad={() => handleImageLoad("desk")}
          />

          {/* Rail */}
          <div style={styles.rail}>
            <Rail onSushiClick={handleSushiClick} />
          </div>
          {/* 주문벨 */}
          <div style={styles.bell}>
            <PostSushiBell onClick={openPostSushi} />
          </div>
          {/* 해금요소 */}
          <div style={styles.unlock}>
            <SushiUnlockBar onClick={openSushiUnlock} />
          </div>
        </animated.div>

        {/* 모달 */}
        <div>
          <div style={{ position: "absolute", zIndex: "10" }}>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: showLoadingScreen ? "auto" : "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  top: "10.4vh",
                  height: "90vh",
                  width: "55vh",

                  backgroundColor: "#fdfcc8",
                  zIndex: 9999,
                  opacity: showLoadingScreen ? 1 : 0,
                  transition: "opacity 1s ease-out",
                  pointerEvents: showLoadingScreen ? "auto" : "none",
                }}
              />
            </div>
            <div>
              <button>튜토리얼</button>
            </div>

            {!allImagesLoaded && (
              <div>
                <p> 초밥집에 입장하는 중..</p>
              </div>
            )}
            <audio ref={audioRef} src={plate} />
            {selectedSushiData && (
              <SushiView
                isOpen={isSushiViewOpen}
                onClose={() => setIsSushiViewOpen(false)}
                sushiId={selectedSushiData.sushiId}
                category={selectedSushiData.category}
                sushiType={selectedSushiData.sushiType}
                remainingAnswers={selectedSushiData.remainingAnswers}
                expirationTime={selectedSushiData.expirationTime}
              />
            )}

            <SushiUnlock
              isOpen={isSushiUnlockOpen}
              onClose={closeSushiUnlock}
            />
            {isPostSushiOpen && <PostSushi onClose={closePostSushi} />}
            <NotificationModal
              isOpen={isNotificationOpen}
              onClose={closeNotification}
            />
          </div>
        </div>
      </div>
    </>
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
  deskContainer: {
    position: "absolute",
    bottom: 0,
    left: "-35%",
    transform: "translateX(-50%)",
    width: "auto%",
    height: "28vh", // 책상의 높이 설정
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end", // 책상이 컨테이너 하단에 붙도록
  },
  deskImage: {
    width: "auto",
    height: "100%",
    objectFit: "contain",
  },
  rail: {
    position: "absolute",
    bottom: "56%",
    left: "50%",
    width: "100%",
    transform: "translateX(-50%)",
    zIndex: 4,
  },
  bell: {
    position: "absolute",
    right: "23%",
    bottom: "25%",
    zIndex: 5,
  },
  unlock: {
    position: "absolute",
    left: "25%",
    bottom: "23%",
    zIndex: 5,
  },
};

export default Home;
