import React, { useState, useEffect } from "react";
import Dialog from "../components/Dialog";

//튜토리얼 이미지
import t0 from "../assets/tuto/0.webp";
import t1 from "../assets/tuto/1.webp";
import t2 from "../assets/tuto/2.webp";
import t3 from "../assets/tuto/3.webp";
import t4 from "../assets/tuto/4.webp";
import t5 from "../assets/tuto/5.webp";
import t6 from "../assets/tuto/6.webp";
import t7 from "../assets/tuto/7.webp";
import t8 from "../assets/tuto/8.webp";
import t9 from "../assets/tuto/9.webp";
import t10 from "../assets/tuto/10.webp";

const Tutorial = ({ onClose, showFullTutorial = true }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const dialogues = [
    "환영합니다냥. 처음 뵙겠습니다냥",
    "고민 한접시 이용법을 설명해드리겠다냥",
    "준비되시면 화면을 터치해주시기 바랍니다냥",
  ];

  const tutorialSlides = [t0, t1, t2, t3, t4, t5, t6, t7, t8, t10, t9];

  useEffect(() => {
    if (showFullTutorial) {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowTutorial(true);
    }
  }, [showFullTutorial]);

  const handleDialogComplete = () => {
    setShowDialog(false);
    setIsDialogOpen(false);
    setShowTutorial(true);
  };

  const handleTutorialPrevious = (e) => {
    e.stopPropagation();
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleTutorialNext = (e) => {
    e.stopPropagation();
    if (currentSlide < tutorialSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowTutorial(false);
      onClose();
    }
  };

  return (
    <>
      {(showDialog || showTutorial) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 8,
            backgroundColor: "transparent",
          }}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {showDialog && (
        <div
          style={{
            position: "absolute",
            top: "25vh",
            left: "28vh",
            width: "25vh",
          }}
        >
          <Dialog
            dialogues={dialogues}
            onClose={handleCloseDialog}
            isOpen={isDialogOpen}
            onComplete={handleDialogComplete}
          />
        </div>
      )}

      {showTutorial && (
        <div style={styles.tutorialModal}>
          <div style={styles.tutorialContent}>
            <div style={styles.navigationContainer}>
              <div
                style={styles.navigationLeft}
                onClick={handleTutorialPrevious}
              />
              <div
                style={styles.navigationRight}
                onClick={handleTutorialNext}
              />
            </div>
            <img
              src={tutorialSlides[currentSlide]}
              alt={`Tutorial ${currentSlide + 1}`}
              style={styles.tutorialImage}
            />
            <div style={styles.pagination}>
              {tutorialSlides.map((_, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.paginationDot,
                    backgroundColor:
                      currentSlide === index ? "#24D536" : "#D1D5DB",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  tutorialModal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9,
  },
  tutorialContent: {
    borderRadius: "12px",
    width: "45vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  navigationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    zIndex: 2,
  },
  navigationLeft: {
    width: "50%",
    height: "100%",
    cursor: "pointer",
  },
  navigationRight: {
    width: "50%",
    height: "100%",
    cursor: "pointer",
  },
  tutorialImage: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
  },
  pagination: {
    display: "flex",
    gap: "8px",
    padding: "16px 0",
  },
  paginationDot: {
    width: "1vh",
    height: "1vh",
    borderRadius: "5vh",
    transition: "background-color 0.2s",
  },
};

export default Tutorial;
