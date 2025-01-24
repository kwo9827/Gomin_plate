package com.ssafy.sushi.domain.sushi.Entity;

import com.ssafy.sushi.domain.user.Entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "sushi_exposure",
        uniqueConstraints = {
        @UniqueConstraint(
                name = "sushi_exposure_userId_sushiId_unique",
                columnNames = {"user_id", "sushi_id"})})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SuShiExposure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sushi_id", nullable = false)
    private Sushi sushi;

    private LocalDateTime timestamp;
}
