import React, { useState } from "react";
import SushiCard from "../components/SushiCard";
import searchIcon from "../assets/search.png"; // search.png를 import

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
    const searchValue = e.target.value;
    setSearch(searchValue);
  };
  const filteredSushi = dummySushiData.filter((sushi) =>
    sushi.title.toLowerCase().includes(search.toLowerCase())
  );
  const onSearch = () => {
    console.log("현재 검색 상태:", search); 
  };

  return (
    <div style={backgroundStyle}>
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
            placeholder="고민을 검색해주세요."
            style={searchInputStyle}
          />
          <img
            src={searchIcon}
            alt="검색 버튼"
            onClick={onSearch} 
            style={searchImageStyle}
          />
        </div>

        {/* 검색 결과 */}
        {filteredSushi.length > 0 ? (
          <ul style={listStyle}>
            {filteredSushi.map((sushi) => (
              <li key={sushi.id}>
                <SushiCard id={sushi.id} />
              </li>
            ))}
          </ul>
        ) : (
          <div style={noResultStyle}>일치하는 고민이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

/* 전체 배경 스타일 */
const backgroundStyle = {
  backgroundColor: "#FDFCC8",
  minHeight: "100vh",
  height: "100%",
  width: "100vw",
  padding: "20px",
  boxSizing: "border-box",
  overflowX: "hidden",
};

/* 카드 리스트 스타일 */
const listContainerStyle = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  boxSizing: "border-box",
};

/* '나의 고민' 외곽 박스 */
const outerBoxStyle = {
  width: "100%",
  maxWidth: "250px",
  margin: "20px auto",
  border: "4px solid #8B6B3E",
  borderRadius: "8px",
  backgroundColor: "#B2975C",
  padding: "6px",
  boxSizing: "border-box",
};

/* '나의 고민' 내부 박스 */
const innerBoxStyle = {
  width: "100%",
  border: "2px solid #906C48",
  borderRadius: "4px",
  backgroundColor: "#B2975C",
  textAlign: "center",
  color: "#5D4A37",
  fontSize: "1.5rem",
  fontWeight: "bold",
  padding: "6px 0",
  boxSizing: "border-box",
};

/* 검색창 전체 스타일 */
const searchContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "5px", // 검색창과 돋보기 이미지지 사이 간격
  marginBottom: "10px",
};

/* 검색 입력창 */
const searchInputStyle = {
  width: "100%",
  maxWidth: "330px",
  height: "36px",
  fontSize: "1rem",
  textAlign: "center",
  padding: "0 10px",
  border: "2px solid #906C48",
  borderRadius: "6px",
  outline: "none",
};

/* 검색 이미지 버튼 */
const searchImageStyle = {
  width: "36px",
  height: "36px",
  cursor: "pointer",
};

/* 검색 결과가 없을 때 */
const noResultStyle = {
  textAlign: "center",
  color: "#8B6B3E",
  fontSize: "1.2rem",
  marginTop: "20px",
};

/* 초밥 리스트 스타일 */
const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

export default MySushiList;
