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
        <div style={backgroundStyle}>
            <div style={listContainerStyle}>
                {/* '나의 답변' 타이틀 박스 */}
                <div style={outerBoxStyle}>
                    <div style={innerBoxStyle}>나의 답변</div>
                </div>

                {isLoading ? (
                    <p style={loadingTextStyle}>불러오는 중...</p>
                ) : answerData.length === 0 ? (
                    <p style={emptyTextStyle}>등록된 답변이 없습니다.</p>
                ) : (
                    <ul style={listStyle}>
                        {answerData.map((answer) => (
                            <li key={answer.sushiId} style={listItemStyle}>
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

/* 리스트 전체 */
const listContainerStyle = {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
};

/* '나의 답변' 박스 */
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

/* '나의 답변' 내부 박스 */
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

/* 리스트 스타일 */
const listStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
};

/* 리스트 항목 스타일 */
const listItemStyle = {
    marginBottom: "10px",
};

/* 로딩 중 텍스트 스타일 */
const loadingTextStyle = {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "1.2rem",
    marginTop: "20px",
};

/* 빈 리스트 텍스트 스타일 */
const emptyTextStyle = {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "1.2rem",
    marginTop: "20px",
};

export default MyAnswerList;
