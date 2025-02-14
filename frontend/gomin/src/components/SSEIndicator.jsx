import React, { useState } from "react";

/** SSE 연결 상태를 표시하는 인디케이터 컴포넌트
 * 1. 연결 상태에 따라 초록색/빨간색으로 표시
 * 2. 호버 시 상태 텍스트 표시
 * 3. 연결된 상태에서는 깜빡이는 애니메이션 적용
 */
const SSEIndicator = ({ isConnected }) => {
  const [showText, setShowText] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        top: "22.7vh",
        right: "9.9vh",
        padding: "1vh",
        display: "flex",
        alignItems: "center",
        // backgroundColor: "rgba(0, 0, 0, 0.2)",
        // backdropFilter: "blur(4px)",
        borderRadius: "0.5vh",
        cursor: "pointer",
      }}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <div
        style={{
          width: "0.7vh",
          height: "0.8vh",
          borderRadius: "50%",
          backgroundColor: isConnected ? "#aaaaaa" : "#3e586e",
          // animation: isConnected ? "pulse 2s infinite" : "none",
        }}
      />
      {showText && (
        <span
          style={{
            marginLeft: "1vh",
            fontSize: "1.2vh",
            color: "white",
          }}
        >
          {isConnected ? "실시간 연결됨" : "연결 중..."}
        </span>
      )}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default SSEIndicator;
