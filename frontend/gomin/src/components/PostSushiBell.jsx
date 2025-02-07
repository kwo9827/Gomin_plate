import React from "react";
import bellImg from "../assets/home/bell.webp";

/** 홈 화면에서 누르면 초밥(질문)을 등록하는 화면으로 넘어가는 컴포넌트
 *  1. 클릭 시 부모 컴포넌트에서 전달한 `onClick` 실행
 */
const PostSushiBell = ({ onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <img
        src={bellImg}
        alt="Post Sushi Bell"
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "20%",
          cursor: "pointer",
          width: "7vw",
          height: "7vh",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default PostSushiBell;
