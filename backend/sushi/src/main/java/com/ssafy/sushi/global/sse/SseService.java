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

        // 1. 모든 이벤트 핸들러 설정
//        SseEmitter emitter = new SseEmitter(TIMEOUT);

        SseEmitter emitter = emitters.computeIfAbsent(userId, key -> {
            SseEmitter newEmitter = new SseEmitter(TIMEOUT);

            newEmitter.onCompletion(() -> {
                emitters.remove(userId);
                log.info("알림 SSE 해제 - userId: {}", userId);
            });

            newEmitter.onTimeout(() -> {
                emitters.remove(userId);
                log.info("알림 SSE 연결 시간 초과 - userId: {}", userId);
            });

            newEmitter.onError((e) -> {
                emitters.remove(userId);
                log.error("알림 SSE 에러 발생 - userId: {}: {}", userId, e.getMessage());
            });

            return newEmitter;
        });

//        emitter.onCompletion(() -> {
//            emitters.remove(userId);
//            log.info("알림 SSE 해제 - userId: {}", userId);
//        });
//
//        emitter.onTimeout(() -> {
//            emitter.complete();
//            emitters.remove(userId);
//            log.info("SSE 연결 시간 초과 - userId: {}", userId);
//        });
//
//        emitter.onError((e) -> {
//            emitters.remove(userId);
//            log.error("SSE 에러 발생 - userId: {}: {}", userId, e.getMessage());
//        });

        // 2. 먼저 새 emitter를 Map에 넣고 이전 것을 받아옴
//        SseEmitter oldEmitter = emitters.put(userId, emitter);

        // 3. 이전 emitter가 있으면 complete 처리
//        if (oldEmitter != null) {
//            oldEmitter.complete();
//        }


        // 4. 더미 데이터 전송
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected!"));
            log.info("알림 SSE 연결 완료 - userId: {}", userId);
        } catch (IOException e) {
            emitters.remove(userId);  // Map에서 제거만 하고
            log.error("알림 SSE 더미 이벤트 전송 실패: {}", e.getMessage());
            return emitter;
        } catch (IllegalStateException e) {
            emitters.remove(userId);  // Map에서 제거만 하고
            log.warn("SSE 이미 완료됨 - userId: {}", userId);
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
                log.info("SSE 송신: {}", event);
            } catch (IOException e) {
                emitters.remove(userId);
                log.error("SSE 송신 에러: {}", e.getMessage());
            }
        }
    }

    public SseEmitter subscribeLikeCount(Integer userId) {

        SseEmitter emitter = likeCountEmitters.computeIfAbsent(userId, key -> {
            SseEmitter newEmitter = new SseEmitter(TIMEOUT);

            newEmitter.onCompletion(() -> {
                likeCountEmitters.remove(userId);
                log.info("좋아요 SSE 해제 - userId: {}", userId);
            });

            newEmitter.onTimeout(() -> {
                likeCountEmitters.remove(userId);
                log.info("좋아요 SSE 연결 시간 초과 - userId: {}", userId);
            });

            newEmitter.onError((e) -> {
                likeCountEmitters.remove(userId);
                log.error("좋아요 SSE 에러 발생 - userId: {}: {}", userId, e.getMessage());
            });

            return newEmitter;
        });

        // 기존 연결이 있다면 제거
//        SseEmitter oldEmitter = likeCountEmitters.remove(userId);
//        if (oldEmitter != null) {
//            oldEmitter.complete();
//        }

//        SseEmitter emitter = new SseEmitter(TIMEOUT);

//        emitter.onCompletion(() -> {
//            likeCountEmitters.remove(userId);
//            log.info("좋아요 SSE 해제 - userId: {}", userId);
//        });
//
//        emitter.onTimeout(() -> {
//            likeCountEmitters.remove(userId);
//            emitter.complete();
//            log.info("좋아요 SSE 연결 시간 초과 - userId: {}", userId);
//        });
//
//        emitter.onError((e) -> {
//            likeCountEmitters.remove(userId);
//            log.error("좋아요 SSE 에러 발생 - userId: {}: {}", userId, e.getMessage());
//        });

        // 연결 즉시 더미 이벤트 전송
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected!"));
            log.info("좋아요 SSE 연결 완료 - userId: {}", userId);
        } catch (IOException e) {
            likeCountEmitters.remove(userId);  // Map에서 제거만 하고
            log.error("좋아요 SSE 더미 이벤트 전송 실패: {}", e.getMessage());
            return emitter;
        } catch (IllegalStateException e) {
            likeCountEmitters.remove(userId);  // Map에서 제거만 하고
            log.warn("좋아요 SSE 이미 완료됨 - userId: {}", userId);
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


//    @Scheduled(fixedDelay = 15000) // 15초
    public void sendHeartbeat() {
        if (emitters.isEmpty() && likeCountEmitters.isEmpty()) {
            return;
        }

        // 알림 SSE heartbeat
        emitters.forEach((userId, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("heartbeat")
                        .data("ping"));
                log.info("알림 Heartbeat sent to userId: {}", userId);
            } catch (IOException e) {
                log.warn("알림 Heartbeat 전송 실패 - userId: {}: {}", userId, e.getMessage());
                emitters.remove(userId);
            }
        });

        // 좋아요 SSE heartbeat
        likeCountEmitters.forEach((userId, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("heartbeat")
                        .data("ping"));
                log.info("좋아요 Heartbeat sent to userId: {}", userId);
            } catch (IOException e) {
                log.warn("좋아요 Heartbeat 전송 실패 - userId: {}: {}", userId, e.getMessage());
                likeCountEmitters.remove(userId);
                emitter.completeWithError(e);
            }
        });
    }
}
