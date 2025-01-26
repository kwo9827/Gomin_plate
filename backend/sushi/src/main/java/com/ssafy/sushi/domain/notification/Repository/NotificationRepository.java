package com.ssafy.sushi.domain.notification.Repository;

import com.ssafy.sushi.domain.notification.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository <Notification, Integer> {
}
