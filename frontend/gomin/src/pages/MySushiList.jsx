import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchMySushi } from "../store/slices/sushiSlice";
import SushiCard from "../components/SushiCard";
import searchIcon from "../assets/search.png";

const MySushiList = () => {
  const [search, setSearch] = useState(""); // 검색어 상태
  const dispatch = useDispatch();

  /** 무한 스크롤 */
  const [hasMore, setHasMore] = useState(true); // 추가 데이터가 있는지 여부
  const observerRef = useRef(null); // Intersection Observer를 위한 ref
  const [sushiList, setSushiList] = useState([]); // 화면에 표시될 초밥 리스트
  const [page, setPage] = useState(1); // 페이지 상태
  const isInitialLoad = useRef(true); // 최초 로딩인지 확인

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    console.log("현재 페이지", { page });

    // Redux 실행
    dispatch(fetchMySushi({ search, page, size: 10 }))
      .then((result) => {
        const data = result.payload?.data ?? { content: [], last: true };

        console.log("가져온 데이터의 수", data.content.length);

        setSushiList((prev) => {
          // 중복 데이터 방지
          const ids = new Set(prev.map((sushi) => sushi.sushiId));
          const uniqueData = data.content.filter(
            (sushi) => !ids.has(sushi.sushiId)
          );

          // 기존 데이터 유지하면서 새로운 데이터 추가
          return page === 1 && prev.length === 0
            ? uniqueData
            : [...prev, ...uniqueData];
        });

        if (data.content.length === 0 || data.last) {
          setHasMore(false); // 더 가져올 데이터가 없으면 Stop
        }
      })
      .catch((error) => {
        console.error("데이터 로드 중 오류 발생:", error);
      });
  }, [page, search]);

  useEffect(() => {
    console.log("현재 내 SushiList 상태:", sushiList);
  }, [sushiList]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("마지막 게시글인가요?");
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, sushiList]);

  const onChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
    setSushiList([]); // 검색 시 기존 리스트 초기화
    setHasMore(true); // 새로운 검색 시 다시 무한 스크롤 활성화
  };

  const onSearch = () => {
    console.log("현재 검색 상태:", search);
    setPage(1);
    setSushiList([]); // 검색 시 기존 리스트 초기화
    setHasMore(true);
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
        {sushiList.length > 0 ? (
          <ul style={styles.list}>
            {sushiList.map((sushi, index) => (
              <li
                key={`${sushi.sushiId}-${index}`}
                ref={index === sushiList.length - 1 ? observerRef : null} // 마지막 게시글인지 확인
              >
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
  /** 배경 스타일 */
  background: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflowY: "auto",
    scrollbarWidth: "none",
  },
  /** 리스트 감싸는 스타일 */
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
  /** 나의 고민 외부 박스 */
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
  /** 나의 고민 내부 박스 */
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
  /** 검색창 컨테이너 스타일 */
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    marginBottom: "10px",
  },
  /** 검색창 내부 스타일 */
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
  /** 검색 결과 없을 때 */
  noResult: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
  /** 고민 리스트 스타일 */
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
    }
  `;
  document.head.appendChild(style);
});

export default MySushiList;
