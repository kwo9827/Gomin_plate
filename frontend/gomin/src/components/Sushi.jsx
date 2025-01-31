import React from 'react';
import { useNavigate } from 'react-router-dom';

import eggImg from '../assets/egg.png';
import salmonImg from '../assets/salmon.png';
import shrimpImg from '../assets/shrimp.png';
import cuttleImg from '../assets/cuttle.png';
import eelImg from '../assets/eel.png';
import octopusImg from '../assets/octopus.png';
import wagyuImg from '../assets/wagyu.png';





/** 레일에서 흘러가는 초밥 하나에 대한 컴포넌트
 * 1. 레일에 흘러가는 초밥 데이터를 보여줄 컴포넌트
 * 2. id를 받아서 초밥을 구분하고
 * 3. 클릭시 sushiview로 id state를 넘기며 navigate됨
 * 4. 초밥 종류를 인자로 받아서 초밥이 다르게 보여지게 구현하면 됨
 */
const Sushi = ({ sushiId, category, sushiType, remainingAnswers, expirationTime }) => {
    const navigate = useNavigate();

    // 고민 카테고리 매핑
    const categories = {
        1: '사랑',
        2: '우정',
        3: '진로',
        4: '건강',
        5: '가족',
        6: '기타',
    };

    // 초밥 타입 매핑
    const sushiTypes = {
        1: { name: '계란', image: eggImg },
        2: { name: '연어', image: salmonImg },
        3: { name: '새우', image: shrimpImg },
        4: { name: '한치', image: cuttleImg },
        5: { name: '문어', image: octopusImg },
        6: { name: '장어', image: eelImg },
        7: { name: '와규', image: wagyuImg },
    };


    const categoryName = categories[category] || '알 수 없는 카테고리';
    const sushiName = sushiTypes[sushiType] || { name: '알 수 없는 초밥', image: null };


    const handleSushiClick = () => {
        // SushiView로 state를 전달
        navigate('/sushiview',
            { state: { sushiId, category, sushiType, remainingAnswers, expirationTime } });
    };

    return (
        <div className="sushi" onClick={handleSushiClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
            {sushiName.image && <img src={sushiName.image} alt={sushiName.name} style={{
                width: '100px', // 원하는 너비
                height: '100px', // 원하는 높이
                overflow: 'hidden', // 넘치는 부분 숨기기
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(3)',
            }} />}
            <p> ~Plates 컴포넌트~ </p>
            <h3>{sushiName.name}</h3>
            <p>고민 카테고리: {categoryName}</p>
            <p>남은 답변 수: {remainingAnswers}</p>
            <p>유효 기간: {expirationTime}</p>
        </div>
    );
};

export default Sushi;
