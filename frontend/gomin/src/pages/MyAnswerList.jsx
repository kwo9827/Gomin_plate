import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAnswers } from "../store/slices/answerSlice";
import SushiAnswerCard from "../components/SushiAnswerCard";

/** 내가 답변한 초밥(질문)에 대한 리스트가 출력되는 페이지
 * 1. API 연결 되어있는 상태
 * 2. 디자인 수정 (MySushiList 스타일 재사용)
 */

const MyAnswerList = () => {
  const dispatch = useDispatch();
  const answerState = useSelector((state) => state.answer) || {
    myAnswers: [],
    status: "idle",
  };
  const { myAnswers, status } = answerState;
  const isLoading = status === "loading";

  /** 무한 스크롤 */
  const [hasMore, setHasMore] = useState(true); // 추가 데이터가 있는지 여부
  const observerRef = useRef(null); // Intersection Observer를 위한 ref
  const [sushiAnswerList, setSushiAnswerList] = useState([]); // 화면에 표시될 초밥 리스트
  const [page, setPage] = useState(1); // 페이지 상태
  const isInitialLoad = useRef(true); // 최초 로딩인지 확인

  useEffect(() => {
    console.log("Redux State:", answerState);
  }, [answerState]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    console.log("현재 페이지", { page });

    dispatch(fetchMyAnswers({ page, size: 10 }))
      .then((result) => {
        const data = result.payload?.data ?? { content: [], last: true };

        console.log("가져온 데이터의 수", data.content.length);

        setSushiAnswerList((prev) => {
          // 중복 데이터 방지
          const ids = new Set(prev.map((answer) => answer.sushiId));
          const uniqueData = data.content.filter(
            (answer) => !ids.has(answer.sushiId)
          );

          // 기존 데이터 유지하면서 새로운 데이터 추가
          return page === 1 && prev.length === 0
            ? uniqueData
            : [...prev, ...uniqueData];
        });

        if (data.content.length === 0 || data.last) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("데이터 로드 중 오류 발생:", error);
      });
  }, [page]);

  useEffect(() => {
    console.log("현재 내 SushAnsweriList 상태:", sushiAnswerList);
  }, [sushiAnswerList]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("마지막 답변인가요?");
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, sushiAnswerList]);

  return (
    <div style={styles.background}>
      <div style={styles.listContainer}>
        {/* '나의 답변' 타이틀 박스 */}
        <div style={styles.outerBox}>
          <div style={styles.innerBox}>나의 답변</div>
        </div>

        {isLoading ? (
          <p style={styles.loadingText}>불러오는 중...</p>
        ) : sushiAnswerList.length === 0 ? (
          <p style={styles.emptyText}>등록된 답변이 없습니다.</p>
        ) : (
          <ul style={styles.list}>
            {sushiAnswerList.map((answer, index) => (
              <li
                key={`${answer.sushiId}-${index}`}
                style={styles.listItem}
                ref={index === sushiAnswerList.length - 1 ? observerRef : null}
              >
                <SushiAnswerCard
                  id={answer.sushiId}
                  category={answer.category}
                  title={answer.title}
                  content={answer.content}
                  showHeart={answer.isLiked || answer.getLike}
                />
              </li>
            ))}
          </ul>
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
  /**나의 답변 외부 박스 */
  outerBox: {
    width: "100%",
    maxWidth: "250px",
    margin: "0px auto",
    border: "4px solid #8B6B3E",
    borderRadius: "8px",
    backgroundColor: "#B2975C",
    padding: "6px",
    boxSizing: "border-box",
  },
  /**나의 답변 내부 박스 */
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
  /**리스트 스타일 */
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  /**리스트아이템 스타일 */
  listItem: {
    marginBottom: "10px",
  },
  /**로딩 텍스트 */
  loadingText: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
  /**아무것도 없을때 */
  emptyText: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
};

// Chrome, Safari에서 스크롤바 숨기기
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.innerHTML = `
    .listContainer::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);
});

export default MyAnswerList;
