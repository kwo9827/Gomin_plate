package com.ssafy.sushi.domain.auth;

import com.ssafy.sushi.domain.auth.dto.OAuthLoginRequest;
import com.ssafy.sushi.domain.auth.dto.OAuthLoginResponse;
import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {
    private final OAuthService oAuthService;

    @PostMapping("/kakao")
    public ResponseEntity<ApiResponse<OAuthLoginResponse>> kakaoLogin(@RequestBody OAuthLoginRequest request) {
        OAuthLoginResponse loginResult = null;
        try {
            loginResult = oAuthService.handleKakaoLogin(request.getCode());
        } catch (IOException e) {
            throw new CustomException(ErrorCode.OAUTH_SERVER_ERROR);
        }

        return ApiResponse.success(loginResult);
    }
}

