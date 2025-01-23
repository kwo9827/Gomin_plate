import React from "react";
import { useNavigate } from "react-router-dom";

/** 나의 초밥(질문) 리스트, 나의 답변 리스트에 보여질 초밥카드 컴포넌트
 * 1. 클릭시 해당 초밥 id를 state로 sushidetail로 navigate됨
 * 2. 디자인 수정 필요
 */
const SushiCard = ({ id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/sushidetail", { state: { id } });
    };

    return (
        <div onClick={handleClick} style={cardStyle}>
            <p>초밥 ID: {id}</p>
        </div>
    );
};

const cardStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
};

export default SushiCard;
