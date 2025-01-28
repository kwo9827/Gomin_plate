package com.ssafy.sushi.domain.answer.repository;

import com.ssafy.sushi.domain.answer.entity.Answer;
import com.ssafy.sushi.domain.answer.dto.response.MyAnswerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    List<Answer> findBySushiId(Integer sushiId);

    @Query("SELECT new com.ssafy.sushi.domain.answer.dto.response.MyAnswerResponse(" +
            "s.id, s.category.id, s.sushiType.id, s.title, s.content, a.isLiked, a.createdAt) " +
            "FROM Answer a " +
            "JOIN a.sushi s " +
            "WHERE a.user.id = :userId")
    Page<MyAnswerResponse> findMyAnswersByUserId(Integer userId, Pageable pageable);
}
