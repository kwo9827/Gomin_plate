import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSushi } from "../store/slices/sushiSlice";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cuttle from "../assets/sushi/cuttle.webp";
import eel from "../assets/sushi/eel.webp";
import egg from "../assets/sushi/egg.webp";
import octopus from "../assets/sushi/octopus.webp";
import salmon from "../assets/sushi/salmon.webp";
import shrimp from "../assets/sushi/shrimp.webp";
import wagyu from "../assets/sushi/wagyu.webp";
import 갈리비초밥 from "../assets/sushi/가리비초밥.webp";
import 광어초밥 from "../assets/sushi/광어초밥.webp";
import 성게알초밥 from "../assets/sushi/성게알초밥.webp";
import 참치초밥 from "../assets/sushi/참치초밥.webp";

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
};

const PostSushi = ({ onClose }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [maxAnswers, setMaxAnswers] = useState(1);
  const [category, setCategory] = useState(0);
  const [sushiType, setSushiType] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const categoryMapping = {
    연애: 1,
    우정: 2,
    진로: 3,
    건강: 4,
    가족: 5,
    기타: 6,
  };

  const sushiImages = [
    { id: 1, src: cuttle, name: "갑오징어초밥" },
    { id: 2, src: eel, name: "장어초밥" },
    { id: 3, src: egg, name: "계란초밥" },
    { id: 4, src: octopus, name: "문어초밥" },
    { id: 5, src: salmon, name: "연어초밥" },
    { id: 6, src: shrimp, name: "새우초밥" },
    { id: 7, src: wagyu, name: "와규초밥" },
    { id: 8, src: 갈리비초밥, name: "가리비초밥" },
    { id: 9, src: 광어초밥, name: "광어초밥" },
    { id: 10, src: 성게알초밥, name: "성게알초밥" },
    { id: 11, src: 참치초밥, name: "참치초밥" },
  ];

  const handleCategoryChange = (e) => {
    setCategory(Number(e.target.value));
  };

  const handleProgressChange = (e) => {
    setMaxAnswers(Number(e.target.value));
  };

  const handleSushiTypeChange = (name) => {
    setSushiType(name);
  };

  const handleNext = () => {
    if (!category) {
      alert("카테고리를 설정해주세요.");
      return;
    }
    if (!sushiType) {
      alert("초밥을 골라주세요.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleConfirmSubmit = () => {
    const sushiData = {
      title,
      content,
      maxAnswers,
      category,
      sushiType,
    };
    console.log("등록된 내용:", sushiData);
    dispatch(createSushi(sushiData));
    onClose();
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={orderForm}>
          <div style={orderFormHeader}>
            <div style={orderFormHeaderTop}>
              <p style={orderTitle}>
                마음속 이야기를
                <br />
                적는 고민 작성서
              </p>
              <button style={closeBtn} onClick={onClose}>
                X
              </button>
            </div>
            <p style={orderExplain}>
              주문 가능 초밥의
              <br /> 종류는 달라질 수 있습니다
            </p>
            <hr style={divider} />
          </div>

          <div style={orderFormBody}>
            {step === 1 ? (
              <>
                <p style={orderSet}>질문 카테고리 설정</p>
                <div style={radioContainer}>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category1"
                      name="category"
                      value={categoryMapping["연애"]}
                      checked={category === categoryMapping["연애"]}
                      onChange={handleCategoryChange}
                    />
                    연애
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category2"
                      name="category"
                      value={categoryMapping["우정"]}
                      checked={category === categoryMapping["우정"]}
                      onChange={handleCategoryChange}
                    />
                    우정
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category3"
                      name="category"
                      value={categoryMapping["진로"]}
                      checked={category === categoryMapping["진로"]}
                      onChange={handleCategoryChange}
                    />
                    진로
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category4"
                      name="category"
                      value={categoryMapping["건강"]}
                      checked={category === categoryMapping["건강"]}
                      onChange={handleCategoryChange}
                    />
                    건강
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category5"
                      name="category"
                      value={categoryMapping["가족"]}
                      checked={category === categoryMapping["가족"]}
                      onChange={handleCategoryChange}
                    />
                    가족
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category6"
                      name="category"
                      value={categoryMapping["기타"]}
                      checked={category === categoryMapping["기타"]}
                      onChange={handleCategoryChange}
                    />
                    기타
                  </label>
                </div>
                <hr style={divider} />
                <p style={orderSet}>인원수 설정</p>
                <input
                  style={rangeInput}
                  type="range"
                  min="1"
                  max="10"
                  value={maxAnswers}
                  onChange={handleProgressChange}
                />
                <p style={presentPerson}>{maxAnswers} / 10</p>
                <hr style={divider} />
                <p style={orderSet}>초밥 종류 선택</p>
                <div style={sliderContainer}>
                  <Slider {...settings}>
                    {sushiImages.map((sushi) => (
                      <div
                        key={sushi.id}
                        onClick={() => handleSushiTypeChange(sushi.id)}
                      >
                        <img
                          style={sliderSushi}
                          src={sushi.src}
                          alt={sushi.name}
                        />
                        <p>{sushi.name}</p>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div style={orderFormFooter}>
                  <hr style={divider} />
                  <div style={pageSelect}>
                    <button style={nextBtn} onClick={handleNext}>
                      고민 작성 &gt;
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <p style={orderSet}>제목</p>
                <hr style={divider} />
                <textarea
                  style={titleText}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="고민의 제목을 입력하세요"
                />
                <hr style={divider} />
                <p style={orderSet}>내용</p>
                <hr style={divider} />
                <textarea
                  style={contentText}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="고민의 내용을 입력하세요"
                />
                <div style={orderFormFooter}>
                  <hr style={divider} />
                  <div style={pageSelect}>
                    <button style={backBtn} onClick={handleBack}>
                      &lt; 이전
                    </button>
                    <button style={submitBtn} onClick={handleSubmit}>
                      고민제출 &gt;
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showModal && (
            <div style={submitModalStyle}>
              <div style={submitModalContent}>
                <h3>
                  고민을 제출하고 난 후에는 <br /> 수정할 수 없습니다.
                </h3>
                <div style={buttonContainer}>
                  <button
                    style={confirmButtonStyle}
                    onClick={handleConfirmSubmit}
                  >
                    확인
                  </button>
                  <button
                    style={cancelButtonStyle}
                    onClick={handleCancelSubmit}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 스타일 객체들
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  position: "relative",
  top: "5vh",
  height: "80vh",
  width: "90%",
  maxWidth: "53vh",
};

const orderForm = {
  backgroundColor: "#F4F4F4",
  border: "solid 0.3rem #595959",
  height: "80vh",
};

const orderFormHeader = {
  height: "18%",
};

const orderFormHeaderTop = {
  display: "flex",
  height: "70%",
};

const orderTitle = {
  margin: "0rem",
  padding: "1rem",
  letterSpacing: "0.06rem",
  fontSize: "32px",
};

const closeBtn = {
  margin: "0.4rem",
  marginTop: "0.7rem",
  marginLeft: "auto",
  width: "2.5rem",
  height: "2.5rem",
  border: "0",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "30px",
};

const orderExplain = {
  margin: "0rem",
  height: "30%",
  paddingRight: "0.5rem",
  fontSize: "16px",
  textAlign: "right",
};

const orderFormBody = {
  height: "82%",
};

const divider = {
  margin: "0rem",
  border: "solid 0.1rem #595959",
};

const orderSet = {
  margin: "0rem",
  padding: "1rem",
  fontSize: "24px",
};

const radioContainer = {
  margin: "0",
  paddingLeft: "0.5rem",
  paddingBottom: "1rem",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: "0.7rem",
  accentColor: "black",
  fontSize: "20px",
};

const radioBtn = {
  flexBasis: "calc(33.33% - 1rem)",
  textAlign: "left",
};

const rangeInput = {
  width: "92%",
  margin: "0 auto",
  display: "block",
  accentColor: "#404040",
};

const presentPerson = {
  margin: "0",
  padding: "0.5rem",
  paddingRight: "1rem",
  textAlign: "right",
  fontSize: "20px",
};

const sliderContainer = {
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  margin: "0 auto",
};

const sliderSushi = {
  height: "10rem",
};

const orderFormFooter = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  boxShadow: "0 -2px 5px rgba(0,0,0,0.1)", // 상단 그림자 추가
};

const pageSelect = {
  display: "flex",
};

const nextBtn = {
  margin: "0.4rem",
  marginLeft: "auto",
  border: "0",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "24px",
};

const titleText = {
  backgroundColor: "transparent",
  border: 0,
  outline: "none",
  resize: "none",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "24px",
};

const contentText = {
  backgroundColor: "transparent",
  border: 0,
  outline: "none",
  resize: "none",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "24px",
};

const backBtn = {
  margin: "0.4rem",
  marginRight: "auto",
  border: "0",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "24px",
};

const submitBtn = {
  margin: "0.4rem",
  marginLeft: "auto",
  border: "0",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "24px",
};

const submitModalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const submitModalContent = {
  backgroundColor: "#fdf5e6",
  padding: "20px",
  borderRadius: "10px",
  width: "70%",
  maxWidth: "600px",
  position: "relative",
  textAlign: "center",
  border: "8px solid #906C48",
  outline: "2px solid #67523E",
  fontSize: "24px",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginBottom: "30px",
};

const confirmButtonStyle = {
  padding: "8px 0",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#dc3545",
  color: "white",
  cursor: "pointer",
  width: "40%",
  whiteSpace: "nowrap",
  lineHeight: "1",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "24px",
};

const cancelButtonStyle = {
  padding: "8px 0",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#808080",
  color: "white",
  cursor: "pointer",
  width: "40%",
  whiteSpace: "nowrap",
  lineHeight: "1",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "24px",
};

export default PostSushi;
