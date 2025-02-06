package com.ssafy.sushi.global.security.jwt;

import com.ssafy.sushi.domain.auth.dto.TokenError;
import com.ssafy.sushi.domain.auth.dto.TokenValidationResult;
import com.ssafy.sushi.domain.auth.dto.response.TokenRefreshResponse;
import com.ssafy.sushi.domain.auth.service.OAuthService;
import com.ssafy.sushi.global.common.util.TestUserMaker;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final OAuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    private static final String TEST_TOKEN = "test";

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        try {
            String token = resolveToken(request);

            if (StringUtils.hasText(token)) {
                // test 계정 처리
                if (TEST_TOKEN.equals(token)) {
                    Authentication authentication = TestUserMaker.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    // 토큰 검증 결과 확인
                    TokenValidationResult validationResult = jwtTokenProvider.validateToken(token);

                    if (validationResult.isValid()) {
                        Authentication authentication = jwtTokenProvider.getAuthentication(token);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                    // 토큰이 만료된 경우
                    else if (validationResult.getError() == TokenError.EXPIRED) {
                        String refreshToken = extractRefreshToken(request);
                        if (refreshToken != null) {
                            try {
                                // 토큰 갱신 시도
                                TokenRefreshResponse refreshResponse = authService.refreshToken(refreshToken);
                                String newAccessToken = refreshResponse.getAccessToken();

                                // 새 토큰으로 인증 처리
                                Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                                SecurityContextHolder.getContext().setAuthentication(authentication);

                                // 응답 헤더에 새 토큰 추가
                                response.setHeader("Authorization", "Bearer " + newAccessToken);
                            } catch (Exception e) {
                                log.error("Token refresh failed", e);
                                // 갱신 실패 시 401 응답
                                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                return;
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.error("Could not set user authentication in security context", e);
        }

//        5. 다음 필터로 이동
        filterChain.doFilter(request, response);
    }

    //    Bearer 제거하고 순수 토큰 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }


//        쿠키 사용하는 경우
//        Cookie[] cookies = request.getCookies();
//
//        if (cookies != null) {
//            for (Cookie cookie : cookies) {
//                if ("accessToken".equals(cookie.getName())) {
//                    return cookie.getValue();
//                }
//            }
//        }

        return null;
    }

    private String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    // Swagger나 특정 경로에 대해 필터를 적용하지 않으려면 아래 메소드를 오버라이드
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/api/oauth");  // OAuth 관련 경로는 필터 제외
    }
}