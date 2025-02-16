import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLike } from "../../store/slices/answerSlice";

/* 포스트잇 이미지 */
import postItPink from "../../assets/postIt/postIt1.webp";
import postItGreen from "../../assets/postIt/postIt2.webp";
import postItBlue from "../../assets/postIt/postIt3.webp";
import postItRed from "../../assets/postIt/postIt4.webp";
import postItOrange from "../../assets/postIt/postIt5.webp";

const postItImages = {
  pink: postItPink,
  green: postItGreen,
  blue: postItBlue,
  red: postItRed,
  orange: postItOrange,
};

const PostItModal = ({ isOpen, onClose, answer }) => {
  if (!isOpen || !answer) return null;

  const dispatch = useDispatch();
  // 서버 상태를 기반으로 초기 상태 설정
  const [isLiked, setIsLiked] = useState(answer.isLiked);
  // 요청 중복 방지를 위한 상태
  const [isLoading, setIsLoading] = useState(false);
  // 답변 포스트잇 컬러
  // const currentPostItImage = postItImages[answer.postItColor];

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
      <div style={styles.postOuterBox} onClick={(e) => e.stopPropagation()}>
        <img src={postItOrange} alt="PostIt" style={styles.postItImage} />
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
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "55vh",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  postOuterBox: {
    position: "relative",
    width: "40vh",
    height: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  postItImage: {
    width: "100%",
    height: "100%",
    marginTop: "4vh",
    transform: "scale(1.5)",
    objectFit: "contain",
  },
  closeButton: {
    position: "absolute",
    top: "5%",
    right: "8%",
    cursor: "pointer",
    fontSize: "2.5vh",
    color: "#000000",
  },
  content: {
    position: "absolute",
    width: "80%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2vh",
    textAlign: "center",
  },
  heart: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    fontSize: "3vh",
    zIndex: 3,
    cursor: "pointer",
  },
};

export default PostItModal;
