import React from "react";
import postItImage from "../assets/PostIt.webp";

const PostItAnswerModal = ({ isOpen, onClose, content, isLiked }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.postOuterBox}>
        <div style={styles.postIt} onClick={(e) => e.stopPropagation()}>
          <img src={postItImage} alt="PostIt" style={styles.postItImage} />
          <div style={styles.closeButton} onClick={onClose}>
            ✖
          </div>
          <div style={styles.content}>{content}</div>
          <div style={styles.heart}>{isLiked ? "❤️" : "🤍"}</div>
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
  width: "49vh",
  textAlign: "center",
  fontSize: "1.2rem",
  boxSizing: "border-box",
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

export default PostItAnswerModal;
