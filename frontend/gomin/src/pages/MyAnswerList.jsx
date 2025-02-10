import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAnswers } from "../store/slices/answerSlice";
import SushiAnswerCard from "../components/SushiAnswerCard";

/** 내가 답변한 초밥(질문)에 대한 리스트가 출력되는 페이지
 * 1. API 연결 되어있는 상태
 * 2. 디자인 수정 (MySushiList 스타일 재사용)
 */

const MyAnswerList = () => {
  const dispatch = useDispatch();
  const { myAnswers = [], status } = useSelector((state) => state.answer);
  const isLoading = status === "loading";

  // 실제 API 데이터가 없을 경우 더미 데이터 사용
  const answerData = Array.isArray(myAnswers.content) ? myAnswers.content : []; // 배열인지 체크 후 사용

  useEffect(() => {
    dispatch(fetchMyAnswers()); // 본인 답변 리스트 가져오기
  }, [dispatch]);

  console.log(myAnswers.content);

  return (
    <div style={styles.background}>
      <div style={styles.listContainer}>
        {/* '나의 답변' 타이틀 박스 */}
        <div style={styles.outerBox}>
          <div style={styles.innerBox}>나의 답변</div>
        </div>

        {isLoading ? (
          <p style={styles.loadingText}>불러오는 중...</p>
        ) : answerData.length === 0 ? (
          <p style={styles.emptyText}>등록된 답변이 없습니다.</p>
        ) : (
          <ul style={styles.list}>
            {answerData.map((answer) => (
              <li key={answer.sushiId} style={styles.listItem}>
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
    position: "relatvie",
    zindex: 2,
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
