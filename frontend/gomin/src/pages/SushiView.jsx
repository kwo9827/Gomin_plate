import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSushiDetail } from "../store/slices/sushiSlice";
import { createAnswer } from "../store/slices/answerSlice";

const SushiView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sushiId, category, sushiType, remainingAnswers, expirationTime } =
    location.state || {}; // state에서 값 가져오기

  const [sushiData, setSushiData] = useState(null);
  const [content, setContent] = useState("");
  const [showAnswerInput, setShowAnswerInput] = useState(false); // 답변 입력창 표시 여부
  const [titleShadowColor, setTitleShadowColor] = useState(
    "rgba(255, 255, 255, 0.4)"
  );

  // fetch해온 초밥 데이터 관리
  const dispatch = useDispatch();
  const currentSushi = useSelector((state) => state.sushi.currentSushi);

  useEffect(() => {
    dispatch(fetchSushiDetail(sushiId));
  }, [dispatch, sushiId]);

  // 답변 작성 슬라이스 관리
  const answers = useSelector((state) => state.answer.answers);

  // 접시 타입에 따른 형광펜 색상 매핑
  const titleShadowColors = {
    1: "rgba(255, 0, 0, 0.4)", // 사랑 -> 빨간색
    2: "rgba(255, 255, 0, 0.4)", // 우정 -> 노란색
    3: "rgba(0, 179, 255, 0.4)", // 건강 -> 파란색
    4: "rgba(83, 178, 0, 0.4)", // 진로 -> 초록색
    5: "rgba(183, 6, 227, 0.4)", // 가족 -> 보라색
    6: "rgba(157, 157, 157, 0.4)", // 기타 -> 회색
  };

  useEffect(() => {
    setTitleShadowColor(
      titleShadowColors[category] || "rgba(255, 255, 255, 0.4)"
    );
  }, [category]);

  const dummySushi = {
    sushiId,
    title: "12",
    content: "12",
    plateType: `${category}`,
    sushiType,
    maxAnswers: 5,
    remainingAnswers,
    expirationTime,
  };

  useEffect(() => {
    if (!sushiId) {
      alert("초밥 ID가 없습니다. 홈으로 이동합니다.");
      navigate("/Home");
      return;
    }

    // currentSushi의 데이터를 dummySushi에 반영
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
    } else {
      setSushiData(dummySushi); // currentSushi가 없을 경우 더미 데이터 사용
    }
  }, [sushiId, currentSushi, navigate, category]);

  const handleOpenAnswerInput = () => {
    setShowAnswerInput(true);
  };

  const handleSubmit = async () => {
    if (content.trim() === "") {
      alert("답변 내용을 입력해주세요!");
      return;
    }

    if (sushiData.remainingAnswers <= 0) {
      alert("더 이상 답변을 작성할 수 없습니다.");
      return;
    }

    console.log("작성된 답변 데이터:", {
      sushiId: sushiData.sushiId,
      content,
    });

    // createAnswer API 호출
    try {
      await dispatch(createAnswer({ sushiId: sushiData.sushiId, content }));
      setShowAnswerInput(false); // 제출 후 입력창 닫기
      setContent(""); // 입력 내용 초기화
      alert("답변이 제출되었습니다!");
      navigate("/Home"); // 제출 후 홈으로 이동
    } catch (error) {
      console.error("답변 제출 실패:", error);
      alert("답변 제출에 실패했습니다.");
    }
  };

  const handleBack = () => {
    if (showAnswerInput) {
      // 답변 작성 중이면 다시 원래 화면으로 돌아가기
      setShowAnswerInput(false);
      setContent("");
    } else {
      // 기본 뒤로가기 기능 (홈으로 이동)
      navigate("/Home");
    }
  };

  if (!sushiData) {
    return <p>로딩 중...</p>;
  }

  return (
    <div style={{ backgroundColor: "#fdfcc8", padding: "0 10px" }}>
      <div style={styles.container}>
        {/* 상단 나무판 */}
        <div style={styles.outerBoxWrapper}>
          <div style={styles.outerBox}>
            <div style={styles.innerBox}>누군가의 고민 초밥</div>
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
              {sushiData.title}
            </h3>

            <div style={styles.contentContainer}>
              <p style={styles.content}>{sushiData.content}</p>
              <div style={styles.fadeEffect}></div>
            </div>
          </>
        ) : (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="고민에 대한 의견을 나눠주세요"
              style={styles.textarea}
            />
          </>
        )}

        {/* 버튼 컨테이너 (메인 내용 아래로 이동) */}
        <div style={styles.buttonContainer}>
          <button onClick={handleBack} style={styles.button}>
            &lt; 뒤로 가기
          </button>
          {!showAnswerInput ? (
            <button onClick={handleOpenAnswerInput} style={styles.button}>
              답변 작성 &gt;
            </button>
          ) : (
            <button onClick={handleSubmit} style={styles.button}>
              제출하기 &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "calc(100vh - 95px)",
    background: "#FFFEEC",
    border: "8px #906C48 solid",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "17px",
    boxSizing: "border-box",
  },
  outerBoxWrapper: {
    position: "relative",
    zIndex: 10,
  },
  outerBox: {
    display: "inline-block",
    border: "4px solid #8B6B3E",
    borderRadius: "4px",
    backgroundColor: "#B2975C",
    padding: "6px",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  innerBox: {
    border: "3px solid #906C48",
    borderRadius: "2px",
    backgroundColor: "#B2975C",
    color: "#5D4A37",
    fontSize: "1.1rem",
    fontWeight: "bold",
    padding: "6px 12px",
    whiteSpace: "nowrap",
  },
  title: {
    display: "inline",
    margin: "20px 10px",
    padding: "0 10px",
    fontWeight: "bold",
    color: "#5D4A37",
    fontSize: "1.3rem",
  },
  contentContainer: {
    position: "relative",
  },
  content: {
    maxHeight: "60vh",
    overflowY: "auto",
    padding: "0 15px",
    margin: "0",
    borderRadius: "6px",
    fontSize: "1rem",
    lineHeight: "1.5",
    wordBreak: "break-word", // 긴 단어 줄바꿈
    position: "relative", // 가상 요소와 겹치지 않도록 설정
  },
  fadeEffect: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "40px",
    background:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgb(255, 253, 236, 1) 100%)",
    pointerEvents: "none", // 클릭 방지
  },
  expiration: {
    width: "100%",
    textAlign: "right",
    fontSize: "1rem",
    margin: "0 20px 0 0",
  },
  textarea: {
    width: "100%",
    height: "70vh",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "6px",
    border: "4px solid #B2975C",
    fontFamily: "inherit",
    fontSize: "1.1rem",
    lineHeight: "1.5",
    resize: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    width: "100%",
  },
  button: {
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#B2975C",
    color: "#5D4A37",
    fontSize: "1rem",
    padding: "12px 25px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default SushiView;
