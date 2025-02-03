import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SushiView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sushiId, category, sushiType, remainingAnswers, expirationTime } = location.state || {}; // 수정: sushiId를 정확히 가져오도록 변경

    const [sushiData, setSushiData] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!sushiId) {
            alert("초밥 ID가 없습니다. 홈으로 이동합니다.");
            navigate("/Home");
            return;
        }

        const dummySushi = {
            sushiId,
            title: "더미 초밥 제목",
            content: "더미 초밥 내용",
            plateType: "골드",
            sushiType: "스시",
            maxAnswers: 5,
            remainingAnswers: 2,
            expirationTime: "2025-01-31T23:59:59",
        };

        setSushiData(dummySushi);
    }, [sushiId, navigate]);

    const handleSubmit = () => {
        if (content.trim() === "") {
            alert("답변 내용을 입력해주세요!");
            return;
        }

        if (sushiData.remainingAnswers <= 0) {
            alert("더 이상 답변을 작성할 수 없습니다.");
            return;
        }

        console.log("작성된 답변 데이터:", {
            sushiId: sushiData.sushiId,
            content,
        });

        navigate("/Home");
    };

    const handleBack = () => {
        navigate("/Home");
    };

    if (!sushiData) {
        return <p>로딩 중...</p>;
    }

    return (
        <div>
            <h2>초밥 조회 페이지</h2>
            <h3>{sushiData.title}</h3>
            <p>{sushiData.content}</p>
            <p>접시 타입: {sushiData.plateType}</p>
            <p>초밥 타입: {sushiData.sushiType}</p>
            <p>남은 답변 수: {sushiData.remainingAnswers}</p>
            <p>유효 기간: {sushiData.expirationTime}</p>

            <h3>답변 작성</h3>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="답변을 입력하세요."
                rows="4"
                style={{ width: "100%" }}
            />
            <button onClick={handleSubmit}>답변 작성</button>
            <button onClick={handleBack} style={{ marginLeft: "10px" }}>
                뒤로 가기
            </button>
        </div>
    );
};

export default SushiView;
