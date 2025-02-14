import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMySushiDetail,
  clearCurrentSushi,
} from "../store/slices/sushiSlice";
import PostItModal from "../components/PostItModal";
import NegativeAnswerModal from "../components/NegativeAnswerModal";

import postItPink from "../assets/postIt/postIt1.webp";
import postItGreen from "../assets/postIt/postIt2.webp";
import postItBlue from "../assets/postIt/postIt3.webp";
import postItRed from "../assets/postIt/postIt4.webp";
import postItOrange from "../assets/postIt/postIt5.webp";

const postItImages = [
  postItPink, // 1
  postItGreen, // 2
  postItBlue, // 3
  postItRed, // 4
  postItOrange, // 5
];

const postItColors = {
  [postItPink]: "pink",
  [postItGreen]: "green",
  [postItBlue]: "blue",
  [postItRed]: "red",
  [postItOrange]: "orange",
};

const SushiDetail = () => {
  const { sushiId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentSushi = useSelector((state) => state.sushi.currentSushi);
  const status = useSelector((state) => state.sushi.status);
  const [currentPage, setCurrentPage] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  /* 부적절한 답변 여는 모달 */
  const [negativeModalOpen, setNegativeModalOpen] = useState(false);
  const [negativeAnswer, setNegativeAnswer] = useState(null);

  // 애니메이션 관련 state
  const [isVisible, setIsVisible] = useState(false);

  const {
    title = "",
    content = "",
    expirationTime = new Date(),
    createdAt = new Date(),
    answer = [],
    isClosed = false,
  } = currentSushi || {};

  useEffect(() => {
    if (!sushiId) {
      navigate("/home");
      return;
    }
    setTimeout(() => {
      dispatch(clearCurrentSushi());
    }, 5);

    dispatch(fetchMySushiDetail(sushiId));

    // 로딩 후 컴포넌트 페이드인 효과
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, [sushiId, dispatch, navigate, modalOpen]);

  const openAnswer = (answer, index) => {
    if (answer.isNegative) {
      console.log("부적절한 답변");
      setNegativeAnswer(answer);
      setNegativeModalOpen(true);
    } else {
      console.log("적절한 답변");
      const postItColor = postItColors[postItImages[index % 5]];
      setSelectedAnswer({ ...answer, postItColor });
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const closeNegativeModal = () => {
    setNegativeModalOpen(false);
  };

  const confirmNegativeAnswer = () => {
    closeNegativeModal();
    setSelectedAnswer(negativeAnswer);
    setNegativeAnswer(null);
    setModalOpen(true);
  };

  /** 포스트잇(댓글) 페이징 설정 */
  const answersPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(answer.length / answersPerPage));

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGoBack = () => {
    navigate("/mysushilist");
  };

  if (status === "loading" || currentSushi === null) {
    return <div style={styles.loading}>로딩 중...</div>;
  }
  if (status === "failed") {
    return <div style={styles.error}>데이터를 불러오는 데 실패했습니다.</div>;
  }
  if (!currentSushi || !sushiId) {
    navigate("/home");
    return null;
  }

  return (
    <div style={styles.background}>
      <div
        style={{
          ...styles.outerContainer,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div style={styles.headerContainer}>
          {/* 뒤로가기 버튼 추가 */}
          <button onClick={handleGoBack} style={styles.backButton}>
            &lt;
          </button>

          {/* 제목 */}
          <p style={styles.title}>
            <span style={styles.titleText}>{title}</span>
          </p>
        </div>
        <hr style={styles.divider} />
        {/* 날짜 */}
        <p style={styles.date}>
          {new Date(createdAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>

        {/* 본문 내용 */}
        <div style={styles.contentBox}>
          <p style={styles.content}>{content}</p>
        </div>

        <hr style={styles.divider} />

        {/* 포스트잇 (댓글) */}
        {!isClosed ? (
          <p style={styles.catMessage}>£아직 답변이 마감되지 않았다냥♤</p>
        ) : (
          <div style={styles.postItContainer}>
            {answer
              .slice(
                currentPage * answersPerPage,
                (currentPage + 1) * answersPerPage
              )
              .map((item, index) => (
                <div
                  key={item.answerId}
                  style={{
                    ...styles.postItBox,
                    ...styles[`postIt${index + 1}`],
                    backgroundImage: `url(${postItImages[index % 5]})`, // 5개 이미지를 순환
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: item.isNegative ? "blur(8px)" : "none",
                    cursor: "pointer",
                    animation: `fadeIn 0.5s ease forwards ${
                      0.1 + index * 0.1
                    }s`,
                    opacity: 0,
                  }}
                  onClick={() => openAnswer(item, index)}
                >
                  <div style={{ ...styles.postIt, backgroundImage: "none" }}>
                    <p style={styles.postItText}>
                      {item.content.length > 30
                        ? `${item.content.slice(0, 30)}...`
                        : item.content}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 페이지네이션 버튼 */}
        {totalPages > 1 && (
          <div style={styles.arrowContainer}>
            {currentPage > 0 && (
              <button onClick={prevPage} style={styles.arrowLeft}>
                &lt;
              </button>
            )}
            {currentPage < totalPages - 1 && (
              <button onClick={nextPage} style={styles.arrowRight}>
                &gt;
              </button>
            )}
          </div>
        )}
      </div>

      {/* PostItModal */}
      {modalOpen && (
        <PostItModal
          isOpen={modalOpen}
          onClose={closeModal}
          answer={selectedAnswer}
        />
      )}

      {/* 부적절한 답변 모달 */}
      {negativeModalOpen && (
        <NegativeAnswerModal
          isOpen={negativeModalOpen}
          onClose={closeNegativeModal}
          onConfirm={confirmNegativeAnswer}
        />
      )}
    </div>
  );
};

const styles = {
  /**배경 */
  background: {
    padding: "3vh",
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  /**전체 감싸는 컨테이너 */
  outerContainer: {
    backgroundColor: "#FFFEEC",
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "60vh",
    height: "80vh",
    margin: "-0.5vh auto",
    padding: "2vh",
    boxSizing: "border-box",
    border: "0.6vh solid #8B6B3E",
    borderRadius: "1.2vh",
  },

  /**헤더 컨테이너 */
  headerContainer: {
    display: "flex",
    height: "10vh",
  },

  /**뒤로가기 버튼 */
  backButton: {
    position: "absolute",
    left: "2vh",
    fontFamily: "'Ownglyph', Ownglyph",
    fontSize: "2.4vh",
    fontWeight: "bold",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#8B6B3E",
  },
  /**제목 */
  title: {
    width: "80%",
    fontSize: "3.5vh",
    textAlign: "center",
    margin: "0 auto",
    flex: "0 1 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  /**제목 텍스트 */
  titleText: {
    margin: 0,
    padding: 0,
  },
  /**날짜 */
  date: {
    fontSize: "1.8vh",
    color: "#8B6B3E",
    textAlign: "right",
    marginRight: "2vh",
    marginTop: "1vh",
    marginBottom: "1vh",
  },
  /**내용 박스 */
  contentBox: {
    overflowY: "auto",
    padding: "1vh",
    paddingLeft: "2vh",
    height: "22vh",
    borderRadius: "0.8vh",
    border: "0.4vh solid #B2975C",
  },
  /**내용 */
  content: {
    margin: "0",
    fontSize: "2.5vh",
    color: "#5D4A37",
  },
  /**구분선 */
  divider: {
    width: "90%",
    margin: "2vh auto",
    border: "0.1vh solid #B2975C",
  },
  /**포스트잇 컨테이너 */
  postItContainer: {
    position: "relative",
    width: "100%",
    height: "25vh",
    top: "5vh",
    left: "5.2vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  },
  /**포스트잇 박스 */
  postItBox: {
    position: "absolute",
    width: "25%",
    aspectRatio: "1 / 1",
    backgroundColor: "transparent",
    margin: "0",
    scale: "2",
    pointerEvents: "none",
  },
  /**포스트잇 디자인 */
  postIt: {
    position: "relative",
    width: "55%",
    height: "55%",
    top: "13%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5vh",
    margin: "auto",
    pointerEvents: "auto",
  },
  /**포스트잇 내용 */
  postItText: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1vh",
    color: "#5D4A37",
    textAlign: "center",
    width: "70%",
    height: "70%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  /** 포스트잇 배치 */
  postIt1: { top: "-15%", left: "-10%", transform: "rotate(-5deg)" },
  postIt2: { top: "40%", left: "5%", transform: "rotate(3deg)" },
  postIt3: { top: "-15%", left: "25%", transform: "rotate(-2deg)" },
  postIt4: { top: "40%", left: "45%", transform: "rotate(4deg)" },
  postIt5: { top: "-15%", left: "60%", transform: "rotate(-3deg)" },
  /**화살표 컨테이너 */
  arrowContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    bottom: "17vh",
    height: "16%",
    width: "100%",
  },
  /**왼쪽, 오른쪽 화살표 */
  arrowLeft: {
    position: "relative",
    top: "3vh",
    marginRight: "auto",
    height: "3vh",
    width: "3vh",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#8B6B3E",
    fontFamily: "'Ownglyph', Ownglyph",
    fontSize: "3vh",
    fontWeight: "bold",
  },
  arrowRight: {
    position: "relative",
    top: "3vh",
    marginLeft: "auto",
    height: "3vh",
    width: "3vh",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#8B6B3E",
    fontFamily: "'Ownglyph', Ownglyph",
    fontSize: "3vh",
    fontWeight: "bold",
  },
  /**마감 안된 답변 안내문 */
  catMessage: {
    textAlign: "center",
    fontSize: "2.6vh",
    fontWeight: "bold",
    color: "#8B6B3E",
    marginBottom: "2vh",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "3vh",
    color: "#8B6B3E",
  },
  error: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "3vh",
    color: "red",
  },
};

// 애니메이션 키프레임 추가
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.innerHTML = `
    .listContainer::-webkit-scrollbar {
      display: none;
    }
    
    /* contentBox 스크롤바 스타일 */
    .contentBox::-webkit-scrollbar {
      width: 0.8vh;
    }
    
    .contentBox::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .contentBox::-webkit-scrollbar-thumb {
      background: #B2975C;
      border-radius: 0.4vh;
    }
    
    .contentBox::-webkit-scrollbar-thumb:hover {
      background: #8B6B3E;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});

export default SushiDetail;
