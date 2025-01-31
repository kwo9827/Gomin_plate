import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySushiDetail } from "../store/slices/sushiSlice";

const SushiDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = location.state || {}; 
    const currentSushi = useSelector((state) => state.sushi.currentSushi);
    const status = useSelector((state) => state.sushi.status);
    const [currentPage, setCurrentPage] = useState(0);

    /* GPT가 만들어준 더미 데이터 */
    const dummySushi = {
        title: "너무 잘 생겨서 남자들한테 너무 미안해요.",
        content: `저는 싸피 대전 캠퍼스 12기에서 교육을 받고 있는 ㅇㅇㅇ입니다.
        제가 다른 남자들보다 잘 생겨서 남자들이 저한테 상대적 박탈감을 느낄까 봐 많이 걱정됩니다.
        저 이렇게 잘 생겨도 괜찮은거 맞겠죠??sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        sssssssssssssssssssssssssssssssssssssssssssssssssss
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿
        규빈 상호 가현 은지 승용 승열 렛츠기릿`,
        expirationTime: "2025-01-22",
        answer: [
            { answerId: 1, content: "안녕하세요. 잘 읽었습니다." },
            { answerId: 2, content: "이 글 너무 공감돼요!" },
            { answerId: 3, content: "재밌는 이야기네요 ㅎㅎ" },
            { answerId: 4, content: "잘 보고 갑니다!" },
            { answerId: 5, content: "응원합니다!" },
            { answerId: 6, content: "좋은 글이네요." },
            { answerId: 7, content: "많이 고민하셨겠어요." },
            { answerId: 8, content: "이해됩니다." },
            { answerId: 9, content: "비슷한 경험이 있어요." },
            { answerId: 10, content: "힘내세요!" },
        ],
    };

    const sushiData = currentSushi?.data || dummySushi;
    const answerList = sushiData.answer || [];
    const answersPerPage = 5;
    const totalPages = Math.ceil(answerList.length / answersPerPage);

    useEffect(() => {
        if (id) {
            dispatch(fetchMySushiDetail(id));
        }
    }, [id, dispatch]);

    if (!id) {
        navigate("/home");
        return null;
    }

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    /* 댓글 페이지 양 옆으로 슬라이드하기 */
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={outsideStyle}>
            <div style={outerContainerStyle}>
                {/* 뒤로 가기 버튼 */}
                <button onClick={() => navigate(-1)} style={backButtonStyle}>◀</button>

                {/* 제목 */}
                <h2 style={titleStyle}>{sushiData.title}</h2>
                <hr style={dividerStyle} />

                {/* 날짜 */}
                <p style={dateStyle}>{sushiData.expirationTime}</p>

                {/* 본문 내용 */}
                <div style={contentBoxStyle}>
                    <p style={contentStyle}>{sushiData.content}</p>
                </div>

                <hr style={dividerStyle} />

                {/* 답변 목록(포스트잇 들어갈 자리) */}
                <div style={postItWrapperStyle}>
                    {/* 첫 번째 줄 (3개 or 2개??) */}
                    <div style={postItRowStyle}>
                        {answerList.slice(currentPage * answersPerPage, currentPage * answersPerPage + 3).map((item, index) => (
                            <div key={item.answerId} style={{ ...postItStyle, backgroundColor: postItColors[index % postItColors.length] }}>
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                    {/* 두 번째 줄 (2개) */}
                    <div style={postItRowStyle}>
                        {answerList.slice(currentPage * answersPerPage + 3, (currentPage + 1) * answersPerPage).map((item, index) => (
                            <div key={item.answerId} style={{ ...postItStyle, backgroundColor: postItColors[index % postItColors.length] }}>
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 양 옆으로 슬라이드 버튼 */}
                <div style={arrowContainerStyle}>
                    {currentPage > 0 && (
                        <button onClick={prevPage} style={arrowLeftStyle}>◀</button>
                    )}
                    {currentPage < totalPages - 1 && (
                        <button onClick={nextPage} style={arrowRightStyle}>▶</button>
                    )}
                </div>
            </div>
        </div>
    );
};

/* 뒷배경 */
const outsideStyle = {
    backgroundColor: "#FDFCC8",
};

/* 바깥 테두리 */
const outerContainerStyle = {
    backgroundColor: "#FFFFF0",
    minHeight: "100vh",
    padding: "20px",
    textAlign: "center",
    position: "relative",
    border: "6px solid #8B6B3E",
    borderRadius: "12px",
    boxSizing: "border-box",
    margin: "10px",
};

/* 뒤로 가기 */
const backButtonStyle = {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
};

/* 제목 */
const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#5D4A37",
};

/* 날짜 */
const dateStyle = {
    fontSize: "1rem",
    color: "#8D7B7B",
    marginBottom: "20px",
};

/* 본문 내용 박스 */
const contentBoxStyle = {
    backgroundColor: "#FFFFF0",
    padding: "15px",
    borderRadius: "8px",
    maxWidth: "90%",
    margin: "0 auto",
    border: "4px solid #B2975C",
};

/* 본문 내용 */
const contentStyle = {
    fontSize: "1.1rem",
    color: "#5D4A37",
    lineHeight: "1.6",
    textAlign: "left",
};

/* 구분선 */
const dividerStyle = {
    width: "90%",
    margin: "20px auto",
    border: "1px solid #B2975C",
};

/* 포스트잇 배치 */
const postItWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
};

/* 포스트잇 줄 스타일 */
const postItRowStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
};

/* 포스트잇 스타일 */
const postItStyle = {
    width: "100px",
    height: "100px",
    padding: "10px",
    fontSize: "0.9rem",
    color: "#5D4A37",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "6px",
    boxShadow: "3px 3px 5px rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

/* 포스트잇 배경색 */
const postItColors = ["#FFD700", "#FFA07A", "#87CEFA", "#98FB98", "#F0E68C"];

/* 화살표 컨테이너 */
const arrowContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
};

/* 화살표 스타일 */
const arrowLeftStyle = { marginRight: "10px", cursor: "pointer" };
const arrowRightStyle = { marginLeft: "10px", cursor: "pointer" };

export default SushiDetail;
