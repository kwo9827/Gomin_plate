import { useState, useEffect } from "react";
import "../styles/dialog.css";

const Dialog = ({
  dialogues = [],
  speed = 50,
  onClose,
  isOpen,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showNextIndicator, setShowNextIndicator] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      setDisplayText("");
      setIsTyping(false);
      setShowNextIndicator(false);
      setIsCompleted(false);
      return;
    }

    if (!dialogues.length || currentIndex >= dialogues.length) {
      setIsCompleted(true);
      onComplete?.(); // 대화가 완료되면 onComplete 호출
      return;
    }

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
  }, [currentIndex, dialogues, speed, isOpen, onComplete]);

  const handleClick = () => {
    if (isTyping) return;

    if (isCompleted) {
      onClose?.();
      return;
    }

    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
      onComplete?.(); // 마지막 대화 완료 시 onComplete 호출
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-container" onClick={handleClick}>
      <div className="speech-bubble">
        <p>{displayText}</p>
        {showNextIndicator && <span className="next-indicator"> ▼ </span>}
      </div>
    </div>
  );
};

export default Dialog;
