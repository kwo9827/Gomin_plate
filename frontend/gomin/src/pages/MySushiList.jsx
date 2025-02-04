import React, { useState, useEffect } from "react";
import SushiCard from "../components/SushiCard";
import searchIcon from "../assets/search.png";

import { useDispatch, useSelector } from "react-redux";
import { fetchMySushi } from "../store/slices/sushiSlice";

const MySushiList = () => {
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  const dispatch = useDispatch();
  const mySushi = useSelector((state) => state.sushi.mySushi);

  useEffect(() => {
    dispatch(
      fetchMySushi({
        search: "",
        page: 1,
        size: 10,
      })
    ).then((result) => {
      console.log("내 초밥 리스트:", result.payload.data.sushi);
    });
  }, [dispatch]);

  useEffect(() => {
    console.log("현재 내 초밥 상태:", mySushi);
  }, [mySushi]);

  const filteredSushi = mySushi.filter((sushi) =>
    sushi.title.toLowerCase().includes(search.toLowerCase())
  );

  const onSearch = () => {
    console.log("현재 검색 상태:", search);
  };

  return (
    <div style={backgroundStyle}>
      <div style={listContainerStyle}>
        <div style={outerBoxStyle}>
          <div style={innerBoxStyle}>나의 고민</div>
        </div>

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

        {filteredSushi.length > 0 ? (
          <ul style={listStyle}>
            {filteredSushi.map((sushi) => (
              <li key={sushi.id}>
                <SushiCard
                  id={sushi.sushiId}
                  title={sushi.title}
                  content={sushi.content}
                />
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

const backgroundStyle = {
  backgroundColor: "#FDFCC8",
  minHeight: "100vh",
  height: "100%",
  width: "100vw",
  padding: "20px",
  boxSizing: "border-box",
  overflowX: "hidden",
};

const listContainerStyle = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  boxSizing: "border-box",
};

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

const searchContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "5px",
  marginBottom: "10px",
};

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

const searchImageStyle = {
  width: "36px",
  height: "36px",
  cursor: "pointer",
};

const noResultStyle = {
  textAlign: "center",
  color: "#8B6B3E",
  fontSize: "1.2rem",
  marginTop: "20px",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

export default MySushiList;
