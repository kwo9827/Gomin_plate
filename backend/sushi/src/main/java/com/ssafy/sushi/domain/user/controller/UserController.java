package com.ssafy.sushi.domain.user.controller;

import com.ssafy.sushi.domain.user.service.UserService;
import com.ssafy.sushi.domain.user.dto.request.UpdateNicknameRequest;
import com.ssafy.sushi.domain.user.dto.response.UserInfoResponse;
import com.ssafy.sushi.domain.user.dto.response.UserLikeNumResponse;
import com.ssafy.sushi.domain.user.dto.response.UserNicknameChangeResponse;
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

    private final AuthenticationUtil authenticationUtil;
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserInfoResponse>> createUser(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @CookieValue(name = "refreshToken", required = false) String refreshToken) {
        Integer userId = authenticationUtil.getCurrentUserId(userPrincipal);

        System.out.println("yaho");
        System.out.println(refreshToken);

        return ApiResponse.success(userService.getUserInfo(userId));
    }

    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Integer userId = authenticationUtil.getCurrentUserId(userPrincipal);

        userService.deleteUser(userId);

        return ApiResponse.success(HttpStatus.OK);
    }

    @GetMapping("/my-like")
    public ResponseEntity<ApiResponse<UserLikeNumResponse>> getUserLikeNum(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Integer userId = authenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(userService.getUserLikeNum(userId));
    }

    @PutMapping("/nickname")
    public ResponseEntity<ApiResponse<UserNicknameChangeResponse>> updateNickname(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody @Valid UpdateNicknameRequest request) {
        Integer userId = authenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(userService.updateNickname(userId, request));
    }
}
