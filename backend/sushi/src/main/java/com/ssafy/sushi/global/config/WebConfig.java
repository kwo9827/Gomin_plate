package com.ssafy.sushi.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//    @Value("${app.url.front}")
//    private String frontUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("Authorization", "Content-Type", "X-Requested-With",
                        "Accept", "Origin", "Cookie", "Set-Cookie")  // 헤더 추가
                .exposedHeaders("Set-Cookie")  // 쿠키 노출 허용
                .allowCredentials(true)
                .maxAge(3600);
    }
}
