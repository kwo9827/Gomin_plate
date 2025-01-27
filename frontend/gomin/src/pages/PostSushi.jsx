import React, { useState, component } from "react";
import { useDispatch } from "react-redux";
import { createSushi } from "../store/slices/sushiSlice";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

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

/** 홈화면에서 초밥 등록벨을 눌렀을때 나타날 주문서 페이지
 * 1. 현재 API 연결 완료
 * 2. 디자인 수정 필요
 * 3. 상태저장부 까지 구현 완료
 */
const PostSushi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [maxAnswers, setMaxAnswers] = useState(1);
  const [plateType, setPlateType] = useState(""); // 카테고리로 설정
  const [sushiType, setSushiType] = useState("초밥1"); // 초밥 이름으로 설정
  const [category, setCategory] = useState(""); // 카테고리 이름 (실제로는 사용되지 않음)
  const [showModal, setShowModal] = useState(false);

  // 카테고리 변경 함수
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // 하나만 선택되도록
    setPlateType(e.target.value); // 선택된 카테고리가 접시 종류로 설정
  };

  // 인원수 설정
  const handleProgressChange = (e) => {
    setMaxAnswers(e.target.value);
  };

  // 초밥 종류 선택
  const handleSushiTypeChange = (name) => {
    setSushiType(name); // 초밥 이름을 선택된 이름으로 설정
  };

  // 다음 단계로 넘어가기
  const handleNext = () => {
    if (!plateType || maxAnswers === 0) {
      alert("카테고리와 인원수를 설정해주세요.");
      return;
    }
    setStep(2);
  };

  // 뒤로 가기
  const handleBack = () => {
    setStep(1); // 첫 번째 화면으로 돌아가기
  };

  // 제출하기
  const handleSubmit = () => {
    setShowModal(true); // 모달 띄우기
  };

  // 모달에서 제출 확인
  const handleConfirmSubmit = () => {
    const sushiData = {
      title,
      content,
      maxAnswers,
      plateType, // 실제로 서버로 전달되는 값은 plateType
      sushiType, // 초밥 이름
    };

    // 등록된 내용 콘솔 출력
    console.log("등록된 내용:", sushiData);

    dispatch(createSushi(sushiData));

    // 홈 화면으로 이동
    navigate("/Home");
  };

  // 취소 시 모달 닫기
  const handleCancelSubmit = () => {
    setShowModal(false); // 모달 닫기
  };

  return (
    <div className="order-form">
      <p className="order-title">
        마음속 이야기를
        <br />
        적는 고민 작성서
      </p>
      <p className="order-explain">
        주문 가능 초밥의
        <br /> 종류는 달라질 수 있습니다
      </p>

      <hr className="divider" />

      {step === 1 ? (
        <div>
          <p className="order-set">질문 카테고리 설정</p>
          <div className="radio-container">
            <label className="radio-btn">
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
            <label className="radio-btn">
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
            <label className="radio-btn">
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
            <label className="radio-btn">
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
            <label className="radio-btn">
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
            <label className="radio-btn">
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
          <hr className="divider" />
          <p className="order-set">인원수 설정</p>
          <input
            className="range-input"
            type="range"
            min="1"
            max="10"
            value={maxAnswers}
            onChange={handleProgressChange}
          />
          <p className="present-person">{maxAnswers} / 10</p>
          <hr className="divider" />
          <p className="order-set">초밥 종류 선택</p>
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
              <div onClick={() => handleSushiTypeChange("초밥4")}>
                <img src="/images/sushi4.jpg" alt="초밥4" />
                <p>초밥4</p>
              </div>
              <div onClick={() => handleSushiTypeChange("초밥5")}>
                <img src="/images/sushi5.jpg" alt="초밥5" />
                <p>초밥5</p>
              </div>
              <div onClick={() => handleSushiTypeChange("초밥6")}>
                <img src="/images/sushi6.jpg" alt="초밥6" />
                <p>초밥6</p>
              </div>
              <div onClick={() => handleSushiTypeChange("초밥7")}>
                <img src="/images/sushi7.jpg" alt="초밥7" />
                <p>초밥7</p>
              </div>
            </Slider>
          </div>
          <hr className="divider" />
          <div className="page-select">
            <button className="next-btn" onClick={handleNext}>
              다음 단계 &gt;
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>고민 제목과 내용 작성</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="고민의 제목을 입력하세요"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="고민의 내용을 입력하세요"
          />
          <button className="back-btn" onClick={handleBack}>
            뒤로 가기
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            초밥 등록하기
          </button>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>정말 제출하시겠습니까?</p>
            <button onClick={handleConfirmSubmit}>제출</button>
            <button onClick={handleCancelSubmit}>취소</button>
          </div>
        </div>
      )}

      {/* CSS style */}
      <style>
        {`
      .order-form {
          background-color: #F4F4F4;
          border: solid 0.3rem #595959;
      }

      .order-title {
          margin: 0rem;
          padding: 0.5rem;
          font-size: 32px;
      }
      
      .order-explain {
          margin: 0rem;
          padding-right: 0.5rem;
          font-size: 12px;
          text-align: right;
      }

      .divider {
          margin: 0rem;
          border: solid 0.1rem #595959;
      }

      .order-set {
          margin: 0rem;
          padding: 0.5rem;
      }

      .radio-container {
          margin: 1rem;
          display: flex;
          flex-wrap: wrap; /* 줄바꿈을 허용 */
          justify-content: space-around; /* 각 버튼 사이의 간격 조정 */
          gap: 1rem; /* 라디오 버튼 간격 추가 */
      }

      .radio-btn {
          flex-basis: calc(33.33% - 1rem); /* 한 줄에 3개씩 배치 (100% / 3) */
          text-align: center; /* 버튼과 텍스트를 중앙 정렬 */
      }

/* 기본스타일 제거, 버튼 모양 재설정 */
input[type='radio'] {
  flex-shrink:0;
  -webkit-appearance: none; /* 웹킷 브라우저에서 기본 스타일 제거*/
  -moz-appearance: none; /* 모질라 브라우저에서 기본 스타일 제거*/ 
  appearance: none; /*기본 브라우저에서 기본 스타일 제거*/
  width: 13px;
  height: 13px;
  border: 1px solid #ccc; /*체크되지 않았을 때의 테두리 색상*/
  border-radius: 50%;
  outline: none; /*focus 시에 나타나는 기본 스타일 제거*/
  cursor: pointer;
}
/* 체크 시 버튼 모양 스타일*/
input[type='radio']:checked {
  background-color: #111; /*체크 시 내부 원 색상*/
  border: 3px solid #fff; /*라인이 아닌, 라인과 원 사이 색상*/
  box-shadow: 0 0 0 1px #111; /*라인*/
}

      .range-input {
          width: 95%;
          margin: 0 auto;
          display: block;
          accent-color: #404040;
        }

      .present-person {
          margin: 0;
          margin-right: 0.5rem;
          text-align: right;
      }

      .page-select {
          display: flex;
      }

      .next-btn { 
          margin: 0.4rem;
          margin-left: auto;
          border: 0;
          background-color: transparent;
          cursor: pointer;
          font-family: "Ownglyph", Ownglyph;
          font-size: 20px;
      }

      `}
      </style>
    </div>
  );
};

export default PostSushi;
