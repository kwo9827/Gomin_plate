import React from "react";
import { useNavigate } from "react-router-dom";

/**초밥 사진 추가할때 여기다 해주세용 */
import eggImg from "../assets/sushi/egg.webp";
import salmonImg from "../assets/sushi/salmon.webp";
import shrimpImg from "../assets/sushi/shrimp.webp";
import cuttleImg from "../assets/sushi/cuttle.webp";
import eelImg from "../assets/sushi/eel.webp";
import octopusImg from "../assets/sushi/octopus.webp";
import wagyuImg from "../assets/sushi/wagyu.webp";
import scallopImg from "../assets/sushi/가리비초밥.webp";
import tunaImg from "../assets/sushi/참치초밥.webp";
import uniImg from "../assets/sushi/성게알초밥.webp";
import flatfighImg from "../assets/sushi/광어초밥.webp";

const sushiTypes = {
  1: { name: "계란", image: eggImg },
  2: { name: "연어", image: salmonImg },
  3: { name: "새우", image: shrimpImg },
  4: { name: "한치", image: cuttleImg },
  5: { name: "문어", image: octopusImg },
  6: { name: "장어", image: eelImg },
  7: { name: "와규", image: wagyuImg },
  8: { name: "가리비", image: scallopImg },
  9: { name: "광어", image: flatfighImg },
  10: { name: "성게알", image: uniImg },
  11: { name: "참치", image: tunaImg },
};

const SushiCard = ({ id, title, content, sushiType, showHeart = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id) {
      console.log("sushiId가 존재하지 않습니다.", { id });
      return;
    }
    navigate(`/sushidetail/${id}`);
  };

  const sushiData = sushiTypes[sushiType] || {
    name: "기본 초밥",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpL734zj0BQG4VtmIwh5Ql0tRFW4HIVMQIg&s",
  };

  /**초밥 타입 콘솔창 확인 */
  // console.log("sushiType 값 확인:", sushiType);
  // console.log("sushiData 확인:", sushiData);

  return (
    <div style={outerContainerStyle} onClick={handleClick}>
      <div style={middleContainerStyle}>
        <div style={innerContainerStyle}>
          {showHeart && <span style={heartIconStyle}>❤️</span>}

          <div style={sushiOuterImageStyle}>
            <div style={sushiImageStyle}>
              <img
                src={sushiData.image}
                alt={sushiData.name}
                width="100%"
                height="100%"
              />
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
  width: "100px",
  height: "100px",
  overflow: "hidden", // 이미지가 컨테이너를 벗어나지 않도록 설정
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  // backgroundColor: "#F5F5DC",
};

/**스시 사진 크기 조절 */
/**이 부분을 수정해주세요. */
const sushiImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "scale(2.8)",
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
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#5A4628",
  marginBottom: "8px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const contentStyle = {
  fontSize: "1rem",
  color: "#8D7B7B",
  lineHeight: "1.4",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const dividerStyle = {
  width: "100%",
  border: "0.5px solid #BCBCBC",
  margin: "8px 0",
};

export default SushiCard;
