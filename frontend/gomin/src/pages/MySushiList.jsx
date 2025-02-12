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
              placeholder="고민을 검색해주세요"
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
    width: "55vh",
    overflowY: "auto",
    scrollbarWidth: "none",
  },
  /**리스트 감싸는 스타일 */
  listContainer: {
    position: "absolute",
    zIndex: 2,
    width: "55vh",
    margin: "0 auto",
    padding: "3vh",
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
    width: "35vh",
    margin: "0 auto 1.5vh",
    border: "0.7vh solid #8B6B3E",
    borderRadius: "1.2vh",
    backgroundColor: "#B2975C",
    padding: "1vh",
    boxSizing: "border-box",
  },
  /**나의 고민 내부 박스 */
  innerBox: {
    width: "100%",
    border: "0.3vh solid #906C48",
    borderRadius: "0.6vh",
    backgroundColor: "#B2975C",
    textAlign: "center",
    color: "#5D4A37",
    fontSize: "3.8vh",
    fontWeight: "bold",
    padding: "0.7vh 0",
    boxSizing: "border-box",
  },

  /**검색창 컨테이너 스타일 */
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    // gap: "5px",
    marginBottom: "1vh",
  },

  /**돋보기 감싸는거 */
  inputWrapper: {
    position: "relative",
    width: "44.2vh",
  },

  /**검색창 내부 스타일 */
  searchInput: {
    width: "43vh",
    height: "5.8vh",
    fontSize: "1.8vh",
    textAlign: "center",
    border: "0.3vh solid #906C48",
    borderRadius: "1vh",
    outline: "none",
  },

  /** 입력창 내부 돋보기 아이콘 */
  searchIcon: {
    position: "absolute",
    right: "2vh", // 오른쪽에 배치
    top: "50%",
    transform: "translateY(-50%)", // 세로 중앙 정렬
    fontSize: "3vh",
    color: "#906C48",
    cursor: "pointer",
  },

  /**검색 결과 없을때 */
  noResult: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "2.8vh",
    marginTop: "3.5vh",
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
