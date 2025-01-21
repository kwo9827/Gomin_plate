import React from "react";
import { useParams } from "react-router-dom";

const SushiView = () => {
    // useParams 훅을 사용하여 URL에서 id를 추출
    const { id } = useParams();

    return (
        <div>
            <h2>초밥 조회 페이지임</h2>
            <p>조회한 초밥 아이디: {id}</p>
        </div>
    );
};

export default SushiView;
