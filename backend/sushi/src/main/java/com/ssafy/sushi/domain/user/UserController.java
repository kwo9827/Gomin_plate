package com.ssafy.sushi.domain.user;

import com.ssafy.sushi.domain.user.dto.request.UpdateNicknameRequest;
import com.ssafy.sushi.domain.user.dto.response.UserInfoResponse;
import com.ssafy.sushi.domain.user.dto.response.UserLikeNumResponse;
import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.common.util.AuthenticationUtil;
import com.ssafy.sushi.global.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserInfoResponse>> createUser(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(userService.getUserInfo(userId));
    }

    @GetMapping("/my-like")
    public ResponseEntity<ApiResponse<UserLikeNumResponse>> getUserLikeNum(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(userService.getUserLikeNum(userId));
    }

    @PutMapping("/nickname")
    public ResponseEntity<ApiResponse<Void>> updateNickname(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody @Valid UpdateNicknameRequest request) {
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        userService.updateNickname(userId, request);

        return ApiResponse.success(HttpStatus.OK);
    }

}
