import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSushi } from "../store/slices/sushiSlice";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const PostSushi = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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
        <div className="post-sushi-container">
            <h1>스시 고민 등록하기</h1>
            {step === 1 ? (
                <div>
                    <h3>카테고리 선택</h3>
                    <label>
                        <input
                            type="radio"
                            name="category"
                            value="맛"
                            checked={category === "맛"}
                            onChange={handleCategoryChange}
                        />
                        맛
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="category"
                            value="가격"
                            checked={category === "가격"}
                            onChange={handleCategoryChange}
                        />
                        가격
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="category"
                            value="서비스"
                            checked={category === "서비스"}
                            onChange={handleCategoryChange}
                        />
                        서비스
                    </label>

                    <h3>인원수 설정</h3>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={maxAnswers}
                        onChange={handleProgressChange}
                    />
                    <p>인원수: {maxAnswers}</p>

                    <h3>초밥 종류 선택</h3>
                    <Slider {...sliderSettings}>
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

                    <button className="next-btn" onClick={handleNext}>다음 단계</button>
                </div>
            ) : (
                <div>
                    <h3>고민 제목과 내용 작성</h3>
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
                    <button className="back-btn" onClick={handleBack}>뒤로 가기</button>
                    <button className="submit-btn" onClick={handleSubmit}>초밥 등록하기</button>
                </div>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>정말 제출하시겠습니까?</h3>
                        <button onClick={handleConfirmSubmit}>제출</button>
                        <button onClick={handleCancelSubmit}>취소</button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .post-sushi-container {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                h3 {
                    margin-bottom: 10px;
                    color: #444;
                }
                label {
                    display: inline-block;
                    margin-right: 10px;
                }
                .next-btn, .submit-btn, .back-btn {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 20px;
                    font-size: 16px;
                }
                .next-btn:hover, .submit-btn:hover, .back-btn:hover {
                    background-color: #45a049;
                }
                input[type="text"], textarea {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                input[type="range"] {
                    width: 100%;
                    margin-top: 10px;
                }
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    text-align: center;
                }
                .modal-content button {
                    margin: 10px;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                }
                .modal-content button:hover {
                    background-color: #45a049;
                }
            `}</style>
        </div>
    );
};

export default PostSushi;
