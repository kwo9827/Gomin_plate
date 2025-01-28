import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAnswers } from "../store/slices/answerSlice";

/** 내가 답변한 초밥(질문)에 대한 리스트가 출력되는 페이지
 * 1. API 연결 되어있는 상태
 * 2. 디자인 수정 필요
 */
const MyAnswerList = () => {
    const dispatch = useDispatch();
    const { myAnswers, status } = useSelector((state) => state.answer); // 슬라이스 이름 확인
    const isLoading = status === "loading";

    useEffect(() => {
        dispatch(fetchMyAnswers()); // 본인 답변 리스트 가져오기
    }, [dispatch]);

    return (
        <div>
            <h1>나의 답변 리스트</h1>
            {isLoading ? (
                <p>불러오는 중...</p>
            ) : myAnswers.length === 0 ? (
                <p>등록된 답변이 없습니다.</p>
            ) : (
                <ul>
                    {myAnswers.map((answer) => (
                        <li key={answer.sushiId} style={{ marginBottom: "10px" }}>
                            <h3>{answer.title}</h3>
                            <p>카테고리: {answer.category}</p>
                            <p>타입: {answer.sushiType}</p>
                            <p>내용: {answer.content}</p>
                            <p>
                                좋아요: {answer.getLike ? "받음" : "없음"}
                            </p>
                            <p>작성일: {answer.createdAt}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyAnswerList;
