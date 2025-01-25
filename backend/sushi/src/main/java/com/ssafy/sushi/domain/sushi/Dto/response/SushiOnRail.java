package com.ssafy.sushi.domain.sushi.Dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SushiOnRail {
    private Integer sushiId;
    private String title;
    private String content;
    private Integer category;
    private Integer sushiType;
    private Integer maxAnswers;
    private Integer remainingAnswers;
    private LocalDateTime expirationTime;
}
