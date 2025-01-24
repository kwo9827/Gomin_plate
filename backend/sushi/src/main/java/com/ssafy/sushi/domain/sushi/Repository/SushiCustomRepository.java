package com.ssafy.sushi.domain.sushi.Repository;

import com.ssafy.sushi.domain.sushi.Entity.Sushi;

import java.time.LocalDateTime;
import java.util.List;

public interface SushiCustomRepository {
    List<Sushi> findRandomAvailableSushi(Integer userId, LocalDateTime now, int size);
}
