package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.Notification;

import java.util.Set;

public interface NotificationService {

    Iterable<Notification> listAllNotifications();

    Set<Notification> getAllNotificationsForLoggedUser();
}
