import React from "react";
import { useParams } from "react-router-dom";

const SushiDetail = () => {
    // useParams 훅을 사용하여 URL에서 id를 추출
    const { id } = useParams();

    return (
        <div>
            <h2>초밥 디테일 페이지임</h2>
            <p>현재 초밥 아이디: {id}</p>
        </div>
    );
};

export default SushiDetail;
