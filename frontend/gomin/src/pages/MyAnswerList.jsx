import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAnswers } from "../store/slices/answerSlice";
import SushiAnswerCard from "../components/SushiAnswerCard";
import { useTrail, animated } from "@react-spring/web";

const MyAnswerList = () => {
  const dispatch = useDispatch();
  const [displayAnswers, setDisplayAnswers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [initialLoding, setInitialLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchInitialData = async () => {
      try {
        const result = await dispatch(
          fetchMyAnswers({
            page: 1,
            size: 10,
          })
        );

        if (mounted && result.payload && result.payload.data) {
          setInitialLoading(false);
          setDisplayAnswers(result.payload.data.content);
          setHasMore(result.payload.data.content.length === 10);
        }
      } catch (error) {
        console.error("초기 데이터 로딩 실패:", error);
      }
    };

    fetchInitialData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (!loading && hasMore && scrollHeight - scrollTop <= clientHeight + 100) {
      loadMore();
    }
  };

  const loadMore = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    console.log("다음 페이지 요청:", { nextPage });

    dispatch(
      fetchMyAnswers({
        page: nextPage,
        size: 10,
      })
    ).then((result) => {
      if (result.payload && result.payload.data) {
        const newAnswers = result.payload.data.content;

        console.log("새로 불러온 답변 수", newAnswers.length);

        if (newAnswers.length < 10) {
          console.log("더 이상 불러올 데이터가 없습니다.");
          setHasMore(false);
        }
        setDisplayAnswers((prev) => [...prev, ...newAnswers]);
        setPage(nextPage);
      }
      setLoading(false);
    });
  };

  // 애니메이션을 위해 useTrail 사용
  const trail = useTrail(displayAnswers.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { tension: 250, friction: 25 },
  });

  return (
    <div style={styles.background} onScroll={handleScroll}>
      <div style={styles.listContainer}>
        <div style={styles.position}>
          <div style={styles.outerBox}>
            <div style={styles.innerBox}>나의 답변</div>
          </div>
        </div>

        {displayAnswers && displayAnswers.length > 0 ? (
          <ul style={styles.list}>
            {trail.map((style, index) => (
              <animated.li
                key={`${displayAnswers[index].sushiId}-${index}`}
                style={style}
              >
                <SushiAnswerCard
                  id={displayAnswers[index].sushiId}
                  category={displayAnswers[index].category}
                  title={displayAnswers[index].title}
                  content={displayAnswers[index].content}
                  showHeart={
                    displayAnswers[index].isLiked ||
                    displayAnswers[index].getLike
                  }
                  sushiType={displayAnswers[index].sushiType}
                />
              </animated.li>
            ))}
          </ul>
        ) : initialLoding ? (
          <div style={styles.noResult}></div>
        ) : (
          <div style={styles.noResult}>등록된 답변이 없습니다.</div>
        )}

        {/* 로딩 표시 */}
        {loading && <div style={styles.loadingText}>로딩 중...</div>}

        {/* 더 이상 데이터가 없을 때 메시지 */}
        {!hasMore && displayAnswers.length > 0 && (
          <div style={styles.endMessage}>더 이상 답변이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  /** 배경 스타일 */
  background: {
    position: "relative",
    height: `calc(100 * var(--custom-vh))`,
    width: `calc(55 * var(--custom-vh))`,
    overflowY: "auto",
    scrollbarWidth: "none",
  },
  /** 리스트 감싸는 스타일 */
  listContainer: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: `calc(55 * var(--custom-vh))`,
    margin: "0 auto",
    padding: `calc(3 * var(--custom-vh))`,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  position: {},
  /** 나의 답변 외부 박스 */
  outerBox: {
    width: `calc(35 * var(--custom-vh))`,
    margin: `0 auto calc(1.5 * var(--custom-vh))`,
    border: `calc(0.7 * var(--custom-vh)) solid #8B6B3E`,
    borderRadius: `calc(1.2 * var(--custom-vh))`,
    backgroundColor: "#B2975C",
    padding: `calc(1 * var(--custom-vh))`,
    boxSizing: "border-box",
  },
  /** 나의 답변 내부 박스 */
  innerBox: {
    width: "100%",
    border: `calc(0.3 * var(--custom-vh)) solid #906C48`,
    borderRadius: `calc(0.6 * var(--custom-vh))`,
    backgroundColor: "#B2975C",
    textAlign: "center",
    color: "#5D4A37",
    fontSize: `calc(3.8 * var(--custom-vh))`,
    fontWeight: "bold",
    padding: `calc(0.7 * var(--custom-vh)) 0`,
    boxSizing: "border-box",
  },
  /** 검색 결과 없을 때 */
  noResult: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: `calc(2.8 * var(--custom-vh))`,
    marginTop: `calc(3.5 * var(--custom-vh))`,
  },
  /** 글 리스트 스타일 */
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: `calc(50 * var(--custom-vh))`,
    height: `calc(100 * var(--custom-vh))`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // listItem: {
  //   width: "100%",
  //   padding: `0 calc(1.5 * var(--custom-vh))`,
  //   boxSizing: "border-box",
  //   marginBottom: `calc(1 * var(--custom-vh))`,
  // },
  loadingText: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: `calc(2 * var(--custom-vh))`,
    padding: `calc(2 * var(--custom-vh)) 0`,
  },
  endMessage: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: `calc(2 * var(--custom-vh))`,
    padding: `calc(2 * var(--custom-vh)) 0`,
  },
};

export default MyAnswerList;
