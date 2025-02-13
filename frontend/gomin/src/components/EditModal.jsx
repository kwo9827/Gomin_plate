import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNickname, deleteAccount } from "../store/slices/authSlice";
import { clearMemberData } from "../store/slices/memberSlice";
import { useNavigate } from "react-router-dom";
import "../styles/font.css";

const EditModal = ({ isOpen, onClose, onConfirm }) => {
  const dispatch = useDispatch();
  const currentNickname = localStorage.getItem("userNickname");

  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [fade, setFade] = useState(false);
  const [isEditPressed, setIsEditPressed] = React.useState(false);
  const [isCancelPressed, setIsCancelPressed] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setFade(true);
    } else {
      const timer = setTimeout(() => {
        setFade(false);
      }, 300); // 모달이 사라지는 동안 기다리는 시간 (transition duration)
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    setNickname(currentNickname);
  }, [isOpen, currentNickname]);

  const handleSaveNickname = async () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }
    try {
      const result = await dispatch(updateNickname(nickname)).unwrap();
      console.log("변경 성공:", result);
      localStorage.setItem("userNickname", nickname);
      alert("닉네임이 성공적으로 변경되었습니다.");
      onClose();
    } catch (err) {
      console.log("변경 실패:", err);
      setError("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await dispatch(deleteAccount()).unwrap();
        navigate("/");
        console.log("회원탈퇴 되긴 됨 근데 왜 네비게이트 안되냐 ?");
        onClose();
      } catch (err) {
        setError("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userNickname");
    dispatch(clearMemberData());
    navigate("/");
    onClose();
    console.log("로그아웃 버튼이 클릭되었습니다.");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 7) {
      setNickname(value);
      setError("");
    }
  };

  if (!isOpen && !fade) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.innerBox}>
          <p style={styles.titleStyle}>당신을 어떻게 부르면 될까요?</p>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={nickname}
              onChange={handleInputChange}
              placeholder="answer"
              style={styles.inputStyle}
            />
          </div>
          {error && <p style={styles.errorStyle}>{error}</p>}

          <div style={styles.buttonBox}>
            <button
              onClick={onClose}
              onMouseDown={() => setIsCancelPressed(true)}
              onMouseUp={() => setIsCancelPressed(false)}
              onMouseLeave={() => setIsCancelPressed(false)}
              style={{
                ...styles.cancelButton,
                backgroundColor: isCancelPressed ? "#863334" : "#C85253",
                transform: isCancelPressed
                  ? "translateY(0.4vh)"
                  : "translateY(-0.2vh)",
                boxShadow: isCancelPressed
                  ? "0 0 0 #863334"
                  : "0 0.4vh 0 #863334",
              }}
              className="custom-placeholder"
            >
              아니요
            </button>
            <button
              onClick={handleSaveNickname}
              onMouseDown={() => setIsEditPressed(true)}
              onMouseUp={() => setIsEditPressed(false)}
              onMouseLeave={() => setIsEditPressed(false)}
              style={{
                ...styles.editButton,
                backgroundColor: isEditPressed ? "#67523E" : "#A68564",
                transform: isEditPressed
                  ? "translateY(0.4vh)"
                  : "translateY(-0.2vh)",
                boxShadow: isEditPressed
                  ? "0 0 0 #67523E"
                  : "0 0.4vh 0 #67523E",
              }}
              className="custom-placeholder"
            >
              네
            </button>
          </div>

          <div style={styles.bottomButtonContainer}>
            <button
              onClick={handleDeleteAccount}
              style={styles.bottomButtonStyle}
            >
              회원탈퇴
            </button>
            <button onClick={handleLogout} style={styles.bottomButtonStyle}>
              로그아웃
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
  editButton: {
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
  bottomButtonContainer: {
    position: "absolute",
    bottom: "1vh",
    left: "10px",
    right: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  bottomButtonStyle: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "1.4vh",
    cursor: "pointer",
    textDecoration: "underline",
    fontFamily: "inherit",
  },
  errorStyle: {
    color: "#dc3545",
    fontSize: "14px",
    marginBottom: "15px",
    textAlign: "center",
  },
  titleStyle: {
    fontSize: "2.8vh",
    marginBottom: "20px",
    color: "#000",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: "20px",
  },
  inputStyle: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    backgroundColor: "white",
    textAlign: "center",
    boxSizing: "border-box",
    fontSize: "2.8vh",
    fontFamily: "Ownglyph, Ownglyph",
  },
};

export default EditModal;
