package com.ssafy.sushi.domain.auth.dto;

import com.ssafy.sushi.domain.user.Entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoResponse {
    private String id;
    private String nickname;
    private Boolean isNew;

    public static UserInfoResponse of(User user, Boolean isNew) {
        return UserInfoResponse.builder()
                .id(user.getId().toString())
                .nickname(user.getNickname())
                .isNew(isNew)
                .build();
    }
}
