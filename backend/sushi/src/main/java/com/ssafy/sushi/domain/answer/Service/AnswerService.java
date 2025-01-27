package com.ssafy.sushi.domain.answer.Service;

import com.ssafy.sushi.domain.answer.AnswerRepository;
import com.ssafy.sushi.domain.answer.Dto.request.CreateAnswerRequest;
import com.ssafy.sushi.domain.answer.Dto.response.CreateAnswerResponse;
import com.ssafy.sushi.domain.answer.Entity.Answer;
import com.ssafy.sushi.domain.notification.Service.NotificationService;
import com.ssafy.sushi.domain.notification.enums.NotificationType;
import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import com.ssafy.sushi.domain.sushi.Repository.SushiRepository;
import com.ssafy.sushi.domain.user.Entity.User;
import com.ssafy.sushi.domain.user.UserRepository;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
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
        if(sushi.getRemainingAnswers() == 0){
            throw new CustomException(ErrorCode.ANSWER_IS_FULL);
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
        if(sushi.getRemainingAnswers() == 0){
            // 마감처리
            sushi.closeSushi();
            //== 알림 날리기==//
            notificationService.sendNotification(
                    sushi.getUser(),
                    NotificationType.ANS_END,
                    "답변 마감!! 지금 가서 확인해보세요!",
                    "api/sushi/my/" + sushi.getId());
        }

        return response;
    }
}
