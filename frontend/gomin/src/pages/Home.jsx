import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRailSushi } from "../store/slices/sushiSlice";
import Modal from "../components/EditModal";
import Rail from "../components/Rail";
import PostSushiBell from "../components/PostSushiBell"; // PostSushiBell 컴포넌트
import NotificationModal from "../components/NotificationModal"; // NotificationModal 컴포넌트
import NotificationBell from "../components/NotificationBell"; // NotificationBell 컴포넌트

/** 로그인 후 보여질 메인 페이지 */
const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // EditModal 열기 상태
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // NotificationModal 열기 상태
    const [sushiSize, setSushiSize] = useState(15); // 초밥 크기(개수) 설정

    const dispatch = useDispatch();
    const railSushi = useSelector((state) => state.sushi.railSushi); // railSushi 상태 가져오기

    const openModal = () => setIsModalOpen(true); // EditModal 열기
    const closeModal = () => setIsModalOpen(false); // EditModal 닫기

    const openNotification = () => setIsNotificationOpen(true); // NotificationModal 열기
    const closeNotification = () => setIsNotificationOpen(false); // NotificationModal 닫기

    // 무작위 초밥 가져오기
    useEffect(() => {
        dispatch(fetchRailSushi(sushiSize)); // 15개 초밥을 가져옴
    }, [dispatch, sushiSize]);

    return (
        <div>
            <h1>에딧 모달 예시</h1>
            <button onClick={openModal}>모달 열기</button>

            {/* PostSushiBell 컴포넌트 */}
            <PostSushiBell />

            {/* NotificationBell 컴포넌트 */}
            <NotificationBell onClick={openNotification} />

            {/* EditModal 컴포넌트 */}
            <Modal isOpen={isModalOpen} onClose={closeModal} />

            {/* NotificationModal 컴포넌트 */}
            <NotificationModal isOpen={isNotificationOpen} onClose={closeNotification} />

            {/* 레일 구현 */}
            <Rail sushiData={railSushi} /> {/* Rail 컴포넌트에 sushiData를 전달 */}
        </div>
    );
};

export default Home;
