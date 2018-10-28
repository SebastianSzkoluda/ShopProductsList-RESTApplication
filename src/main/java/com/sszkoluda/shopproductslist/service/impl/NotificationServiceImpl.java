package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Notification;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.repository.NotificationRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import com.sszkoluda.shopproductslist.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final FamilyUserRepository familyUserRepository;

    private final FamilyUserService familyUserService;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository, FamilyUserRepository familyUserRepository, FamilyUserService familyUserService) {
        this.notificationRepository = notificationRepository;
        this.familyUserRepository = familyUserRepository;
        this.familyUserService = familyUserService;
    }

    @Override
    public Iterable<Notification> listAllNotifications() {
        return this.notificationRepository.findAll();
    }

    @Override
    public Set<Notification> getAllNotificationsForLoggedUser() {
        Optional<FamilyUser> familyUser = this.familyUserService.getCurrentUser();
        return familyUser.map(FamilyUser::getNotificationsList).orElse(Collections.emptySet());
    }
}
