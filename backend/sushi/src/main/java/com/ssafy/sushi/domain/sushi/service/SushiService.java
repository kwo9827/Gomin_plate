package com.ssafy.sushi.domain.sushi.service;

import com.ssafy.sushi.domain.answer.entity.Answer;
import com.ssafy.sushi.domain.answer.repository.AnswerRepository;
import com.ssafy.sushi.domain.sushi.dto.request.CreateSushiRequest;
import com.ssafy.sushi.domain.sushi.dto.response.*;
import com.ssafy.sushi.domain.sushi.entity.Category;
import com.ssafy.sushi.domain.sushi.entity.SuShiExposure;
import com.ssafy.sushi.domain.sushi.entity.Sushi;
import com.ssafy.sushi.domain.sushi.entity.SushiType;
import com.ssafy.sushi.domain.sushi.repository.CategoryRepository;
import com.ssafy.sushi.domain.sushi.repository.SushiExposureRepository;
import com.ssafy.sushi.domain.sushi.repository.SushiRepository;
import com.ssafy.sushi.domain.sushi.repository.SushiTypeRepository;
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
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.time.LocalDateTime.now;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SushiService {

    private final SushiRepository sushiRepository;
    private final SushiTypeRepository sushiTypeRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final SushiExposureRepository sushiExposureRepository;
    private final AnswerRepository answerRepository;

    private final ScheduleService scheduleService;

    public SushiRailResponse getRandomSushi(Integer userId, Integer size) {
        // 현재 시간 기준으로 조회
        LocalDateTime now = now();

        // 조건에 맞는 무작위 초밥 15개 조회
        List<Sushi> randomSushi = sushiRepository.findRandomAvailableSushi(userId, now, size);

        // 응답 DTO 변환 및 반환
        return SushiRailResponse.builder()
                .sushi(randomSushi.stream()
                        .map(s -> SushiRailItem.builder()
                                .sushiId(s.getId())
                                .category(s.getCategory().getId())
                                .sushiType(s.getSushiType().getId())
                                .remainingAnswers(s.getRemainingAnswers())
                                .expirationTime(s.getExpirationTime()) // string?
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public CustomPage<MySushiListResponse> getMySushiList(Integer userId, String keyword, Pageable pageable) {

        Page<Sushi> sushiList;
        if (StringUtils.hasText(keyword)) {
            sushiList = sushiRepository.findSushiByUserIdAndSearch(userId, keyword, pageable);
        } else {
            sushiList = sushiRepository.findSushiByUserId(userId, pageable);
        }

        return new CustomPage<>(sushiList.map(MySushiListResponse::of));
    }

    public MySushiDetailResponse getMySushiDetail(Integer userId, Integer sushiId) {
        Sushi sushi = getSushiById(sushiId);

        if (!sushi.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_SUSHI_ACCESS);
        }

        List<Answer> answerList = answerRepository.findBySushiId(sushiId);

        return MySushiDetailResponse.of(sushi, answerList);
    }

    /**
     * 초밥 등록
     */
    @Transactional
    public CreateSushiResponse saveSushi(CreateSushiRequest request, Integer userId) {

        Category category = categoryRepository.findById(request.getCategory()).orElseThrow(() ->
                new CustomException(ErrorCode.CATEGORY_NOT_FOUND));

        SushiType sushiType = sushiTypeRepository.findById(request.getSushiType()).orElseThrow(() ->
                new CustomException(ErrorCode.SUSHITYPE_NOT_FOUND));

        User user = userRepository.findById(userId).orElseThrow(() ->
                new CustomException(ErrorCode.USER_NOT_FOUND));

        Sushi sushi = request.toEntity(request, user, category, sushiType);
        CreateSushiResponse response = CreateSushiResponse.of(sushiRepository.save(sushi));

        scheduleService.sushiEnd(sushi);

        return response;
    }

    /**
     * 레일 위의 초밥 조회
     */
    @Transactional
    public SushiOnRailResponse getRailSushi(Integer userId, Integer sushiId) {
        //초밥 조회
        Sushi sushi = getSushiById(sushiId);
        //노출시간 갱신
        updateSushiExposure(userId, sushi);
        return SushiOnRailResponse.of(sushi);
    }

    @Transactional
    public void updateSushiExposure(Integer userId, Sushi sushi) {
        // 사용자와 초밥에 대한 exposure 조회
        SuShiExposure exposure = sushiExposureRepository.findByUserIdAndSushiId(userId, sushi.getId());

        // 이미 존재하면 timestamp만 갱신
        if (exposure != null) {
            exposure.updateTimestamp();
        } else {
            // 존재하지 않으면 새로운 exposure 생성
            User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

            exposure = SuShiExposure.builder()
                    .user(user)
                    .sushi(sushi)
                    .timestamp(now())
                    .build();
            sushiExposureRepository.save(exposure);
        }
    }

    private Sushi getSushiById(Integer sushiId) {
        return sushiRepository.findById(sushiId).orElseThrow(() ->
                new CustomException(ErrorCode.SUSHI_NOT_FOUND));
    }

    public SushiTypeResponse getAllSushiTypes() {
        List<SushiType> sushiTypeList = sushiTypeRepository.findAll();

        return SushiTypeResponse.builder()
                .sushiType(sushiTypeList.stream()
                        .map(SushiTypeItem::of)
                        .toList())
                .build();
    }
}
