package com.ssafy.sushi.domain.user;

import com.ssafy.sushi.domain.user.Entity.User;
import com.ssafy.sushi.domain.user.enums.Provider;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByProviderAndProviderId(Provider provider, String providerId);

    @NotNull
    @Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> findById(@NotNull @Param("id") Integer id);

    // 삭제된 사용자를 포함하여 조회
    @Query("SELECT u FROM User u WHERE u.provider = :provider AND u.providerId = :providerId")
    Optional<User> findByProviderAndProviderIdIncludeDeleted(
            @Param("provider") Provider provider,
            @Param("providerId") String providerId);

}