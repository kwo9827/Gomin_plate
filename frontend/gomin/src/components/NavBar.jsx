import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import navImg from "../assets/home/nav.webp";
import navHomeImg from "../assets/home/nav1.webp";
import navSushiImg from "../assets/home/nav2.webp";
import navAnswerImg from "../assets/home/nav3.webp";

import Modal from "../components/EditModal";

/** 상단 네비게이션 바 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bgImage, setBgImage] = useState(navImg);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isNew = useSelector((state) => state.member?.isNew);

  useEffect(() => {
    if (isNew) {
      openModal();
    }
  }, [isNew]);

  //미리 로드
  useEffect(() => {
    const preloadImages = [navHomeImg, navSushiImg, navAnswerImg];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/Home":
        setBgImage(navHomeImg);
        break;
      case "/MySushiList":
        setBgImage(navSushiImg);
        break;
      case "/MyAnswerList":
        setBgImage(navAnswerImg);
        break;
      default:
        setBgImage(navImg);
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav style={{ ...styles.navbar, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.contentWrapper}>
        {/* Home 메뉴 */}
        <div
          style={styles.navItem}
          onClick={() => handleNavigation("/Home")}
        ></div>

        {/* MySushiList 메뉴 */}
        <div
          style={styles.navItem}
          onClick={() => handleNavigation("/MySushiList")}
        ></div>

        {/* MyAnswerList 메뉴 */}
        <div
          style={styles.navItem}
          onClick={() => handleNavigation("/MyAnswerList")}
        ></div>

        {/* My 메뉴 (닉네임 모달) */}
        <div style={styles.navItem} onClick={openModal}></div>
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
    </nav>
  );
};

// 스타일
const styles = {
  navbar: {
    width: "55vh",
    backgroundSize: "100% auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    paddingBottom: "28.12%",
    position: "relative",
    transition: "background-image 0.3s ease-in-out",
  },

  contentWrapper: {
    position: "absolute",
    inset: "0", // 부모 크기와 동일하게 설정
    display: "flex",
  },

  navItem: {
    flex: 1, // 4개의 div를 동일한 크기로 분할
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Navbar;
