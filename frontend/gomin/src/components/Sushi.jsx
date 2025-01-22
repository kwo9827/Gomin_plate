import React from 'react';

// 초밥 하나에 대한 컴포넌트
// 클릭이 되어야 겠죠 ?
// 초밥 타입에 따라 보여지는 이미지도 달라야할거에요 ?
// SushiView로 가야합니다 ???
const Sushi = ({ id }) => {
    // id에 따른 초밥 이름 예시 (나중에 디자인 변경을 위한 자리)
    const sushiNames = {
        1: "초밥 1 - 참치",
        2: "초밥 2 - 연어",
        3: "초밥 3 - 장어",
        4: "초밥 4 - 광어",
        5: "초밥 5 - 새우",
    };

    // id에 맞는 초밥 이름을 가져오기 (없으면 기본값 "알 수 없는 초밥")
    const sushiName = sushiNames[id] || "알 수 없는 초밥";

    return (
        <div className="sushi">
            <h3>{sushiName}</h3>
            <p>이 초밥은 {id}번 초밥입니다.</p>
        </div>
    );
};

export default Sushi;
