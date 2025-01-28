package com.ssafy.sushi.domain.user.entity;

import com.ssafy.sushi.domain.user.enums.Provider;
import com.ssafy.sushi.global.common.Entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
//@SQLDelete(sql = "UPDATE users SET deleted_at = NOW() WHERE id = ?")  // deleted_at 필드 변경할 것
//@SQLRestriction("deleted_at IS NULL")
public class User extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String nickname;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Column(name = "provider_id", nullable = false)
    private String providerId;

    @Column(name = "total_likes")
    @Builder.Default
    private Integer totalLikes = 0;

    public void incrementTotalLikes() {
        this.totalLikes++;
    }
}