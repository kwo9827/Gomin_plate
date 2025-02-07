import React from "react";
import alarmTrueImg from "../assets/home/alarmON.webp";
import alarmFalseImg from "../assets/home/alarmOFF.webp";

/** 알림창을 열기 위한 Modal 트리거 컴포넌트
 * 1. 클릭 시 알림 모달이 열리도록 되어있음.
 * 2. 알림 모달에 관련해서는 Home page에 구현 되어있음
 * 3. 디자인만 수정하면 바로 사용가능 함.
 */
const NotificationBell = ({ onClick, hasUnread }) => {
  return (
    <div
      style={{
        backgroundImage: `url("${hasUnread ? alarmFalseImg : alarmTrueImg}")`,

        position: "absolute",
        top: "-49%",
        right: "0",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",

        width: "50vw",
        height: "100%",

        zIndex: 2,
      }}
    >
      {/* 클릭 이벤트를 감지할 투명 버튼 */}
      <div
        onClick={onClick}
        style={{
          position: "absolute",
          top: "62%",
          right: "2%",
          transform: "translate(-50%, -50%)",
          // 클릭 가능 영역 조정
          width: "12%",
          height: "14%",
          backgroundColor: "rgb(0, 0, 0, 0)",
          cursor: "pointer",
        }}
      ></div>
    </div>
  );
};

export default NotificationBell;
