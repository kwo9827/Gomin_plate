package com.ssafy.sushi.domain.answer.Entity;

import com.ssafy.sushi.domain.sushi.Entity.Sushi;
import com.ssafy.sushi.domain.user.Entity.User;
import com.ssafy.sushi.global.common.Entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "answer")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Answer extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "sushi_id")
    private Sushi sushi;

    private String content;

    private Boolean isLiked;

}
