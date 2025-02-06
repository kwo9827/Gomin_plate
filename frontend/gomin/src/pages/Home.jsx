import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreadExists } from "../store/slices/notificationSlice";

import Rail from "../components/Rail";
import Modal from "../components/EditModal";
import PostSushiBell from "../components/PostSushiBell";
import NotificationBell from "../components/NotificationBell";
import NotificationModal from "../components/NotificationModal";
import SushiUnlock from "../components/SushiUnlock";
import PostSushi from "./PostSushi";

//이미지 파일
import alarmTrueImg from "../assets/home/alarmON.webp";
import alarmFalseImg from "../assets/home/alarmOFF.webp";
import bgImg from "../assets/home/back.webp";
import bellImg from "../assets/home/bell.webp";
import deskImg from "../assets/home/desk.webp";
import openssImg from "../assets/home/open.webp";
import masterImg from "../assets/home/master.webp";

const Home = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSushiUnlockOpen, setIsSushiUnlockOpen] = useState(false);
  const [isPostSushiOpen, setIsPostSushiOpen] = useState(false);

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

  useEffect(() => {
    dispatch(fetchUnreadExists());
  }, [dispatch]);

  const token = useSelector((state) => state.member?.accessToken || "");
  console.log("사용자의 accessToken : ", token);

  return (
    <>
      {/* 배경 이미지 */}
      <div style={styles.backgroundContainer}>
        <div
          style={{
            ...styles.backgroundLayer,
            backgroundImage: `url("${bgImg}")`,
            zIndex: 1,
            transform: "translateX(0) translateY(3%)",
          }}
        ></div>
        {/* 고양이마스터 */}
        <div
          style={{
            ...styles.backgroundLayer,
            backgroundImage: `url("${masterImg}")`,
            zIndex: 2,
            transform: "translateX(0) translateY(0) scale(1.1)",
          }}
        ></div>
        {/* 알림 : 새로운 알림이 있을 때, 없을 떄 */}
        <div
          style={{
            ...styles.backgroundLayer,
            backgroundImage: `url("${
              hasUnread ? alarmFalseImg : alarmTrueImg
            }")`,
            zIndex: 2,
            transform: "translateX(0) translateY(-46%)",
          }}
        ></div>

        {/* 책상과 Rail */}
        <div style={styles.deskContainer}>
          {/* 책상 */}
          <img src={deskImg} alt="Desk" style={styles.deskImage} />

          {/* Rail */}
          <div style={styles.rail}>
            <Rail />
          </div>
        </div>

        {/* 주문벨 */}

        {/* 해금요소 */}
      </div>
      {/* 위에 쌓을 컴포넌트 */}
      {/* <div>
        <div className="home-container">
          <div className="control-buttons">
            <button onClick={openModal}>닉네임 모달 열기</button>
            <button onClick={openSushiUnlock}>해금 초밥 열기</button>
            <PostSushiBell onClick={openPostSushi} />
            <NotificationBell onClick={openNotification} />
          </div>

          <Modal isOpen={isModalOpen} onClose={closeModal} />

          <SushiUnlock isOpen={isSushiUnlockOpen} onClose={closeSushiUnlock} />

          {isPostSushiOpen && <PostSushi onClose={closePostSushi} />}

          <NotificationModal
            isOpen={isNotificationOpen}
            onClose={closeNotification}
          />
        </div>
      </div> */}
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
    width: "100%",
    height: "35%", // 책상의 높이 설정
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
    bottom: "60%", // 책상 위에 배치
    left: "50%",
    width: "100%",
    transform: "translateX(-50%)",
    zIndex: 4,
  },
  // content: {
  //   width: "100%",
  //   height: "100vh",
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   color: "white",
  //   textAlign: "center",
  //   zIndex: 10,
  // },
};

export default Home;
