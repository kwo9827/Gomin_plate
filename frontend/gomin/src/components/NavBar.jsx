import React from "react";
import { Link } from "react-router-dom";

/** 상단 네비게이션 바
 * 1. 기본 틀 구성
 * 2. 디자인 새로 해야함
 * 3. 버튼 눌렀을때 동작 구현해야함 (현재는 모두 루트로 감)
 */
const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <Link to="/Home" style={linkStyle}>
          로고
        </Link>
      </div>
      <div style={buttonContainerStyle}>
        <Link to="/MySushiList" style={linkStyle}>
          <button style={buttonStyle}>MySushiList</button>
        </Link>
        <Link to="/MyAnswerList" style={linkStyle}>
          <button style={buttonStyle}>MyAnswerList</button>
        </Link>
        <Link to="/" style={linkStyle}>
          <button style={buttonStyle}>MY</button>
        </Link>
      </div>
    </nav>
  );
};

// 스타일
const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "white",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const buttonContainerStyle = {
  display: "flex",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#555",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const linkStyle = {
  textDecoration: "none", // 링크에 밑줄 없애기
  color: "white", // 링크 색상
};

// 링크 hover 시 색상 변경
const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: "#777",
};

export default Navbar;
