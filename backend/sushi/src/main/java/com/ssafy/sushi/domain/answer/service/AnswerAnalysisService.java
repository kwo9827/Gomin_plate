package com.ssafy.sushi.domain.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class AnswerAnalysisService {

    private final WebClient webClient;

    public Boolean analyzeSentiment(String text) {
        try {
            SentimentResponse response = webClient.post()
                    .uri("/predict/")
                    .header("Content-Type", "application/json")
                    .bodyValue(new SentimentRequest(text))
                    .retrieve()
                    .bodyToMono(SentimentResponse.class)
                    .block(); // 동기 방식

            return response != null && response.isNegative();
        } catch (Exception e) {
            e.printStackTrace();
            return null; // 실패하면 null 반환
        }
    }

    // 요청 DTO
    private record SentimentRequest(String text) {}

    // 응답 DTO
    private record SentimentResponse(Boolean negative) {
        public Boolean isNegative() {
            return negative;
        }
    }
}
