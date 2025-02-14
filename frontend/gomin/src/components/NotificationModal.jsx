import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  markAsRead,
  fetchUnreadExists,
} from "../store/slices/notificationSlice";

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

  if (!isOpen && !show) return null;

  return (
    <div style={{ ...overlayStyle, opacity: show ? 1 : 0 }}>
      <div
        style={{ ...modalStyle, transform: show ? "scale(1)" : "scale(0.9)" }}
      >
        <div style={outerBoxStyle}>
          <div style={innerBoxStyle}>알림</div>
          <button style={cancelButtonStyle} onClick={onClose}>
            ✖
          </button>
        </div>

        <div>
          {status === "loading" ? (
            <p style={emptyTextStyle}>로딩 중...</p>
          ) : notifications.length > 0 ? (
            <ul style={listStyle}>
              {notifications.map((notification) => (
                <li
                  key={notification.notificationId}
                  style={listItemStyle}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div style={outerContainerStyle}>
                    <div style={middleContainerStyle}>
                      <div style={innerContainerStyle}>
                        <div style={sushiImageStyle}>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpL734zj0BQG4VtmIwh5Ql0tRFW4HIVMQIg&s"
                            alt="초밥사진"
                            style={imageStyle}
                          />
                        </div>

                        <div style={textContainerStyle}>
                          <div style={titleStyle}>{notification.message}</div>
                          <hr style={dividerStyle} />
                          <div style={contentTextStyle}>
                            {notification.message}
                          </div>
                          <div style={timeStyle}>
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
            <p style={emptyTextStyle}>알림이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

/*오버레이 스타일 */
const overlayStyle = {
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
  // backdropFilter: "blur(10px)",
  transition: "opacity 0.3s ease", // opacity에 애니메이션 추가
};
/*모달 스타일 */
const modalStyle = {
  position: "relative",
  top: "6vh",
  width: "50vh",
  maxWidth: "90vw",
  height: "80vh",
  padding: "2.5vh",
  paddingTop: "0.3vh",
  backgroundColor: "#fdf5e6",
  border: "1vh solid #906C48",
  borderRadius: "1.3vh",
  outline: "0.25vh solid #67523E",
  overflowY: "auto",
  boxSizing: "border-box",
  scrollbarWidth: "none",
  transition: "transform 0.3s ease", // scale에 애니메이션 추가
};
/*취소 버튼 */
const cancelButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "5px 10px",
  border: "none",
  backgroundColor: "transparent",
  color: "#67523E",
  fontSize: "20px",
  cursor: "pointer",
  fontWeight: "bold",
};
/* '나의 알림' 외부 박스 */
const outerBoxStyle = {
  width: "30vh",
  maxWidth: "250px",
  margin: "20px auto",
  border: "4px solid #8B6B3E",
  borderRadius: "8px",
  backgroundColor: "#B2975C",
  padding: "6px",
  boxSizing: "border-box",
};
/* '나의 알림' 내부 박스 */
const innerBoxStyle = {
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
};
/*알림 리스트 스타일 */
const listStyle = {
  listStyle: "none",
  padding: 0,
  width: "100%",
};
/*알림 리스트 아이템 스타일 */
const listItemStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  marginBottom: "1vh",
};
/*알림 리스트 아이템 외부 컨테이너 스타일 */
const outerContainerStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "100%",
  margin: "0px auto",
  padding: "6px",
  backgroundColor: "#906C48",
  borderRadius: "6px",
  boxSizing: "border-box",
};
/*알림 리스트 아이템 중간 컨테이너 스타일 */
const middleContainerStyle = {
  width: "100%",
  backgroundColor: "#B2975C",
  borderRadius: "4px",
  padding: "8px",
  boxSizing: "border-box",
};
/*알림 리스트 아이템 내부 컨테이너 스타일 */
const innerContainerStyle = {
  position: "relative",
  width: "100%",
  backgroundColor: "#FFFFF0",
  borderRadius: "4px",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};
/*알림 리스트 아이템 텍스트 컨테이너 스타일 */
const textContainerStyle = {
  flex: 1,
};
/*알림 리스트 아이템 타이틀 스타일 */
const titleStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#5A4628",
  marginBottom: "8px",
  marginLeft: "10px",
  // textAlign: "center",
  marginTop: "10px",
};
/*알림 리스트 아이템 텍스트 스타일 */
const contentTextStyle = {
  fontSize: "0.8rem",
  color: "#8D7B7B",
  lineHeight: "1.4",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};
/*알림 리스트 아이템 구분선 스타일 */
const dividerStyle = {
  width: "100%",
  border: "0.5px solid #BCBCBC",
  margin: "8px 0",
};
/*알림 리스트 아이템 시간 스타일 */
const timeStyle = {
  fontSize: "0.7rem",
  color: "#666",
  textAlign: "right",
};
/*알림 리스트 아이템 빈 텍스트 스타일 */
const emptyTextStyle = {
  textAlign: "center",
  color: "#666",
  padding: "20px",
};

const sushiImageStyle = {
  width: "80px",
  height: "80px",
  marginRight: "10px",
  borderRadius: "4px",
  objectFit: "cover",
};

const imageStyle = {
  width: "100%",
  height: "100%",
};

export default NotificationModal;
