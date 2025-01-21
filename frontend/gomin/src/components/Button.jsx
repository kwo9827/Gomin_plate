import React from 'react';

const Button = ({ color, children }) => {
    // color로 버튼의 색상을 동적으로 설정
    const buttonClass = `bg-${color}-500 text-white px-4 py-2 rounded-lg hover:bg-${color}-700 focus:outline-none`;

    return (
        <button className={buttonClass}>
            {children}
        </button>
    );
};

export default Button;
