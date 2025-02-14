-- 테스트 유저 데이터
INSERT INTO user (nickname,total_likes, provider, provider_id, created_at, updated_at)
VALUES ('고양이마스터', 0, 'KAKAO', 1111111, NOW(), NOW());

-- 더미 유저
INSERT INTO user (nickname, total_likes, provider, provider_id, created_at, updated_at)
VALUES ('테스트맨', 0,'KAKAO', 112312312, NOW(), NOW()),
        ('testUser1', 0, 'KAKAO', 1231440, NOW(), NOW()),
       ('testUser2', 1, 'GOOGLE', 1231441, NOW(), NOW()),
       ('testUser3', 0, 'KAKAO', 1231442, NOW(), NOW()),
       ('testUser4', 2, 'GOOGLE', 1231443, NOW(), NOW()),
       ('testUser5', 0, 'KAKAO', 1231444, NOW(), NOW());

-- 초밥(고민) 데이터
-- 현재 시각 기준으로 다양한 상태의 데이터 생성
INSERT INTO sushi (id, user_id, category_id, sushi_type_id,
                   title, content, expire_time, max_answers,
                   remaining_answers, is_closed, created_at, updated_at)
VALUES
-- 활성화된 초밥 (유통기한 충분, 답변 가능)
(1, 1, 1, 1, '연애 조언 부탁드려요', '썸 타는 중인데 고백할까요?',
 DATE_ADD(NOW(), INTERVAL 2 HOUR), 5, 5, false, NOW(), NOW()),
(2, 2, 2, 2, '친구와 싸웠어요', '어떻게 화해하면 좋을까요?',
 DATE_ADD(NOW(), INTERVAL 1 HOUR), 3, 3, false, NOW(), NOW()),
(3, 3, 3, 3, '부모님과 갈등이에요', '세대차이를 어떻게 극복하나요?',
 DATE_ADD(NOW(), INTERVAL 3 HOUR), 4, 4, false, NOW(), NOW()),

-- 곧 마감될 초밥 (유통기한 10분 이내)
(4, 4, 4, 4, '직장 스트레스', '이직을 고민중입니다.',
 DATE_ADD(NOW(), INTERVAL 5 MINUTE), 3, 2, false, NOW(), NOW()),

-- 이미 마감된 초밥
(5, 5, 5, 5, '시험 불안감', '어떻게 극복하나요?',
 DATE_ADD(NOW(), INTERVAL -1 HOUR), 2, 0, true, NOW(), NOW()),

(6, 1, 2, 3, '친구 생일 선물', '20만원 예산으로 뭘 사줄까요?',
 DATE_ADD(NOW(), INTERVAL 4 HOUR), 4, 4, false, NOW(), NOW()),

(7, 2, 1, 4, '첫 소개팅 장소 추천', '이번 주말에 소개팅인데 어디로 갈까요?',
 DATE_ADD(NOW(), INTERVAL 5 HOUR), 5, 5, false, NOW(), NOW()),

(8, 3, 4, 2, '회사 점심 메뉴', '팀원들과 첫 회식인데 어떤 메뉴가 좋을까요?',
 DATE_ADD(NOW(), INTERVAL 3 HOUR), 3, 3, false, NOW(), NOW()),

(9, 4, 3, 5, '부모님 결혼기념일', '특별한 이벤트를 계획하고 싶어요',
 DATE_ADD(NOW(), INTERVAL 6 HOUR), 4, 4, false, NOW(), NOW()),

(10, 5, 5, 1, '동아리 가입', '새로운 동아리에 가입하려고 하는데 고민이에요',
 DATE_ADD(NOW(), INTERVAL 2 HOUR), 3, 3, false, NOW(), NOW()),

(11, 1, 4, 3, '업무 스트레스', '일이 너무 많아서 힘들어요',
 DATE_ADD(NOW(), INTERVAL 7 HOUR), 5, 5, false, NOW(), NOW()),

(12, 2, 2, 4, '친구의 거짓말', '친구가 거짓말을 했어요. 어떻게 해야할까요?',
 DATE_ADD(NOW(), INTERVAL 5 HOUR), 4, 4, false, NOW(), NOW()),

(13, 3, 1, 2, '긴 연애의 매너리즘', '3년 연애 중인데 권태기가 온 것 같아요',
 DATE_ADD(NOW(), INTERVAL 4 HOUR), 5, 5, false, NOW(), NOW()),

(14, 4, 5, 5, '학업과 아르바이트', '둘 다 잡고 싶은데 너무 힘들어요',
 DATE_ADD(NOW(), INTERVAL 3 HOUR), 3, 3, false, NOW(), NOW()),

(15, 5, 3, 1, '동생과의 갈등', '동생이 너무 이기적이에요',
 DATE_ADD(NOW(), INTERVAL 8 HOUR), 4, 4, false, NOW(), NOW()),

(16, 1, 1, 3, '고백 타이밍', '언제 고백하는 게 좋을까요?',
 DATE_ADD(NOW(), INTERVAL 6 HOUR), 5, 5, false, NOW(), NOW()),

(17, 2, 4, 2, '이직 준비', '현재 회사를 다니면서 이직 준비하기 힘들어요',
 DATE_ADD(NOW(), INTERVAL 4 HOUR), 4, 4, false, NOW(), NOW()),

(18, 3, 2, 4, '친구의 부탁', '친구가 큰 돈을 빌려달라고 해요',
 DATE_ADD(NOW(), INTERVAL 5 HOUR), 3, 3, false, NOW(), NOW()),

(19, 4, 5, 1, '전공 고민', '전과를 해야할지 고민이에요',
 DATE_ADD(NOW(), INTERVAL 7 HOUR), 5, 5, false, NOW(), NOW()),

(20, 5, 3, 5, '가족 여행 계획', '처음으로 가족여행을 계획하고 있어요',
 DATE_ADD(NOW(), INTERVAL 3 HOUR), 4, 4, false, NOW(), NOW());


-- 답변 데이터
INSERT INTO answer (id, user_id, sushi_id, content, is_liked, created_at, updated_at, is_negative)
VALUES (1, 2, 1, '용기내서 고백해보세요!', false, NOW(), NOW(), false),
       (2, 3, 2, '먼저 연락해서 만나보는게 어떨까요?', true, NOW(), NOW(), false),
       (3, 4, 5, '심호흡하고 차근차근 준비해보세요.', true, NOW(), NOW(), false);

-- 노출 이력 데이터
INSERT INTO sushi_exposure (id, user_id, sushi_id, timestamp)
VALUES
-- 최근 노출 (10분 이내)
(1, 1, 2, DATE_SUB(NOW(), INTERVAL 5 MINUTE)),
(2, 1, 3, DATE_SUB(NOW(), INTERVAL 8 MINUTE)),
-- 오래된 노출 (10분 이상)
(3, 2, 1, DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
(4, 3, 4, DATE_SUB(NOW(), INTERVAL 1 HOUR));