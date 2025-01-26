package com.ssafy.sushi.domain.sushi.Repository;

import com.ssafy.sushi.domain.sushi.Entity.SuShiExposure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SushiExposureRepository extends JpaRepository<SuShiExposure, Long> {

    SuShiExposure findByUserIdAndSushiId(Integer userId, Integer sushiId);
}
