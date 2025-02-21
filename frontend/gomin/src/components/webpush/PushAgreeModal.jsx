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
      message="알림을 허용하면 창을 닫아도 초밥 마감 & 좋아요 획득 소식을 받을 수 있어요!"
    />
  );
};

export default PushAgreeModal;
