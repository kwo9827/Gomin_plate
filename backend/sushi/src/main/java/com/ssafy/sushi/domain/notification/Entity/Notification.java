package com.ssafy.sushi.domain.notification.Entity;

import com.ssafy.sushi.domain.user.Entity.User;
import com.ssafy.sushi.global.common.Entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "notification")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Notification extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "notification_type",nullable = false)
    private Character notificationType; // [ 1: 유통기한마감, 2: 답변마감, 3: 답변 좋아요 ]

    @Column(nullable = false)
    private String message;

    @Column(name = "is_read", nullable = false)
    @Builder.Default
    private Boolean isRead = false;

    @Column(name = "redirect_url", nullable = false)
    private String redirectUrl;

}
