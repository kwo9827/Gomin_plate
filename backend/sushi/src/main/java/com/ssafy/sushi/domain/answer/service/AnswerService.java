package com.ssafy.sushi.domain.answer.service;

import com.ssafy.sushi.domain.answer.Repository.AnswerRepository;
import com.ssafy.sushi.domain.answer.dto.response.MyAnswerResponse;
import com.ssafy.sushi.global.common.CustomPage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    public CustomPage<MyAnswerResponse> getMyAnswerList(Integer userId, Pageable pageable) {
        Page<MyAnswerResponse> sushiList = answerRepository.findMyAnswersByUserId(userId, pageable);

        return new CustomPage<>(sushiList);
    }
}
