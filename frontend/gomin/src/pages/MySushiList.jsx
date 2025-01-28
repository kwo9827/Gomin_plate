import React, { useState } from "react";
import SushiCard from "../components/SushiCard";

const MySushiList = () => {
  const dummySushiData = [
    { id: 1, title: "임가현 1" },
    { id: 2, title: "이은지 2" },
    { id: 3, title: "심규빈 3" },
    { id: 4, title: "오승열 4" },
    { id: 5, title: "민승용 5" },
    { id: 6, title: "이상호 6" },
  ];

  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredSushi = dummySushiData.filter((sushi) =>
    sushi.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={listContainerStyle}>
      {/* '나의 고민' */}
      <div style={outerBoxStyle}>
        <div style={innerBoxStyle}>나의 고민</div>
      </div>

      {/* 검색창 */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          value={search}
          onChange={onChange}
          placeholder="검색어를 입력하세요."
          style={searchInputStyle}
        />
      </div>

      {/* 초밥 리스트 */}
      <ul style={listStyle}>
        {filteredSushi.map((sushi) => (
          <li key={sushi.id} style={listItemStyle}>
            <SushiCard id={sushi.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

/* 카드 리스트 스타일 */
const listContainerStyle = {
  width: "100%", 
  maxWidth: "600px", 
  margin: "0 auto",            // 수평 중앙 정렬
  padding: "20px",             
  boxSizing: "border-box", 
  backgroundColor: "#FDFCC8"
};

/* '나의 고민' 외부 박스 */
const outerBoxStyle = {
  width: "100%",
  maxWidth: "250px", 
  margin: "20px auto",           // 수평 중앙 정렬
  border: "4px solid #8B6B3E", // 외곽 테두리 색상
  borderRadius: "8px", 
  backgroundColor: "#B2975C", 
  padding: "6px", 
  boxSizing: "border-box",

  /* !!!!추가!!!! */
  /* 모바일 화면 대응 */
  "@media (max-width: 480px)": {
    maxWidth: "70%", // 모바일에서 너비 조정
  },
};

/* '나의 고민' 내부 박스 */
const innerBoxStyle = {
  width: "100%",
  border: "2px solid #906C48", 
  borderRadius: "4px", 
  backgroundColor: "#B2975C", 
  textAlign: "center",
  color: "#5D4A37", 
  fontSize: "1.5rem",        // font size: 32
  fontWeight: "bold",
  padding: "6px 0", 
  boxSizing: "border-box",

  /* !!!!추가!!!! */
  /* 모바일 화면 대응 */
  "@media (max-width: 480px)": {
    fontSize: "1.3rem", 
    padding: "5px 0",
  },
};

/* 검색창 테두리 */
const searchContainerStyle = {
  display: "flex", 
  justifyContent: "center",
  marginBottom: "20px",
};

/* 검색 입력창 */
const searchInputStyle = {
  width: "100%", 
  maxWidth: "330px",
  height: "36px", 
  fontSize: "1rem",     // font size 20
  textAlign: "center",
  padding: "0 10px", 
  border: "2px solid #906C48", 
  borderRadius: "6px", 
  outline: "none",         // 입력창 마우스 시 외곽선 제거

  /* !!!!추가!!!! */
  /* 모바일 화면 대응 */
  "@media (max-width: 480px)": {
    width: "90%", 
  },
};

/* 초밥 리스트 */
const listStyle = {
  listStyle: "none", 
  padding: 0, 
  margin: 0, 
};

const listItemStyle = {
  
};

export default MySushiList;
