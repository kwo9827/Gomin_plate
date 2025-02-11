import React, { useState, useEffect } from "react";
import SushiCard from "../components/SushiCard";
import searchIcon from "../assets/search.png";

import { useDispatch, useSelector } from "react-redux";
import { fetchMySushi } from "../store/slices/sushiSlice";

import "../styles/font.css";

const MySushiList = () => {
  const [search, setSearch] = useState("");
  const [displaySushi, setDisplaySushi] = useState([]);

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
      console.log("내 초밥 리스트:", result.payload.data.content);
      setDisplaySushi(result.payload.data.content);
    });
  }, [dispatch]);

  useEffect(() => {
    console.log("현재 내 초밥 상태:", mySushi);

    if (!search.trim()) {
      setDisplaySushi(mySushi);
    }
  }, [mySushi, search]);

  const onSearch = () => {
    console.log("현재 검색 상태:", search);
    dispatch(
      fetchMySushi({
        search: search,
        page: 1,
        size: 10,
      })
    ).then((result) => {
      const apiResult = result.payload.data.content;
      console.log("API 검색 결과: ", apiResult);

      const filtered = apiResult.filter((sushi) =>
        sushi.title.toLowerCase().includes(search.toLowerCase())
      );
      console.log("검색 결과:", filtered);
      setDisplaySushi(filtered);
    });
  };

  return (
    <div style={styles.background}>
      {/* 나의 고민 박스 */}
      <div style={styles.listContainer}>
        <div style={styles.position}>
          <div style={styles.outerBox}>
            <div style={styles.innerBox}>나의 고민</div>
          </div>
        </div>

        {/* 검색창 */}
        <div style={styles.searchContainer}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              value={search}
              onChange={onChange}
              placeholder="고민을 검색해주세요."
              style={styles.searchInput}
              className="custom-placeholder"
            />
            <i
              className="fas fa-search"
              style={styles.searchIcon}
              onClick={onSearch}
            ></i>
          </div>
        </div>

        {/* 고민 리스트 */}
        {displaySushi && displaySushi.length > 0 ? (
          <ul style={styles.list}>
            {displaySushi.map((sushi) => (
              <li key={sushi.sushiId}>
                <SushiCard
                  id={sushi.sushiId}
                  title={sushi.title}
                  category={sushi.category}
                  content={sushi.content}
                  sushiType={sushi.sushiType}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div style={styles.noResult}>일치하는 고민이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  /**배경 스타일 */
  background: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflowY: "auto",
    scrollbarWidth: "none",
  },
  /**리스트 감싸는 스타일 */
  listContainer: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    // overflowY: "auto",
  },
  position: {
    // position: "sticky",
    // zIndex: 1000,
    // top: "0px",
    // padding: "10px",
  },
  /**나의 고민 외부 박스 */
  outerBox: {
    width: "100%",
    maxWidth: "250px",
    margin: "0px auto 10px",
    border: "4px solid #8B6B3E",
    borderRadius: "8px",
    backgroundColor: "#B2975C",
    padding: "6px",
    boxSizing: "border-box",
  },
  /**나의 고민 내부 박스 */
  innerBox: {
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
  },

  /**검색창 컨테이너 스타일 */
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    // gap: "5px",
    marginBottom: "10px",
  },

  /**돋보기 감싸는거 */
  inputWrapper: {
    position: "relative",
    width: "90%",
    maxWidth: "330px",
  },

  /**검색창 내부 스타일 */
  searchInput: {
    width: "80%",
    maxWidth: "330px",
    height: "36px",
    fontSize: "1rem",
    textAlign: "center",
    padding: "0 40px 0 10px",
    border: "2px solid #906C48",
    borderRadius: "6px",
    outline: "none",
  },

  /** 입력창 내부 돋보기 아이콘 */
  searchIcon: {
    position: "absolute",
    right: "20px", // 오른쪽에 배치
    top: "50%",
    transform: "translateY(-50%)", // 세로 중앙 정렬
    fontSize: "1.5rem",
    color: "#906C48",
    cursor: "pointer",
  },

  /**검색 결과 없을때 */
  noResult: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
  /**글 리스트 스타일 */
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
};

// Chrome, Safari에서 스크롤바 숨기기
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.innerHTML = `.listContainer::-webkit-scrollbar {
      display: none;
}`;

  document.head.appendChild(style);
});

export default MySushiList;
