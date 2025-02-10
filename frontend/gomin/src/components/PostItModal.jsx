import React from "react";

const PostItModal = ({
  isOpen,
  onClose,
  answer,
  likedAnswerId,
  setLikedAnswerId,
}) => {
  if (!isOpen || !answer) return null;

  /* 좋아요 버튼 */
  const toggleLike = () => {
    setLikedAnswerId((prev) =>
      prev === answer.answerId ? null : answer.answerId
    );
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={closeButtonStyle} onClick={onClose}>
          ✖
        </div>
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
  padding: "2rem",
  borderRadius: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  position: "relative",
  width: "70%",
  maxWidth: "400px",
  minWidth: "280px",
  textAlign: "center",
  fontSize: "1.2rem",

  /**모달창 높이 수정할때 건드시오 */
  //   height: "auto",
  //   maxHeight: "90vh", // 화면 높이의 90% 이상 넘지 않도록
  //   overflowY: "auto", // 내용이 넘치면 스크롤
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
