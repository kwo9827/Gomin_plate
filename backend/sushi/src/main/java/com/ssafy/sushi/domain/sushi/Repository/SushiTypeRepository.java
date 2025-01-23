package com.ssafy.sushi.domain.sushi.Repository;

import com.ssafy.sushi.domain.sushi.Entity.SushiType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SushiTypeRepository extends JpaRepository<SushiType, Integer> {

    // 초밥종류 조회
    Optional<SushiType> findByName(String name);

    // 초밥 종류 전체 조회
    List<SushiType> findAll();

}
