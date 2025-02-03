import React from "react";

const PostItModal = ({ isOpen, onClose, answer, likedAnswerId, setLikedAnswerId }) => {
    if (!isOpen || !answer) return null;

    /* 좋아요 버튼 */
    const toggleLike = () => {
        setLikedAnswerId((prev) => (prev === answer.answerId ? null : answer.answerId));
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={closeButtonStyle} onClick={onClose}>✖</div>
                <div style={contentStyle}>{answer.content}</div>
                <div style={heartStyle} onClick={toggleLike}>
                    {likedAnswerId === answer.answerId ? "❤️" : "🤍"}
                </div>
            </div>
        </div>
    );
};

/* 스타일 */
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
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: "#FFF7B8",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    width: "300px",
    textAlign: "center",
    fontFamily: "'Nanum Pen Script', cursive",
    fontSize: "1.2rem",
};

const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "18px",
};

const contentStyle = {
    margin: "20px 0",
};

const heartStyle = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    fontSize: "24px",
    cursor: "pointer",
};

export default PostItModal;
