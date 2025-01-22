package com.ssafy.sushi.global.security.jwt;


import com.ssafy.sushi.global.security.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Collections;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    private final long tokenValidTime = 24 * 60 * 60 * 1000L; // 24시간

    // SecretKey 생성
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // 기존 토큰 생성 메소드 유지
    public String createToken(String userId) {
        Date now = new Date();

        return Jwts.builder()
                .subject(userId)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + tokenValidTime))
                .signWith(getSigningKey())
                .compact();
    }

    // Security 인증을 위한 토큰 생성 메소드 추가
    public String createToken(UserPrincipal userPrincipal) {
        return createToken(userPrincipal.getName());
    }

    // 토큰에서 회원 정보 추출
    public Long getUserId(String token) {
        return Long.parseLong(extractAllClaims(token).getSubject());
    }

    // Claims 추출
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // 토큰 유효성 + 만료일자 확인
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Spring Security 인증 객체 생성
    public Authentication getAuthentication(String token) {
        Long userId = getUserId(token);

        UserPrincipal userPrincipal = UserPrincipal.builder()
                .id(userId)
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")))
                .build();

        return new UsernamePasswordAuthenticationToken(
                userPrincipal,
                "",
                userPrincipal.getAuthorities());
    }
}