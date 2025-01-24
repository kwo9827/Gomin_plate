package com.ssafy.sushi.domain.sushi.Dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SushiRailResponse {
    List<SushiRailItem> sushi;
}
