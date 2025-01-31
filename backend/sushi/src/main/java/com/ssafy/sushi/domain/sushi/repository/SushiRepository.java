package com.ssafy.sushi.domain.sushi.repository;

import com.ssafy.sushi.domain.sushi.entity.Sushi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SushiRepository extends JpaRepository<Sushi, Integer>, SushiCustomRepository {

    Page<Sushi> findSushiByUserId(Integer userId, Pageable pageable);

    @Query("SELECT s FROM Sushi s WHERE s.user.id = :userId " +
            "AND (s.title LIKE CONCAT('%', :keyword, '%') " +
            "OR s.content LIKE CONCAT('%', :keyword, '%'))")
    Page<Sushi> findSushiByUserIdAndSearch(Integer userId, String keyword, Pageable pageable);
}