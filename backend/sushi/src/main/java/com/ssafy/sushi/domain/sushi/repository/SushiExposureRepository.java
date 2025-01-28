package com.ssafy.sushi.domain.sushi.repository;

import com.ssafy.sushi.domain.sushi.entity.SuShiExposure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SushiExposureRepository extends JpaRepository<SuShiExposure, Long> {

    SuShiExposure findByUserIdAndSushiId(Integer userId, Integer sushiId);
}
