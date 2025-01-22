import React from "react";
import { useNavigate } from "react-router-dom";

// 초밥 리스트에 뿌려질 초밥 카드 컴포넌트임
// 클릭하면 갖고 있는 id에 해당하는 SushiDetail로 이동함
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
