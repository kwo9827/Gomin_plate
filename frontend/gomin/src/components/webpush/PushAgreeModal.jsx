import React from "react";
import { useNotification } from "../../hooks/useNotification";
import CommonConfirmModal from "./CommonConfirmModal";

const PushAgreeModal = ({ isOpen, onClose }) => {
  const { requestPermission } = useNotification();

  const handlePermission = async () => {
    onClose();
    const result = await requestPermission();
  };

  return (
    <CommonConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handlePermission}
      message="웹 밖에서도 초밥 마감 및 좋아요에 대한 알림을 받아 볼 수 있어요!
알림을 허용하시겠습니까?"
    />
  );
};

export default PushAgreeModal;
