package com.ssafy.sushi.domain.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthLoginResponse {
    private String accessToken;
    private String refreshToken;
    private UserInfoResponse user;

    public static OAuthLoginResponse of(String accessToken, String refreshToken, UserInfoResponse userInfoResponse) {
        return OAuthLoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userInfoResponse)
                .build();
    }
}

