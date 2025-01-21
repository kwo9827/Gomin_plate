package com.ssafy.sushi.domain.user;

import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<String>> createUser() {

        return ApiResponse.success("yaho");
    }

    @GetMapping("/error")
    public ResponseEntity<ApiResponse<String>> makeError() {

        throw new CustomException(ErrorCode.USER_NOT_FOUND);

    }
}
