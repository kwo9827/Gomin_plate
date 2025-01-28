package com.ssafy.sushi.domain.sushi;

import com.ssafy.sushi.domain.answer.Dto.request.CreateAnswerRequest;
import com.ssafy.sushi.domain.answer.Dto.response.CreateAnswerResponse;
import com.ssafy.sushi.domain.answer.Service.AnswerService;
import com.ssafy.sushi.domain.sushi.Dto.request.CreateSushiRequest;
import com.ssafy.sushi.domain.sushi.Dto.response.*;
import com.ssafy.sushi.domain.sushi.Service.SushiService;
import com.ssafy.sushi.global.common.CustomPage;
import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.common.util.AuthenticationUtil;
import com.ssafy.sushi.global.security.UserPrincipal;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sushi")
public class SushiController {

    private final SushiService sushiService;
    private final AnswerService answerService;

    @PostMapping("")
    public ResponseEntity<ApiResponse<CreateSushiResponse>> createSushi(
            @RequestBody @Validated CreateSushiRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(sushiService.saveSushi(request, userId));
    }

    @GetMapping("/rail")
    public ResponseEntity<ApiResponse<SushiRailResponse>> getRandomSushi(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(value = "size", required = false, defaultValue = "15") Integer size) {
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(sushiService.getRandomSushi(userId, size));
    }

    @GetMapping("/rail/{sushiId}")
    public ResponseEntity<ApiResponse<SushiOnRailResponse>> getRailSushi(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable("sushiId") Integer sushiId){
        Integer userId = userPrincipal.getId();

        return ApiResponse.success(sushiService.getRailSushi(userId, sushiId));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<CustomPage<MySushiListResponse>>> getMySushiList(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(sushiService.getMySushiList(userId, pageable));
    }

    @GetMapping("/my/{sushiId}")
    public ResponseEntity<ApiResponse<MySushiDetailResponse>> getMySushiDetail(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable("sushiId") @Positive Integer sushiId) {
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(sushiService.getMySushiDetail(userId, sushiId));
    }

    @PostMapping("/rail/{sushiId}/answer")
    public ResponseEntity<ApiResponse<CreateAnswerResponse>> createAnswer(
            @RequestBody @Validated CreateAnswerRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable("sushiId") Integer sushiId){
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(answerService.saveAnswer(request, userId, sushiId), HttpStatus.CREATED);
    }
}
