import { useState, useEffect } from "react";
import "../styles/dialog.css";

const Tutorial = ({ dialogues = [], speed = 50 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showNextIndicator, setShowNextIndicator] = useState(false);

  useEffect(() => {
    // dialogues가 비어있거나 currentIndex가 범위를 벗어나면 return
    if (!dialogues.length || currentIndex >= dialogues.length) return;

    // 현재 대화 내용이 문자열인지 확인하고 처리
    const currentDialogue = String(dialogues[currentIndex] || "");

    setDisplayText("");
    setIsTyping(true);
    setShowNextIndicator(false);

    let index = 0;
    let mounted = true;

    const interval = setInterval(() => {
      if (!mounted) return;

      if (index < currentDialogue.length) {
        setDisplayText((prev) => currentDialogue.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setShowNextIndicator(true);
      }
    }, speed);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [currentIndex, dialogues, speed]);

  const handleNext = () => {
    if (isTyping) return;
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="dialog-container" onClick={handleNext}>
      <div className="speech-bubble">
        <p>{displayText}</p>
        {showNextIndicator && <span className="next-indicator">▼</span>}
      </div>
    </div>
  );
};

export default Tutorial;
