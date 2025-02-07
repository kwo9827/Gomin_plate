import React from "react";
import { Link } from "react-router-dom";
import navImg from "../assets/home/nav.webp";

/** 상단 네비게이션 바 */
const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <div style={contentWrapperStyle}>
        <div style={logoStyle}>
          <Link to="/Home" style={linkStyle}>
            홈
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
      </div>
    </nav>
  );
};

// 스타일
const navbarStyle = {
  width: "100%",
  widthMax: "500px",
  backgroundImage: `url(${navImg})`, // 배경 이미지 적용
  backgroundSize: "100% auto", // 가로를 100%로 맞추고, 높이는 비율 유지
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  paddingBottom: "28.12%", // 원본 비율 유지 (221px / 786px * 100)
  position: "relative", // 내부 요소 배치 조정
};

const contentWrapperStyle = {
  position: "absolute", // 배경 위에 내용 배치
  top: "50%", // 중앙 정렬
  left: "50%",
  transform: "translate(-50%, -50%)", // 중앙 정렬
  width: "100%", // 가득 차도록 설정
  widthMax: "430px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
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
  backgroundColor: "rgba(0, 0, 0, 0.5)", // 가독성을 위한 반투명 배경
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export default Navbar;
