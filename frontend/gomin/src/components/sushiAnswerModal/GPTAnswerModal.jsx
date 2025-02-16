import React from "react";
import postItBlue from "../../assets/postIt/postIt3.webp";

import masterFace from "../../assets/answerDetail/master-face.webp";
import PawPrintIcon from "../../components/icons/PawPrintIcon";

import { modalStyles } from "./styles/modalStyles";

const GPTAnswerModal = ({ isOpen, onClose, answer }) => {
  if (!isOpen || !answer) return null;

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.postOuterBox}>
        <div style={styles.postIt} onClick={(e) => e.stopPropagation()}>
          <img src={postItBlue} alt="PostIt" style={styles.postItImage} />
          <div style={styles.closeButton} onClick={onClose}>
            ✖
          </div>

          <div style={styles.header}>
            <span style={styles.headerTitle}>마스터냥의 쪽지</span>
          </div>

          <div style={styles.content}>{answer.content}</div>
          <div style={styles.pawPrint}>
            <img src={masterFace} alt="Master" style={styles.masterIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: "22%",
    left: "23%",
    zIndex: 3,
  },
  headerTitle: {
    color: "#424242", // 더 진한 파란색
    fontSize: "2.2vh",
    margin: "-0.5vh 0 0.5vh 1vh",
    // fontWeight: "bold",
  },
  masterIcon: {
    width: "3vh",
    height: "3vh",
    marginRight: "1vh",
  },
  pawPrint: {
    position: "absolute",
    bottom: "20%",
    right: "20%",
    transform: "scale(2)",
    zIndex: 3,
    color: "#4a4a4a",
  },
  gptDisclaimer: {
    position: "absolute",
    bottom: "25%",
    left: "20%",
    fontSize: "1.4vh",
    color: "#666666",
    zIndex: 3,
  },
  postIt: {
    position: "relative",
    width: "55vh",
    height: "55vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  postItImage: {
    position: "absolute",
    top: "0",
    left: "49.5%",
    transform: "translateX(-50%)",
    width: "60vh",
  },
  content: {
    position: "relative",
    margin: "2vh 0",
    zIndex: 2,
    padding: "6vh 0 0 0",
    width: "28vh",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2vh",
    bottom: "5%",
  },
  closeButton: {
    position: "absolute",
    top: "19%",
    right: "20.5%",
    cursor: "pointer",
    fontSize: "2.3vh",
    zIndex: 3,
    color: "#000000",
  },
};

export default GPTAnswerModal;
