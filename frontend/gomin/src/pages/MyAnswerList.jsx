import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAnswers } from "../store/slices/answerSlice";
import SushiAnswerCard from "../components/SushiAnswerCard";

const MyAnswerList = () => {
  const dispatch = useDispatch();
  const myAnswers = useSelector((state) => state.answer.myAnswers || {}); // 객체 초기화

  useEffect(() => {
    dispatch(
      fetchMyAnswers({
        page: 1,
        size: 10,
      })
    ).then((result) => {
      console.log("내 답변 리스트:", result.payload.data.content);
    });
  }, [dispatch]);

  useEffect(() => {
    console.log("현재 내 답변 상태:", myAnswers);
  }, [myAnswers]);

  // `myAnswers.content`가 존재하지 않으면 빈 배열을 기본값으로 설정
  const answerList = myAnswers.content || [];

  return (
    <div style={styles.background}>
      {/* 나의 답변 박스 */}
      <div style={styles.listContainer}>
        <div style={styles.position}>
          <div style={styles.outerBox}>
            <div style={styles.innerBox}>나의 답변</div>
          </div>
        </div>

        {/* 답변 리스트 */}
        {answerList.length > 0 ? ( // answerList.length로 변경
          <ul style={styles.list}>
            {answerList.map(
              (
                answer // answerList.map으로 변경
              ) => (
                <li key={answer.sushiId} style={styles.listItem}>
                  <SushiAnswerCard
                    id={answer.sushiId}
                    category={answer.category}
                    title={answer.title}
                    content={answer.content}
                    showHeart={answer.isLiked || answer.getLike}
                  />
                </li>
              )
            )}
          </ul>
        ) : (
          <div style={styles.noResult}>등록된 답변이 없습니다.</div>
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
  },
  position: {},
  /** 나의 답변 외부 박스 */
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
  /** 나의 답변 내부 박스 */
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
  /** 검색 결과 없을 때 */
  noResult: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
  /** 글 리스트 스타일 */
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "10px",
  },
};

export default MyAnswerList;
