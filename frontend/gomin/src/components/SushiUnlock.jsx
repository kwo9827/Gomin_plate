import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countLike } from "../store/slices/memberSlice";

// 초밥 이미지 임포트
import eggImg from "../assets/sushi/egg.webp";
import salmonImg from "../assets/sushi/salmon.webp";
import shrimpImg from "../assets/sushi/shrimp.webp";
import cuttleImg from "../assets/sushi/cuttle.webp";
import eelImg from "../assets/sushi/eel.webp";
import octopusImg from "../assets/sushi/octopus.webp";
import wagyuImg from "../assets/sushi/wagyu.webp";
import scallopImg from "../assets/sushi/가리비초밥.webp";
import tunaImg from "../assets/sushi/참치초밥.webp";
import uniImg from "../assets/sushi/성게알초밥.webp";
import flatfighImg from "../assets/sushi/광어초밥.webp";

const MAX_LIKES = 80; // 최대 좋아요 수 수정 (참치 해금 조건)
const SUSHI_COUNT = 11;

// 초밥 타입 매핑 수정 - Sushi.jsx와 동일한 방식으로 변경
const sushiTypes = {
  1: { name: "계란초밥", image: eggImg, requiredLikes: 0 },
  2: { name: "연어초밥", image: salmonImg, requiredLikes: 1 },
  3: { name: "새우초밥", image: shrimpImg, requiredLikes: 2 },
  4: { name: "한치초밥", image: cuttleImg, requiredLikes: 3 },
  5: { name: "문어초밥", image: octopusImg, requiredLikes: 6 },
  6: { name: "장어초밥", image: eelImg, requiredLikes: 10 },
  7: { name: "와규초밥", image: wagyuImg, requiredLikes: 15 },
  8: { name: "가리비초밥", image: scallopImg, requiredLikes: 20 },
  9: { name: "광어초밥", image: flatfighImg, requiredLikes: 30 },
  10: { name: "성게알초밥", image: uniImg, requiredLikes: 50 },
  11: { name: "참치초밥", image: tunaImg, requiredLikes: 80 },
};

const SushiUnlock = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const likesReceived = useSelector((state) => state.member.likesReceived);

  // 다음 해금될 초밥 찾기 함수 추가
  const getNextSushi = () => {
    for (let i = 1; i <= SUSHI_COUNT; i++) {
      if (sushiTypes[i].requiredLikes > likesReceived) {
        return sushiTypes[i];
      }
    }
    return sushiTypes[SUSHI_COUNT]; // 모두 해금된 경우 마지막 초밥 반환
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(countLike());
    }
  }, [isOpen, dispatch]);

  const progressPercentage = Math.min((likesReceived / MAX_LIKES) * 100, 100);
  const nextSushi = getNextSushi();

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={outerBoxStyle}>
          <div style={innerBoxStyle}>나의 초밥</div>
        </div>
        <button onClick={onClose} style={cancelButtonStyle}>
          ✖
        </button>

        <div style={progressContainer}>
          <div style={progressBarContainer}>
            <span style={leftIconStyle}>❤️</span>
            <div style={progressBar}>
              <div
                style={{ ...progressFill, width: `${progressPercentage}%` }}
              />
            </div>
            <img
              src={nextSushi.image}
              alt={nextSushi.name}
              style={rightIconStyle}
            />
          </div>
          <span style={progressText}>
            {likesReceived} / {MAX_LIKES}
          </span>
        </div>

        <div style={sushiGrid}>
          {Array.from({ length: SUSHI_COUNT }).map((_, index) => {
            const sushiInfo = sushiTypes[index + 1];
            const isUnlocked = likesReceived >= sushiInfo.requiredLikes;

            return (
              <div key={index} style={sushiOuterStyle}>
                <div style={sushiItem}>
                  {isUnlocked ? (
                    <div style={sushiImageContainer}>
                      <img
                        src={sushiInfo.image}
                        alt={sushiInfo.name}
                        style={sushiImageStyle}
                      />
                      <div style={sushiNameStyle}>{sushiInfo.name}</div>
                    </div>
                  ) : (
                    <div style={lockedStyle}>
                      <span style={lockIconStyle}>🔒</span>
                      <div style={requiredLikesStyle}>
                        {sushiInfo.requiredLikes}개의 좋아요 필요
                      </div>
                      <div style={sushiUnlockNameStyle}>{sushiInfo.name}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 스타일 정의
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backdropFilter: "blur(10px)",
};

const modalStyle = {
  backgroundColor: "#fdf5e6",
  padding: "2.5vh",
  position: "relative",
  height: "80vh",
  width: "46vh",
  border: "1vh solid #906C48",
  outline: "0.25vh solid #67523E",
  overflowY: "auto",
  scrollbarWidth: "none", // Firefox를 위한 설정
  msOverflowStyle: "none", // IE를 위한 설정
  "&::-webkit-scrollbar": {
    display: "none", // Chrome, Safari를 위한 설정
  },
  display: "flex", // 추가
  flexDirection: "column", // 추가
  alignItems: "center",
};

const outerBoxStyle = {
  width: "30vh",
  border: "0.5vh solid #906C48",
  marginTop: "0.3vh",
  marginBottom: "3vh",
  backgroundColor: "#B2975C",
  padding: "0.75vh",
  boxSizing: "border-box",
  position: "relative",
};

const innerBoxStyle = {
  width: "100%",
  border: "0.3vh solid #906C48",
  backgroundColor: "#B2975C",
  textAlign: "center",
  color: "#5D4A37",
  fontSize: "3vh",
  fontWeight: "bold",
  padding: "1vh",
  boxSizing: "border-box",
};

const cancelButtonStyle = {
  position: "absolute",
  top: "1.2vh",
  right: "1.2vh",
  width: "5vh",
  height: "5vh",
  border: "none",
  backgroundColor: "transparent",
  color: "#67523E",
  fontSize: "2.5vh",
  cursor: "pointer",
  fontWeight: "bold",
};

const progressContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "1.5vh",
  width: "80%",
  margin: "0 auto",
};

const progressBarContainer = {
  position: "relative",
  width: "100%",
  height: "3vh",
  marginBottom: "1vh",
  display: "flex",
  alignItems: "center",
};

const progressBar = {
  position: "absolute",
  width: "calc(100% - 6vh)",
  height: "2vh",
  backgroundColor: "#ddd",
  border: "0.2vh solid #906C48",
  overflow: "hidden",
  left: "3vh",
  right: "3vh",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#FF6F61",
  borderRadius: "2vh",
  transition: "width 0.5s ease-in-out",
};

const leftIconStyle = {
  position: "absolute",
  top: "-2.2vh",
  left: "0",
  fontSize: "4.8vh",
  zIndex: 3,
};

const rightIconStyle = {
  position: "absolute",
  right: "-10vh",
  top: "-13vh",
  width: "30vh",
  height: "30vh",
  objectFit: "contain",
  zIndex: 3,
  pointerEvents: "none",
};

const progressText = {
  fontSize: "1.8vh",
  color: "#5D4A37",
  fontWeight: "bold",
  marginBottom: "1vh",
};

const sushiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  justifyContent: "center",
  width: "100%",
  alignItems: "center",
};

const sushiOuterStyle = {
  width: "100%",
  aspectRatio: "1/1",
  backgroundColor: "#B2975C",
  padding: "0.5vh",
  boxSizing: "border-box",
  border: "0.3vh solid #906C48",
};

const sushiItem = {
  width: "100%",
  height: "100%",
  backgroundColor: "#E8E2D6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  border: "0.3vh solid #906C48",
  position: "relative",
};

const sushiImageContainer = {
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transform: "scale(3.5)",
  top: "2vh",
};

const sushiImageStyle = {
  width: "100%",
  height: "auto",
  objectFit: "contain",
  marginBottom: "0.6vh",
};

const sushiNameStyle = {
  position: "absolute",
  top: "7.2vh",
  width: "100%",
  color: "#5D4A37",
  textAlign: "center",
  fontSize: "0.5vh",
};

const lockedStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const lockIconStyle = {
  position: "absolute",
  top: "4.2vh",
  color: "#5D4A37",
  transform: "scale(3)",
  opacity: 0.7,
};

const requiredLikesStyle = {
  position: "absolute",
  width: "100%",
  top: "6.2vh",
  fontSize: "1.5vh",
  textAlign: "center",
  marginBottom: "0.3vh",
  padding: "0 0.5vh",
  wordBreak: "keep-all",
  color: "#5D4A37",
  textShadow: `
    -0.5px -0.5px 0 #fff,
    0.5px -0.5px 0 #fff,
    -0.5px 0.5px 0 #fff,
    0.5px 0.5px 0 #fff
  `,
};

const sushiUnlockNameStyle = {
  position: "absolute",
  top: "10.65vh",
  width: "100%",
  color: "#5D4A37",
  textAlign: "center",
  fontSize: "1.75vh",
};

export default SushiUnlock;
