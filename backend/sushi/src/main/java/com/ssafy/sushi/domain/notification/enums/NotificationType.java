package com.ssafy.sushi.domain.notification.enums;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum NotificationType {
    EXP('1'),      // 유통기한 만료
    ANS_END('2'),  // 답변 마감
    ANS_LIKE('3'); // 답변 좋아요

    private final char code;

    NotificationType(char code) {
        this.code = code;
    }

    public static NotificationType fromCode(Character code) {
        return Arrays.stream(NotificationType.values())
                .filter(type -> type.code == code)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid NotificationType code: " + code));
    }

    public char getCode() {
        return code;
    }
}