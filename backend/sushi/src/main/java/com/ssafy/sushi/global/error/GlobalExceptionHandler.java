package com.ssafy.sushi.global.error;

import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ApiResponse<Object>> handleCustomException(CustomException e) {
        log.error("HandleCustomException", e);
        ErrorCode errorCode = e.getErrorCode();

        return ApiResponse.error(errorCode);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ApiResponse<Object>> handleException(Exception e) {
        log.error("HandleException", e);

        return ApiResponse.error(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        log.error("HandleMethodArgumentNotValidException", e);
        return ApiResponse.error(ErrorCode.INVALID_INPUT_VALUE);
    }
}
