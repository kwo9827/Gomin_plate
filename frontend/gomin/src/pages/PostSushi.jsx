import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSushi } from "../store/slices/sushiSlice";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const [plateType, setPlateType] = useState("");
  const [sushiType, setSushiType] = useState("초밥1");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPlateType(e.target.value);
  };

  const handleProgressChange = (e) => {
    setMaxAnswers(e.target.value);
  };

  const handleSushiTypeChange = (name) => {
    setSushiType(name);
  };

  const handleNext = () => {
    if (!plateType || maxAnswers === 0) {
      alert("카테고리와 인원수를 설정해주세요.");
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
      plateType,
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
              <div>
                <p style={orderSet}>질문 카테고리 설정</p>
                <div style={radioContainer}>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category1"
                      name="category"
                      value="연애"
                      checked={category === "연애"}
                      onChange={handleCategoryChange}
                    />
                    연애
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category2"
                      name="category"
                      value="우정"
                      checked={category === "우정"}
                      onChange={handleCategoryChange}
                    />
                    우정
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category3"
                      name="category"
                      value="진로"
                      checked={category === "진로"}
                      onChange={handleCategoryChange}
                    />
                    진로
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category4"
                      name="category"
                      value="건강"
                      checked={category === "건강"}
                      onChange={handleCategoryChange}
                    />
                    건강
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category5"
                      name="category"
                      value="가족"
                      checked={category === "가족"}
                      onChange={handleCategoryChange}
                    />
                    가족
                  </label>
                  <label style={radioBtn}>
                    <input
                      type="radio"
                      id="category6"
                      name="category"
                      value="기타"
                      checked={category === "기타"}
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
                <div className="slider-container">
                  <Slider {...settings}>
                    <div onClick={() => handleSushiTypeChange("초밥1")}>
                      <img src="/images/sushi1.jpg" alt="초밥1" />
                      <p>초밥1</p>
                    </div>
                    <div onClick={() => handleSushiTypeChange("초밥2")}>
                      <img src="/images/sushi2.jpg" alt="초밥2" />
                      <p>초밥2</p>
                    </div>
                    <div onClick={() => handleSushiTypeChange("초밥3")}>
                      <img src="/images/sushi3.jpg" alt="초밥3" />
                      <p>초밥3</p>
                    </div>
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
              </div>
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
};

const modalStyle = {
  padding: "1rem",
  marginTop: "7rem",
};

const orderForm = {
  backgroundColor: "#F4F4F4",
  border: "solid 0.3rem #595959",
};

const orderFormHeaderTop = {
  display: "flex",
  height: "6rem",
};

const orderFormHeader = {
  height: "8.6rem",
};

const orderFormBody = {
  position: "relative",
  height: "34rem",
};

const orderTitle = {
  margin: "0rem",
  padding: "1rem",
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
  paddingRight: "0.5rem",
  paddingBottom: "0.3rem",
  fontSize: "16px",
  textAlign: "right",
};

const divider = {
  margin: "0rem",
  border: "solid 0.1rem #595959",
};

const orderSet = {
  margin: "0rem",
  padding: "0.5rem",
  fontSize: "24px",
};

const radioContainer = {
  margin: "1rem",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: "1rem",
  fontSize: "20px",
};

const radioBtn = {
  flexBasis: "calc(33.33% - 1rem)",
  textAlign: "center",
};

const rangeInput = {
  width: "95%",
  margin: "0 auto",
  display: "block",
  accentColor: "#404040",
};

const presentPerson = {
  margin: "0",
  marginRight: "0.5rem",
  textAlign: "right",
  fontSize: "20px",
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
  fontSize: "16px",
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
