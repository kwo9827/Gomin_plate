import React from "react";
import { useDispatch } from "react-redux";
import { toggleLike } from "../store/slices/answerSlice";

const PostItModal = ({ isOpen, onClose, answer, likedAnswerId, setLikedAnswerId }) => {
  if (!isOpen || !answer) return null;

  const dispatch = useDispatch();

  const handleToggleLike = () => {
    if (likedAnswerId === answer.answerId) {
      return; // 이미 좋아요가 눌려있으면 아무 작업도 하지 않음
    }
    setLikedAnswerId(answer.answerId); // UI 즉시 반영
    dispatch(toggleLike(answer.answerId)); // 서버 상태 업데이트
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={closeButtonStyle} onClick={onClose}>✖</div>
        <div style={contentStyle}>{answer.content}</div>
        <div style={heartStyle} onClick={handleToggleLike}>
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
