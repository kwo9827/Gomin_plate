package com.ssafy.sushi.domain.notification.repository;


import com.ssafy.sushi.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository <Notification, Integer> {
}
