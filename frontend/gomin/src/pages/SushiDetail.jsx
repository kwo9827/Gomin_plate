import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMySushiDetail,
  clearCurrentSushi,
} from "../store/slices/sushiSlice";
import PostItModal from "../components/PostItModal";
import postItImage from "../assets/PostIt.png";
import NegativeAnswerModal from "../components/NegativeAnswerModal";

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

  const {
    title = "",
    content = "",
    expirationTime = new Date(),
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
  }, [sushiId, dispatch, navigate]);

  const openAnswer = (answer) => {
    /*부적절한 답변이면 */
    if (answer.isNegative) {
      console.log("부적절한 답변");
      setNegativeAnswer(answer);
      setNegativeModalOpen(true);
    } else {
      /* 정상적인 답변이면*/
      console.log("적절한 답변");
      setSelectedAnswer(answer);
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
      <div style={styles.outerContainer}>
        {/* 뒤로 가기 버튼 */}
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          ◀
        </button>

        {/* 제목 */}
        <h2 style={styles.title}>{title}</h2>
        <hr style={styles.divider} />

        {/* 날짜 */}
        <p style={styles.date}>{new Date(expirationTime).toLocaleString()}</p>

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
                    filter: item.isNegative ? "blur(8px)" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => openAnswer(item)}
                >
                  {/* 포스트잇 안의 텍스트 */}
                  <div style={styles.postIt}>
                    <p style={styles.postItText}>{item.content}</p>
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
                ◀
              </button>
            )}
            {currentPage < totalPages - 1 && (
              <button onClick={nextPage} style={styles.arrowRight}>
                ▶
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
    padding: "20px",
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
    backgroundColor: "#FFF8E1",
  },
  /**전체 감싸는 컨테이너 */
  outerContainer: {
    backgroundColor: "#FFFEEC",
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "600px",
    height: "80vh",
    margin: "-5px auto",
    padding: "20px",
    boxSizing: "border-box",
    border: "6px solid #8B6B3E",
    borderRadius: "12px",
  },
  /**뒤로가기 버튼 */
  backButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  /**제목 */
  title: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  /**날짜 */
  date: {
    fontSize: "1rem",
    color: "#8D7B7B",
    marginBottom: "20px",
  },
  /**내용 박스 */
  contentBox: {
    overflowY: "auto",
    padding: "10px",
    height: "20vh",
    borderRadius: "8px",
    border: "4px solid #B2975C",
    scrollbarWidth: "none",
  },
  /**구분선 */
  divider: {
    width: "90%",
    margin: "20px auto",
    border: "1px solid #B2975C",
  },
  /**포스트잇 컨테이너 */
  postItContainer: {
    position: "relative",
    width: "100%",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  /**포스트잇 박스 */
  postItBox: {
    position: "absolute",
    width: "80%",
    maxWidth: "110px",
    aspectRatio: "1 / 1",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "transparent",
    margin: "0px",
  },
  /**포스트잇 디자인 */
  postIt: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${postItImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: 0,

    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    padding: "5%",
  },
  /**포스트잇 내용 */
  postItText: {
    fontSize: "0.75rem",
    color: "#5D4A37",
    fontWeight: "bold",
    textAlign: "center",
    width: "90%",
    height: "90%",
    overflow: "hidden",
    wordBreak: "break-word",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
  },
  /** 포스트잇 배치 */
  postIt1: { top: "-15%", left: "-10%", transform: "rotate(-5deg)" },
  postIt2: { top: "40%", left: "5%", transform: "rotate(3deg)" },
  postIt3: { top: "-15%", left: "25%", transform: "rotate(-2deg)" },
  postIt4: { top: "40%", left: "45%", transform: "rotate(4deg)" },
  postIt5: { top: "-15%", left: "60%", transform: "rotate(-3deg)" },
  /**화살표 컨테이너 */
  arrowContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  /**왼쪽, 오른쪽 화살표 */
  arrowLeft: { marginRight: "10px", cursor: "pointer" },
  arrowRight: { marginLeft: "10px", cursor: "pointer" },
  /**마감 안된 답변 안내문 */
  catMessage: {
    textAlign: "center",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#8B6B3E",
    marginBottom: "20px",
  },
};

// Chrome, Safari에서 스크롤바 숨기기
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.innerHTML = `.listContainer::-webkit-scrollbar {
      display: none;
    }`;
  document.head.appendChild(style);
});

export default SushiDetail;
