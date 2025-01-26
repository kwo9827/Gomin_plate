package com.ssafy.sushi.domain.sushi;

import com.ssafy.sushi.domain.sushi.Dto.request.CreateSushiRequest;
import com.ssafy.sushi.domain.sushi.Dto.response.CreateSushiResponse;
import com.ssafy.sushi.domain.sushi.Dto.response.MySushiListResponse;
import com.ssafy.sushi.domain.sushi.Dto.response.SushiOnRailResponse;
import com.ssafy.sushi.domain.sushi.Dto.response.SushiRailResponse;
import com.ssafy.sushi.domain.sushi.Service.SushiService;
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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sushi")
public class SushiController {

    private final SushiService sushiService;

    @PostMapping("")
    public ResponseEntity<ApiResponse<CreateSushiResponse>> createSushi(@RequestBody @Validated CreateSushiRequest request, @AuthenticationPrincipal UserPrincipal userPrincipal) {
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
}
