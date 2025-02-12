import React, { useContext } from "react";
import BgmContext from "../context/BgmProvider";

const MuteButton = () => {
  const { isMuted, toggleMute } = useContext(BgmContext);

  return (
    <button onClick={toggleMute} style={styles.muteButton}>
      <i className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
    </button>
  );
};

const styles = {
  muteButton: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1000,
    background: "transparent",
    color: "white",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    opacity: 0.6,
    transition: "opacity 0.3s",
  },
};

export default MuteButton;
