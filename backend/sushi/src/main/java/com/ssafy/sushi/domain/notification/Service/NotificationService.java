package com.ssafy.sushi.domain.notification.Service;

import com.ssafy.sushi.domain.notification.Entity.Notification;
import com.ssafy.sushi.domain.notification.Repository.NotificationRepository;
import com.ssafy.sushi.domain.notification.enums.NotificationType;
import com.ssafy.sushi.domain.user.Entity.User;
import lombok.RequiredArgsConstructor;
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

}
