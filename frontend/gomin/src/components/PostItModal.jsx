import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLike } from "../store/slices/answerSlice";
import postItImage from "../assets/PostIt.png";

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
      console.error("Failed to toggle like:", error);
      // 에러 발생 시 처리 (예: 토스트 메시지)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.postOuterBox}>
        <div style={styles.postIt} onClick={(e) => e.stopPropagation()}>
          <img src={postItImage} alt="PostIt" style={styles.postItImage} />
          <div style={styles.closeButton} onClick={onClose}>
            ✖
          </div>
          <div style={styles.content}>{answer.content}</div>
          <div
            style={{
              ...styles.heart,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
            onClick={handleToggleLike}
          >
            {isLiked ? "❤️" : "🤍"}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
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
  },
  postOuterBox: {
    position: "relative",
    width: "80vh",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  postIt: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  postItImage: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  closeButton: {
    position: "absolute",
    top: "17%",
    right: "15%",
    cursor: "pointer",
    fontSize: "24px",
    zIndex: 3,
    color: "#000000",
  },
  content: {
    position: "relative",
    margin: "10px 0",
    zIndex: 2,
    width: "55vw",
    height: "55vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    bottom: "5%",
  },
  heart: {
    position: "absolute",
    bottom: "25%",
    right: "15%",
    fontSize: "28px",
    zIndex: 3,
    cursor: "pointer",
  },
};

export default PostItModal;
