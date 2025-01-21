import React from 'react';

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
