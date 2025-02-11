import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreadExists } from "../store/slices/notificationSlice";
import { countLike } from "../store/slices/memberSlice";
import { fetchSushiByToken } from "../store/slices/sushiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotificationSSE } from "../hooks/useNotificationSSE";
import { useLikeCountSSE } from "../hooks/useLikeCountSSE";

import Rail from "../components/Rail";
import Modal from "../components/EditModal";
import PostSushiBell from "../components/PostSushiBell";
import NotificationBell from "../components/NotificationBell";
import NotificationModal from "../components/NotificationModal";
import SushiUnlock from "../components/SushiUnlock";
import PostSushi from "./PostSushi";
import SushiUnlockBar from "../components/SushiUnlockBar";
import Tutorial from "../components/tutorial";

//이미지 파일
import bgImg from "../assets/home/back.webp";
import deskImg from "../assets/home/rail.webp";
import masterImg from "../assets/home/master.webp";
import SushiView from "./SushiView";

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

  const dialogues = [
    "어서오세요! 튜토리얼을 시작할게요!",
    "이곳에서 다양한 기능을 경험할 수 있어요",
    "준비가 되면 화면을 눌러 진행하세요!",
  ];

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

  return (
    <>
      {/* 배경 이미지 */}
      <div style={styles.backgroundContainer}>
        <div
          style={{
            ...styles.backgroundLayer,
            backgroundImage: `url("${bgImg}")`,
            zIndex: 1,
            transform: "translateX(0) translateY(6%)",
            opacity: allImagesLoaded ? 1 : 0,
          }}
          onLoad={() => handleImageLoad("bg")}
        ></div>
        {/* 고양이마스터 */}
        <div
          style={{
            ...styles.backgroundLayer,
            backgroundImage: `url("${masterImg}")`,
            zIndex: 2,
            transform: "translateX(0) translateY(0) scale(1.2)",
            opacity: allImagesLoaded ? 1 : 0,
          }}
          onLoad={() => handleImageLoad("master")}
        ></div>
        {/* 알림 : 새로운 알림이 있을 때, 없을 떄 */}
        <NotificationBell onClick={openNotification} hasUnread={hasUnread} />

        {/* 책상과 그 위의 요소들 */}
        <div style={styles.deskContainer}>
          {/* 책상 */}
          <img
            src={deskImg}
            alt="Desk"
            style={{
              ...styles.deskImage,
              opacity: allImagesLoaded ? 1 : 0,
            }}
            onLoad={() => handleImageLoad("desk")}
          />

          {/* Rail */}
          <div style={styles.rail}>
            <Rail onSushiClick={handleSushiClick} />
          </div>
          {/* 주문벨 */}
          <div style={styles.bell}>
            <PostSushiBell onClick={openPostSushi} style={{ zIndex: 5 }} />
          </div>
          {/* 해금요소 */}
          <div style={styles.unlock}>
            <SushiUnlockBar onClick={openSushiUnlock} style={{ zIndex: 5 }} />
          </div>
        </div>

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

            {/* <button onClick={openModal}>닉네임 모달 열기</button> */}
            {/* <Modal isOpen={isModalOpen} onClose={closeModal} /> */}
            <h2>튜토리얼 테스트</h2>
            <div
              style={{
                position: "absolute",
                top: "11vh",
                left: "28vh",
                width: "25vh",
              }}
            >
              <Tutorial dialogues={dialogues} />
            </div>

            {!allImagesLoaded && (
              <div>
                <p> 초밥집에 입장하는 중..</p>
              </div>
            )}
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
    left: "50%",
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
