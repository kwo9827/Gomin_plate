import React from "react";

/** 답변을 보기 위한 포스트잇 컴포넌트
 * 1. 여기서는 API 요청을 할 것이 아니라 props로 답변 내용을 담아서 뿌리는게 효율적
 * 2. SushiDetail에서 Sushi 데이터에 달린 answers[] 데이터 하나 빼서 담으면 될 듯
 */
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
