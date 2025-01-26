package com.ssafy.sushi.domain.sushi.Dto.response;

import com.ssafy.sushi.domain.answer.Entity.Answer;
import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class MySushiDetailResponse {

    private final Integer sushiId;
    private final String title;
    private final String content;
    private final Integer category;
    private final Integer sushiType;
    private final Integer maxAnswers;
    private final Integer remainingAnswers;
    private final Boolean isClosed;
    private final LocalDateTime expirationTime;
    private final List<AnswerItem> answer;

    public static MySushiDetailResponse of(Sushi sushi, List<Answer> answerList) {
        return MySushiDetailResponse.builder()
                .sushiId(sushi.getId())
                .title(sushi.getTitle())
                .content(sushi.getContent())
                .category(sushi.getCategory().getId())
                .sushiType(sushi.getSushiType().getId())
                .maxAnswers(sushi.getMaxAnswers())
                .remainingAnswers(sushi.getRemainingAnswers())
                .isClosed(sushi.getIsClosed())
                .expirationTime(sushi.getExpirationTime())
                .answer(AnswerItem.of(answerList))
                .build();
    }

    @Getter
    @Builder
    public static class AnswerItem {
        private final Integer answerId;
        private final String content;
        private final Boolean isLiked;

        public static List<AnswerItem> of(List<Answer> answerList) {
            return answerList.stream()
                    .map(a -> AnswerItem.builder()
                            .answerId(a.getId())
                            .content(a.getContent())
                            .isLiked(a.getIsLiked())
                            .build())
                    .toList();
        }
    }
}
