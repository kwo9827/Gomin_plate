import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLike } from "../store/slices/answerSlice";

const PostItModal = ({ isOpen, onClose, answer }) => {
  if (!isOpen || !answer) return null;

  const dispatch = useDispatch();
  // 서버 상태를 기반으로 초기 상태 설정
  const [isLiked, setIsLiked] = useState(answer.isLiked);
  // 요청 중복 방지를 위한 상태
  const [isLoading, setIsLoading] = useState(false);

  // answer prop이 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    setIsLiked(answer.isLiked);
  }, [answer]);

  const handleToggleLike = async () => {
    // 이미 요청 중이면 무시
    if (isLoading) return;

    // 이미 좋아요 상태인데 또 좋아요를 누르려고 하면 무시
    if (isLiked) return;

    setIsLoading(true);

    try {
      const result = await dispatch(toggleLike(answer.answerId)).unwrap();
      setIsLiked(true); // 성공 시에만 상태 업데이트
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // 에러 발생 시 처리 (예: 토스트 메시지)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={closeButtonStyle} onClick={onClose}>✖</div>
        <div style={contentStyle}>{answer.content}</div>
        <div
          style={{
            ...heartStyle,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1
          }}
          onClick={handleToggleLike}
        >
          {isLiked ? "❤️" : "🤍"}
        </div>
      </div>
    </div>
  );
};

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
};

export default PostItModal;