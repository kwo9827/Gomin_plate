package com.ssafy.sushi.global.common.util;

import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import com.ssafy.sushi.global.security.UserPrincipal;

public class AuthenticationUtil {
    public static Integer getCurrentUserId(UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return userPrincipal.getId();
    }

    public static Integer getCurrentUserIdCanNull(UserPrincipal userPrincipal) {
        return userPrincipal == null ? null : userPrincipal.getId();
    }
}
