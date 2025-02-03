import React, { useState } from "react";
import Rail from "../components/Rail";
import Modal from "../components/EditModal";
import PostSushiBell from "../components/PostSushiBell";
import NotificationBell from "../components/NotificationBell";
import NotificationModal from "../components/NotificationModal";
import Sushi from "../components/Sushi";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openNotification = () => setIsNotificationOpen(true);
  const closeNotification = () => setIsNotificationOpen(false);

  return (
    <div className="home-container">
      <h1>회전 초밥 레일</h1>

      <div className="control-buttons">
        <button onClick={openModal}>모달 열기</button>
        <PostSushiBell />
        <NotificationBell onClick={openNotification} />
      </div>

      <Rail />

      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={closeNotification}
      />

      <h3>스시 테스트</h3>
      <Sushi
        sushiId={1}
        category={1} // 사랑
        sushiType={1} // 계란
        remainingAnswers={3} // 남은 답변 3개
        expirationTime="2025-02-28" // 유효 기간 2025년 2월 28일
      />
      <Sushi
        sushiId={2}
        category={2} // 우정
        sushiType={2} // 연어
        remainingAnswers={7} // 남은 답변 7개
        expirationTime="2025-03-15" // 유효 기간 2025년 3월 15일
      />
      <Sushi
        sushiId={3}
        category={4} // 건강
        sushiType={3} // 새우
        remainingAnswers={2} // 남은 답변 2개
        expirationTime="2025-04-01" // 유효 기간 2025년 4월 1일
      />
      <Sushi
        sushiId={4}
        category={5} // 가족
        sushiType={6} // 장어
        remainingAnswers={1} // 남은 답변 1개
        expirationTime="2025-01-10" // 유효 기간 2025년 1월 10일
      />
      <Sushi
        sushiId={5}
        category={6} // 기타
        sushiType={11} // 참치
        remainingAnswers={4} // 남은 답변 4개
        expirationTime="2025-05-25" // 유효 기간 2025년 5월 25일
      />
    </div>
  );
};

export default Home;
