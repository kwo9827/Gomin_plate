package com.ssafy.sushi.global.sse;

import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Iterator;
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

    @PreDestroy
    public void destroy() {
        // 일반 알림 emitters 정리
        log.info("Closing all SSE connections");
        emitters.forEach((userId, emitter) -> {
            try {
                // 종료 이벤트를 보내고
                emitter.send(SseEmitter.event()
                        .name("shutdown")
                        .data("Server shutting down"));

                log.info("Successfully sent shutdown event to user {}", userId);

                Thread.sleep(100); // 잠깐 대기 후
                emitter.complete();
            } catch (Exception e) {
                log.error("Error during emitter shutdown for user {}", userId, e);
            }
        });
        emitters.clear();

        // 좋아요 알림 emitters 정리
        likeCountEmitters.forEach((userId, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("shutdown")
                        .data("Server shutting down"));
                Thread.sleep(100);
                emitter.complete();
            } catch (Exception e) {
                log.error("Error during likeCount emitter shutdown for user {}", userId, e);
            }
        });
        likeCountEmitters.clear();

        // 모든 연결이 정리되도록 잠시 대기
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        log.info("All SSE connections have been closed");
    }

    @Scheduled(fixedRate = 60000)  // 1분마다 체크
    public void cleanupStaleConnections() {
        log.info("Checking for stale SSE connections...");

        // 일반 알림 emitters 체크
        cleanupEmitterMap(emitters, "notification");

        // 좋아요 알림 emitters 체크
        cleanupEmitterMap(likeCountEmitters, "like count");
    }

    private void cleanupEmitterMap(Map<Integer, SseEmitter> emitterMap, String type) {
        Iterator<Map.Entry<Integer, SseEmitter>> iterator = emitterMap.entrySet().iterator();
        int initialSize = emitterMap.size();

        while (iterator.hasNext()) {
            Map.Entry<Integer, SseEmitter> entry = iterator.next();
            SseEmitter emitter = entry.getValue();
            Integer userId = entry.getKey();

            try {
                emitter.send(SseEmitter.event()
                        .name("ping")
                        .data("ping"));
            } catch (Exception e) {
//                log.info("Removing stale {} connection for user: {}", type, userId);
                iterator.remove();
                emitter.complete();
            }
        }

        int removedCount = initialSize - emitterMap.size();
        if (removedCount > 0) {
            log.info("Cleaned up {} stale {} connections. Current active connections: {}",
                    removedCount, type, emitterMap.size());
        }
    }
}
