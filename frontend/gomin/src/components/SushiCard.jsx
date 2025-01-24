import React from "react";
import { useNavigate } from "react-router-dom";

const SushiCard = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sushidetail", { state: { id } });
  };

  return (
    <div style={outerContainerStyle} onClick={handleClick}>
      <div style={middleContainerStyle}>
        <div style={innerContainerStyle}>
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

/* 첫 번째 테두리 */
const outerContainerStyle = {
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

/* 두 번째 테두리 */
const middleContainerStyle = {
  width: "100%",
  backgroundColor: "#B2975C", 
  borderRadius: "4px", 
  padding: "8px", 
  boxSizing: "border-box",
};

/* 세 번째 테두리 */
const innerContainerStyle = {
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

/* 제목 텍스트 스타일 */
const titleStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#5A4628",
  marginBottom: "8px",

  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

/* 본문 텍스트 스타일 */
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
