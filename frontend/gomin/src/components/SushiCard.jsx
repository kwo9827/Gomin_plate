import React from "react";
import { useNavigate } from "react-router-dom";

const SushiCard = ({ id, showHeart = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sushidetail", { state: { id } });
  };

  return (
    <div style={outerContainerStyle} onClick={handleClick}>
      <div style={middleContainerStyle}>
        <div style={innerContainerStyle}>
          {/* ❤️ 좋아요 받은 경우 하트 표시 */}
          {showHeart && <span style={heartIconStyle}>❤️</span>}

          {/* 초밥 이미지 */}
          <div style={sushiImageStyle}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpL734zj0BQG4VtmIwh5Ql0tRFW4HIVMQIg&s"
              alt="초밥사진"
              width="100%"
              height="100%"
            />
          </div>

          {/* 제목 & 내용 */}
          <div style={textContainerStyle}>
            <div style={titleStyle}>제목 텍스트</div>
            <hr style={dividerStyle} />
            <div style={contentStyle}>
              내용 텍스트입니다.
              <br />
              아아
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 하트 아이콘 스타일 */
const heartIconStyle = {
  position: "absolute",
  top: "8px",
  right: "8px",
  fontSize: "1.3rem", // 하트 크기
};

/* SushiCard를 감싸는 컨테이너 스타일 */
const outerContainerStyle = {
  position: "relative", // 하트 이모티콘을 절대 위치로 배치할 수 있도록 설정
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "420px",
  margin: "10px auto",
  padding: "6px",
  backgroundColor: "#906C48",
  borderRadius: "10px",
  boxSizing: "border-box",
};

const middleContainerStyle = {
  width: "100%",
  backgroundColor: "#B2975C",
  borderRadius: "4px",
  padding: "8px",
  boxSizing: "border-box",
};

const innerContainerStyle = {
  position: "relative", // 하트 이모티콘을 배치할 기준
  width: "100%",
  backgroundColor: "#FFFFF0",
  borderRadius: "4px",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

/* 초밥 이미지 스타일 */
const sushiImageStyle = {
  width: "90px",
  height: "90px",
  marginRight: "10px",
  borderRadius: "4px",
  objectFit: "cover",
};

/* 텍스트 컨테이너 스타일 */
const textContainerStyle = {
  flex: 1,
  overflow: "hidden",
};

/* 제목 스타일 */
const titleStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#5A4628",
  marginBottom: "8px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

/* 본문 스타일 */
const contentStyle = {
  fontSize: "1rem",
  color: "#8D7B7B",
  lineHeight: "1.4",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

/* 구분선 스타일 */
const dividerStyle = {
  width: "100%",
  border: "0.5px solid #BCBCBC",
  margin: "8px 0",
};

export default SushiCard;
