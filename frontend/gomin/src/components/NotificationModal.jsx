import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAsRead, fetchUnreadExists } from '../store/slices/notificationSlice';

/** NotificationBell을 눌렀을때 열리는 모달
 * 본인에게 온 알림을 볼 수 있음
 * 1. 현재 API 연결 완료
 * 2. 디자인만 어케해보셈.
 * 3. 알림온 데이터로 초밥 디테일로 가는거 구현하시면 됨
 */
const NotificationModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { notifications, hasUnread } = useSelector((state) => state.notification);
    const status = useSelector((state) => state.notification.status);

    // 알림 데이터를 가져오기
    useEffect(() => {
        if (isOpen) {
            dispatch(fetchNotifications());
            dispatch(fetchUnreadExists());
        }
    }, [isOpen, dispatch]);

    // 알림 읽음 처리
    const handleMarkAsRead = (notificationId) => {
        dispatch(markAsRead(notificationId));
    };

    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>알림 페이지 모달창</h2>
                {status === 'loading' ? (
                    <p>로딩 중...</p>
                ) : (
                    <div>
                        {notifications.length > 0 ? (
                            <ul>
                                {notifications.map((notification) => (
                                    <li key={notification.notificationId}>
                                        <p>{notification.message}</p>
                                        <p>알림 타입: {notification.type}</p>
                                        <p>생성일: {notification.createdAt}</p>
                                        <button onClick={() => handleMarkAsRead(notification.notificationId)}>
                                            읽음 처리
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>알림이 없습니다.</p>
                        )}
                    </div>
                )}
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

// 스타일
const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modalStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
};

export default NotificationModal;
