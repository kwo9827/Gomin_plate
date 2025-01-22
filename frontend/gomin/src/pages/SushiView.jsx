import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSushiDetail } from '../features/sushi/sushiSlice';

// 나중에 라우터로 id 뜨게하지마셈
const SushiView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [sushiData, setSushiData] = useState(null);
    const [content, setContent] = useState('');

    // 더미 데이터 (API 대신 사용)
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
        // 실제 API 호출 (주석 처리)
        // dispatch(fetchSushiDetail(id))
        //     .unwrap()
        //     .then((data) => {
        //         setSushiData(data);
        //     })
        //     .catch((error) => {
        //         console.error('초밥 정보를 불러오는 데 실패했습니다.', error);
        //     });

        // 더미 데이터 설정
        setSushiData(dummySushi);
    }, [id]);

    const handleSubmit = () => {
        if (content.trim() === '') {
            alert('답변 내용을 입력해주세요!');
            return;
        }

        if (sushiData.remainingAnswers <= 0) {
            alert('더 이상 답변을 작성할 수 없습니다.');
            return;
        }

        // 실제 API 요청 (주석 처리)
        // dispatch(createAnswer({ sushiId: sushiData.sushiId, content }))
        //     .unwrap()
        //     .then(() => {
        //         navigate('/Home');
        //     })
        //     .catch((error) => {
        //         console.error('답변 작성에 실패했습니다.', error);
        //     });

        // 더미 데이터로 동작
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
