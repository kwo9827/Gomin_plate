package com.ssafy.sushi.domain.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthLoginResponse {
    private String id;
    private String accessToken;
    private String refreshToken;
    private Boolean isNew;

    public static OAuthLoginResponse of(Long id, String accessToken, String refreshToken, boolean isNew) {
        return OAuthLoginResponse.builder()
                .id(id.toString())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .isNew(isNew)
                .build();
    }
}

