import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  markAsRead,
  fetchUnreadExists,
  markAsReadAll,
} from "../store/slices/notificationSlice";

import EXP from "../assets/Notification/EXP.webp"; // 유통기한 마감
import ANS_END from "../assets/Notification/ANS_END.webp"; // 답변 마감
import ANS_LIKE from "../assets/Notification/ANS_LIKE.webp"; // 답변 좋아요

const NotificationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { notifications, status } = useSelector((state) => state.notification);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      dispatch(fetchNotifications({ page: 1, size: 10 }));
      dispatch(fetchUnreadExists());
    } else {
      setShow(false);
    }
  }, [isOpen, dispatch]);

  const handleNotificationClick = (notification) => {
    dispatch(markAsRead(notification.notificationId));
    if (notification.redirectUrl) {
      window.location.href = notification.redirectUrl;
    }
    onClose();
  };

  const readAllNotification = () => {
    dispatch(markAsReadAll()).then(() => {
      // 알림 전체 읽기를 완료한 후 notifications 비우기
      dispatch(fetchNotifications({ page: 1, size: 10 })); // 또는 빈 배열로 설정
    });
  };

  // notification type 이미지
  const getNotificationImage = (type) => {
    switch (type) {
      case 1:
        return EXP;
      case 2:
        return ANS_END;
      case 3:
        return ANS_LIKE;
      default:
        return EXP;
    }
  };

  // 제목을 6글자로 제한
  const truncateTitle = (title) => {
    if (!title) return "";
    return title.length > 6 ? `[${title.slice(0, 6)}...]` : `[${title}]`;
  };

  if (!isOpen && !show) return null;

  return (
    <div style={{ ...styles.overlay, opacity: show ? 1 : 0 }}>
      <div
        style={{ ...styles.modal, transform: show ? "scale(1)" : "scale(0.9)" }}
      >
        <div style={styles.outerBox}>
          <div style={styles.innerBox}>알림</div>
          <button style={styles.readAllButton} onClick={readAllNotification}>
            ✓ 모두 읽음
          </button>
          <button style={styles.cancelButton} onClick={onClose}>
            ✖
          </button>
        </div>

        <div>
          {status === "loading" ? (
            <p style={styles.emptyText}>로딩 중...</p>
          ) : notifications.length > 0 ? (
            <ul style={styles.list}>
              {notifications.map((notification) => (
                <li
                  key={notification.notificationId}
                  style={styles.listItem}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div style={styles.outerContainer}>
                    <div style={styles.middleContainer}>
                      <div style={styles.innerContainer}>
                        <div style={styles.notificationImage}>
                          <img
                            src={getNotificationImage(
                              notification.notificationType
                            )}
                            alt="알림 이미지"
                            style={styles.image}
                          />
                        </div>

                        <div style={styles.textContainer}>
                          <div style={styles.title}>{notification.message}</div>
                          <div style={styles.contentText}>
                            {truncateTitle(notification.sushi.title)}{" "}
                            {notification.message}
                          </div>
                          <div style={styles.time}>
                            {new Date(notification.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.emptyText}>알림이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  /* 오버레이 스타일 */
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    transition: "opacity 0.3s ease",
  },
  /* 모달 스타일 */
  modal: {
    position: "relative",
    top: "6vh",
    width: "50vh",
    maxWidth: "90vw",
    height: "80vh",
    padding: "2.5vh",
    paddingTop: "1vh",
    backgroundColor: "#FFFAF0",
    border: "1vh solid #906C48",
    borderRadius: "1.3vh",
    outline: "0.25vh solid #67523E",
    overflowY: "auto",
    boxSizing: "border-box",
    scrollbarWidth: "none",
    transition: "transform 0.3s ease",
  },
  /* '알림' 외부 박스 */
  outerBox: {
    width: "30vh",
    maxWidth: "250px",
    margin: "0 auto 20px auto",
    marginTop: "10px",
    border: "4px solid #8B6B3E",
    borderRadius: "8px",
    backgroundColor: "#B2975C",
    padding: "6px",
    boxSizing: "border-box",
  },
  /* '알림' 내부 박스 */
  innerBox: {
    width: "100%",
    border: "2px solid #906C48",
    borderRadius: "4px",
    backgroundColor: "#B2975C",
    textAlign: "center",
    color: "#5D4A37",
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "6px 0",
    boxSizing: "border-box",
  },
  /* 알림 목록 스타일 */
  list: {
    listStyle: "none",
    padding: 0,
    width: "100%",
  },
  /* 알림 아이템 컨테이너 */
  listItem: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: "1vh",
  },
  /* 알림 아이템 외부 컨테이너 */
  outerContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    margin: "0",
    padding: "10px 0",
    boxSizing: "border-box",
    border: "1px solid #D4C5B1",
    backgroundColor: "#FFFEFA",
    marginBottom: "0px",
  },
  /* 알림 아이템 중간 컨테이너 */
  middleContainer: {
    width: "100%",
    padding: "8px 20px",
    boxSizing: "border-box",
    backgroundColor: "#FFFEFA",
  },
  /* 알림 아이템 내부 컨테이너 */
  innerContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFEFA",
  },
  /* 알림 이미지 컨테이너 */
  notificationImage: {
    width: "90px",
    height: "90px",
    marginRight: "10px",
    borderRadius: "4px",
    objectFit: "cover",
  },
  /* 알림 이미지 */
  image: {
    width: "100%",
    height: "100%",
  },
  /* 알림 텍스트 */
  textContainer: {
    flex: 1,
  },
  /* 알림 메시지 스타일 */
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#5A4628",
    marginBottom: "8px",
    display: "-webkit-box",
    WebkitLineClamp: 2, // 최대 2줄까지 표시
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  /* 초밥 제목 스타일 */
  contentText: {
    fontSize: "1rem",
    color: "#8D7B7B",
    lineHeight: "1.4",
    marginBottom: "5px",
  },
  /* 알림 시간 */
  time: {
    fontSize: "12px",
    color: "#666",
  },
  /* 알림없을때 */
  emptyText: {
    textAlign: "center",
    color: "#666",
    padding: "20px",
  },
  /* 모두 읽음 버튼 */
  readAllButton: {
    position: "absolute",
    top: "7vh",
    right: "0.8vh",
    padding: "0.6vh 1.2vh",
    backgroundColor: "transparent",
    color: "#67523E",
    border: "none",
    cursor: "pointer",
    fontSize: "1.8vh",
    fontFamily: "Ownglyph, Ownglyph",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5vh",
    opacity: 0.8,
  },
  /* 닫기 버튼 */
  cancelButton: {
    position: "absolute",
    top: "1.2vh",
    right: "1.5vh",
    padding: "0.6vh 1.2vh",
    border: "none",
    backgroundColor: "transparent",
    color: "#67523E",
    fontSize: "2.5vh",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default NotificationModal;
