package com.ssafy.sushi.domain.sushi.Repository;

import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SushiRepository extends JpaRepository<Sushi, Integer>, SushiCustomRepository {

    // 초밥 ID로 특정 초밥 조회
    Optional<Sushi> findByid(Integer sushiId);
}