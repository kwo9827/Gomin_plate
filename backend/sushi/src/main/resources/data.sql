INSERT INTO user (nickname, provider, provider_id, created_at, updated_at, total_likes)
VALUES ('테스트맨|', 'KAKAO', '112312312', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP, 1);

INSERT INTO category (name)
VALUES ('love'),
       ('health');

INSERT INTO sushi_type (name, required_likes)
VALUES ('egg', 0),
       ('cuttlefish', 1),
       ('shrimp', 2),
       ('octopus', 3),
       ('scallop', 6),
       ('tuna', 10);