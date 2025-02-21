package com.ssafy.sushi.domain.auth.dto.response;

import com.ssafy.sushi.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoResponse {
    private String id;
    private String nickname;
    private Boolean isNew;

    public static UserInfoResponse of(User user, Boolean isNew) {

        if (user.getId() == 12) {
            isNew = true;
        }

        return UserInfoResponse.builder()
                .id(user.getId().toString())
                .nickname(user.getNickname())
                .isNew(isNew)
                .build();
    }
}
