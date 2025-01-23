package com.ssafy.sushi.domain.sushi;

import com.ssafy.sushi.domain.sushi.Dto.CreateSushiRequestDto;
import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import com.ssafy.sushi.domain.sushi.Service.SushiService;
import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.common.util.AuthenticationUtil;
import com.ssafy.sushi.global.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sushi")
public class SushiController {

    private final SushiService sushiService;

    @PostMapping("")
    public ResponseEntity<ApiResponse<String>> createSushi(@RequestBody @Validated CreateSushiRequestDto request, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long userId = AuthenticationUtil.getCurrentUserId(userPrincipal);
        Sushi sushi = sushiService.saveSushi(request, userId);
        return ApiResponse.success("초밥 생성 성공");
    }
}
