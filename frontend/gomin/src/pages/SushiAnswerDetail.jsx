import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswerDetail } from "../store/slices/answerSlice";
import PostItModal from "../components/PostItModal";
import PostItAnswerModal from "../components/PostItAnswerModal";

const SushiAnswerDetail = () => {
  //  const { id } = location.state || {};
  /**sushiId useparams로 가져오기 */
  const { sushiId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentSushi = useSelector((state) => state.answer.answerDetail);
  const status = useSelector((state) => state.answer.status);
  const [currentPage, setCurrentPage] = useState(0);

  // 구조 분해 할당으로 안전하게 데이터 추출
  const {
    title = "",
    content = "",
    expirationTime = new Date(),
    answer = "",
    isLiked = new Boolean(),
  } = currentSushi || {};

  console.log(currentSushi); // 데이터를 잘 추출하고 있는지 확인

  /* 모달 관련 상태 추가 */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [likedAnswerId, setLikedAnswerId] = useState(null);

  useEffect(() => {
    if (!sushiId) {
      navigate("/home");
      return;
    }
    dispatch(fetchAnswerDetail(sushiId)); // API 호출
  }, [sushiId, dispatch, navigate]);

  // /* 모달 열기 */
  // const openModal = (answer) => {
  //   setSelectedAnswer(answer);
  //   setModalOpen(true);
  // };

  // /* 모달 닫기 */
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  const answersPerPage = 5;
  const totalPages = Math.ceil(1 / answersPerPage); // answer가 하나만 있으므로 페이지는 1로 고정

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

  return (
    <div style={outsideStyle}>
      <div style={outerContainerStyle}>
        {/* 뒤로 가기 버튼 */}
        <button onClick={() => navigate(-1)} style={backButtonStyle}>
          ◀
        </button>

        {/* 제목 */}
        <h2 style={titleStyle}>{title || "제목이 없습니다"}</h2>
        <hr style={dividerStyle} />

        {/* 날짜 */}
        <p style={dateStyle}>
          {new Date(expirationTime).toLocaleString() || "날짜 정보 없음"}
        </p>

        {/* 본문 내용 */}
        <div style={contentBoxStyle}>
          <p style={contentStyle}>{content || "본문 내용이 없습니다"}</p>
        </div>

        <hr style={dividerStyle} />

        {/* 답변 */}
        <div style={postItWrapperStyle}>
          <div style={postItRowStyle}>
            <div
              style={{ ...postItStyle, backgroundColor: postItColors[0] }}
              onClick={() => openModal(answer)}
            >
              <p>{answer || "답변 내용 없음"}</p>
            </div>
          </div>
        </div>

        {/* 양 옆으로 슬라이드 버튼 */}
        <div style={arrowContainerStyle}>
          {/* 버튼은 현재 페이지가 0일 때는 왼쪽으로 슬라이드 버튼 비활성화 */}
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              style={arrowLeftStyle}
            >
              ◀
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              style={arrowRightStyle}
            >
              ▶
            </button>
          )}
        </div>
      </div>

      {/* PostItModal 렌더링 - modalOpen이 true일 때만 보임 */}
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

/* 스타일들 */
const outsideStyle = {
  backgroundColor: "#FDFCC8",
  minHeight: "100vh",
  height: "100%",
  width: "100vw",
  boxSizing: "border-box",
  padding: "20px",
};

const outerContainerStyle = {
  backgroundColor: "#FFFFF0",
  minHeight: "100vh",
  padding: "20px",
  textAlign: "center",
  position: "relative",
  border: "6px solid #8B6B3E",
  borderRadius: "12px",
  boxSizing: "border-box",
  margin: "10px",
};

const backButtonStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  fontSize: "24px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#5D4A37",
};

const dateStyle = {
  fontSize: "1rem",
  color: "#8D7B7B",
  marginBottom: "20px",
};

const contentBoxStyle = {
  backgroundColor: "#FFFFF0",
  padding: "15px",
  borderRadius: "8px",
  maxWidth: "90%",
  margin: "0 auto",
  border: "4px solid #B2975C",
};

const contentStyle = {
  fontSize: "1.1rem",
  color: "#5D4A37",
  lineHeight: "1.6",
  textAlign: "left",
};

const dividerStyle = {
  width: "90%",
  margin: "20px auto",
  border: "1px solid #B2975C",
};

const postItWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  marginTop: "20px",
};

const postItRowStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const postItStyle = {
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
};

const postItColors = ["#FFD700", "#FFA07A", "#87CEFA", "#98FB98", "#F0E68C"];

const arrowContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
};

const arrowLeftStyle = { marginRight: "10px", cursor: "pointer" };
const arrowRightStyle = { marginLeft: "10px", cursor: "pointer" };

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "1.5rem",
  color: "#5D4A37",
};

const errorStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "1.5rem",
  color: "red",
};

export default SushiAnswerDetail;
