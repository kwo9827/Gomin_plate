package com.ssafy.sushi.domain.user.entity;

import com.ssafy.sushi.domain.user.enums.Provider;
import com.ssafy.sushi.global.common.Entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    private Integer totalLikes;

    @Builder
    public User(String nickname, Provider provider, String providerId) {
        this.nickname = nickname;
        this.provider = provider;
        this.providerId = providerId;
        this.totalLikes = 0;
    }
}