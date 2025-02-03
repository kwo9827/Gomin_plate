package com.ssafy.sushi.domain.answer.service;

import com.ssafy.sushi.domain.answer.dto.request.CreateAnswerRequest;
import com.ssafy.sushi.domain.answer.dto.response.CreateAnswerResponse;
import com.ssafy.sushi.domain.answer.dto.response.MyAnswerDetailResponse;
import com.ssafy.sushi.domain.answer.dto.response.MyAnswerListResponse;
import com.ssafy.sushi.domain.answer.entity.Answer;
import com.ssafy.sushi.domain.answer.repository.AnswerRepository;
import com.ssafy.sushi.domain.notification.enums.NotificationType;
import com.ssafy.sushi.domain.notification.service.NotificationService;
import com.ssafy.sushi.domain.sushi.entity.Sushi;
import com.ssafy.sushi.domain.sushi.repository.SushiRepository;
import com.ssafy.sushi.domain.user.UserRepository;
import com.ssafy.sushi.domain.user.entity.User;
import com.ssafy.sushi.global.common.CustomPage;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
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
    private final UserRepository userRepository;
    private final SushiRepository sushiRepository;
    private final NotificationService notificationService;

    /**
     * 답변 등록
     */
    @Transactional
    public CreateAnswerResponse saveAnswer(CreateAnswerRequest request, Integer userId, Integer sushiId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new CustomException(ErrorCode.USER_NOT_FOUND));

        Sushi sushi = sushiRepository.findById(sushiId).orElseThrow(() ->
                new CustomException(ErrorCode.SUSHI_NOT_FOUND));

        // 답변 가능 인원이 초과되었다면(마감되었다면)
        if (sushi.getRemainingAnswers() == 0) {
            throw new CustomException(ErrorCode.ANSWER_IS_FULL);
        }

        // 유통기한이 마감되었다면
        if (sushi.getIsClosed()) {
            throw new CustomException(ErrorCode.SUSHI_IS_CLOSED);
        }

        // 답변 생성
        Answer answer = Answer.builder()
                .user(user)
                .sushi(sushi)
                .content(request.getContent())
                .build();
        CreateAnswerResponse response = CreateAnswerResponse.of(answerRepository.save(answer));

        // 답변 가능 인원 수 -1
        sushi.reduceRemainingAnswers();

        // 답변 가능 인원 수가 0이 되면
        if (sushi.getRemainingAnswers() == 0) {
            // 마감처리
            sushi.closeSushi();
            //== 알림 날리기==//
            notificationService.sendNotification(
                    sushi.getUser(),
                    NotificationType.ANS_END,
                    sushi.getId());
        }

        return response;
    }

    /**
     * 나의 답변 목록 조회
     */
    public CustomPage<MyAnswerListResponse> getMyAnswerList(Integer userId, String keyword, Pageable pageable) {
        Page<MyAnswerListResponse> sushiList = answerRepository.findMyAnswersByUserIdAndSearch(userId, keyword, pageable);

        return new CustomPage<>(sushiList);
    }

    public MyAnswerDetailResponse getMyAnswerDetail(Integer userId, Integer sushiId) {

        Answer answer = answerRepository.findMyAnswerDetail(userId, sushiId)
                .orElseThrow(() -> new CustomException(ErrorCode.ANSWER_NOT_FOUND));

        return MyAnswerDetailResponse.of(answer);
    }

    @Transactional
    public void likeAnswer(Integer asker, Integer answerId) {

        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new CustomException(ErrorCode.ANSWER_NOT_FOUND));

        if (answer.getIsLiked()) {
            throw new CustomException(ErrorCode.ANSWER_ALREADY_LIKED);
        }

        if (answer.getUser().getId().equals(asker)) {
            throw new CustomException(ErrorCode.SELF_LIKE_DENIED);
        }

        answer.markAsLiked();

        User respondent = answer.getUser();
        respondent.incrementTotalLikes();

        notificationService.sendNotification(
                respondent,
                NotificationType.ANS_LIKE,
                answerId);
    }
}
