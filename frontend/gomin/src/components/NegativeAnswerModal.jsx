import React from "react";
import "../styles/font.css";

const NegativeAnswerModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.innerBox}>
          <p>부적절한 내용을 포함하고 있다냥. 열어볼꺼냥?</p>
          <div style={styles.buttonBox}>
            <button
              onClick={onConfirm}
              style={styles.openButton}
              className="custom-placeholder"
            >
              알겠다냥♧
            </button>
            <button
              onClick={onClose}
              style={styles.cancelButton}
              className="custom-placeholder"
            >
              안보겠다냥♧
            </button>
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
    zIndex: 9999,
    transition: "opacity 0.2s ease-in-out", // 더 부드러운 페이드 효과
  },
  modal: {
    backgroundColor: "#fdf5e6",
    padding: "15px",
    borderRadius: "8px",
    width: "40vh",
    maxWidth: "500px",
    position: "relative",
    border: "6px solid #906C48",
    outline: "2px solid #67523E",
    boxSizing: "border-box",
  },
  innerBox: {
    width: "100%",
    // backgroundColor: "#B2975C",
    textAlign: "center",
    color: "#5D4A37",
    fontSize: "2.5vh",
    fontWeight: "bold",
    padding: "2vh",
    boxSizing: "border-box",
    borderRadius: "6px",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2vh",
    gap: "1vh",
  },
  openButton: {
    padding: "1vh 2vh",
    border: "none",
    backgroundColor: "#906C48",
    color: "#FFF",
    fontSize: "2vh",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "5px",
    fontFamily: "inherit",
  },
  cancelButton: {
    padding: "1vh 2vh",
    border: "none",
    backgroundColor: "#67523E",
    color: "#FFF",
    fontSize: "2vh",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "5px",
    fontFamily: "inherit",
  },
};

export default NegativeAnswerModal;
