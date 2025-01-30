package com.ssafy.sushi.domain.notification;

import com.ssafy.sushi.domain.notification.dto.response.HasUnreadNotificationResponse;
import com.ssafy.sushi.domain.notification.dto.response.MyNotificationListResponse;
import com.ssafy.sushi.domain.notification.service.NotificationService;
import com.ssafy.sushi.global.common.CustomPage;
import com.ssafy.sushi.global.common.response.ApiResponse;
import com.ssafy.sushi.global.common.util.AuthenticationUtil;
import com.ssafy.sushi.global.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<CustomPage<MyNotificationListResponse>>> getMyNotificationList(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable){
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(notificationService.getMyNotificationList(userId, pageable));
    }

    @GetMapping("/unread-exists")
    public ResponseEntity<ApiResponse<HasUnreadNotificationResponse>> hasUnreadNotification(
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        Integer userId = AuthenticationUtil.getCurrentUserId(userPrincipal);

        return ApiResponse.success(notificationService.hasUnreadNotification(userId));
    }

    @PutMapping("/{notificationId}")
    public ResponseEntity<ApiResponse<Void>> markNotificationAsRead(
            @PathVariable("notificationId") Integer notificationId){
        notificationService.markNotificationAsRead(notificationId);

        return ApiResponse.success(null);
    }
}
