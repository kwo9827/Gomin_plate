package com.ssafy.sushi.domain.user;

import com.ssafy.sushi.domain.user.dto.UserInfoResponse;
import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.common.util.AuthenticationUtil;
import com.ssafy.sushi.global.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user/me")
    public ResponseEntity<ApiResponse<UserInfoResponse>> createUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(userService.getUserInfo(userId));
    }
}
