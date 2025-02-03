import React, { useState } from "react";
import Rail from "../components/Rail";
import Modal from "../components/EditModal";
import PostSushiBell from "../components/PostSushiBell";
import NotificationBell from "../components/NotificationBell";
import NotificationModal from "../components/NotificationModal";
import SushiUnlock from "../components/SushiUnlock";
import PostSushi from "./PostSushi";

const Home = () => {
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

  return (
    <div className="home-container">
      <h1>회전 초밥 레일</h1>

      <div className="control-buttons">
        <button onClick={openModal}>닉네임 모달 열기</button>
        <button onClick={openSushiUnlock}>해금 초밥 열기</button>
        <PostSushiBell onClick={openPostSushi} />
        <NotificationBell onClick={openNotification} />
      </div>

      <Rail />

      <Modal isOpen={isModalOpen} onClose={closeModal} />

      <SushiUnlock isOpen={isSushiUnlockOpen} onClose={closeSushiUnlock} />

      {isPostSushiOpen && <PostSushi onClose={closePostSushi} />}

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={closeNotification}
      />
    </div>
  );
};

export default Home;
