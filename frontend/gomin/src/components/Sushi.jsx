import React from 'react';
import { useNavigate } from 'react-router-dom';

/** 레일에서 흘러가는 초밥 하나에 대한 컴포넌트
 * 1. 레일에 흘러가는 초밥 데이터를 보여줄 컴포넌트
 * 2. id를 받아서 초밥을 구분하고
 * 3. 클릭시 sushiview로 id state를 넘기며 navigate됨
 * 4. 초밥 종류를 인자로 받아서 초밥이 다르게 보여지게 구현하면 됨
 */
const Sushi = ({ id }) => {
    const navigate = useNavigate();

    const sushiNames = {
        1: "초밥 1 - 참치",
        2: "초밥 2 - 연어",
        3: "초밥 3 - 장어",
        4: "초밥 4 - 광어",
        5: "초밥 5 - 새우",
    };

    const sushiName = sushiNames[id] || "알 수 없는 초밥";

    const handleSushiClick = () => {
        // SushiView로 state를 전달
        navigate('/sushiview', { state: { id } });
    };

    return (
        <div className="sushi" onClick={handleSushiClick} style={{ cursor: 'pointer' }}>
            <h3>{sushiName}</h3>
            <p>이 초밥은 {id}번 초밥입니다.</p>
        </div>
    );
};

export default Sushi;
