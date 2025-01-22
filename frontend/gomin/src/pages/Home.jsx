import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRailSushi } from "../store/slices/sushiSlice";
import Modal from "../components/EditModal";
import Rail from "../components/Rail";

// 메인 홈 화면임
const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sushiSize, setSushiSize] = useState(15); // 초밥 크기(개수) 설정

    const dispatch = useDispatch();

    const railSushi = useSelector((state) => state.sushi.railSushi); // railSushi 상태 가져오기

    const openModal = () => setIsModalOpen(true); // 모달 열기
    const closeModal = () => setIsModalOpen(false); // 모달 닫기

    // 무작위 초밥 가져오기
    useEffect(() => {
        dispatch(fetchRailSushi(sushiSize)); // 15개 초밥을 가져옴
    }, [dispatch, sushiSize]);

    return (
        <div>
            <h1>에딧 모달 예시</h1>
            <button onClick={openModal}>모달 열기</button>

            {/* 모달 컴포넌트 */}
            <Modal isOpen={isModalOpen} onClose={closeModal} />

            {/* 레일 구현해보자 */}
            <Rail sushiData={railSushi} /> {/* Rail 컴포넌트에 sushiData를 전달 */}
        </div>
    );
};

export default Home;
