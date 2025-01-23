import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * 나의 초밥(질문) 리스트, 나의 답변 리스트에 보여질 초밥카드 컴포넌트
 * 1. 클릭 시 해당 초밥 id를 state로 sushidetail로 navigate
 * 2. 피그마에서 보여준 카드 디자인(인라인 스타일) 적용
 */

const SushiCard = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sushidetail", { state: { id } });
  };

  return (
    <div style={cardContainerStyle} onClick={handleClick}>
      {/* 초밥 이미지 영역 */}
      <div style={SushiImageStyle}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpL734zj0BQG4VtmIwh5Ql0tRFW4HIVMQIg&s" alt="초밥사진" width="100%" />
      </div>

      {/* 오른쪽 텍스트 영역 */}
      <div style={textContainerStyle}>
        <div style={titleStyle}>안녕하세요. 나는 대전 1반의 꽃미남 = 최우식 = 심규빈입니다.</div>
        <hr style={dividerStyle} />
        <div style={contentStyle}>
          제가 고민이 있는데 하 이걸 어디서부터 시작해야하죠? 너무 잘 생겼어요. 제 얼굴은... 형 동생들이 외모 때문에 박탈감을 느낄까봐 걱정입니다.
        </div>
      </div>
    </div>
  );
};

/* 카드 컨테이너 스타일 */
const cardContainerStyle = {
  display: "flex",                  // 카드 내부 가로 방향 배치
  alignItems: "center",             // 수직 가운데 정렬
  width: "357px",                   // 피그마 카드 너비
  height: "127px",                  // 피그마 카드 높이
  padding: "10px",                  // 카드 내부 여백
  border: "4px solid #906C48",    // 카드 테두리 색 (#906C48)
  borderRadius: "10px",             // 모서리 둥글게
  backgroundColor: "#FFFFF0",       // 카드 배경색 (#FFFFF0)
  marginBottom: "10px",              // 카드 사이 간격
};

/* 초밥 이미지 영역 스타일 */
const SushiImageStyle = {
  width: "89px",                    // 피그마 이미지 가로 크기
  height: "89px",                   // 피그마 이미지 세로 크기
  borderRadius: "4px",              // 모서리 둥글게
  marginRight: "10px",              // 오른쪽 텍스트 영역과 간격
};

/* 제목&내용 텍스트 컨테이너 */
const textContainerStyle = {
  display: "flex",                  // 가로, 세로 방향으로 배치
  flexDirection: "column",          // 세로 방향으로 나열
  justifyContent: "center",         // 세로 정렬 
  flex: "1",                        // 남는 공간 모두 차지
  overflow: "hidden",               // 높이 넘는 글씨는 숨김 
};

/* 제목 스타일 */
const titleStyle = {
  fontSize: "1.2rem",               // 제목 크기(30.63 size)
  fontWeight: "bold",               // 굵은 글씨
  color: "#5D4A37",                 // 제목 텍스트 글씨 색깔 (#5D4A37)
  marginBottom: "1px",              // 제목 & 구분선 간격(1~4px?)
  whiteSpace: "nowrap",             // 한 줄로 표시 (줄바꿈 X)
  overflow: "hidden",               // 넘칠 경우 숨김
  textOverflow: "ellipsis",         // 넘치는 텍스트는 "..." 처리
};

/* 내용 텍스트 스타일 */
const contentStyle = {
    fontSize: "1.12rem",            // 폰트 크기(19.14 size)
    color: "#8D7B7B",               // 내용 텍스트 글씨 색깔 (#8D7B7B) 
    lineHeight: "1.2",              // 내용 텍스트 줄 간격(1.2)
    display: "-webkit-box",         // 멀티라인 말줄임을 위해 flex가 아닌 box 사용
    WebkitLineClamp: 2,             // 최대 2줄까지만 표시
    WebkitBoxOrient: "vertical",
    overflow: "hidden",             // 범위를 넘어가면 숨김
    textOverflow: "ellipsis",       // 넘치는 부분에 "..." 표시
  };

/* 구분선 스타일 */
const dividerStyle = {
  width: "100%",                    // 구분선 너비(컨테이너 100%)
  border: "0.5px solid #BCBCBC",  // 구분선 색깔(#BCBCBC)
  margin: "10px 0",                  // 위아래 여백
};

export default SushiCard;
