import React from "react";
import { useNavigate } from "react-router-dom";
import Sushi from "./Sushi";

const SushiCard = ({
  id,
  title,
  content,
  category,
  sushiType,
  showHeart = false,
  remainingAnswers
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id) {
      console.log("sushiId가 존재하지 않습니다.", { id });
      return;
    }
    navigate(`/sushidetail/${id}`);
  };

  return (
    <div style={outerContainerStyle} onClick={handleClick}>
      <div style={middleContainerStyle}>
        <div style={innerContainerStyle}>
          {showHeart && <span style={heartIconStyle}>❤️</span>}

          <div style={sushiOuterImageStyle}>
            <div style={sushiImageStyle}>
              <Sushi isushiId={id} category={category} sushiType={sushiType} />
            </div>
          </div>

          <div style={textContainerStyle}>
            <div style={titleStyle}>{title}</div>
            <hr style={dividerStyle} />
            <div style={contentStyle}>{content}</div>

            {remainingAnswers > 0 ? (
              <div style={remainingAnswersStyle}>
                마감까지 {remainingAnswers}명 남았어요
              </div>
            ) : <div style={remainingAnswersStyle}>
              답변이 모두 달렸어요 !
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const heartIconStyle = {
  position: "absolute",
  top: "8px",
  right: "8px",
  fontSize: "1.3rem",
};

const outerContainerStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "49vh",
  margin: "1.5vh auto",
  padding: "0.8vh",
  backgroundColor: "#906C48",
  borderRadius: "1.3vh",
  boxSizing: "border-box",
};

const middleContainerStyle = {
  width: "47.5vh",
  backgroundColor: "#B2975C",
  borderRadius: "0.8vh",
  padding: "1.1vh",
  boxSizing: "border-box",
};

const innerContainerStyle = {
  position: "relative",
  width: "45.3vh",
  backgroundColor: "#FFFFF0",
  borderRadius: "0.6vh",
  padding: "0px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

/**스시 이미지 감싸는 테두리 */
const sushiOuterImageStyle = {
  width: "18vh",
  height: "15vh",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "2vh",
  // backgroundColor: "#F5F5DC",
};

/**스시 사진 크기 조절 */
const sushiImageStyle = {
  position: "absolute",
  width: "20vh",
  height: "20vh",
  overflow: "hidden",
  transform: "translate(-0.8vh, 1vh) scale(0.8)",
};

const textContainerStyle = {
  flex: 1,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const titleStyle = {
  width: "20vh",
  fontSize: "3vh",
  fontWeight: "bold",
  color: "#5A4628",
  margin: "1vh 0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const contentStyle = {
  width: "23vh",
  fontSize: "2.5vh",
  color: "#8D7B7B",
  lineHeight: "1.4",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const dividerStyle = {
  width: "24vh",
  border: "0.5px solid #BCBCBC",
  margin: "1vh 0",
};

const remainingAnswersStyle = {
  fontSize: "1.8vh",
  color: "#E86100",
  marginTop: "0.8vh",
  fontWeight: "500",
};

export default SushiCard;