import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNickname, deleteAccount } from "../store/slices/authSlice";

const EditModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentNickname = useSelector((state) => state.member?.nickname || "");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setNickname(currentNickname);
  }, [isOpen, currentNickname]);

  const handleSaveNickname = async () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }
    try {
      await dispatch(updateNickname(nickname)).unwrap();
      alert("닉네임이 성공적으로 변경되었습니다.");
      onClose();
    } catch (err) {
      setError("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await dispatch(deleteAccount()).unwrap();
        onClose();
      } catch (err) {
        setError("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={titleStyle}>당신을 어떻게 부르면 될까요?</h3>
        <div style={inputContainer}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setError("");
            }}
            placeholder="answer"
            style={inputStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <div style={buttonContainer}>
          <button onClick={handleSaveNickname} style={confirmButtonStyle}>
            확인
          </button>
          <button onClick={onClose} style={cancelButtonStyle}>
            취소
          </button>
        </div>
        <button onClick={handleDeleteAccount} style={deleteAccountStyle}>
          회원탈퇴
        </button>
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
};

const modalStyle = {
  backgroundColor: "#fdf5e6",
  padding: "20px",
  borderRadius: "10px",
  width: "80%",
  maxWidth: "600px",
  position: "relative",
  border: "8px solid #8b4513",
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
  marginBottom: "30px",
};

const confirmButtonStyle = {
  padding: "8px 0",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#dc3545",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  width: "40%",
  whiteSpace: "nowrap",
  lineHeight: "1",
};

const cancelButtonStyle = {
  padding: "8px 0",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#808080",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  width: "40%",
  whiteSpace: "nowrap",
  lineHeight: "1",
};

const deleteAccountStyle = {
  position: "absolute",
  bottom: "10px",
  right: "10px",
  background: "none",
  border: "none",
  color: "#666",
  fontSize: "12px",
  cursor: "pointer",
  textDecoration: "underline",
};

const errorStyle = {
  color: "#dc3545",
  fontSize: "14px",
  marginBottom: "15px",
  textAlign: "center",
};

export default EditModal;
