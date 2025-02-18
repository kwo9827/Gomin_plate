import { useState, useEffect } from "react";

export default function MasterCat() {
  const [clickCount, setClickCount] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);
  const [showA, setShowA] = useState(false);

  useEffect(() => {
    if (clickCount === 5) {
      playSound("/src/assets/sounds/meow.mp3");
    } else if (clickCount === 15) {
      playSound("/src/assets/sounds/haak.mp3");
      setShowA(true);
      setTimeout(() => {
        setShowA(false);
      }, 800);
    } else if (clickCount === 20) {
      setClickCount(0);
    }
  }, [clickCount]);

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
  };

  const handleMouseDown = () => {
    setIsPressing(true);
    const timer = setTimeout(() => {
      playSound("/src/assets/sounds/grr.mp3");
    }, 3000);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    setIsPressing(false);
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <div
      onClick={() => setClickCount((prev) => prev + 1)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        width: "calc( 15 * var(--custom-vh))",
        height: "calc( 20 * var(--custom-vh))",
        padding: "calc( 5 * var(--custom-vh))",
        textAlign: "center",
        cursor: "pointer",
        zIndex: 5,
      }}
    >
      {showA && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "calc( 5 * var(--custom-vh))",
            height: "100%",
          }}
        >
          <div style={{ ...eyes, backgroundColor: "#fffff5" }}>--</div>
          <div style={{ ...eyes, backgroundColor: "#e3b86d" }}>--</div>
        </div>
      )}
    </div>
  );
}

const eyes = {
  height: "calc( 2 * var(--custom-vh))",
  width: "calc( 3 * var(--custom-vh))",
  border: "none",
  borderRadius: "calc( 5 * var(--custom-vh))",
  color: "#5d4a37",
  fontFamily: "inherit",
  fontWeight: "bolder",
  fontSize: "calc( 2.2 * var(--custom-vh))",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  marginBottom: "calc( 8.3 * var(--custom-vh))",
};
