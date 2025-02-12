import React, { createContext, useState, useRef, useEffect } from "react";
import bgmSound from "../assets/sounds/bgm.mp3"; // 배경음악 파일

const BgmContext = createContext();

export const BgmProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.1); // 🎵 초기 볼륨 설정
  const audioRef = useRef(new Audio(bgmSound));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0;

    return () => audio.pause();
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
        audio.volume = volume; // 🔊 음소거 해제 시 볼륨 적용
        audio.play().catch((err) => console.log("재생 실패:", err));
      } else {
        audio.volume = 0; // 🔇 음소거 시 볼륨 0
      }
    setIsMuted(!isMuted);
  };

  return (
    <BgmContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </BgmContext.Provider>
  );
};

export default BgmContext;
