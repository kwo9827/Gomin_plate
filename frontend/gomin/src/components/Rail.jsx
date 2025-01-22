import React from 'react';

// 초밥이 지나갈 레일 컴포넌트, 인자로 초밥리스트를 받아야겠지 ??
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
