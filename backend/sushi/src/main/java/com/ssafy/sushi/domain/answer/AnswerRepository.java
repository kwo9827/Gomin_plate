package com.ssafy.sushi.domain.answer;

import com.ssafy.sushi.domain.answer.Entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    List<Answer> findBySushiId(Integer sushiId);
}
