package com.ssafy.sushi.global.infra.oauth.client;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.ssafy.sushi.global.infra.oauth.constants.KakaoOAuthConstants;
import com.ssafy.sushi.global.infra.oauth.dto.KakaoTokenResponse;
import com.ssafy.sushi.global.infra.oauth.dto.KakaoUserResponse;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class KakaoOAuthClient {
    private final OkHttpClient okHttpClient;
    private final ObjectMapper objectMapper;

    @Value("${oauth.kakao.client-id}")
    private String clientId;

    @Value("${oauth.kakao.redirect-uri}")
    private String redirectUri;

    public KakaoTokenResponse getToken(String code) throws IOException {
        RequestBody formBody = new FormBody.Builder()
                .add(KakaoOAuthConstants.Parameters.GRANT_TYPE, KakaoOAuthConstants.GrantTypes.AUTHORIZATION_CODE)
                .add(KakaoOAuthConstants.Parameters.CLIENT_ID, clientId)
                .add(KakaoOAuthConstants.Parameters.REDIRECT_URI, redirectUri)
                .add(KakaoOAuthConstants.Parameters.CODE, code)
                .build();

        Request request = new Request.Builder()
                .url(KakaoOAuthConstants.Urls.TOKEN)
                .post(formBody)
                .build();

        try (Response response = okHttpClient.newCall(request).execute()) {
            assert response.body() != null;
            return objectMapper.readValue(response.body().string(), KakaoTokenResponse.class);
        }
    }

    public KakaoUserResponse getUserInfo(String accessToken) throws IOException {
        Request request = new Request.Builder()
                .url(KakaoOAuthConstants.Urls.USER_INFO)
                .header("Authorization", "Bearer " + accessToken)
                .get()
                .build();

        try (Response response = okHttpClient.newCall(request).execute()) {
            assert response.body() != null;
            return objectMapper.readValue(response.body().string(), KakaoUserResponse.class);
        }
    }
}
