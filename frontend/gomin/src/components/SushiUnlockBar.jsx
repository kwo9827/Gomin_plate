import React from "react";
import unlockssImg from "../assets/home/open.webp";
import Sushi from "./Sushi";
import { useSelector } from "react-redux";

/** 홈 화면에서 누르면 초밥해금 화면으로 넘어가는 컴포넌트
 *  1. 클릭 시 부모 컴포넌트에서 전달한 `onClick` 실행
 */
const SushiUnlockBar = ({ onClick }) => {
  const likesReceived = useSelector((state) => state.member.likesReceived);

  const MAX_LIKES = 36; // 최대 좋아요 개수

  // 초밥 해금 비율 계산 (남은 좋아요 수 기준)
  const nextUnlockableSushiType = Math.floor(likesReceived / 3) + 1;

  // 초밥 해금에 필요한 최소 좋아요 수 계산
  const nextUnlockableSushi = {
    likesRequired: nextUnlockableSushiType * 3,
  };

  // 진행 바 비율 계산 (획득한 좋아요 수 기준)
  const progressPercentage = nextUnlockableSushiType
    ? Math.min(
        ((likesReceived - (nextUnlockableSushi.likesRequired - 3)) / 3) * 100,
        100
      )
    : 0;

  // 최대 해금된 초밥 수를 넘지 않도록 처리
  const totalSushiTypes = 12;
  const sushiTypeToShow =
    nextUnlockableSushiType > totalSushiTypes
      ? totalSushiTypes
      : nextUnlockableSushiType;

  return (
    <div style={styles.container} onClick={onClick}>
      <img
        src={unlockssImg}
        alt="Unlock Sushi"
        style={styles.backgroundImage}
      />

      {/* 진행 바 */}
      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: progressPercentage > 0 ? `${progressPercentage}%` : "0.2vw",
          }}
        />
      </div>

      {/* 해금되지 않은 초밥 이미지 */}
      <div style={styles.sushiContainer}>
        <Sushi sushiType={sushiTypeToShow} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "block",
    width: "20vw",
    height: "10vh",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    pointerEvents: "auto",
  },
  backgroundImage: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "auto",
  },

  progressContainer: {
    position: "absolute",
    bottom: "30%",
    left: "64%",
    transform: "translateX(-50%)",
    width: "10.5vw",
    height: "1.2vh",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    border: "0.1vw solid #aaa",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4BBE0E",
    transition: "width 0.3s ease-in-out",
  },
  sushiContainer: {
    position: "absolute",
    top: "48%",
    left: "22%",
    transform: "translate(-50%, -50%) scale(0.33)",
    pointerEvents: "none",
  },
};

export default SushiUnlockBar;
