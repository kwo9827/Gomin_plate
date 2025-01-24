package com.ssafy.sushi.domain.sushi.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sushi_type")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SushiType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name; //초밥 종류

    @Column(name = "required_likes")
    private Integer requiredLikes; //필요 좋아요 수

}
