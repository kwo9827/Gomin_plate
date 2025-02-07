import React from "react";
import { useNavigate } from "react-router-dom";

const SushiAnswerCard = ({ id, title, content, showHeart = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id) {
      console.log("sushiId가 존재하지 않습니다.", { id });
      return;
    }
    navigate(`/sushianswerdetail/${id}`);
  };

  return (
    <div style={outerContainerStyle} onClick={handleClick}>
      <div style={middleContainerStyle}>
        <div style={innerContainerStyle}>
          {showHeart && <span style={heartIconStyle}>❤️</span>}

          <div style={sushiImageStyle}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpL734zj0BQG4VtmIwh5Ql0tRFW4HIVMQIg&s"
              alt="초밥사진"
              width="100%"
              height="100%"
            />
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
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const sushiImageStyle = {
  width: "90px",
  height: "90px",
  marginRight: "10px",
  borderRadius: "4px",
  objectFit: "cover",
};

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

export default SushiAnswerCard;
