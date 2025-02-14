import React from "react";
import { useNavigate } from "react-router-dom";

// 초밥 이미지 임포트
import eggImg from "../assets/sushi/egg.webp";
import salmonImg from "../assets/sushi/salmon.webp";
import shrimpImg from "../assets/sushi/shrimp.webp";
import cuttleImg from "../assets/sushi/cuttle.webp";
import eelImg from "../assets/sushi/eel.webp";
import octopusImg from "../assets/sushi/octopus.webp";
import wagyuImg from "../assets/sushi/wagyu.webp";
import scallopImg from "../assets/sushi/가리비초밥.webp";
import tunaImg from "../assets/sushi/참치초밥.webp";
import uniImg from "../assets/sushi/성게알초밥.webp";
import flatfighImg from "../assets/sushi/광어초밥.webp";
import salmonroeImg from "../assets/sushi/연어알초밥.webp";

// Plates 이미지 임포트
import redImg from "../assets/plates/red.webp";
import yellowImg from "../assets/plates/yellow.webp";
import greenImg from "../assets/plates/green.webp";
import blueImg from "../assets/plates/blue.webp";
import violetImg from "../assets/plates/violet.webp";
import grayImg from "../assets/plates/gray.webp";
import whiteImg from "../assets/plates/white.webp";

/** 레일에서 흘러가는 초밥 하나에 대한 컴포넌트
 * 1. 레일에 흘러가는 초밥 데이터를 보여줄 컴포넌트
 * 2. id를 받아서 초밥을 구분하고
 * 3. 클릭시 sushiview로 id state를 넘기며 navigate됨
 * 4. 초밥 종류를 인자로 받아서 초밥이 다르게 보여지게 구현하면 됨
 */

const Sushi = ({
  sushiId,
  category,
  sushiType,
  remainingAnswers,
  expirationTime,
  onSushiClick,
}) => {
  // const navigate = useNavigate();

  // 고민 카테고리 매핑
  const categories = {
    1: "사랑",
    2: "우정",
    3: "진로",
    4: "건강",
    5: "가족",
    6: "기타",
  };

  // 카테고리에 맞는 Plates 이미지 매핑
  const plates = {
    1: redImg,
    2: yellowImg,
    3: blueImg,
    4: greenImg,
    5: violetImg,
    6: grayImg,
  };

  // 초밥 타입 매핑
  const sushiTypes = {
    1: { name: "계란", image: eggImg },
    2: { name: "연어", image: salmonImg },
    3: { name: "새우", image: shrimpImg },
    4: { name: "한치", image: cuttleImg },
    5: { name: "문어", image: octopusImg },
    6: { name: "장어", image: eelImg },
    7: { name: "와규", image: wagyuImg },
    8: { name: "가리비", image: scallopImg },
    9: { name: "광어", image: flatfighImg },
    10: { name: "성게알", image: uniImg },
    11: { name: "참치", image: tunaImg },
    12: { name: "연어알", image: salmonroeImg },
  };

  const categoryName = categories[category] || "알 수 없는 카테고리";
  const sushiName = sushiTypes[sushiType] || {
    name: "알 수 없는 초밥",
    image: null,
  };

  const plateImage = plates[category] || whiteImg;

  const handleSushiClick = () => {
    onSushiClick({
      sushiId,
      category,
      sushiType,
      remainingAnswers,
      expirationTime,
    });
  };

  return (
    <div
      className="sushi"
      // onClick={handleSushiClick}
      style={{
        cursor: "pointer",
        textAlign: "center",
        width: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 초밥과 접시를 감싸는 div */}
      <div
        style={{
          position: "relative",
          width: "19vh",
          height: "18vh",
          overflow: "hidden",
        }}
      >
        {plateImage && (
          <img
            src={plateImage}
            alt={`Plate for ${categoryName}`}
            style={{
              width: "16vh",
              height: "15vh",
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
            }}
          />
        )}

        {sushiName.image && (
          <img
            onClick={handleSushiClick}
            src={sushiName.image}
            alt={sushiName.name}
            style={{
              width: "46vh",
              height: "12vh",
              overflow: "hidden", // 넘치는 부분 숨기기
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              top: "47.8%",
              left: "49%",
              transform: "translate(-50%, -50%)",
              willChange: "transform", // 모바일 최적화
              imageRendering: "crisp-edges", // 이미지 흐려짐 방지
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Sushi;
