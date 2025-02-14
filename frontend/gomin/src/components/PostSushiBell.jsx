import React, { useRef, useContext } from "react";
import bellImg from "../assets/home/bell.webp";
import orderBellSound from "../assets/sounds/nextPage.mp3";
import BgmContext from '../context/BgmProvider';

/** 홈 화면에서 누르면 초밥(질문)을 등록하는 화면으로 넘어가는 컴포넌트
 *  1. 클릭 시 부모 컴포넌트에서 전달한 `onClick` 실행
 */
const PostSushiBell = ({ onClick }) => {
  const audioRef = useRef(null); // audio 요소를 참조하기 위한 ref 생성
  const { isMuted } = useContext(BgmContext);

  // 클릭 시 효과음 재생
  const handlePlaySound = () => {
    if (audioRef.current) {
      // 음소거 상태에 따라 볼륨 설정
      audioRef.current.volume = isMuted ? 0 : 0.4;
      audioRef.current.play(); // 효과음 재생
    }
  };

  return (
    <div onClick={() => { onClick(); handlePlaySound(); }} style={{ cursor: "pointer" }}>
      <img
        src={bellImg}
        alt="Post Sushi Bell"
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "20%",
          cursor: "pointer",
          width: "8vh",
          height: "7vh",
          objectFit: "cover",
        }}
      />
      {/* 효과음 */}
      <audio ref={audioRef}>
        <source src={orderBellSound} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default PostSushiBell;
