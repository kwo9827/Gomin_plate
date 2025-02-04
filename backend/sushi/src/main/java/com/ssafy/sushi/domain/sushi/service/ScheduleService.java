package com.ssafy.sushi.domain.sushi.service;

import com.ssafy.sushi.domain.notification.service.NotificationService;
import com.ssafy.sushi.domain.notification.enums.NotificationType;
import com.ssafy.sushi.domain.sushi.entity.Sushi;
import com.ssafy.sushi.domain.sushi.repository.SushiRepository;
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
    private final NotificationService notificationService;

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
                notificationService.sendNotification(
                        freshSushi.getUser(),
                        NotificationType.EXP,
                        freshSushi.getId()
                );

                log.info("초밥이 마감 처리되었습니다: Id = {}", freshSushi.getId());
            } else {
                log.info("초밥은 이미 마감되었습니다: Id = {}", sushi.getId());
            }
                excutorService.shutdown();

        }, 10, TimeUnit.MINUTES);
    }
}
