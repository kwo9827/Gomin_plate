import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sushi from "./Sushi";

const SushiCard = ({
  id,
  title,
  content,
  category,
  sushiType,
  showHeart = false,
  remainingAnswers,
  maxAnswers,
  isClosed,
  expirationTime,
}) => {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const expirationDate = new Date(expirationTime).getTime();

    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = expirationDate - currentTime;

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setRemainingTime(0);
      } else {
        setRemainingTime(Math.floor(timeLeft / 1000)); // 소수점 버리고 초 단위로
      }
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 인터벌 정리
  }, [expirationTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

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
              <Sushi sushiId={id} category={category} sushiType={sushiType} />
            </div>
            {!isClosed ? (
              <>
                <div style={remainingAnswersStyle}>
                  {maxAnswers - remainingAnswers}/{maxAnswers}
                </div>
                {remainingTime <= 10800 && remainingTime > 0 && (
                  <div style={remainingTimeStyle}>마감 임박!</div>
                )}
              </>
            ) : (
              <>
                <div style={remainingAnswersStyle}>
                  {maxAnswers - remainingAnswers}
                </div>
                {remainingTime > 0 && <div style={soldoutStyle}>SOLD OUT</div>}
              </>
            )}
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
  margin: "0.5vh 0 0 0",
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
  position: "relative",
  textAlign: "right",
  bottom: 0,
  color: "#f0f0f0",
  marginTop: "6.5vh",
  marginLeft: "9vh",
  padding: "0 1vh",
  height: "3vh",
  minWidth: "1vh",
  width: "auto",
  border: "none",
  borderRadius: "1vh",
  fontSize: "2.2vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#E86100",
};

const remainingTimeStyle = {
  position: "absolute",
  top: "1.7vh",
  left: "1.3vh",
  backgroundColor: "#454545",
  fontSize: "2vh",
  border: "none",
  borderRadius: "0.5vh",
  width: "auto",
  height: "3vh",
  color: "#f0f0f0",
  marginTop: "0.8vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 1vh",
  transform: "rotate(-25deg)",
};

const soldoutStyle = {
  position: "absolute",
  top: "4vh",
  left: "2.6vh",
  // backgroundColor: "#454545",
  fontWeight: "bold",
  fontSize: "2vh",
  textShadow:
    "0.3vh 0.3vh 0.6vh rgb(255, 255, 255), -0.3vh -0.3vh 0.6vh rgb(255, 255, 255)",
  border: "0.5vh solid #454545",
  borderRadius: "0.5vh",
  width: "auto",
  height: "3vh",
  color: "#454545",
  marginTop: "0.8vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 0.5vh",
  transform: "rotate(-15deg)",
};

export default SushiCard;
