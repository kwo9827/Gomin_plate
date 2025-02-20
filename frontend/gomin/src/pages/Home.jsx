import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreadExists } from "../store/slices/notificationSlice";
import { countLike } from "../store/slices/memberSlice";
import {
  fetchSushiByToken,
  increaseRailSpeed,
  decreaseRailSpeed,
} from "../store/slices/sushiSlice";
import { fetchSushiDetail } from "../store/slices/sushiSlice";
import { useLocation } from "react-router-dom";

import Rail from "../components/Rail";
import PostSushiBell from "../components/PostSushiBell";
import NotificationBell from "../components/NotificationBell";
import NotificationModal from "../components/NotificationModal";
import SushiUnlock from "../components/SushiUnlock";
import PostSushi from "./PostSushi";
import SushiUnlockBar from "../components/SushiUnlockBar";
import BgmContext from "../context/BgmProvider";
import CommonAlertModal from "../components/CommonAlertModal";
import PushAgreeModal from "../components/webpush/PushAgreeModal";

import { useSpring, animated } from "@react-spring/web";

//이미지 파일
import bgImg from "../assets/home/back.webp";
import deskImg from "../assets/home/rail.webp";
import masterImg from "../assets/home/master.webp";
import SushiView from "./SushiView";

import plate from "../assets/sounds/plate.mp3";

import Tutorial from "../components/Tutorial";
import { useSSE } from "../hooks/useSSE";
import SSEIndicator from "../components/SSEIndicator";
import AnswerSubmitCheckModal from "../components/AnswerSubmitCheckModal";
import MasterCat from "../components/MasterCat";

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
  const [startTutorial, setStartTutorial] = useState(false);
  const [showAnswerSubmitModal, setShowAnswerSubmitModal] = useState(false);
  const [isOwnSushi, setIsOwnSushi] = useState(false);

  const [showPushAgreeModal, setShowPushAgreeModal] = useState(false);

  const audioRef = useRef(null);
  const { isMuted } = useContext(BgmContext);

  // // ✅ `handleSetIsNew` 함수 정의
  // const handleSetIsNew = (value) => {
  //   dispatch(setIsNew(value));
  // };

  const handleSushiClick = async (sushiData) => {
    try {
      await dispatch(fetchSushiDetail(sushiData.sushiId)).unwrap();
      setSelectedSushiData(sushiData);
      setIsSushiViewOpen(true);
    } catch (error) {
      if (error.error?.code === "R006") {
        showAlert("이미 답변한 초밥이다냥!");
      }
    }
  };

  const handlePostSushiComplete = () => {
    // 알림 권한이 'default' 상태일 때만 모달 표시
    if (Notification.permission === "default") {
      setShowPushAgreeModal(true);
    }
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

  const handleTutorialClose = () => {
    setStartTutorial(false);
  };

  const restartTutorial = () => {
    setStartTutorial(true);
  };

  const handleAnswerSubmit = (isOwn = false) => {
    setIsOwnSushi(isOwn);
    setShowAnswerSubmitModal(true);

    // 자신의 초밥에 답변한 게 아닐 때만 알림 권한 체크
    if (!isOwn && Notification.permission === "default") {
      setShowPushAgreeModal(true);
    }
  };

  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
  });

  const showAlert = (message) => {
    setAlertModal({
      isOpen: true,
      message,
    });
  };

  useEffect(() => {
    if (isSushiViewOpen && selectedSushiData?.isClosed) {
      showAlert("이미 마감된 초밥이에요!");
      setIsSushiViewOpen(false); // 모달 열리지 않도록 막기
    }
  }, [isSushiViewOpen, selectedSushiData]);

  // useSSE();
  const isSSEConnected = useSSE();

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
      dispatch(fetchSushiByToken(token))
        .unwrap() // unwrap 추가
        .then((response) => {
          if (response.data) {
            setSelectedSushiData(response.data);
            setTimeout(() => {
              setIsSushiViewOpen(true);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.error?.code === "R006") {
            showAlert("이미 답변한 초밥이다냥!");
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
      sessionStorage.setItem("hasVisitedHome", "true");
      setTimeout(() => {
        setHasRefreshed(true);
      }, 100);
    } else {
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasRefreshed]);

  // 초밥 모달이 열릴 때 소리 재생
  useEffect(() => {
    if (isSushiViewOpen && audioRef.current) {
      // 음소거 상태에 따라 볼륨 설정
      audioRef.current.volume = isMuted ? 0 : 0.5;
      audioRef.current.play();
    }
  }, [isSushiViewOpen]);

  const bgSpring = useSpring({
    opacity: allImagesLoaded ? 1 : 0,
    transform: allImagesLoaded ? "translateY(7%)" : "translateY(-50%)",
    config: { tension: 170, friction: 26 },
    delay: 1000,
  });

  const masterSpring = useSpring({
    opacity: allImagesLoaded ? 1 : 0,
    transform: allImagesLoaded ? "scale(1.2)" : "scale(0.8)",
    config: { tension: 170, friction: 26 },
    delay: 1500,
  });

  const deskSpring = useSpring({
    opacity: allImagesLoaded ? 1 : 0,
    transform: allImagesLoaded ? "translateX(0)" : "translateX(-50%)",
    config: { tension: 170, friction: 26 },
    delay: 300,
  });

  const bellSpring = useSpring({
    opacity: allImagesLoaded ? 1 : 0,
    transform: allImagesLoaded ? "translateY(0)" : "translateY(-50%)",
    config: { tension: 300, friction: 10 },
    delay: 1700,
  });

  return (
    <>
      {/* 배경 이미지 */}
      <div style={styles.backgroundContainer}>
        <animated.div
          style={{
            ...styles.backgroundLayer,
            zIndex: 2,
            position: "absolute",
            backgroundImage: `url("${bgImg}")`,
            opacity: bgSpring.opacity,
            transform: bgSpring.transform,
          }}
        >
          {/* SSE 연결 상태 표시 */}
          <SSEIndicator isConnected={isSSEConnected} />
        </animated.div>
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
        <MasterCat />

        <animated.div
          style={{
            ...styles.backgroundLayer,
            zIndex: 2,
            opacity: bellSpring.opacity,
            transform: bellSpring.transform,
          }}
        >
          {/* 알림 : 새로운 알림이 있을 때, 없을 떄 */}
          <NotificationBell onClick={openNotification} hasUnread={hasUnread} />
        </animated.div>

        {/* 튜토리얼 버튼 */}
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={restartTutorial}>
            ?
          </button>
        </div>
        {startTutorial && (
          <Tutorial
            onClose={() => setStartTutorial(false)}
            showFullTutorial={false}
          />
        )}
        {/* 책상과 그 위의 요소들 */}
        <animated.div
          style={{
            ...styles.deskContainer,
            opacity: deskSpring.opacity,
            transform: deskSpring.transform,
          }}
        >
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
          {/* 속도 조절 버튼 */}
          {/* <div style={styles.speedControls}>
            <button
              onClick={() => dispatch(increaseRailSpeed())}
              style={styles.speedButton}
            >
              +
            </button>
            <button
              onClick={() => dispatch(decreaseRailSpeed())}
              style={styles.speedButton}
            >
              -
            </button>
          </div> */}
          {/* 해금요소 */}
          <div style={styles.unlock}>
            <SushiUnlockBar onClick={openSushiUnlock} />
          </div>
        </animated.div>

        {/* 모달 */}
        <div>
          <div style={{ position: "absolute", zIndex: "10" }}>
            <audio ref={audioRef} src={plate} />
            {selectedSushiData &&
              isSushiViewOpen &&
              !selectedSushiData.isClosed && (
                <SushiView
                  isOpen={isSushiViewOpen}
                  onClose={() => setIsSushiViewOpen(false)}
                  onAnswerSubmit={handleAnswerSubmit}
                  sushiId={selectedSushiData.sushiId}
                  category={selectedSushiData.category}
                  sushiType={selectedSushiData.sushiType}
                  remainingAnswers={selectedSushiData.remainingAnswers}
                  expirationTime={selectedSushiData.expirationTime}
                />
              )}
            <AnswerSubmitCheckModal
              isOpen={showAnswerSubmitModal}
              onClose={() => setShowAnswerSubmitModal(false)}
              isOwnSushi={isOwnSushi}
            />

            <SushiUnlock
              isOpen={isSushiUnlockOpen}
              onClose={closeSushiUnlock}
            />
            {isPostSushiOpen && (
              <PostSushi
                onClose={closePostSushi}
                onComplete={handlePostSushiComplete}
              />
            )}
            <NotificationModal
              isOpen={isNotificationOpen}
              onClose={closeNotification}
            />

            {showPushAgreeModal && (
              <PushAgreeModal
                isOpen={showPushAgreeModal}
                onClose={() => setShowPushAgreeModal(false)}
              />
            )}

            <CommonAlertModal
              isOpen={alertModal.isOpen}
              onClose={() => setAlertModal({ isOpen: false, message: "" })}
              message={alertModal.message}
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
    height: "calc( 100 * var(--custom-vh))",
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
    height: "calc(28 * var(--custom-vh))", // 책상의 높이 설정
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
    left: "24%",
    bottom: "22%",
    zIndex: 5,
  },
  buttonContainer: {
    position: "absolute",
    left: "calc( 49.5 * var(--custom-vh))",
    top: "calc( 51.1 * var(--custom-vh))",
    zIndex: 5,
  },
  button: {
    padding: "calc( 0.2 * var(--custom-vh))",
    border: "calc( 0.6 * var(--custom-vh)) solid",
    borderRadius: "calc( 5 * var(--custom-vh))",
    backgroundColor: "#ada782",
    color: "#dfdbaf",
    fontSize: "calc( 2.5 * var(--custom-vh))",
    fontWeight: "bold",
    cursor: "pointer",
    width: "calc( 4 * var(--custom-vh))",
    height: "calc( 4 * var(--custom-vh))",
    whiteSpace: "nowrap",
    lineHeight: "1",
    fontFamily: "inherit",
  },
  speedControls: {
    position: "absolute",
    left: "50%",
    bottom: "22%",
    display: "flex",
    gap: "10px",
    zIndex: 5,
  },
  speedButton: {
    padding: "8px 16px",
    fontSize: "18px",
    backgroundColor: "#ada782",
    color: "#dfdbaf",
    border: "2px solid #dfdbaf",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#8f8a6d",
    },
  },
};

export default Home;
