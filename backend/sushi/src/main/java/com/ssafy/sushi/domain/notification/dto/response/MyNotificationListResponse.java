package com.ssafy.sushi.domain.notification.dto.response;

import com.ssafy.sushi.domain.notification.entity.Notification;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MyNotificationListResponse {
    private Integer notificationId;
    private String message;
    private String redirectUrl;
    private LocalDateTime createdAt;

    public static MyNotificationListResponse of(Notification notification){
        return MyNotificationListResponse.builder()
                .notificationId(notification.getId())
                .message(notification.getMessage())
                .redirectUrl(notification.getRedirectUrl())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
