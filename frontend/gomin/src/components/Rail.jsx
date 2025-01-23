import React from 'react';

/** 초밥이 지나갈 레일 컴포넌트
 * 1. 초밥 데이터를 배열로 받는다
 * 2. 초밥 객체를 흘려보낸다.
 */
const Rail = ({ sushiData }) => {
    return (
        <div>
            <h2>레일 위의 초밥들</h2>
            <ul>
                {sushiData.map((sushi) => (
                    <li key={sushi.id}>
                        <img src={sushi.img} alt={sushi.name} />
                        <p>{sushi.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Rail;
