import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreadExists } from "../store/slices/notificationSlice";
import { countLike } from "../store/slices/memberSlice";
import { useNavigate } from "react-router-dom";
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

//이미지 파일
import bgImg from "../assets/home/back.webp";
import deskImg from "../assets/home/rail.webp";
import masterImg from "../assets/home/master.webp";
import SushiView from "./SushiView";

const Home = () => {
  const dispatch = useDispatch();
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

  useLikeCountSSE();
  useNotificationSSE();

  useEffect(() => {
    // 알림 상태 조회
    dispatch(fetchUnreadExists());
    // 좋아요 수 조회
    dispatch(countLike());
  }, [dispatch]);

  // 이미지 로드 후 상태 업데이트
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

  /** 로그인 상태가 아니면 인트로 페이지로 리다이렉트 */
  // const navigate = useNavigate();
  // const accessToken = useSelector((state) => state.member?.accessToken);

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/", { replace: true });
  //   }
  // }, [accessToken, navigate]);
  /** 여기 까지 */

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
            {/* <button onClick={openModal}>닉네임 모달 열기</button> */}
            {/* <Modal isOpen={isModalOpen} onClose={closeModal} /> */}
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
