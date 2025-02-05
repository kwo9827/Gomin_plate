import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countLike } from "../store/slices/memberSlice";
import { toggleLike } from "../store/slices/answerSlice";

const MAX_LIKES = 36; // 좋아요 최대 개수 (3개당 초밥 1개, 12개 해금)
const SUSHI_COUNT = 12; // 총 초밥 개수

const SushiUnlock = ({ isOpen, onClose }) => {
  // const [likes, setLikes] = useState(0); // 좋아요 개수

  const dispatch = useDispatch();
  const likesReceived = useSelector((state) => state.member.likesReceived);

  useEffect(() => {
    if (isOpen) {
      dispatch(countLike()); // 모달이 열릴 때 좋아요 개수 가져오기
    }
  }, [isOpen, dispatch]);

  // 현재 해금된 초밥 개수 계산 (좋아요 3개마다 1개 해금)
  const unlockedSushiCount = Math.min(
    Math.floor(likesReceived / 3),
    SUSHI_COUNT
  );

  // 진행 바 (좋아요 개수 / 36 * 100%)
  const progressPercentage = Math.min((likesReceived / MAX_LIKES) * 100, 100);

  // 좋아요 증가
  // const handleLike = (answerId) => {
  //   dispatch(toggleLike(answerId)).then(() => {
  //     dispatch(countLike());
  //   });
  // };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* 나의 초밥 제목 */}
        <div style={outerBoxStyle}>
          <div style={innerBoxStyle}>나의 초밥</div>
          {/* 닫기 버튼 */}
          <button onClick={onClose} style={cancelButtonStyle}>
            ✖
          </button>
        </div>

        {/* 좋아요 및 프로그레스 바 */}
        <div style={progressContainer}>
          {/* 좋아요 버튼
          <button onClick={handleLike} style={likeButtonStyle}>
            ❤️
          </button> */}
          <div style={progressBar}>
            <div style={{ ...progressFill, width: `${progressPercentage}%` }} />
          </div>
          <span style={progressText}>
            {likesReceived} / {MAX_LIKES}
          </span>
        </div>

        {/* 해금된 초밥 리스트 */}
        <div style={sushiGrid}>
          {Array.from({ length: SUSHI_COUNT }).map((_, index) => (
            <div key={index} style={sushiOuterStyle}>
              <div style={sushiItem}>
                {index < unlockedSushiCount ? "🍣 해금됨" : "🔒 잠김"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 모달 배경 스타일
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

// 모달 스타일
const modalStyle = {
  backgroundColor: "#fdf5e6",
  padding: "20px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "393px",
  height: "80vh",
  maxHeight: "691px",
  position: "relative",
  border: "8px solid #906C48",
  outline: "2px solid #67523E",
  overflowY: "auto",
};

// 닫기 버튼 스타일
const cancelButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "5px 10px",
  border: "none",
  backgroundColor: "transparent",
  color: "#67523E",
  fontSize: "20px",
  cursor: "pointer",
  fontWeight: "bold",
};

// '나의 초밥' 외부 박스
const outerBoxStyle = {
  width: "100%",
  maxWidth: "250px",
  margin: "20px auto",
  border: "4px solid #8B6B3E",
  borderRadius: "8px",
  backgroundColor: "#B2975C",
  padding: "6px",
  boxSizing: "border-box",
};

// '나의 초밥' 내부 박스
const innerBoxStyle = {
  width: "100%",
  border: "2px solid #906C48",
  borderRadius: "4px",
  backgroundColor: "#B2975C",
  textAlign: "center",
  color: "#5D4A37",
  fontSize: "1.5rem",
  fontWeight: "bold",
  padding: "6px 0",
  boxSizing: "border-box",
};

// 프로그레스 바 컨테이너
const progressContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
};

const progressBar = {
  width: "80%",
  height: "15px",
  backgroundColor: "#ddd",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  marginBottom: "5px",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#FF6F61",
  borderRadius: "10px",
  transition: "width 0.5s ease-in-out", // 애니메이션 적용
};

const progressText = {
  fontSize: "14px",
  color: "#5D4A37",
  fontWeight: "bold",
};

// 초밥 리스트 스타일
const sushiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)", // 3열 정렬
  gap: "0px",
  justifyContent: "center",
  width: "100%",
  maxWidth: "400px",
  margin: "20px auto",
};

const sushiOuterStyle = {
  width: "100%",
  maxWidth: "126px",
  aspectRatio: "1/1", // 정사각형 유지
  border: "4px solid #8B6B3E",
  borderRadius: "8px",
  backgroundColor: "#B2975C",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
};

const sushiItem = {
  width: "90%",
  height: "90%",
  border: "2px solid #906C48",
  borderRadius: "4px",
  backgroundColor: "#CFC4B9",
  textAlign: "center",
  color: "#5D4A37",
  fontSize: "1.2rem",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
};

// // 좋아요 버튼
// const likeButtonStyle = {
//   backgroundColor: "transparent",
//   color: "white",
//   border: "none",
//   padding: "10px 20px",
//   borderRadius: "5px",
//   fontSize: "16px",
//   cursor: "pointer",
//   margin: "10px 0",
// };

export default SushiUnlock;
