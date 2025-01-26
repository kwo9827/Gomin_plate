package com.ssafy.sushi.domain.sushi.Dto.request;

import com.ssafy.sushi.domain.sushi.Entity.Category;
import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import com.ssafy.sushi.domain.sushi.Entity.SushiType;
import com.ssafy.sushi.domain.user.Entity.User;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateSushiRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotNull
    @Min(1) @Max(10)
    private Integer maxAnswers;

    @NotNull
    @Min(1)
    private Integer category;

    @NotNull
    @Min(1)
    private Integer sushiType;

    public Sushi toEntity(CreateSushiRequest CreateSushiRequest, User user, Category category, SushiType sushiType) {

        Sushi sushi = Sushi.builder()
                .user(user)
                .category(category)
                .sushiType(sushiType)
                .title(CreateSushiRequest.getTitle())
                .content(CreateSushiRequest.getContent())
                .expirationTime(LocalDateTime.now().plusHours(24)) // 유통기한은 24시간 후
                .maxAnswers(CreateSushiRequest.getMaxAnswers())
                .remainingAnswers(CreateSushiRequest.getMaxAnswers())
                .build();

        return sushi;
    }

}
