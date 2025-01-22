import React from "react";

// 포스트잇 모달 그리세요
const PostItModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>포스트잇 모달창</h2>
                <p>이것은 포스트잇 모달이다.</p>
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

export default PostItModal;
