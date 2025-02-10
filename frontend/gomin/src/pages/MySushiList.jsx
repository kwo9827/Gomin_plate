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
          <input
            type="text"
            value={search}
            onChange={onChange}
            placeholder="고민을 검색해주세요."
            style={styles.searchInput}
          />
          <img
            src={searchIcon}
            alt="검색 버튼"
            onClick={onSearch}
            style={styles.searchImage}
          />
        </div>

        {/* 고민 리스트 */}
        {filteredSushi.length > 0 ? (
          <ul style={styles.list}>
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
    gap: "5px",
    marginBottom: "10px",
  },
  /**검색창 내부 스타일 */
  searchInput: {
    width: "100%",
    maxWidth: "330px",
    height: "36px",
    fontSize: "1rem",
    textAlign: "center",
    padding: "0 10px",
    border: "2px solid #906C48",
    borderRadius: "6px",
    outline: "none",
  },
  searchImage: {
    width: "36px",
    height: "36px",
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
