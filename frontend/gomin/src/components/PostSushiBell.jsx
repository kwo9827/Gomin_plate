import React from "react";

/** 홈 화면에서 누르면 초밥(질문)을 등록하는 화면으로 넘어가는 컴포넌트
 *  1. 클릭 시 부모 컴포넌트에서 전달한 `onClick` 실행
 */
const PostSushiBell = ({ onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      초밥 등록하기 벨임
    </div>
  );
};

export default PostSushiBell;
