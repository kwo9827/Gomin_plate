package com.ssafy.sushi.global.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        try {
//           1. 헤더에서 JWT 토큰 추출
            String token = resolveToken(request);

//            2. 토큰 유효한지 확인
            if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
//                3. 토큰에서 인증 정보 추출
                Authentication authentication = jwtTokenProvider.getAuthentication(token);

//                4. SecurityContext에 인증 정보 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Could not set user authentication in security context", e);
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

    // Swagger나 특정 경로에 대해 필터를 적용하지 않으려면 아래 메소드를 오버라이드
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/api/oauth");  // OAuth 관련 경로는 필터 제외
    }
}