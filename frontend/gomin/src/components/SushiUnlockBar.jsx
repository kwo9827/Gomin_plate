import React, { useEffect, useState } from "react";
import unlockssImg from "../assets/home/open.webp";
import Sushi from "./Sushi";
import { useSelector, useDispatch } from "react-redux";
import { countLike } from "../store/slices/memberSlice";

/** 홈 화면에서 누르면 초밥해금 화면으로 넘어가는 컴포넌트
 *  1. 클릭 시 부모 컴포넌트에서 전달한 `onClick` 실행
 */
const SushiUnlockBar = ({ onClick }) => {
  const dispatch = useDispatch();
  const likesReceived = useSelector((state) => state.member.likesReceived);

  // 컴포넌트 마운트 시 좋아요 수 가져오기
  useEffect(() => {
    dispatch(countLike());
  }, [dispatch]);

  // 상수 정의
  const LIKES_PER_SUSHI = 3; // 초밥 1개 해금에 필요한 좋아요 수
  const MAX_SUSHI = 12; // 최대 초밥 개수

  // 현재 해금된 초밥 개수 계산
  const unlockedSushiCount = Math.min(
    Math.floor(likesReceived / LIKES_PER_SUSHI),
    MAX_SUSHI
  );

  // 다음 초밥 해금까지 남은 좋아요 수 계산
  const remainingLikes = LIKES_PER_SUSHI - (likesReceived % LIKES_PER_SUSHI);

  // 현재 단계의 진행률 계산 (0-100%)
  const currentProgress =
    ((likesReceived % LIKES_PER_SUSHI) / LIKES_PER_SUSHI) * 100;

  // 다음 해금할 초밥 타입 (1-12 사이)
  const nextSushiType = Math.min(unlockedSushiCount + 1, MAX_SUSHI);

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
            width: `${currentProgress}%`,
          }}
        />
      </div>

      {/* 해금될 초밥 이미지 */}
      <div style={styles.sushiContainer}>
        <Sushi sushiType={nextSushiType} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "block",
    width: "20vh",
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
    bottom: "37%",
    left: "64%",
    transform: "translateX(-50%)",
    width: "10vh",
    height: "1.3vh",
    backgroundColor: "#e0e0e0",
    borderRadius: "10vh",
    border: "0.1vh solid #aaa",
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
