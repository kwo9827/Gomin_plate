import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSushiDetail } from "../store/slices/sushiSlice";
import { createAnswer } from "../store/slices/answerSlice";

const SushiView = ({
  isOpen,
  onClose,
  sushiId,
  category,
  sushiType,
  remainingAnswers,
  expirationTime,
}) => {
  const [sushiData, setSushiData] = useState(null);
  const [content, setContent] = useState("");
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [titleShadowColor, setTitleShadowColor] = useState(
    "rgba(255, 255, 255, 0.4)"
  );
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);
  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const currentSushi = useSelector((state) => state.sushi.currentSushi);

  // 카테고리별 형광펜 색상
  const titleShadowColors = {
    1: "rgba(255, 0, 0, 0.4)", // 사랑
    2: "rgba(255, 255, 0, 0.4)", // 우정
    3: "rgba(0, 179, 255, 0.4)", // 건강
    4: "rgba(83, 178, 0, 0.4)", // 진로
    5: "rgba(183, 6, 227, 0.4)", // 가족
    6: "rgba(157, 157, 157, 0.4)", // 기타
  };

  useEffect(() => {
    if (isOpen && sushiId) {
      dispatch(fetchSushiDetail(sushiId));
    }
  }, [dispatch, sushiId, isOpen]);

  useEffect(() => {
    setTitleShadowColor(
      titleShadowColors[category] || "rgba(255, 255, 255, 0.4)"
    );
  }, [category]);

  useEffect(() => {
    if (currentSushi) {
      setSushiData({
        sushiId: currentSushi.sushiId,
        title: currentSushi.title,
        content: currentSushi.content,
        plateType: `${category}`,
        sushiType: currentSushi.sushiType,
        maxAnswers: currentSushi.maxAnswers,
        remainingAnswers: currentSushi.remainingAnswers,
        expirationTime: currentSushi.expirationTime,
      });
    }
  }, [currentSushi, category]);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (!contentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const isScrollable = scrollHeight > clientHeight;

    if (isScrollable) {
      // 스크롤이 10px 이상 내려갔을 때 상단 페이드 표시
      setShowTopFade(scrollTop > 10);

      // 스크롤이 바닥에서 10px 이상 떨어져있을 때 하단 페이드 표시
      setShowBottomFade(scrollTop < scrollHeight - clientHeight - 10);
    } else {
      setShowTopFade(false);
      setShowBottomFade(false);
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      // 초기 상태 설정
      handleScroll();
    }
    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleOpenAnswerInput = () => {
    setShowAnswerInput(true);
  };

  const handleSubmit = async () => {
    if (content.trim() === "") {
      alert("답변 내용을 입력해주세요!");
      return;
    }
    if (content.length > 500) {
      alert("최대 500자까지 입력 가능해요!");
      return;
    }

    if (sushiData.remainingAnswers <= 0) {
      alert("답변이 마감된 초밥이에요!");
      return;
    }

    try {
      await dispatch(createAnswer({ sushiId: sushiData.sushiId, content }));
      setShowAnswerInput(false);
      setContent("");
      alert("답변이 제출되었습니다!");
      onClose();
    } catch (error) {
      console.error("답변 제출 실패:", error);
      alert("답변 제출에 실패했습니다.");
    }
  };

  const handleBack = () => {
    if (showAnswerInput) {
      setShowAnswerInput(false);
      setContent("");
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.container}>
          <div style={styles.buttonRow}>
            <div
              style={{ width: "3vh", cursor: "pointer" }}
              onClick={handleBack}
            >
              {" "}
              &lt;
            </div>
            <div style={{ width: "3vh", cursor: "pointer" }} onClick={onClose}>
              {" "}
              X{" "}
            </div>
          </div>
          {/* 메인 컨텐츠 */}
          {!showAnswerInput ? (
            <>
              <h3
                style={{
                  ...styles.title,
                  boxShadow: `0 4px 0px ${titleShadowColor}`,
                }}
              >
                {sushiData?.title}
              </h3>
              <div style={styles.contentContainer}>
                <div style={styles.contentWrapper}>
                  {showTopFade && <div style={styles.fadeIn} />}
                  <div
                    ref={contentRef}
                    style={styles.content}
                    onScroll={handleScroll}
                  >
                    <p style={styles.text}>{sushiData?.content}</p>
                  </div>
                  {showBottomFade && <div style={styles.fadeOut} />}
                </div>
              </div>
            </>
          ) : (
            <>
              <h3
                style={{
                  ...styles.title,
                  boxShadow: `0 4px 0px ${titleShadowColor}`,
                }}
              >
                {sushiData?.title}
              </h3>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="고민에 대한 의견을 나눠주세요"
                maxLength={500}
                style={styles.textarea}
              />
              <div style={styles.charCount}>{content.length} / 500</div>
            </>
          )}
          {/* 버튼 */}
          <>
            {!showAnswerInput ? (
              <button onClick={handleOpenAnswerInput} style={styles.button}>
                답변 작성
              </button>
            ) : (
              <button onClick={handleSubmit} style={styles.button}>
                제출하기
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

const styles = {
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "0.3vh",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalContent: {
    position: "relative",
    top: "6vh",
    height: "80vh",
    width: "46vh",
  },
  container: {
    width: "100%",
    height: "70vh",
    background: "#FFFEEC",
    border: "8px #906C48 solid",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2vh",
    boxSizing: "border-box",
    borderRadius: "4px",
    overflow: "hidden",
  },
  title: {
    display: "inline",
    margin: "0 2vh 1vh",
    padding: "0 10px",
    fontWeight: "bold",
    color: "#5D4A37",
    fontSize: "1.3rem",
  },
  contentContainer: {
    position: "relative",
    width: "100%",
    flex: 1,
    overflow: "hidden",
  },
  contentWrapper: {
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "scroll",
    margin: "2vh",
  },
  text: {
    margin: "3vh 0",
    fontSize: "1rem",
    lineHeight: "1.3",
    wordBreak: "break-word",
  },
  fadeIn: {
    position: "absolute",
    top: "2vh",
    left: 0,
    right: 0,
    height: "5vh",
    background:
      "linear-gradient(to top, rgba(255, 254, 236, 0), rgba(255, 254, 236, 1))",
    pointerEvents: "none",
    zIndex: 1,
  },
  fadeOut: {
    position: "absolute",
    bottom: "2vh",
    left: 0,
    right: 0,
    height: "5vh",
    background:
      "linear-gradient(to bottom, rgba(255, 254, 236, 0), rgba(255, 254, 236, 1))",
    pointerEvents: "none",
    zIndex: 1,
  },
  textarea: {
    width: "35vh",
    flex: 1,
    padding: "1vh",
    marginTop: "2vh",
    borderRadius: "6px",
    border: "4px solid #B2975C",
    fontFamily: "inherit",
    fontSize: "1.1rem",
    lineHeight: "1.5",
    resize: "none",
  },
  charCount: {
    fontSize: "0.8rem",
    textAlign: "right",
    padding: "0.5vh",
  },
  button: {
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#B2975C",
    color: "#5D4A37",
    fontSize: "1rem",
    padding: "1vh 2vh",
    margin: "0",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontFamily: "inherit",
  },
};

export default SushiView;
