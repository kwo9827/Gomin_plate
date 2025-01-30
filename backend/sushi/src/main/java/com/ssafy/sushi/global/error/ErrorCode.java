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
    INVALID_OAUTH_PROVIDER(400, "A002", "지원하지 않는 OAuth 제공자입니다"),

    // USER
    USER_NOT_FOUND(404, "U001", "유저를 찾을 수 없습니다."),

    // SUSHI
    CATEGORY_NOT_FOUND(404, "S001", "존재하지 않는 카테고리입니다."),
    SUSHITYPE_NOT_FOUND(404, "S002", "존재하지 않는 초밥유형입니다."),
    SUSHI_NOT_FOUND(404, "S003", "존재하지 않는 초밥입니다."),
    SUSHI_IS_CLOSED(500, "S004", "이미 마감된 초밥입니다."),
    UNAUTHORIZED_SUSHI_ACCESS(403, "S005", "해당 초밥에 대한 권한이 없습니다."),

    // ANSWER
    ANSWER_IS_FULL(500, "R001", "답변 가능 인원이 초과되었습니다."),
    ANSWER_NOT_FOUND(404, "R002", "답변한 초밥을 찾을 수 없습니다."),

    // NOTIFICATION
    NOTIFICATION_NOT_FOUND(404, "N001", "알림을 찾을 수 없습니다.");

    private final int status;
    private final String code;
    private final String message;
}
