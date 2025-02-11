package com.ssafy.sushi.global.sse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseService {

    private final Map<Integer, SseEmitter> likeCountEmitters = new ConcurrentHashMap<>();

    private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();
    private static final Long TIMEOUT = 60L * 1000 * 60; // 60분

    public SseEmitter subscribe(Integer userId) {

        SseEmitter emitter = emitters.computeIfAbsent(userId, key -> {
            SseEmitter newEmitter = new SseEmitter(TIMEOUT);

            newEmitter.onCompletion(() -> {
                emitters.remove(userId);
                // log.info("알림 SSE 해제 - userId: {}", userId);
            });

            newEmitter.onTimeout(() -> {
                emitters.remove(userId);
                // log.info("알림 SSE 연결 시간 초과 - userId: {}", userId);
            });

            newEmitter.onError((e) -> {
                emitters.remove(userId);
                // log.error("알림 SSE 에러 발생 - userId: {}: {}", userId, e.getMessage());
            });

            return newEmitter;
        });

        // 4. 더미 데이터 전송
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected!"));
            // log.info("알림 SSE 연결 완료 - userId: {}", userId);
        } catch (IOException e) {
            emitters.remove(userId);  // Map에서 제거만 하고
            // log.error("알림 SSE 더미 이벤트 전송 실패: {}", e.getMessage());
            return emitter;
        } catch (IllegalStateException e) {
            emitters.remove(userId);  // Map에서 제거만 하고
            // log.warn("SSE 이미 완료됨 - userId: {}", userId);
        }

        return emitter;
    }

    public void notify(Integer userId, SseNotificationEvent event) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("notification")
                        .data(event));
                // log.info("SSE 송신: {}", event);
            } catch (IOException e) {
                emitters.remove(userId);
                // log.error("SSE 송신 에러: {}", e.getMessage());
            }
        }
    }

    public SseEmitter subscribeLikeCount(Integer userId) {

        SseEmitter emitter = likeCountEmitters.computeIfAbsent(userId, key -> {
            SseEmitter newEmitter = new SseEmitter(TIMEOUT);

            newEmitter.onCompletion(() -> {
                likeCountEmitters.remove(userId);
                // log.info("좋아요 SSE 해제 - userId: {}", userId);
            });

            newEmitter.onTimeout(() -> {
                likeCountEmitters.remove(userId);
                // log.info("좋아요 SSE 연결 시간 초과 - userId: {}", userId);
            });

            newEmitter.onError((e) -> {
                likeCountEmitters.remove(userId);
                // log.error("좋아요 SSE 에러 발생 - userId: {}: {}", userId, e.getMessage());
            });

            return newEmitter;
        });

        // 연결 즉시 더미 이벤트 전송
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected!"));
            // log.info("좋아요 SSE 연결 완료 - userId: {}", userId);
        } catch (IOException e) {
            likeCountEmitters.remove(userId);  // Map에서 제거만 하고
            // log.error("좋아요 SSE 더미 이벤트 전송 실패: {}", e.getMessage());
            return emitter;
        } catch (IllegalStateException e) {
            likeCountEmitters.remove(userId);  // Map에서 제거만 하고
            // log.warn("좋아요 SSE 이미 완료됨 - userId: {}", userId);
        }

        return emitter;
    }

    public void notifyLikeCount(Integer userId, SseLikeCountEvent event) {
        SseEmitter emitter = likeCountEmitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("likeCount")
                        .data(event));
            } catch (IOException e) {
                likeCountEmitters.remove(userId);
            }
        }
    }
}
