import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNickname, deleteAccount } from "../store/slices/authSlice";
import { clearMemberData } from "../store/slices/memberSlice";
import { useNavigate } from "react-router-dom";

const EditModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentNickname = localStorage.getItem("userNickname");

  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [fade, setFade] = useState(false);

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
    <div style={{ ...overlayStyle, opacity: fade ? 1 : 0 }}>
      <div style={{ ...modalStyle, opacity: fade ? 1 : 0 }}>
        <h3 style={titleStyle}>당신을 어떻게 부르면 될까요?</h3>
        <div style={inputContainer}>
          <input
            type="text"
            value={nickname}
            onChange={handleInputChange}
            placeholder="answer"
            style={inputStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}

        <div style={buttonContainer}>
          <button onClick={onClose} style={cancelButtonStyle}>
            취소
          </button>
          <button onClick={handleSaveNickname} style={confirmButtonStyle}>
            확인
          </button>
        </div>

        <div style={bottomButtonContainer}>
          <button onClick={handleDeleteAccount} style={bottomButtonStyle}>
            회원탈퇴
          </button>
          <button onClick={handleLogout} style={bottomButtonStyle}>
            로그아웃
          </button>
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
  transition: "opacity 0.3s ease-in-out", // fade-in/fade-out 효과
};

const modalStyle = {
  backgroundColor: "#fdf5e6",
  padding: "20px",
  borderRadius: "10px",
  width: "49vh",
  maxWidth: "600px",
  position: "relative",
  border: "8px solid #906C48",
  outline: "2px solid #67523E",
  boxSizing: "border-box",
  transition: "opacity 0.3s ease-in-out", // fade-in/fade-out 효과
};

const titleStyle = {
  fontSize: "18px",
  marginBottom: "20px",
  color: "#000",
  fontWeight: "bold",
  textAlign: "center",
};

const inputContainer = {
  width: "100%",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "16px",
  backgroundColor: "white",
  textAlign: "center",
  boxSizing: "border-box",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginBottom: "1.8vh",
};

const confirmButtonStyle = {
  padding: "8px 0",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#dc3545",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  width: "15vh",
  whiteSpace: "nowrap",
  lineHeight: "1",
  fontFamily: "inherit",
};

const cancelButtonStyle = {
  padding: "8px 0",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#808080",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  width: "15vh",
  whiteSpace: "nowrap",
  lineHeight: "1",
  fontFamily: "inherit",
};

const bottomButtonContainer = {
  position: "absolute",
  bottom: "1vh",
  left: "10px",
  right: "10px",
  display: "flex",
  justifyContent: "space-between",
};

const bottomButtonStyle = {
  background: "none",
  border: "none",
  color: "#888",
  fontSize: "12px",
  cursor: "pointer",
  textDecoration: "underline",
  fontFamily: "inherit",
};

const errorStyle = {
  color: "#dc3545",
  fontSize: "14px",
  marginBottom: "15px",
  textAlign: "center",
};

export default EditModal;
