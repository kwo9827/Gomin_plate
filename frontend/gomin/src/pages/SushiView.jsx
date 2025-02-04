import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    title: `초밥 id는 ${sushiId} 이것입니다. 타이틀 길이제한을 해야할까요?`,
    content: `초밥 ${sushiType}에 대한 고민입니다 독도는우리땅가사바뀌었다던데저는이전가사밖에모르거든요 울릉도동남쪽뱃길따라이백리 (근데 여기가 막 87K 이런 가사던데)외로운섬하나새들의고향그누가아무리자기네땅이라고우겨도독도는우리따우리땅 경상북도울릉군울릉읍독도리동경132북위37평균기온12도강수량은1300독도는우리땅(이것도다바뀌었대)오징어꼴뚜기대구명태거북이연어알물새알해녀대합실(이거특산물도다바뀌었대)17만평방미터우물하나분화구독도는우리땅우리땅 독도는우리땅가사바뀌었다던데저는이전가사밖에모르거든요 울릉도동남쪽뱃길따라이백리 (근데 여기가 막 87K 이런 가사던데)외로운섬하나새들의고향그누가아무리자기네땅이라고우겨도독도는우리따우리땅 경상북도울릉군울릉읍독도리동경132북위37평균기온12도강수량은1300독도는우리땅(이것도다바뀌었대)오징어꼴뚜기대구명태거북이연어알물새알해녀대합실(이거특산물도다바뀌었대)17만평방미터우물하나분화구독도는우리땅우리땅독도는우리땅가사바뀌었다던데저는이전가사밖에모르거든요 울릉도동남쪽뱃길따라이백리 (근데 여기가 막 87K 이런 가사던데)외로운섬하나새들의고향그누가아무리자기네땅이라고우겨도독도는우리따우리땅 경상북도울릉군울릉읍독도리동경132북위37평균기온12도강수량은1300독도는우리땅(이것도다바뀌었대)오징어꼴뚜기대구명태거북이연어알물새알해녀대합실(이거특산물도다바뀌었대)17만평방미터우물하나분화구독도는우리땅우리땅독도는우리땅가사바뀌었다던데저는이전가사밖에모르거든요 울릉도동남쪽뱃길따라이백리 (근데 여기가 막 87K 이런 가사던데)외로운섬하나새들의고향그누가아무리자기네땅이라고우겨도독도는우리따우리땅 경상북도울릉군울릉읍독도리동경132북위37평균기온12도강수량은1300독도는우리땅(이것도다바뀌었대)오징어꼴뚜기대구명태거북이연어알물새알해녀대합실(이거특산물도다바뀌었대)17만평방미터우물하나분화구독도는우리땅우리땅독도는우리땅가사바뀌었다던데저는이전가사밖에모르거든요 울릉도동남쪽뱃길따라이백리 (근데 여기가 막 87K 이런 가사던데)외로운섬하나새들의고향그누가아무리자기네땅이라고우겨도독도는우리따우리땅 경상북도울릉군울릉읍독도리동경132북위37평균기온12도강수량은1300독도는우리땅(이것도다바뀌었대)오징어꼴뚜기대구명태거북이연어알물새알해녀대합실(이거특산물도다바뀌었대)17만평방미터우물하나분화구독도는우리땅우리땅독도는우리땅가사바뀌었다던데저는이전가사밖에모르거든요 울릉도동남쪽뱃길따라이백리 (근데 여기가 막 87K 이런 가사던데)외로운섬하나새들의고향그누가아무리자기네땅이라고우겨도독도는우리따우리땅 경상북도울릉군울릉읍독도리동경132북위37평균기온12도강수량은1300독도는우리땅(이것도다바뀌었대)오징어꼴뚜기대구명태거북이연어알물새알해녀대합실(이거특산물도다바뀌었대)17만평방미터우물하나분화구독도는우리땅우리땅 `,
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
    setSushiData(dummySushi);
  }, [sushiId, navigate]);

  const handleOpenAnswerInput = () => {
    setShowAnswerInput(true);
  };

  const handleSubmit = () => {
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

    setShowAnswerInput(false); // 제출 후 입력창 닫기
    setContent(""); // 입력 내용 초기화

    // 제출 후 홈으로 돌아가기
    navigate("/Home");
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
    fontSize: "1rem",
    boxSizing: "border-box",
    resize: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "auto", // 버튼을 아래로 붙이기
  },
  button: {
    width: "auto",
    color: "#5D4A37",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "1rem",
  },
};

export default SushiView;
