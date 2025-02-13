import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswerDetail } from "../store/slices/answerSlice";
import PostItAnswerModal from "../components/PostItAnswerModal";

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
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          ◀
        </button>
        <h2 style={styles.title}>{title || "제목이 없습니다"}</h2>
        <hr style={styles.divider} />
        <p style={styles.date}>
          {new Date(expirationTime).toLocaleString() || "날짜 정보 없음"}
        </p>
        <div style={styles.contentBox}>
          <p style={styles.content}>{content || "본문 내용이 없습니다"}</p>
        </div>
        <hr style={styles.divider} />
        <div style={styles.postItOuterBox}>
          <div style={styles.postItRow}>
            <div
              style={{
                ...styles.postIt,
                backgroundColor: styles.postItColors[0],
                animation: isVisible ? `fadeIn 0.5s ease forwards 0.3s` : 'none',
                opacity: 0
              }}
              onClick={() => openModal(answer)}
            >
              <p>{answer || "답변 내용 없음"}</p>
            </div>
          </div>
        </div>
        <div style={styles.arrowContainer}>
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
        </div>
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
  /**배경 스타일 */
  background: {
    // backgroundColor: "#FDFCC8",
    padding: "20px",
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
    maxWidth: "600px",
    /**디테일창 화면 전체 비율 수정할때 수정하시오
     * 현재는 화면의 80%로 설정되어있음.
     */
    height: "80vh",
    /**여기까지 */
    margin: "-5px auto",
    padding: "20px",
    boxSizing: "border-box",
    border: "6px solid #8B6B3E",
    borderRadius: "12px",
  },
  backButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  title: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  date: {
    fontSize: "1rem",
    color: "#8D7B7B",
    marginBottom: "20px",
  },
  contentBox: {
    overflowY: "auto",
    padding: "10px",
    /**디테일창 내용 박스 비율 수정할때 수정하시오
     * 현재는 화면의 20%로 설정되어있음.
     */
    height: "20vh",
    /**여기까지 */
    borderRadius: "8px",
    border: "4px solid #B2975C",
    scrollbarWidth: "none",
  },
  content: {
    fontSize: "1.1rem",
    color: "#5D4A37",
    lineHeight: "1.6",
    textAlign: "left",
    margin: "0px",
    padding: "0px",
  },
  divider: {
    width: "90%",
    margin: "20px auto",
    border: "1px solid #B2975C",
  },
  /**포스트잇 감싸는 박스 */
  postItOuterBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    overflow: "auto",
  },
  postItRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  postIt: {
    width: "100px",
    height: "100px",
    padding: "10px",
    fontSize: "0.9rem",
    color: "#5D4A37",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "6px",
    boxShadow: "3px 3px 5px rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  postItColors: ["#FFD700", "#FFA07A", "#87CEFA", "#98FB98", "#F0E68C"],
  arrowContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  arrowLeft: {
    marginRight: "10px",
    cursor: "pointer",
  },
  arrowRight: {
    marginLeft: "10px",
    cursor: "pointer",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
    color: "#5D4A37",
  },
  error: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
    color: "red",
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