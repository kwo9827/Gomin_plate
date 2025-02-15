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
      <div style={styles.postOuterBox}>
        <div style={styles.postIt} onClick={(e) => e.stopPropagation()}>
          <img
            // src={currentPostItImage}
            src={postItOrange}
            alt="PostIt"
            style={styles.postItImage}
          />
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
    // padding: "10px",
    zIndex: 1000,
  },
  postOuterBox: {
    position: "relative",
    // width: "80vh",
    // height: "80vh",

    /*추가 디자인 안되면 주석 처리 ㄱㄱ */
    width: "80vh",
    height: "80vh",
    maxWidth: "500px",
    maxHeight: "500px",
    /*여기까지 주석! */

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
    right: "0%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  closeButton: {
    position: "absolute",
    top: "17%",
    right: "21%",
    cursor: "pointer",
    fontSize: "2.5vh",
    zIndex: 3,
    color: "#000000",
  },
  content: {
    position: "relative",
    margin: "10px 0",
    zIndex: 2,
    width: "55%",
    height: "55%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // fontSize: "clamp(14px, 1.5vw, 18px)", // 반응형 폰트 크기
    fontSize: "2vh",
    bottom: "5%",
  },
  heart: {
    position: "absolute",
    bottom: "25%",
    right: "20%",
    fontSize: "28px",
    zIndex: 3,
    cursor: "pointer",
  },
};

export default PostItModal;
