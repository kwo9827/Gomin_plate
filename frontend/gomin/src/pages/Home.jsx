import React, { useState } from "react";
import Rail from "../components/Rail";
import Modal from "../components/EditModal";
import PostSushiBell from "../components/PostSushiBell";
import NotificationBell from "../components/NotificationBell";
import NotificationModal from "../components/NotificationModal";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openNotification = () => setIsNotificationOpen(true);
    const closeNotification = () => setIsNotificationOpen(false);

    return (
        <div className="home-container">
            <h1>회전 초밥 레일</h1>

            <div className="control-buttons">
                <button onClick={openModal}>모달 열기</button>
                <PostSushiBell />
                <NotificationBell onClick={openNotification} />
            </div>

            <Rail />

            <Modal isOpen={isModalOpen} onClose={closeModal} />
            <NotificationModal isOpen={isNotificationOpen} onClose={closeNotification} />
        </div>
    );
};

export default Home;