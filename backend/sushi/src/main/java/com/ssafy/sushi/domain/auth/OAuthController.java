package com.ssafy.sushi.domain.auth;

import com.ssafy.sushi.domain.auth.dto.OAuthLoginRequest;
import com.ssafy.sushi.domain.auth.dto.OAuthLoginResponse;
import com.ssafy.sushi.domain.user.enums.Provider;
import com.ssafy.sushi.global.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {
    private final OAuthService oAuthService;

    @PostMapping("/{provider}")
    public ResponseEntity<ApiResponse<OAuthLoginResponse>> kakaoLogin(
            @PathVariable String provider,
            @RequestBody OAuthLoginRequest request) {
        OAuthLoginResponse loginResult = oAuthService.handleOAuthLogin(Provider.valueOf(provider.toUpperCase()), request.getCode());

        return ApiResponse.success(loginResult);
    }
}

