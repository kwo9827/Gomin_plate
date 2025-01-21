import React, { useState } from "react";
import Modal from "../components/EditModal";

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true); // 모달 열기
    const closeModal = () => setIsModalOpen(false); // 모달 닫기

    return (
        <div>
            <h1>에딧 모달 예시</h1>
            <button onClick={openModal}>모달 열기</button>

            {/* 모달 컴포넌트 */}
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default App;
