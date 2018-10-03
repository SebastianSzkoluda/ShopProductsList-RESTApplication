package com.sszkoluda.shopproductslist.rest;

import com.sszkoluda.shopproductslist.model.Notification;
import com.sszkoluda.shopproductslist.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/notification")
    public Set<Notification> getNotificationsForLoggedUser() {
        return this.notificationService.getAllNotificationsForLoggedUser();
    }
}
