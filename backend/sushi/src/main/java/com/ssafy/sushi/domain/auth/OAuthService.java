package com.ssafy.sushi.domain.auth;

import com.ssafy.sushi.domain.auth.dto.OAuthLoginResponse;
import com.ssafy.sushi.domain.auth.dto.OAuthUserInfo;
import com.ssafy.sushi.domain.auth.dto.UserInfoResponse;
import com.ssafy.sushi.domain.auth.strategy.OAuthStrategy;
import com.ssafy.sushi.domain.user.Entity.User;
import com.ssafy.sushi.domain.user.UserRepository;
import com.ssafy.sushi.domain.user.enums.Provider;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import com.ssafy.sushi.global.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OAuthService {
    private final Map<Provider, OAuthStrategy> oAuthStrategyMap;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public OAuthLoginResponse handleOAuthLogin(Provider provider, String code) {

        // 1. 전략 가져오기
        OAuthStrategy strategy = oAuthStrategyMap.get(provider);
        if (strategy == null) {
            throw new CustomException(ErrorCode.INVALID_OAUTH_PROVIDER);
        }

        try {
            // 2. 소셜 로그인으로 유저 정보 받아오기
            OAuthUserInfo userInfo = strategy.getUserInfo(code);
            log.debug("Received user info from provider - id: {}, email: {}",
                    userInfo.getId(), userInfo.getEmail());

            // 3. 유저 정보로 로그인 처리하기

            // 3. 기존 회원인지 확인
            Optional<User> existingUser = userRepository.findByProviderAndProviderId(
                    provider,
                    userInfo.getId() //providerId
            );

            Boolean isNew = existingUser.isEmpty();
            User user = existingUser.orElseGet(() ->  createUser(userInfo, provider));

            String accessToken = jwtTokenProvider.createToken(user.getId().toString());
            String refreshToken = "temp";

            // refresh token 생성 및 redis 사용 코드 작성 필요

            UserInfoResponse userInfoResponse = UserInfoResponse.of(user, isNew);

            return OAuthLoginResponse.of(accessToken, refreshToken, userInfoResponse);


        } catch (Exception e) {
            log.error("Failed to process OAuth login for provider: {}", provider, e);
            throw new CustomException(ErrorCode.OAUTH_SERVER_ERROR);
        }
    }

    private User createUser(OAuthUserInfo userInfo, Provider provider) {
        User newUser = User.builder()
                .nickname(userInfo.getNickname())
                .provider(provider)
                .providerId(userInfo.getId())
                .build();

        return userRepository.save(newUser);
    }
}
