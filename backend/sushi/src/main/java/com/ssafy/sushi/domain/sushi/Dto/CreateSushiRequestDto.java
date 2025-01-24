package com.ssafy.sushi.domain.sushi.Dto;

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
public class CreateSushiRequestDto {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotNull
    @Min(1) @Max(10)
    private Integer maxAnswers;

    @NotBlank
    private String category;

    @NotBlank
    private String sushiType;

    public Sushi toEntity(CreateSushiRequestDto createSushiRequestDto, User user, Category category, SushiType sushiType) {

        Sushi sushi = Sushi.builder()
                .user(user)
                .category(category)
                .sushiType(sushiType)
                .title(createSushiRequestDto.getTitle())
                .content(createSushiRequestDto.getContent())
                .expirationTime(LocalDateTime.now().plusHours(24)) // 유통기한은 24시간 후
                .maxAnswers(createSushiRequestDto.getMaxAnswers())
                .remainingAnswers(createSushiRequestDto.getMaxAnswers())
                .build();

        return sushi;
    }

}
