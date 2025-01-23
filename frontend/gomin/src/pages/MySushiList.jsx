import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMySushi } from '../store/slices/sushiSlice';
import SushiCard from '../components/SushiCard';

// 나의 초밥 리스트를 불러와서 리스트로 뿌려줌
// 초밥 카드를 누르면 초밥 디테일로 이동함
// 지금 실제 api 만들어지면 동작할거는 주석처리함
// 더미데이터로 동작하게 되어있음
/** 내가 등록한 초밥(질문)에 대한 리스트를 출력하는 페이지
 * 1. 현재 API 연결부는 주석 처리 한 상태
 * 2. 더미데이터로 보여지고 있음
 * 3. 추후 API 구현 시 주석을 지우고 실제 연결 필요
 * 4. sushicard onclick시 sushidetail로 id를 props를 통해 연결
 */
const MySushiList = () => {
    const dispatch = useDispatch();

    // 더미 데이터
    const dummySushiData = [
        { id: 1, title: '초밥 1', plateType: '접시 1', sushiType: '연어' },
        { id: 2, title: '초밥 2', plateType: '접시 2', sushiType: '참치' },
        { id: 3, title: '초밥 3', plateType: '접시 3', sushiType: '광어' },
        { id: 4, title: '초밥 4', plateType: '접시 4', sushiType: '새우' },
        { id: 5, title: '초밥 5', plateType: '접시 5', sushiType: '장어' },
    ];

    // 나의 초밥 리스트를 불러옴 (현재는 더미 데이터로 대체)
    // const mySushi = useSelector((state) => state.sushi.mySushi);

    // 더미 데이터로 대체
    const mySushi = dummySushiData;

    useEffect(() => {
        // 실제 API 요청을 주석 처리하고, 대신 더미 데이터로 테스트
        // dispatch(fetchMySushi());
    }, [dispatch]);

    return (
        <div>
            <h1>My Sushi List</h1>
            <ul>
                {mySushi.map((sushi) => (
                    <SushiCard key={sushi.id} id={sushi.id} title={sushi.title} />
                ))}
            </ul>
        </div>
    );
};

export default MySushiList;
