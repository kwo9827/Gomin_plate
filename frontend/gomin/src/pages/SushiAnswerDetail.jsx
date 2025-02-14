import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswerDetail } from "../store/slices/answerSlice";
import PostItAnswerModal from "../components/PostItAnswerModal";

import postIt from "../assets/postIt.webp";

const SushiAnswerDetail = () => {
  const { sushiId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentSushi = useSelector((state) => state.answer.answerDetail);
  const status = useSelector((state) => state.answer.status);
  const [currentPage, setCurrentPage] = useState(0);

  // 애니메이션 관련 상태
  const [isVisible, setIsVisible] = useState(false);

  const {
    title = "",
    content = "",
    expirationTime = new Date(),
    createdAt = new Date(),
    answer = [],
    isLiked = new Boolean(),
  } = currentSushi || {};

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [likedAnswerId, setLikedAnswerId] = useState(null);

  useEffect(() => {
    if (!sushiId) {
      navigate("/home");
      return;
    }
    dispatch(fetchAnswerDetail(sushiId));

    // 데이터 로딩 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [sushiId, dispatch, navigate]);

  const openModal = (answer) => {
    setSelectedAnswer(answer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const answersPerPage = 5;
  const totalPages = Math.ceil(1 / answersPerPage);

  const handleGoBack = () => {
    navigate("/myAnswerList");
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "답변 내용 없음";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (status === "loading") {
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
          <button onClick={handleGoBack} style={styles.backButton}>
            &lt;
          </button>
          <p style={styles.title}>{title || "제목이 없습니다"}</p>
        </div>
        <hr style={styles.divider} />
        <p style={styles.date}>
          {new Date(createdAt).toLocaleString() || "날짜 정보 없음"}
        </p>
        <div style={styles.contentBox}>
          <p style={styles.content}>{content || "본문 내용이 없습니다"}</p>
        </div>
        <hr style={styles.divider} />
        <div style={styles.postItOuterBox}>
          <div style={styles.postItRow}>
            <div
              style={{
                ...styles.postItContainer,
                animation: isVisible
                  ? `fadeIn 0.5s ease forwards 0.3s`
                  : "none",
                opacity: 0,
              }}
            >
              <img
                src={postIt}
                alt="포스트잇"
                style={{
                  cursor: "pointer",
                  width: "37.5vh",
                  height: "37.5vh",
                  objectFit: "contain",
                }}
                onClick={() => openModal(answer)}
              />
              <p style={styles.postItText}>{truncateText(answer, 58)}</p>
            </div>
          </div>
        </div>
        {/* <div style={styles.arrowContainer}>
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              style={styles.arrowLeft}
            >
              ◀
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              style={styles.arrowRight}
            >
              ▶
            </button>
          )}
        </div> */}
      </div>
      {modalOpen && (
        <PostItAnswerModal
          isOpen={modalOpen}
          onClose={closeModal}
          content={answer}
          isLiked={isLiked}
        />
      )}
    </div>
  );
};

const styles = {
  background: {
    padding: "3vh",
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
  },
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
  headerContainer: {
    display: "flex",
    height: "10vh",
  },
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
  date: {
    fontSize: "1.8vh",
    color: "#8B6B3E",
    textAlign: "right",
    marginRight: "2vh",
    marginTop: "1vh",
    marginBottom: "1vh",
  },
  contentBox: {
    overflowY: "auto",
    padding: "1vh",
    height: "22vh",
    borderRadius: "0.8vh",
    border: "0.4vh solid #B2975C",
    scrollbarWidth: "thin",
    scrollbarColor: "#B2975C transparent",
  },
  content: {
    margin: "0",
    fontSize: "2.5vh",
    color: "#5D4A37",
  },
  divider: {
    width: "90%",
    margin: "2vh auto",
    border: "0.1vh solid #B2975C",
  },
  postItOuterBox: {
    position: "relative",
    width: "100%",
    height: "25vh",
    top: "5vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1vh",
  },
  postItRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1vh",
  },
  arrowContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    bottom: "17vh",
    height: "16%",
    width: "100%",
  },
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
  postItContainer: {
    position: "relative",
    top: "-9vh",
    width: "37.5vh",
    height: "37.5vh",
  },
  postItText: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    margin: 0,
    fontSize: "3vh",
    color: "#5D4A37",
    textAlign: "center",
    width: "20vh",
    wordBreak: "break-word",
    zIndex: 1,
    pointerEvents: "none",
  },
};

// Chrome, Safari에서 스크롤바 숨기기 및 애니메이션 키프레임 추가
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.innerHTML = `
    .listContainer::-webkit-scrollbar {
      display: none;
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

export default SushiAnswerDetail;
