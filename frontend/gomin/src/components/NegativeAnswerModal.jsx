import React from "react";
import "../styles/font.css";

const NegativeAnswerModal = ({ isOpen, onClose, onConfirm }) => {
  const [isOpenPressed, setIsOpenPressed] = React.useState(false);
  const [isCancelPressed, setIsCancelPressed] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.innerBox}>
          <p>
            부적절한 내용을 포함할 수 있습니다.
            <br /> 열어보시겠습니까?
          </p>
          <div style={styles.buttonBox}>
            <button
              onClick={onClose}
              onMouseDown={() => setIsCancelPressed(true)}
              onMouseUp={() => setIsCancelPressed(false)}
              onMouseLeave={() => setIsCancelPressed(false)}
              style={{
                ...styles.cancelButton,
                backgroundColor: isCancelPressed ? "#67523E" : "#A68564",
                transform: isCancelPressed
                  ? "translateY(0.4vh)"
                  : "translateY(-0.2vh)",
                boxShadow: isCancelPressed
                  ? "0 0 0 #67523E"
                  : "0 0.4vh 0 #67523E",
              }}
              className="custom-placeholder"
            >
              아니요
            </button>
            <button
              onClick={onConfirm}
              onMouseDown={() => setIsOpenPressed(true)}
              onMouseUp={() => setIsOpenPressed(false)}
              onMouseLeave={() => setIsOpenPressed(false)}
              style={{
                ...styles.openButton,
                backgroundColor: isOpenPressed ? "#863334" : "#C85253",
                transform: isOpenPressed
                  ? "translateY(0.4vh)"
                  : "translateY(-0.2vh)",
                boxShadow: isOpenPressed
                  ? "0 0 0 #863334"
                  : "0 0.4vh 0 #863334",
              }}
              className="custom-placeholder"
            >
              네
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
  innerBox: {
    backgroundColor: "#fdf5e6",
    padding: "3vh",
    borderRadius: "2vh",
    width: "40vh",
    position: "relative",
    textAlign: "center",
    border: "1vh solid #906C48",
    outline: "0.3vh solid #67523E",
    fontSize: "2.3vh",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "3vh",
    marginBottom: "1vh",
    gap: "5vh",
  },
  openButton: {
    padding: "1vh 0",
    border: "none",
    borderRadius: "1vh",
    backgroundColor: "#A68564",
    color: "white",
    cursor: "pointer",
    width: "40%",
    whiteSpace: "nowrap",
    lineHeight: "1",
    fontFamily: "Ownglyph, Ownglyph",
    fontSize: "2.8vh",
    transition: "all 0.1s ease",
  },
  cancelButton: {
    padding: "1vh 0",
    border: "none",
    borderRadius: "1vh",
    backgroundColor: "#C85253",
    color: "white",
    cursor: "pointer",
    width: "40%",
    whiteSpace: "nowrap",
    lineHeight: "1",
    fontFamily: "Ownglyph, Ownglyph",
    fontSize: "2.8vh",
    transition: "all 0.1s ease",
  },
};

export default NegativeAnswerModal;
