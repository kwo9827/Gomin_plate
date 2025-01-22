import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNickname, deleteAccount } from "../store/slices/authSlice";

// 닉네임 변경과 회원탈퇴를 수행하는 EditModal임
// 거의 다 만들어놨으니까 디자인만 만드셈 ㅅㄱ
const EditModal = ({ isOpen, onClose }) => {
    const [nickname, setNickname] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [error, setError] = useState("");

    const handleSaveNickname = async () => {
        if (!nickname.trim()) {
            setError("닉네임을 입력해주세요.");
            return;
        }

        try {
            await dispatch(updateNickname(nickname)).unwrap();
            alert("닉네임이 성공적으로 변경되었습니다.");
            setNickname("");
            onClose();
        } catch (err) {
            console.error("닉네임 변경 실패:", err);
            setError("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("정말로 회원탈퇴를 하시겠습니까?")) {
            try {
                await dispatch(deleteAccount()).unwrap();
                alert("회원탈퇴가 완료되었습니다.");
                onClose(); // 모달 닫기
            } catch (err) {
                console.error("회원탈퇴 실패:", err);
                setError("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>회원 정보 관리</h2>
                <p>현재 닉네임: {user?.nickname || "알 수 없음"}</p>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                        setNickname(e.target.value);
                        setError("");
                    }}
                    placeholder="새 닉네임 입력"
                    style={inputStyle}
                />
                {error && <p style={errorStyle}>{error}</p>}
                <button onClick={handleSaveNickname} style={buttonStyle}>
                    닉네임 저장
                </button>
                <button onClick={handleDeleteAccount} style={deleteButtonStyle}>
                    회원탈퇴
                </button>
                <button onClick={onClose} style={buttonStyle}>
                    닫기
                </button>
            </div>
        </div>
    );
};

// 스타일
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
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "300px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
};

const buttonStyle = {
    margin: "5px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
};

const deleteButtonStyle = {
    margin: "5px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#DC3545",
    color: "white",
    cursor: "pointer",
};

const errorStyle = {
    color: "red",
    marginBottom: "10px",
};

export default EditModal;
