import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySushiDetail } from "../store/slices/sushiSlice";
import PostItModal from "../components/PostItModal";

const SushiDetail = () => {
  // const { id } = location.state || {};
  /**sushiId useparams로 가져오기 */
  const { sushiId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentSushi = useSelector((state) => state.sushi.currentSushi);
  const status = useSelector((state) => state.sushi.status);
  const [currentPage, setCurrentPage] = useState(0);

  // 구조 분해 할당으로 안전하게 데이터 추출
  const {
    title = "",
    content = "",
    expirationTime = new Date(),
    answer = [],
  } = currentSushi || {};

  /* 모달 관련 상태 추가 */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [likedAnswerId, setLikedAnswerId] = useState(null);

  useEffect(() => {
    if (!sushiId) {
      navigate("/home");
      return;
    }
    dispatch(fetchMySushiDetail(sushiId));
  }, [sushiId, dispatch, navigate]);

  /* 모달 열기 */
  const openModal = (answer) => {
    setSelectedAnswer(answer);
    setModalOpen(true);
  };
  /* 모달 닫기 */
  const closeModal = () => {
    setModalOpen(false);
  };

  const answersPerPage = 5;
  const totalPages = Math.ceil(answer.length / answersPerPage);

  // 로딩 및 오류 상태 처리
  if (status === "loading") {
    return <div style={loadingStyle}>로딩 중...</div>;
  }

  if (status === "failed") {
    return <div style={errorStyle}>데이터를 불러오는 데 실패했습니다.</div>;
  }

  if (!currentSushi || !sushiId) {
    navigate("/home");
    return null;
  }

  /* 댓글 페이지 양 옆으로 슬라이드하기 */
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

        {/* 답변 목록(포스트잇 들어갈 자리) */}
        <div style={styles.postItOuterBox}>
          <div style={styles.postItRow}>
            {answer
              .slice(
                currentPage * answersPerPage,
                currentPage * answersPerPage + 3
              )
              .map((item, index) => (
                <div
                  key={item.answerId}
                  style={{
                    ...styles.postIt,
                    backgroundColor:
                      styles.postItColors[index % styles.postItColors.length],
                  }}
                  onClick={() => openModal(item)}
                >
                  <p>{item.content}</p>
                </div>
              ))}
          </div>
          <div style={styles.postItRow}>
            {answer
              .slice(
                currentPage * answersPerPage + 3,
                (currentPage + 1) * answersPerPage
              )
              .map((item, index) => (
                <div
                  key={item.answerId}
                  style={{
                    ...styles.postIt,
                    backgroundColor:
                      styles.postItColors[
                        index % styles.styles.postItColors.length
                      ],
                  }}
                  onClick={() => openModal(item)}
                >
                  <p>{item.content}</p>
                </div>
              ))}
          </div>
        </div>

        {/* 양 옆으로 슬라이드 버튼 */}
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
      </div>

      {/* PostItModal 렌더링 - modalOpen이 true일 때만 보임 */}
      {modalOpen && (
        <PostItModal
          isOpen={modalOpen}
          onClose={closeModal}
          answer={selectedAnswer}
          likedAnswerId={likedAnswerId}
          setLikedAnswerId={setLikedAnswerId}
        />
      )}
    </div>
  );
};

const styles = {
  /** 배경 스타일*/
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
    width: "90%",
    maxWidth: "600px",
    /**디테일창 화면 전체 비율 수정할때 수정하시오
     * 현재는 화면의 80%로 설정되어있음.
     */
    height: "80vh",
    /**여기까지 */
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    border: "6px solid #8B6B3E",
    borderRadius: "12px",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "24px",
    background: "none",
    border: "1px solid",
    cursor: "pointer",
  },
  title: {
    fontSize: "1.5rem",
    flexGrow: 1,
    textAlign: "center",
  },
  date: {
    fontSize: "1rem",
    color: "#8D7B7B",
    marginBottom: "20px",
    justifyContent: "right",
  },
  contentBox: {
    flexGrow: 4,
    overflowY: "auto",
    padding: "10px",
    /**디테일창 내용 박스 전체 비율 수정할때 수정하시오
     * 현재는 화면의 20%로 설정되어있음.
     */
    height: "20vh",
    /**여기까지 */
    borderRadius: "8px",
    border: "4px solid #B2975C",
  },
  content: {
    fontSize: "1.1rem",
    color: "#5D4A37",
    lineHeight: "1.6",
    textAlign: "left",
  },
  divider: {
    width: "90%",
    margin: "20px auto",
    border: "1px solid #B2975C",
  },
  /**포스트잇 감싸는 박스 */
  postItOuterBox: {
    flexGrow: 5,
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

// Chrome, Safari에서 스크롤바 숨기기
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.innerHTML = `
    .listContainer::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);
});

export default SushiDetail;
