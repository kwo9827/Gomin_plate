package com.ssafy.sushi.domain.answer.controller;

import com.ssafy.sushi.domain.answer.dto.response.MyAnswerResponse;
import com.ssafy.sushi.domain.answer.service.AnswerService;
import com.ssafy.sushi.global.common.CustomPage;
import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.common.util.AuthenticationUtil;
import com.ssafy.sushi.global.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answer")
public class AnswerController {

    private final AnswerService answerService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<CustomPage<MyAnswerResponse>>> getMySushiList(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(answerService.getMyAnswerList(userId, pageable));
    }
}
