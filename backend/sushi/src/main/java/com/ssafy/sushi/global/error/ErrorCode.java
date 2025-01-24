package com.ssafy.sushi.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", "잘못된 입력값입니다"),
    RESOURCE_NOT_FOUND(404, "C002", "요청한 리소스를 찾을 수 없습니다"),
    INTERNAL_SERVER_ERROR(500, "C003", "서버 내부 오류가 발생했습니다"),

    // AUTH
    OAUTH_SERVER_ERROR(500, "A001", "OAuth 서버 오류가 발생했습니다"),

    // USER
    USER_NOT_FOUND(404, "U001", "유저를 찾을 수 없습니다."),

    // SUSHI
    CATEGORY_NOT_FOUND(404, "S001", "존재하지 않는 카테고리입니다."),
    SUSHITYPE_NOT_FOUND(404, "S002", "존재하지 않는 초밥유형입니다.");

    private final int status;
    private final String code;
    private final String message;
}
