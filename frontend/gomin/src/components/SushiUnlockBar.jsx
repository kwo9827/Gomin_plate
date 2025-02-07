import React from "react";
import unlockssImg from "../assets/home/open.webp";
import Sushi from "./Sushi";
import { useSelector } from "react-redux";

/** 홈 화면에서 누르면 초밥해금 화면으로 넘어가는 컴포넌트
 *  1. 클릭 시 부모 컴포넌트에서 전달한 `onClick` 실행
 */
const SushiUnlockBar = () => {
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
    <div style={styles.container}>
      <img
        src={unlockssImg}
        alt="Unlock Sushi"
        style={styles.backgroundImage}
      />

      {/* 진행 바 */}
      {/* <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progressPercentage}%`,
          }}
        />
        <span style={styles.progressText}>
          {likesReceived} / {MAX_LIKES}
        </span>
      </div> */}

      {/* 진행 바 */}
      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: progressPercentage > 0 ? `${progressPercentage}%` : "1px",
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
    width: "50%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "relative",
    top: "0",
    left: "0",
    width: "100%",
    height: "auto",
  },

  progressContainer: {
    position: "absolute",
    bottom: "34%",
    left: "64%",
    transform: "translateX(-50%)",
    width: "53%",
    height: "10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    border: "1px solid #aaa",
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
  },
};

export default SushiUnlockBar;
