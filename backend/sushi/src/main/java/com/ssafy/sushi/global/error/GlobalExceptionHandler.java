package com.ssafy.sushi.global.error;

import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.async.AsyncRequestNotUsableException;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;

import java.io.IOException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AsyncRequestTimeoutException.class)
    public void handleAsyncRequestTimeoutException(AsyncRequestTimeoutException e) {
        log.info("SSE connection closed due to timeout - This is expected during server shutdown");
        // SSE timeout은 정상적인 상황이므로 별도 처리 없이 void 반환
    }

    @ExceptionHandler(ClientAbortException.class)
    public void handleClientAbortException(ClientAbortException e) {
        log.info("SSE connection closed by client - Normal disconnection");
        // 클라이언트 연결 종료는 정상적인 상황이므로 별도 처리 없이 void 반환
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ApiResponse<Object>> handleCustomException(CustomException e) {
        log.error("HandleCustomException", e);
        ErrorCode errorCode = e.getErrorCode();

        return ApiResponse.error(errorCode);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ApiResponse<Object>> handleException(Exception e) {
        // SSE 관련 예외는 위의 핸들러들에서 처리되므로 여기서는 다른 예외들만 처리
        if (e instanceof AsyncRequestNotUsableException ||
                e instanceof IOException && e.getMessage() != null &&
                        e.getMessage().contains("Broken pipe") ||
                e.getMessage().contains("연결은 사용자의 호스트 시스템의 소프트웨어의 의해 중단되었습니다")) {
            log.info("SSE Connection closed by client");
            return null;
        }

        log.error("HandleException", e);
        return ApiResponse.error(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ApiResponse<Object>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        log.error("HandleMethod :{}", e.getBindingResult().getFieldError().getDefaultMessage());
        log.error("getField :{}", e.getBindingResult().getFieldError().getField());

        String field = e.getBindingResult().getFieldError().getField();
        String defaultMessage = e.getBindingResult().getFieldError().getDefaultMessage();

        return ApiResponse.error(ErrorCode.INVALID_INPUT_VALUE, field + " : " + defaultMessage);
    }
}
