package com.ssafy.sushi.global.config;

import com.ssafy.sushi.global.LoggingInterceptor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Slf4j
@Configuration
public class OkHttpConfig {
    @Bean
    public OkHttpClient okHttpClient(LoggingInterceptor loggingInterceptor) {
        return new OkHttpClient.Builder()
                .addInterceptor(loggingInterceptor)
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(10, TimeUnit.SECONDS)
                .build();
    }
}

