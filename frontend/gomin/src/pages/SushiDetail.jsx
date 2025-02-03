import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySushiDetail } from "../store/slices/sushiSlice";
import PostItModal from "../components/PostItModal"; // PostItModal 추가

const SushiDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = location.state || {};
    const currentSushi = useSelector((state) => state.sushi.currentSushi);
    const status = useSelector((state) => state.sushi.status);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(fetchMySushiDetail(id)); // id로 상세 데이터 요청
        } else {
            navigate("/home"); // id가 없으면 홈으로 리다이렉트
        }
    }, [id, dispatch, navigate]);

    console.log(currentSushi);

    /* 모달 관련 상태 추가 */
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [likedAnswerId, setLikedAnswerId] = useState(null);  // 좋아요 상태 추가

  /* 모달 열기 */
  const openModal = (answer) => {
    setSelectedAnswer(answer);
    setModalOpen(true);
  };

  /* 모달 닫기 */
  const closeModal = () => {
    setModalOpen(false);
  };


    // currentSushi에서 데이터를 가져오고, 데이터가 없으면 더미 데이터 사용
    const sushiData = currentSushi;
    const answerList = sushiData.answer || [];
    const answersPerPage = 5;
    const totalPages = Math.ceil(answerList.length / answersPerPage);

  useEffect(() => {
    if (id) {
      dispatch(fetchMySushiDetail(id));
    }
  }, [id, dispatch]);

  if (!id) {
    navigate("/home");
    return null;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
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
    <div style={outsideStyle}>
      <div style={outerContainerStyle}>
        {/* 뒤로 가기 버튼 */}
        <button onClick={() => navigate(-1)} style={backButtonStyle}>
          ◀
        </button>

        {/* 제목 */}
        <h2 style={titleStyle}>{sushiData.title}</h2>
        <hr style={dividerStyle} />

        {/* 날짜 */}
        <p style={dateStyle}>{sushiData.expirationTime}</p>

                {/* 날짜 */}
                <p style={dateStyle}>{new Date(sushiData.expirationTime).toLocaleString()}</p>

                {/* 본문 내용 */}
                <div style={contentBoxStyle}>
                    <p style={contentStyle}>{sushiData.content}</p>
                </div>

                <hr style={dividerStyle} />

                {/* 답변 목록(포스트잇 들어갈 자리) */}
                <div style={postItWrapperStyle}>
                    <div style={postItRowStyle}>
                        {answerList.slice(currentPage * answersPerPage, currentPage * answersPerPage + 3).map((item, index) => (
                            <div
                                key={item.answerId}
                                style={{ ...postItStyle, backgroundColor: postItColors[index % postItColors.length] }}
                                onClick={() => openModal(item)} // 클릭 시 모달 열림
                            >
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                    <div style={postItRowStyle}>
                        {answerList.slice(currentPage * answersPerPage + 3, (currentPage + 1) * answersPerPage).map((item, index) => (
                            <div
                                key={item.answerId}
                                style={{ ...postItStyle, backgroundColor: postItColors[index % postItColors.length] }}
                                onClick={() => openModal(item)} // 클릭 시 모달 열림
                            >
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 양 옆으로 슬라이드 버튼 */}
                <div style={arrowContainerStyle}>
                    {currentPage > 0 && (
                        <button onClick={prevPage} style={arrowLeftStyle}>◀</button>
                    )}
                    {currentPage < totalPages - 1 && (
                        <button onClick={nextPage} style={arrowRightStyle}>▶</button>
                    )}
                </div>
            </div>

            {/* PostItModal 렌더링 - modalOpen이 true일 때만 보임 */}
            {modalOpen && <PostItModal
                isOpen={modalOpen}
                onClose={closeModal}
                answer={selectedAnswer}
                likedAnswerId={likedAnswerId}
                setLikedAnswerId={setLikedAnswerId}
            />}
        </div>

        <hr style={dividerStyle} />

        {/* 답변 목록(포스트잇 들어갈 자리) */}
        <div style={postItWrapperStyle}>
          <div style={postItRowStyle}>
            {answerList
              .slice(
                currentPage * answersPerPage,
                currentPage * answersPerPage + 3
              )
              .map((item, index) => (
                <div
                  key={item.answerId}
                  style={{
                    ...postItStyle,
                    backgroundColor: postItColors[index % postItColors.length],
                  }}
                  onClick={() => openModal(item)} // 클릭 시 모달 열림
                >
                  <p>{item.content}</p>
                </div>
              ))}
          </div>
          <div style={postItRowStyle}>
            {answerList
              .slice(
                currentPage * answersPerPage + 3,
                (currentPage + 1) * answersPerPage
              )
              .map((item, index) => (
                <div
                  key={item.answerId}
                  style={{
                    ...postItStyle,
                    backgroundColor: postItColors[index % postItColors.length],
                  }}
                  onClick={() => openModal(item)} // 클릭 시 모달 열림
                >
                  <p>{item.content}</p>
                </div>
              ))}
          </div>
        </div>

        {/* 양 옆으로 슬라이드 버튼 */}
        <div style={arrowContainerStyle}>
          {currentPage > 0 && (
            <button onClick={prevPage} style={arrowLeftStyle}>
              ◀
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button onClick={nextPage} style={arrowRightStyle}>
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

export default SushiDetail;
