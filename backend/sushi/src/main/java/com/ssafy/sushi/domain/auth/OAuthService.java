package com.ssafy.sushi.domain.auth;

import com.ssafy.sushi.domain.auth.dto.OAuthLoginResponse;
import com.ssafy.sushi.domain.user.Entity.User;
import com.ssafy.sushi.domain.user.UserRepository;
import com.ssafy.sushi.domain.user.enums.Provider;
import com.ssafy.sushi.global.infra.oauth.client.KakaoOAuthClient;
import com.ssafy.sushi.global.infra.oauth.dto.KakaoTokenResponse;
import com.ssafy.sushi.global.infra.oauth.dto.KakaoUserResponse;
import com.ssafy.sushi.global.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OAuthService {
    private final KakaoOAuthClient kakaoOAuthClient;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public OAuthLoginResponse handleKakaoLogin(String code) throws IOException {

        KakaoTokenResponse tokenResponse = kakaoOAuthClient.getToken(code);
        KakaoUserResponse userResponse = kakaoOAuthClient.getUserInfo(tokenResponse.getAccess_token());

        Optional<User> existingUser = userRepository.findByProviderAndProviderId(
                Provider.KAKAO,
                userResponse.getId().toString()
        );

        boolean isNew = existingUser.isEmpty();
        User user = existingUser.orElseGet(() -> createKakaoUser(userResponse));

        String accessToken = jwtTokenProvider.createToken(user.getId().toString());
        String refreshToken = "temp";

        return OAuthLoginResponse.of(user.getId(), accessToken, refreshToken, isNew);
    }

    // 신규 회원 db 저장
    private User createKakaoUser(KakaoUserResponse response) {
        return userRepository.save(User.builder()
                .nickname(response.getKakaoAccount().getProfile().getNickname())
                .provider(Provider.KAKAO)
                .providerId(response.getId().toString())
                .build());
    }
}
