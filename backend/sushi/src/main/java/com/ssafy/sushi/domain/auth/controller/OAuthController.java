package com.ssafy.sushi.domain.auth.controller;

import com.ssafy.sushi.domain.auth.dto.LoginResult;
import com.ssafy.sushi.domain.auth.dto.response.TokenRefreshResponse;
import com.ssafy.sushi.domain.auth.dto.request.OAuthLoginRequest;
import com.ssafy.sushi.domain.auth.dto.response.OAuthLoginResponse;
import com.ssafy.sushi.domain.auth.service.OAuthService;
import com.ssafy.sushi.domain.user.enums.Provider;
import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.common.util.CookieUtil;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {
    private final OAuthService oAuthService;

    @PostMapping("/{provider}")
    public ResponseEntity<ApiResponse<OAuthLoginResponse>> socialLogin(
            @PathVariable String provider,
            @RequestBody OAuthLoginRequest request) {
        LoginResult loginResult = oAuthService.handleOAuthLogin(Provider.valueOf(provider.toUpperCase()), request.getCode());

        // RefreshToken을 HttpOnly 쿠키로 설정
        ResponseCookie responseCookie = CookieUtil.makeRefreshTokenCookie(loginResult.getRefreshToken());

        return ApiResponse.success(loginResult.getResponse(), responseCookie);
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refreshToken(
            @CookieValue(name = "refresh_token", required = false) String refreshToken) {
        if (refreshToken == null) {
            throw new CustomException(ErrorCode.REFRESH_TOKEN_NOT_FOUND);
        }

        TokenRefreshResponse response = oAuthService.refreshToken(refreshToken);
        return ApiResponse.success(response);
    }
}

