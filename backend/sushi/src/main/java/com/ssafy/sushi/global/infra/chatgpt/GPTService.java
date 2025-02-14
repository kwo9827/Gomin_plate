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


