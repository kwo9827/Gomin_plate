import React, { useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSushi } from "../store/slices/sushiSlice";
import Slider from "react-slick";
import "../styles/slider.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cuttle from "../assets/sushi/cuttle.webp";
import eel from "../assets/sushi/eel.webp";
import egg from "../assets/sushi/egg.webp";
import octopus from "../assets/sushi/octopus.webp";
import salmon from "../assets/sushi/salmon.webp";
import shrimp from "../assets/sushi/shrimp.webp";
import wagyu from "../assets/sushi/wagyu.webp";
import scallop from "../assets/sushi/가리비초밥.webp";
import flatfish from "../assets/sushi/광어초밥.webp";
import uni from "../assets/sushi/성게알초밥.webp";
import tuna from "../assets/sushi/참치초밥.webp";

const PostSushi = ({ onClose }) => {
  const dispatch = useDispatch();
  const likesReceived = useSelector((state) => state.member.likesReceived);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [maxAnswers, setMaxAnswers] = useState(1);
  const [category, setCategory] = useState(0);
  const [sushiType, setSushiType] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const categoryMapping = {
    연애: 1,
    우정: 2,
    진로: 3,
    건강: 4,
    가족: 5,
    기타: 6,
  };

  const sushiImages = [
    { id: 1, src: egg, name: "계란초밥", requiredLikes: 0 },
    { id: 2, src: salmon, name: "연어초밥", requiredLikes: 1 },
    { id: 3, src: shrimp, name: "새우초밥", requiredLikes: 2 },
    { id: 4, src: cuttle, name: "한치초밥", requiredLikes: 3 },
    { id: 5, src: octopus, name: "문어초밥", requiredLikes: 6 },
    { id: 6, src: eel, name: "장어초밥", requiredLikes: 10 },
    { id: 7, src: wagyu, name: "와규초밥", requiredLikes: 15 },
    { id: 8, src: scallop, name: "가리비초밥", requiredLikes: 20 },
    { id: 9, src: flatfish, name: "광어초밥", requiredLikes: 30 },
    { id: 10, src: uni, name: "성게알초밥", requiredLikes: 50 },
    { id: 11, src: tuna, name: "참치초밥", requiredLikes: 80 },
  ];

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0vh",
    slidesToShow: 3,
    speed: 500,
    afterChange: (current) => {
      const filteredSushi = sushiImages.filter(
        (sushi) => sushi.requiredLikes <= likesReceived
      );
      const sushiId = filteredSushi[current].id;
      setSushiType(sushiId);
    },
    initialSlide: 0,
    swipeToSlide: true,
    focusOnSelect: false,
    slidesToScroll: 1,
    draggable: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 9999,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          centerMode: true,
        },
      },
    ],
  };

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
    if (title.length === 0 || content.length === 0) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    if (title.length > 30) {
      alert("제목은 30자 이내로 입력해주세요.");
      return;
    }
    if (content.length > 500) {
      alert("내용은 500자 이내로 입력해주세요.");
      return;
    }
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
    dispatch(createSushi(sushiData))
      .then((response) => {
        const { success, data, error } = response.payload;  // 서버에서 반환된 token
        const { token } = data;  // 서버에서 반환된 token
        // 공유 URL 생성 (이제 `token`을 포함한 URL을 생성)
        const shareUrl = `share/${token}`;
        setShareUrl(shareUrl); // shareUrl 상태 업데이트
        console.log("공유 URL:", shareUrl);

        // 모달에서 공유 URL을 활용
        setShowModal(false);
        setShowCompleteModal(true);
      })
  };

  const handleCompleteClose = () => {
    setShowCompleteModal(false);
    onClose();
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    setSushiType(sushiImages[0].id);
  }, []);

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
                ✖
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
                    <span style={radioLabel}>연애</span>
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
                    <span style={radioLabel}>우정</span>
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
                    <span style={radioLabel}>진로</span>
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
                    <span style={radioLabel}>건강</span>
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
                    <span style={radioLabel}>가족</span>
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
                    <span style={radioLabel}>기타</span>
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
                    {sushiImages
                      .filter((sushi) => sushi.requiredLikes <= likesReceived)
                      .map((sushi) => (
                        <div
                          className="slider"
                          key={sushi.id}
                          onClick={() => handleSushiTypeChange(sushi.id)}
                        >
                          <img
                            style={sliderSushi}
                            src={sushi.src}
                            alt={sushi.name}
                          />
                          <p style={sliderSushiName}> {sushi.name}</p>
                        </div>
                      ))}
                  </Slider>
                </div>
                <div style={orderFormFooter}>
                  <hr style={divider} />
                  <div style={pageSelect}>
                    <button style={nextBtn} onClick={handleNext}>
                      고민작성 &gt;
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
                  placeholder="고민의 제목을 입력하세요 (30자 이내)"
                  maxLength={30}
                />
                <p style={textCounter}>{title.length} / 30</p>
                <hr style={divider} />
                <p style={orderSet}>내용</p>
                <hr style={divider} />
                <textarea
                  style={contentText}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="고민의 내용을 입력하세요 (500자 이내)"
                  maxLength={500}
                />
                <p style={textCounter}>{content.length} / 500</p>
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

          {showCompleteModal && (
            <div style={submitModalStyle}>
              <div style={submitModalContent}>
                <h3>제출이 완료되었습니다!</h3>

                <button
                  style={confirmButtonStyle}
                  onClick={handleCompleteClose}
                >
                  확인
                </button>

                <p>공유하기</p>

                <div style={buttonContainer}>
                  {/* 카카오톡 공유 아이콘 */}
                  <button
                    style={iconButtonStyle}
                    onClick={() => {
                      if (!window.Kakao.isInitialized()) {
                        window.Kakao.init(
                          import.meta.env.VITE_KAKAO_JAVASCRIPT_ID
                        );
                      }

                      window.Kakao.Link.sendCustom({
                        templateId: 117216, // 본인 템플릿 ID
                        templateArgs: {
                          url: shareUrl,
                        },
                      });
                      console.log("카카오톡 공유하기" + shareUrl);
                    }}
                  >
                    <img
                      src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                      alt="카카오톡 아이콘"
                      style={iconStyleF}
                    />
                  </button>

                  {/* 페이스북 공유 아이콘 */}
                  <button
                    style={iconButtonStyle}
                    onClick={() => {
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/${shareUrl}`,
                        "_blank"
                      );
                      console.log("페이스북 공유하기");
                    }}
                  >
                    <i className="fab fa-facebook-square" style={iconStyleF}></i>
                  </button>

                  {/* X (구 트위터) 공유 아이콘 */}
                  <a
                    href={`https://x.com/intent/tweet?text=Check%20out%20this%20sushi%20post!&url=${window.location.origin}/${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={iconButtonStyle}
                  >
                    <i class="fab fa-brands fa-x-twitter" style={iconStyleX}></i>
                    {/* <i className="fa-brands fa-x-twitter" style={iconStyleX}></i> */}
                  </a>
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
  top: "6vh",
  height: "80vh",
  width: "50vh",
  maxWidth: "90vw",
};

const orderForm = {
  backgroundColor: "#F4F4F4",
  border: "solid 0.3rem #454545",
  height: "80vh",
};

const orderFormHeader = {
  height: "14.3vh",
};

const orderFormHeaderTop = {
  display: "flex",
  height: "10vh",
};

const orderTitle = {
  margin: "0",
  padding: "2vh",
  letterSpacing: "0.1vh",
  fontSize: "4vh",
  color: "#454545",
};

const closeBtn = {
  position: "absolute",
  top: "1.2vh",
  right: "1.2vh",
  width: "5vh",
  height: "5vh",
  border: "none",
  backgroundColor: "transparent",
  color: "#454545",
  fontSize: "2.5vh",
  cursor: "pointer",
  fontWeight: "bold",
};

const orderExplain = {
  margin: "0",
  height: "4vh",
  paddingRight: "1vh",
  fontSize: "1.55vh",
  textAlign: "right",
  color: "#454545",
};

const orderFormBody = {
  height: "65.7vh",
};

const divider = {
  margin: "0",
  border: "solid 0.1rem #454545",
};

const orderSet = {
  margin: "0",
  padding: "1vh",
  fontSize: "2.3vh",
  color: "#454545",
};

const radioContainer = {
  margin: "0",
  paddingTop: "0.5vh",
  paddingBottom: "2vh",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: "1vh",
  accentColor: "black",
  fontSize: "1.95vh",
};

const radioBtn = {
  flexBasis: "calc(33.33% - 1rem)",
  textAlign: "left",
  display: "flex",
  gap: "0.5vh",
};

const radioLabel = {
  marginTop: "0.5vh",
  color: "#454545",
};

const rangeInput = {
  height: "3vh",
  width: "96%",
  margin: "0 auto",
  marginTop: "1vh",
  display: "block",
  accentColor: "#454545",
};

const presentPerson = {
  margin: "0",
  padding: "1vh",
  textAlign: "right",
  fontSize: "1.95vh",
  color: "#454545",
};

const sliderContainer = {
  height: "26.5vh",
  width: "100%",
};

const sliderSushi = {
  justifyContent: "center",
  height: "24vh",
  pointerEvents: "none",
  display: "block",
  margin: "0 auto",
  objectFit: "contain",
};

const sliderSushiName = {
  position: "relative",
  top: "-7vh",
  textAlign: "center",
  fontSize: "1.95vh",
  color: "#454545",
};
const orderFormFooter = {
  position: "absolute",
  bottom: "0",
  height: "4.4vh",
  width: "98%",
};

const pageSelect = {
  display: "flex",
};

const nextBtn = {
  margin: "0.6vh",
  marginLeft: "auto",
  border: "0",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "3vh",
  color: "#454545",
};

const titleText = {
  backgroundColor: "transparent",
  border: 0,
  outline: "none",
  resize: "none",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  width: "99%",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "2.3vh",
  color: "#454545",
};

const contentText = {
  backgroundColor: "transparent",
  border: 0,
  outline: "none",
  resize: "none",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  height: "35vh",
  width: "99%",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "2.3vh",
  color: "#454545",
};

const backBtn = {
  margin: "0.6vh",
  border: "0",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "3vh",
  color: "#454545",
};

const submitBtn = {
  margin: "0.6vh",
  marginLeft: "auto",
  border: "0",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "3vh",
  color: "#454545",
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
  padding: "3vh",
  borderRadius: "2vh",
  width: "40vh",
  position: "relative",
  textAlign: "center",
  border: "1vh solid #906C48",
  outline: "0.3vh solid #67523E",
  fontSize: "2.8vh",
  color: "#454545",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "center", // 버튼들이 가운데로 정렬되게 설정
  alignItems: "center", // 버튼들이 세로로 중앙 정렬되게 설정
  width: "100%",
  marginTop: "3vh",
  marginBottom: "1vh",
  gap: "1.5vh", // 버튼들 간의 간격을 설정
};

const iconButtonStyle = {
  background: "none",
  border: "none",
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const iconStyleF = {
  fontSize: "3em", // 아이콘 크기 일관성
  color: "#3b5998", // 아이콘 색상
  width: "40px", // 동일한 크기로 지정
  height: "40px", // 동일한 크기로 지정
  display: "inline-block",
};

const iconStyleX = {
  fontSize: "3em", // 아이콘 크기 일관성
  color: "#3b5998", // 아이콘 색상
  width: "40px", // 동일한 크기로 지정
  height: "40px", // 동일한 크기로 지정
  display: "inline-block",
};

const confirmButtonStyle = {
  padding: "1vh 0",
  border: "none",
  borderRadius: "1vh",
  backgroundColor: "#dc3545",
  color: "white",
  cursor: "pointer",
  width: "30%",
  whiteSpace: "nowrap",
  lineHeight: "1",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "2.8vh",
};

const cancelButtonStyle = {
  padding: "1vh 0",
  border: "none",
  borderRadius: "1vh",
  backgroundColor: "#808080",
  color: "white",
  cursor: "pointer",
  width: "40%",
  whiteSpace: "nowrap",
  lineHeight: "1",
  fontFamily: "Ownglyph, Ownglyph",
  fontSize: "2.8vh",
};

const textCounter = {
  margin: "0",
  padding: "0.5vh",
  textAlign: "right",
  fontSize: "1.8vh",
  color: "#454545",
};

export default PostSushi;
