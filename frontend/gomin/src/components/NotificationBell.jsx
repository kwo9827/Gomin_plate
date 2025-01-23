import React from "react";

/** 알림창을 열기 위한 Modal 트리거 컴포넌트
 * 1. 클릭 시 알림 모달이 열리도록 되어있음.
 * 2. 알림 모달에 관련해서는 Home page에 구현 되어있음
 * 3. 디자인만 수정하면 바로 사용가능 함.
 */
const NotificationBell = ({ onClick }) => {
    return (
        <div onClick={onClick} style={{ cursor: "pointer", marginTop: "20px" }}>
            <span role="img" aria-label="bell">
                🔔
            </span>{" "}
            알림 열기
        </div>
    );
};

export default NotificationBell;
