import React from 'react';
import { useNavigate } from 'react-router-dom';

/** 홈 화면에서 누르면 초밥(질문)을 등록 하는 화면으로 넘어가는 컴포넌트
 * 1. 현재 누르면 /postsushi 라우터로 넘어가게 구현 되어있음
 * 2. 디자인만 붙이면 됩니다.
 */
const PostSushiBell = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/postsushi');
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            초밥 등록하기 벨임
        </div>
    );
};

export default PostSushiBell;
