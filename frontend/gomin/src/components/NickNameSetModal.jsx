import React from "react";

// 닉네임 설정하는 모달임
const NickNameSetModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>마이 페이지 모달창</h2>
                <p>이것은 모달창 예시입니다.</p>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

// 스타일
const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modalStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
};

export default NickNameSetModal;
