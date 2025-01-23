package com.ssafy.sushi.domain.sushi.Service;

import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import com.ssafy.sushi.domain.sushi.Repository.SushiRepository;
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

    public void sushiEnd(Sushi sushi) {
        ScheduledExecutorService excutorService = Executors.newScheduledThreadPool(1);
        excutorService.schedule(() -> {

            sushi.closeSushi();
            sushiRepository.save(sushi);  // 변경 사항을 DB에 반영
            log.info("초밥이 마감 처리되었습니다: Id = {}", sushi.getId());

            excutorService.shutdown();
        }, 60, TimeUnit.MINUTES);
    }
}
