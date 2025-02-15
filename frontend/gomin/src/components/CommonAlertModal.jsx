import React from "react";
import "../styles/font.css";

const CommonAlertModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal}>
        <div style={styles.innerBox}>
          <p>♧ {message} †</p>
          <div style={styles.buttonBox}>
            <button
              style={styles.OK}
              className="custom-placeholdernpm"
              onClick={onClose}
            >
              확인
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
    transition: "opacity 0.2s ease-in-out",
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
    padding: "0.2vh",
    borderRadius: "1vh",
    width: "35vh",
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
  OK: {
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
};

export default CommonAlertModal;
