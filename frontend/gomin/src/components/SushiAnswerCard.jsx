import React from "react";
import { useNavigate } from "react-router-dom";
import Sushi from "./Sushi";

const SushiAnswerCard = ({
  id,
  title,
  category,
  content,
  sushiType,
  showHeart = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id) {
      console.log("sushiId가 존재하지 않습니다.", { id });
      return;
    }
    navigate(`/sushianswerdetail/${id}`);
  };

  /**초밥 타입 콘솔창 확인 */
  // console.log("sushiType 값 확인:", sushiType);

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
  position: "relative",
  width: "100%",
  backgroundColor: "#FFFFF0",
  borderRadius: "4px",
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
  borderRadius: "10px",
  // backgroundColor: "#F5F5DC",
};

/**스시 사진 크기 조절 */
/**이 부분을 수정해주세요. */
const sushiImageStyle = {
  position: "absolute",
  width: "20vh",
  height: "20vh",
  overflow: "hidden",
  transform: "translate(-2vh, 1vh) scale(0.8)",
};

// const sushiImageStyle = {
//   width: "90px",
//   height: "90px",
//   transform: "scale(1.5)",
//   marginRight: "10px",
//   borderRadius: "8px",
//   objectFit: "cover",
// };

const textContainerStyle = {
  flex: 1,
  overflow: "hidden",
};

const titleStyle = {
  width: "20vh",
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#5A4628",
  margin: "1vh 0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const contentStyle = {
  width: "23vh",
  fontSize: "1rem",
  color: "#8D7B7B",
  lineHeight: "1.4",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const dividerStyle = {
  width: "24vh",
  border: "0.5px solid #BCBCBC",
  margin: "1vh 0",
};

export default SushiAnswerCard;
