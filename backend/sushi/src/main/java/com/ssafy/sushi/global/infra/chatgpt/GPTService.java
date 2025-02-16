package com.ssafy.sushi.global.infra.chatgpt;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Arrays;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GPTService {

    @Value("${api.chatgpt.key}")
    private String apiKey;

    private final OkHttpClient okHttpClient;
    private final ObjectMapper objectMapper;

    private static final String GPT_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final MediaType JSON = MediaType.get("application/json");

    public String generateGPTAnswer(String title, String content) {
        try {
            String prompt = createPrompt(title, content);
            RequestBody body = createRequestBody(prompt);

            Request request = new Request.Builder()
                    .url(GPT_API_URL)
                    .addHeader("Authorization", "Bearer " + apiKey)
                    .addHeader("Content-Type", "application/json")
                    .post(body)
                    .build();

            Response response = okHttpClient.newCall(request).execute();

            assert response.body() != null;
            return parseGPTResponse(response.body().string()) + " £";

        } catch (Exception e) {
            log.error("GPT API 호출 실패", e);
            throw new CustomException(ErrorCode.GPT_API_ERROR);
        }
    }

    public String analyzeNegative(String text){
        try {
            String negativePrompt = createNegativePrompt(text);
            RequestBody body = createNegativeRequestBody(negativePrompt);

            Request request = new Request.Builder()
                    .url(GPT_API_URL)
                    .addHeader("Authorization", "Bearer " + apiKey)
                    .addHeader("Content-Type", "application/json")
                    .post(body)
                    .build();

            Response response = okHttpClient.newCall(request).execute();

            assert response.body() != null;
            return parseGPTResponse(response.body().string());
        } catch (Exception e) {
            log.error("GPT API 윤리성 분석 실패", e);
            throw new CustomException(ErrorCode.GPT_API_ERROR);
        }
    }

    private String createNegativePrompt(String text) {
        return String.format("""
            다음 텍스트에 대해 부적절하거나 비윤리적인 내용이 포함되어 있는지 분석해주세요.
            분석 기준: 
            - 타인에게 상처를 줄 수 있는 언어나 표현
            - 인종, 성별, 성적 지향 등에 대한 혐오 발언
            - 불법적이거나 부정적인 영향을 미칠 수 있는 발언
            - 광고의 의도가 느껴지는 내용
            텍스트:
            %s

            답변은 "negative" 또는 "positive"로만 해주세요.
            """, text);
    }

    private String createPrompt(String title, String content) {

        return String.format("""
                         다음 고민에 대해 공감하고 따뜻한 조언을 해주세요:
                        \s
                         제목: %s
                         고민 내용: %s
                        \s
                         답변 조건:
                         1. 고민자의 감정에 충분히 공감해주세요.
                         2. 구체적이고 실천 가능한 조언을 해주세요.
                         3. 200자 내외로 답변해주세요
                        """,
                title,
                content
        );
    }

    private RequestBody createNegativeRequestBody(String negativePrompt) throws JsonProcessingException {
        Map<String, Object> messageSystem = new LinkedHashMap<>();
        messageSystem.put("role", "system");
        messageSystem.put("content", "    이 곳은 사람들이 익명으로 고민을 올리는 익명 커뮤니티입니다. \n" +
                "    당신은 고민에 달린 답변에 대해 분석을 해야합니다. \n");

        Map<String, Object> messageUser = new LinkedHashMap<>();
        messageUser.put("role", "user");
        messageUser.put("content", negativePrompt);

        Map<String, Object> jsonBody = new LinkedHashMap<>();
        jsonBody.put("model", "gpt-4o-mini");
        jsonBody.put("messages", Arrays.asList(messageSystem, messageUser));
        jsonBody.put("max_tokens", 500);
        jsonBody.put("temperature", 0.7);

        // ObjectMapper로 JSON 문자열 생성
        String jsonString = objectMapper.writeValueAsString(jsonBody);

        return RequestBody.create(jsonString, JSON);
    }

    private RequestBody createRequestBody(String prompt) throws JsonProcessingException {
        Map<String, Object> messageSystem = new LinkedHashMap<>();
        messageSystem.put("role", "system");
        messageSystem.put("content", "    당신은 조용하고 따뜻한 성격의 회전 초밥 식당의 고양이 마스터입니다. \n" +
                "    당신은 감정이입을 잘하고 예술적 감각이 있는 ISFP 성격을 가지고 있습니다. \n" +
                "    사람들의 고민을 경청하고 공감하며, 부드럽고 다정한 태도로 조언해주세요.\n" +
                "    모든 답변은 '~냥', '~다냥' 으로 끝나야 합니다.\n" +
                "    예시:\n" +
                        "    - \"많이 힘들었겠다냥\"\n" +
                        "    - \"그런 생각이 드는게 당연하다냥\"\n" +
                        "    - \"이렇게 해보는건 어떨까냥?\"\n" +
                        "    - \"너의 솔직한 마음이 전해질거다냥\"\n");

        Map<String, Object> messageUser = new LinkedHashMap<>();
        messageUser.put("role", "user");
        messageUser.put("content", prompt);

        Map<String, Object> jsonBody = new LinkedHashMap<>();
        jsonBody.put("model", "gpt-4o-mini");
        jsonBody.put("messages", Arrays.asList(messageSystem, messageUser));
        jsonBody.put("max_tokens", 500);
        jsonBody.put("temperature", 0.7);

        // ObjectMapper로 JSON 문자열 생성
        String jsonString = objectMapper.writeValueAsString(jsonBody);

        return RequestBody.create(jsonString, JSON);
    }

    private String parseGPTResponse(String response) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(response);
        String content = jsonNode.get("choices")
                .get(0)
                .get("message")
                .get("content")
                .asText("");

        return content.replaceAll("\n", "<br>")
                .replaceAll("\\*\\*(.+?)\\*\\*", "<strong>$1</strong>");
    }
}


