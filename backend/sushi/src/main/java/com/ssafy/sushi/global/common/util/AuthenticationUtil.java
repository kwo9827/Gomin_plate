package com.ssafy.sushi.global.common.util;

import com.ssafy.sushi.domain.user.repository.UserRepository;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import com.ssafy.sushi.global.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationUtil {

    private final UserRepository userRepository;

    public Integer getCurrentUserId(UserPrincipal userPrincipal) {
        if (userPrincipal == null || userPrincipal.getId() == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_ACCESS);
        }

        userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return userPrincipal.getId();
    }

    public static Integer getCurrentUserIdCanNull(UserPrincipal userPrincipal) {
        return userPrincipal == null ? null : userPrincipal.getId();
    }
}
