import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySushiDetail } from "../store/slices/sushiSlice";

/* 
  ✅ mysushilist에서 하나 클릭했을때 오는 초밥 디테일 페이지 
  1. 배경 스타일을 MySushiList 및 MyAnswerList와 동일하게 적용
  2. 디자인 수정 필요
  3. 답변이 간략히 보일 포스트잇 컴포넌트 구현 후 연결 필요
*/
const SushiDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = location.state || {}; // state에서 id를 가져옴
    const currentSushi = useSelector((state) => state.sushi.currentSushi);
    const status = useSelector((state) => state.sushi.status);

    useEffect(() => {
        if (id) {
            dispatch(fetchMySushiDetail(id)); // id로 상세 데이터 요청
        }
    }, [id, dispatch]);

    if (!id) {
        navigate("/home"); // id가 없으면 홈으로 리다이렉트
        return null;
    }

    if (status === "loading") {
        return <p>Loading...</p>; // 로딩 상태 표시
    }

    if (!currentSushi) {
        return <p>현재 초밥 ID :{id}</p>; // 데이터가 없을 경우 에러 메시지 표시
    }

    const { title, content, plateType, sushiType, maxAnswers, remainingAnswers, expirationTime, answer } = currentSushi.data;

    return (
        <div style={backgroundStyle}> {/* ✅ 배경 스타일 적용 */}
            <div style={detailContainerStyle}>
                <h2>{title}</h2>
                <p><strong>초밥 내용:</strong> {content}</p>
                <p><strong>접시 유형:</strong> {plateType}</p>
                <p><strong>초밥 종류:</strong> {sushiType}</p>
                <p><strong>최대 답변 수:</strong> {maxAnswers}</p>
                <p><strong>남은 답변 수:</strong> {remainingAnswers}</p>
                <p><strong>만료 시간:</strong> {expirationTime}</p>
                <h3>답변</h3>
                <ul>
                    {answer.map((item) => (
                        <li key={item.answerId}>
                            <p><strong>답변 내용:</strong> {item.content}</p>
                            <p><strong>좋아요:</strong> {item.isLiked ? "Liked" : "Not Liked"}</p>
                        </li>
                    ))}
                </ul>
                <button onClick={() => navigate("/")}>돌아가기</button>
            </div>
        </div>
    );
};

/* ✅ MySushiList & MyAnswerList 배경 스타일 적용 */
const backgroundStyle = {
    backgroundColor: "#FDFCC8",
    minHeight: "100vh",
    height: "100%",
    width: "100vw",
    padding: "20px",
    boxSizing: "border-box",
    overflowX: "hidden",
};

/* ✅ 디테일 페이지 컨테이너 스타일 */
const detailContainerStyle = {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

export default SushiDetail;
