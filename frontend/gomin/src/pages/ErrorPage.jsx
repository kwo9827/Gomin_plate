import React from 'react';

const ErrorPage = () => {
    return (
        <div style={errorPageStyle}>
            <h1>404 - 페이지를 찾을 수 없습니다.</h1>
            <p>요청하신 페이지는 존재하지 않거나, 이동한 페이지가 없습니다.</p>
        </div>
    );
};

// 스타일
const errorPageStyle = {
    textAlign: 'center',
    marginTop: '50px',
};

export default ErrorPage;
