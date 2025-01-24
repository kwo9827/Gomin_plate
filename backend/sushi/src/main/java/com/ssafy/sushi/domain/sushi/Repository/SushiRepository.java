package com.ssafy.sushi.domain.sushi.Repository;

import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SushiRepository extends JpaRepository<Sushi, Integer>, SushiCustomRepository {

    // 사용자 ID로 사용자의 초밥 목록 조회
    List<Sushi> findByUserId(Integer userId);

    // 초밥 ID로 특정 초밥 조회
    Sushi findByid(Integer sushiId);
}