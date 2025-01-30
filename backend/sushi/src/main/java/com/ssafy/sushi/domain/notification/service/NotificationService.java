package com.ssafy.sushi.domain.notification.service;


import com.ssafy.sushi.domain.notification.dto.response.HasUnreadNotificationResponse;
import com.ssafy.sushi.domain.notification.dto.response.MyNotificationListResponse;
import com.ssafy.sushi.domain.notification.entity.Notification;
import com.ssafy.sushi.domain.notification.enums.NotificationType;
import com.ssafy.sushi.domain.notification.repository.NotificationRepository;
import com.ssafy.sushi.domain.user.entity.User;
import com.ssafy.sushi.global.common.CustomPage;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    private final String host = "http://localhost:5173/";

    @Transactional
    public void sendNotification(User user, NotificationType notificationType, Integer parameter) {

        Notification notification = Notification.builder()
                .user(user)
                .notificationType(notificationType)
                .message(notificationType.getMessage())
                .redirectUrl(host + notificationType.getRedirectUrl() + parameter.toString())
                .build();

        notificationRepository.save(notification);
    }

    public CustomPage<MyNotificationListResponse> getMyNotificationList(Integer userId, Pageable pageable) {
        Page<Notification> notificationList = notificationRepository.findNotificationByUserIdAndIsReadFalse(userId, pageable);

        return new CustomPage<>(notificationList.map(MyNotificationListResponse::of));
    }

    public HasUnreadNotificationResponse hasUnreadNotification(Integer userId) {
        boolean hasUnread = notificationRepository.existsByUserIdAndIsReadFalse(userId);

        return HasUnreadNotificationResponse.builder()
                .hasUnread(hasUnread)
                .build();
    }

    @Transactional
    public void markNotificationAsRead(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOTIFICATION_NOT_FOUND));

        if (!notification.getIsRead()) {
            notification.markNotificationAsRead();
            notificationRepository.save(notification);
        }
    }
}
