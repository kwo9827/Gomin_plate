package com.ssafy.sushi.domain.sushi.Service;

import com.ssafy.sushi.domain.notification.Entity.Notification;
import com.ssafy.sushi.domain.notification.Repository.NotificationRepository;
import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import com.ssafy.sushi.domain.sushi.Repository.SushiRepository;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScheduleService {

    private final SushiRepository sushiRepository;
    private final NotificationRepository notificationRepository;

    public void sushiEnd(Sushi sushi) {
        ScheduledExecutorService excutorService = Executors.newScheduledThreadPool(1);

        excutorService.schedule(() -> {
            // DB에서 초밥의 최신 상태를 가져옴
            Sushi freshSushi = sushiRepository.findById(sushi.getId()).orElseThrow(() ->
                    new CustomException(ErrorCode.SUSHI_NOT_FOUND));

            // 아직 마감되지 않은 초밥만 처리
            if (!freshSushi.getIsClosed()) {
                freshSushi.closeSushi();
                sushiRepository.save(freshSushi);

                // 알림 생성
                Notification notification = Notification.builder()
                        .user(freshSushi.getUser())
                        .notificationType('1')
                        .message("초밥의 유통기한이 마감되었습니다.")
                        .redirectUrl("api/sushi/my/" + freshSushi.getId())
                        .build();
                notificationRepository.save(notification);

                log.info("초밥이 마감 처리되었습니다: Id = {}", freshSushi.getId());
            } else {
                log.info("초밥은 이미 마감되었습니다: Id = {}", sushi.getId());
            }
                excutorService.shutdown();

        }, 24, TimeUnit.HOURS);
    }
}
