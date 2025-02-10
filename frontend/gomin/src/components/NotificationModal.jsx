import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  markAsRead,
  fetchUnreadExists,
} from "../store/slices/notificationSlice";

const NotificationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { notifications, status } = useSelector((state) => state.notification);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications({ page: 1, size: 10 }));
      dispatch(fetchUnreadExists());
    }
  }, [isOpen, dispatch]);

  const handleNotificationClick = (notification) => {
    dispatch(markAsRead(notification.notificationId));
    if (notification.redirectUrl) {
      window.location.href = notification.redirectUrl;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={outerBoxStyle}>
          <div style={innerBoxStyle}>알림</div>
          <button style={cancelButtonStyle} onClick={onClose}>
            ✖
          </button>
        </div>

        <div>
          {status === "loading" ? (
            <p>로딩 중...</p>
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

// Styles
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
  zIndex: 1000,
  backdropFilter: "blur(10px)",
};

const modalStyle = {
  backgroundColor: "#fdf5e6",
  padding: "0px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "393px",
  height: "80vh",
  maxHeight: "691px",
  position: "relative",
  border: "8px solid #906C48",
  outline: "2px solid #67523E",
  overflowY: "auto",
  boxSizing: "border-box",
  scrollbarWidth: "none",
};

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

const outerBoxStyle = {
  width: "100%",
  maxWidth: "250px",
  margin: "20px auto",
  border: "4px solid #8B6B3E",
  borderRadius: "8px",
  backgroundColor: "#B2975C",
  padding: "6px",
  boxSizing: "border-box",
};

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

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  width: "100%",
};

const listItemStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

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

const middleContainerStyle = {
  width: "100%",
  backgroundColor: "#B2975C",
  borderRadius: "4px",
  padding: "8px",
  boxSizing: "border-box",
};

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

const sushiImageStyle = {
  width: "90px",
  height: "90px",
  marginRight: "10px",
  borderRadius: "4px",
  objectFit: "cover",
};

const imageStyle = {
  width: "100%",
  height: "100%",
};

const textContainerStyle = {
  flex: 1,
};

const titleStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#5A4628",
  marginBottom: "8px",
};

const contentTextStyle = {
  fontSize: "1rem",
  color: "#8D7B7B",
  lineHeight: "1.4",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const dividerStyle = {
  width: "100%",
  border: "0.5px solid #BCBCBC",
  margin: "8px 0",
};

const timeStyle = {
  fontSize: "12px",
  color: "#666",
};

const emptyTextStyle = {
  textAlign: "center",
  color: "#666",
  padding: "20px",
};

export default NotificationModal;
