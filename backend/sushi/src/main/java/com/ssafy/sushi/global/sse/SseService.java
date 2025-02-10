package com.ssafy.sushi.global.sse;

import com.ssafy.sushi.domain.notification.repository.NotificationRepository;
import com.ssafy.sushi.domain.user.entity.User;
import com.ssafy.sushi.domain.user.repository.UserRepository;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private final Map<Integer, SseEmitter> likeCountEmitters = new ConcurrentHashMap<>();

    private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();
    private static final Long TIMEOUT = 60L * 1000 * 60; // 60분
    private static final Long HEARTBEAT_DELAY = 15L;

    public SseEmitter subscribe(Integer userId) {
        // 기존 연결이 있다면 제거
        SseEmitter oldEmitter = emitters.remove(userId);
        if (oldEmitter != null) {
            oldEmitter.complete();
        }

        SseEmitter emitter = new SseEmitter(TIMEOUT);

        // 초기 상태 전송 - 트랜잭션 내에서 한 번만 DB 조회
        boolean hasUnread = notificationRepository.existsByUserIdAndIsReadFalse(userId);
        try {
            SseNotificationEvent event = SseNotificationEvent.of(hasUnread);

            emitter.send(SseEmitter.event()
                    .name("notification")
                    .data(event));

            // log.info("알림 SSE 연결 완료");
        } catch (IOException e) {
            // log.error("SSE 초기화 중 에러 발생: {}", e.getMessage());
            emitter.completeWithError(e);
            return emitter;
        }

        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> {
            try {
                emitter.send(SseEmitter.event()
//                        .name("heartbeat")
                        .name("hhhhh")
                        .data("ping"));
                // log.info("알림 Heartbeat sent to userId: {}", userId);
            } catch (IOException e) {
                // log.warn("알림 Heartbeat 전송 실패 - userId: {}: {}", userId, e.getMessage());
                scheduler.shutdown();
                emitters.remove(userId);
                emitter.completeWithError(e);
            }
        }, 0, HEARTBEAT_DELAY, TimeUnit.SECONDS);

        emitter.onCompletion(() -> {
            scheduler.shutdown();
            emitters.remove(userId);
            // log.info("알림 SSE 해제 - userId: {}", userId);
        });

        emitter.onTimeout(() -> {
            scheduler.shutdown();
            emitter.complete();
            emitters.remove(userId);
            // log.info("SSE 연결 시간 초과 - userId: {}", userId);
        });

        emitter.onError((e) -> {
            scheduler.shutdown();
            emitters.remove(userId);
            // log.error("SSE 에러 발생 - userId: {}: {}", userId, e.getMessage());
        });

        emitters.put(userId, emitter);
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
        // 기존 연결이 있다면 제거
        SseEmitter oldEmitter = likeCountEmitters.remove(userId);
        if (oldEmitter != null) {
            oldEmitter.complete();
        }

        SseEmitter emitter = new SseEmitter(TIMEOUT);

        try {
            // 초기 상태 전송
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

            SseLikeCountEvent event = SseLikeCountEvent.of(user.getTotalLikes());
            emitter.send(SseEmitter.event()
                    .name("likeCount")
                    .data(event));

            // log.info("좋아요 SSE 연결 완료 - userId: {}", userId);
        } catch (IOException e) {
            // log.error("좋아요 SSE 초기화 중 에러 발생: {}", e.getMessage());
            emitter.completeWithError(e);
            return emitter;
        }

        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> {
            try {
                emitter.send(SseEmitter.event()
//                        .name("heartbeat")
                        .name("hhhhh")
                        .data("ping"));
                // log.info("좋아요 Heartbeat sent to userId: {}", userId);
            } catch (IOException e) {
                // log.warn("좋아요 Heartbeat 전송 실패 - userId: {}: {}", userId, e.getMessage());
                scheduler.shutdown();
                likeCountEmitters.remove(userId);
                emitter.completeWithError(e);
            }
        }, 0, HEARTBEAT_DELAY, TimeUnit.SECONDS);

        emitter.onCompletion(() -> {
            scheduler.shutdown();
            likeCountEmitters.remove(userId);
            // log.info("좋아요 SSE 해제 - userId: {}", userId);
        });

        emitter.onTimeout(() -> {
            scheduler.shutdown();
            likeCountEmitters.remove(userId);
            emitter.complete();
            // log.info("좋아요 SSE 연결 시간 초과 - userId: {}", userId);
        });

        emitter.onError((e) -> {
            scheduler.shutdown();
            likeCountEmitters.remove(userId);
            // log.error("좋아요 SSE 에러 발생 - userId: {}: {}", userId, e.getMessage());
        });

        likeCountEmitters.put(userId, emitter);
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
