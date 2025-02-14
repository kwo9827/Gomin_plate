import React, { useRef } from "react";
import alarmFalseImg from "../assets/home/alarmOFF.webp";
import notificationBell from "../assets/sounds/notificationBell.mp3";

/** 알림창을 열기 위한 Modal 트리거 컴포넌트
 * 1. 클릭 시 알림 모달이 열리도록 되어있음.
 * 2. 알림 모달에 관련해서는 Home page에 구현 되어있음
 * 3. 디자인만 수정하면 바로 사용가능 함.
 */
const NotificationBell = ({ onClick, hasUnread }) => {
  const audioRef = useRef(null); // audio 요소를 참조하기 위한 ref 생성

  // 클릭 시 효과음 재생
  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 소리를 50%로 설정
      audioRef.current.play(); // 효과음 재생
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${alarmFalseImg}")`,
        position: "absolute",
        top: "-49%",
        right: "0",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "50vh",
        height: "100%",
        zIndex: 2,
      }}
    >
      {/* 읽지 않은 알림 표시 빨간 동그라미 */}
      {hasUnread && (
        <div
          style={{
            position: "absolute",
            top: "55.2%",
            right: "9.5%",
            width: "2vh",
            height: "2vh",
            backgroundColor: "#ff4949",
            borderRadius: "50%",
            zIndex: 3,
          }}
        />
      )}
      {/* 클릭 이벤트를 감지할 투명 버튼 */}
      <div
        onClick={() => {
          onClick();
          handlePlaySound(); // 효과음 재생
        }}
        style={{
          position: "absolute",
          top: "61%",
          right: "2%",
          transform: "translate(-50%, -50%)",
          // 클릭 가능 영역 조정
          width: "12%",
          height: "12%",
          backgroundColor: "rgb(0, 0, 0, 0)",
          cursor: "pointer",
        }}
      ></div>
      {/* 효과음 */}
      <audio ref={audioRef}>
        <source src={notificationBell} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default NotificationBell;
