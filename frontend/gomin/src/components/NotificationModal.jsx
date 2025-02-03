import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNotifications, markAsRead, fetchUnreadExists } from '../store/slices/notificationSlice';

const NotificationModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notifications } = useSelector((state) => state.notification);
    const status = useSelector((state) => state.notification.status);

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchNotifications());
            dispatch(fetchUnreadExists());
        }
    }, [isOpen, dispatch]);

    const handleNotificationClick = (notification) => {
        dispatch(markAsRead(notification.notificationId));
        navigate('/sushiview', { state: { id: notification.sushiId } });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="notification-overlay" style={styles.overlay}>
            <div className="notification-modal" style={styles.modal}>
                <div className="notification-header" style={styles.header}>
                    <div className="notification-titlecard" style={styles.titlecard}>
                        <div className="notification-smallcard" style={styles.smallcard}>
                            <h2 className="notification-title" style={styles.title}>알림</h2>
                        </div>
                    </div>
                    <button className="notification-close" style={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div className="notification-content" style={styles.content}>
                    {status === 'loading' ? (
                        <p style={styles.loadingText}>로딩 중...</p>
                    ) : (
                        <>
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.notificationId}
                                        className="notification-card"
                                        style={styles.card}
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        <div style={styles.cardContent}>
                                            <p style={styles.message}>{notification.message}</p>
                                            <p style={styles.time}>
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={styles.emptyText}>알림이 없습니다.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(10px)'
    },
    modal: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#f4e4bc',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: "8px solid #906C48",
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: '#FFFEEC',
        borderBottom: '1px solid #c4a87c',
        position: 'relative'  // 유지
    },
    titlecard: {
        position: 'relative',
        width: '238px',
        height: '60px',
        backgroundColor: '#B2975C',
        borderRadius: '2px',
        margin: '0 auto',
        border: '3px solid #906C48',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallcard: {
        position: 'relative',
        width: '226px',
        height: '50px',
        backgroundColor: '#B2975C',
        borderRadius: '2px',
        margin: '0 auto',
        border: '2px solid #906C48',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        color: '#5c4b3c',
        fontSize: '28px',
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',  // 추가
        top: '10px',           // 상단에서 10px 여백
        right: '10px',         // 오른쪽에서 10px 여백
        background: 'none',
        border: 'none',
        fontSize: '24px',
        color: '#906C48',
        cursor: 'pointer',
        padding: 0,
        lineHeight: 1
    },
    content: {
        maxHeight: '400px',
        overflowY: 'auto',
    },
    card: {
        backgroundColor: '#FFFFF0',
        borderRadius: '2px',
        cursor: 'pointer',
        border: '2px solid #DAD0CA',
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'translateY(-2px)'
        }
    },
    cardContent: {
        padding: '15px'
    },
    message: {
        margin: '0 0 8px 0',
        color: '#333',
        fontSize: '14px'
    },
    time: {
        margin: 0,
        color: '#666',
        fontSize: '12px'
    },
    loadingText: {
        textAlign: 'center',
        color: '#666',
        padding: '20px'
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        padding: '20px'
    }
};


export default NotificationModal;
