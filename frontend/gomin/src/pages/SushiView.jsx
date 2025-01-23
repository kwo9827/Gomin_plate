import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** 레일에 지나가는 초밥을 눌렀을때 나타날 페이지
 * 1. 초밥 객체에 대한 정보를 받고 출력
 * 2. 사용자는 답변 입력 가능
 * 3. API 연결 완료
 */
const SushiView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {}; // state에서 id 가져오기

    const [sushiData, setSushiData] = useState(null);
    const [content, setContent] = useState('');

    const dummySushi = {
        sushiId: id,
        title: '더미 초밥 제목',
        content: '더미 초밥 내용',
        plateType: '골드',
        sushiType: '스시',
        maxAnswers: 5,
        remainingAnswers: 2,
        expirationTime: '2025-01-31T23:59:59',
    };

    useEffect(() => {
        if (!id) {
            alert('초밥 ID가 없습니다. 홈으로 이동합니다.');
            navigate('/Home');
            return;
        }
        setSushiData(dummySushi);
    }, [id, navigate]);

    const handleSubmit = () => {
        if (content.trim() === '') {
            alert('답변 내용을 입력해주세요!');
            return;
        }

        if (sushiData.remainingAnswers <= 0) {
            alert('더 이상 답변을 작성할 수 없습니다.');
            return;
        }

        console.log('작성된 답변 데이터:', {
            sushiId: sushiData.sushiId,
            content,
        });

        navigate('/Home');
    };

    const handleBack = () => {
        navigate('/Home');
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
                style={{ width: '100%' }}
            />
            <button onClick={handleSubmit}>답변 작성</button>
            <button onClick={handleBack} style={{ marginLeft: '10px' }}>
                뒤로 가기
            </button>
        </div>
    );
};

export default SushiView;
