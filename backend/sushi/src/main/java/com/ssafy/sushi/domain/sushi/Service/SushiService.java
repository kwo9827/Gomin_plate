package com.ssafy.sushi.domain.sushi.Service;

import com.ssafy.sushi.domain.sushi.Dto.CreateSushiRequestDto;
import com.ssafy.sushi.domain.sushi.Dto.response.SushiRailItem;
import com.ssafy.sushi.domain.sushi.Dto.response.SushiRailResponse;
import com.ssafy.sushi.domain.sushi.Entity.Category;
import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import com.ssafy.sushi.domain.sushi.Entity.SushiType;
import com.ssafy.sushi.domain.sushi.Repository.CategoryRepository;
import com.ssafy.sushi.domain.sushi.Repository.SushiRepository;
import com.ssafy.sushi.domain.sushi.Repository.SushiTypeRepository;
import com.ssafy.sushi.domain.user.Entity.User;
import com.ssafy.sushi.domain.user.UserRepository;
import com.ssafy.sushi.global.error.ErrorCode;
import com.ssafy.sushi.global.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SushiService {

    private final SushiRepository sushiRepository;
    private final SushiTypeRepository sushiTypeRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    private final ScheduleService scheduleService;

    public SushiRailResponse getRandomSushi(Integer userId, Integer size) {
        // 현재 시간 기준으로 조회
        LocalDateTime now = LocalDateTime.now();

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

    /**
     * 초밥 등록
     */
    @Transactional
    public Sushi saveSushi(CreateSushiRequestDto createSushiRequestDto, Integer userId) {

        Category category = categoryRepository.findByName(createSushiRequestDto.getCategory()).orElseThrow(() ->
                new CustomException(ErrorCode.CATEGORY_NOT_FOUND));

        SushiType sushiType = sushiTypeRepository.findByName(createSushiRequestDto.getSushiType()).orElseThrow(() ->
                new CustomException(ErrorCode.SUSHITYPE_NOT_FOUND));

        User user = userRepository.findById(userId).orElseThrow(() ->
                new CustomException(ErrorCode.USER_NOT_FOUND));

        Sushi sushi = createSushiRequestDto.toEntity(createSushiRequestDto, user, category, sushiType);

        scheduleService.sushiEnd(sushi);

        return sushiRepository.save(sushi);
    }

    /**
     * 전체 초밥 조회
     * 일단 만들었음
     */
    public List<Sushi> findAllSushi() {
        return sushiRepository.findAll();
    }

    /**
     * 유저가 등록한 초밥 목록 조회
     */
    public List<Sushi> findSushiByUserId(Integer userId) {
        return sushiRepository.findByUserId(userId);
    }

    /**
     * 특정 초밥 조회
     */
    public Sushi findOne(Integer sushiId) {
        return sushiRepository.findByid(sushiId);
    }

}
