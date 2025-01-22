package com.ssafy.sushi.domain.auth.dto;

import com.nimbusds.openid.connect.sdk.UserInfoResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthLoginResult {
    private String accessToken;
    private UserInfoResponse user;

    public static OAuthLoginResult of(String accessToken, UserInfoResponse userInfoResponse) {
        return OAuthLoginResult.builder()
                .accessToken(accessToken)
                .user(userInfoResponse)
                .build();
    }
}
