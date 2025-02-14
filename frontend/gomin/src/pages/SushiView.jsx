import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSushiDetail } from "../store/slices/sushiSlice";
import { createAnswer } from "../store/slices/answerSlice";
import AnswerSubmitCheckModal from "../components/AnswerSubmitCheckModal";
import CommonAlertModal from "../components/CommonAlertModal";

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
  const [opacity, setOpacity] = useState(0);
  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const currentSushi = useSelector((state) => state.sushi.currentSushi);

  const [modalOpen, setModalOpen] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
  });

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
    if (isOpen) {
      setOpacity(0);
      setTimeout(() => setOpacity(1), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && sushiId) {
      dispatch(fetchSushiDetail(sushiId));
      if (currentSushi === "loading") {
        return <div style={styles.loading}>로딩 중...</div>;
      }
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
      setShowTopFade(scrollTop > 10);
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
      handleScroll();
    }
    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.overflow = "auto";
      contentRef.current.style.scrollbarWidth = "none";
      contentRef.current.style.msOverflowStyle = "none";
    }
  }, []);

  const handleOpenAnswerInput = () => {
    setShowAnswerInput(true);
  };

  const showAlert = (message) => {
    setAlertModal({
      isOpen: true,
      message,
    });
  };

  const handleSubmit = async () => {
    if (content.trim() === "") {
      showAlert("답변 내용을 입력해주세요!");
      return;
    }
    if (content.length > 500) {
      showAlert("최대 500자까지 입력 가능해요!");
      return;
    }
    if (!category) {
      showAlert("카테고리를 선택해주세요!");
      return;
    }

    if (sushiData.remainingAnswers <= 0) {
      showAlert("답변이 마감된 초밥이에요!");
      return;
    }

    try {
      await dispatch(createAnswer({ sushiId: sushiData.sushiId, content }));
      setShowAnswerInput(false);
      setContent("");
      setModalOpen(true);
      onClose();
    } catch (error) {
      console.error("답변 제출 실패:", error);
      showAlert("답변 제출에 실패했습니다.");
    }
  };

  const handleClose = () => {
    setOpacity(0);
    setTimeout(() => {
      setShowAnswerInput(false);
      setContent("");
      setSushiData({
        sushiId: "",
        title: "",
        content: "",
        plateType: "",
        sushiType: "",
        maxAnswers: "",
        remainingAnswers: "",
        expirationTime: "",
      });
      onClose();
    }, 300);
  };

  const handleBack = () => {
    if (showAnswerInput) {
      setShowAnswerInput(false);
      setContent("");
    } else {
      handleClose();
    }
  };

  // 스크롤바 숨기기 위한 스타일 동적 추가
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .content::-webkit-scrollbar {
      display: none;
    }
    .content {
      scrollbar-width: none;
    }
  `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {modalOpen && (
        <AnswerSubmitCheckModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
      <div
        style={{
          ...styles.modalOverlay,
          opacity,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <div
          style={{
            ...styles.modalContent,
            opacity,
            transform: `translateY(${20 - opacity * 20}px)`,
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          <div style={styles.container}>
            <div style={styles.buttonRow}>
              <div
                style={{ width: "3vh", cursor: "pointer" }}
                onClick={handleBack}
              >
                {" "}
                &lt;
              </div>
              <div
                style={{ width: "3vh", cursor: "pointer" }}
                onClick={handleClose}
              >
                {" "}
                X{" "}
              </div>
            </div>
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
      <CommonAlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ isOpen: false, message: "" })}
        message={alertModal.message}
      />
    </>
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
    fontSize: "3vh",
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
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  text: {
    margin: "3vh 0",
    fontSize: "2.2vh",
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
    padding: "1.2vh",
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
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
    color: "#5D4A37",
  },
};

export default SushiView;
