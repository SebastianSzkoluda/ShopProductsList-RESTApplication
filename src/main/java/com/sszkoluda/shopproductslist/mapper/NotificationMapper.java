package com.sszkoluda.shopproductslist.mapper;

import com.sszkoluda.shopproductslist.DTO.NotificationDTO;
import com.sszkoluda.shopproductslist.model.Notification;

public class NotificationMapper {

    public static Notification NotificationDTOtoNotification(NotificationDTO notificationDTO) {

        return Notification.builder()
                .familyIdFromFamilyUser(notificationDTO.getFamilyIdFromFamilyUser())
                .familyNameFromFamilyUser(notificationDTO.getFamilyNameFromFamilyUser())
                .familyUserNameFrom(notificationDTO.getFamilyUserNameFrom())
                .notificationId(notificationDTO.getNotificationId())
                .notificationInfo(notificationDTO.getNotificationInfo())
                .build();
    }

    public static NotificationDTO NotificationtoNotificationDTO(Notification notification) {

        return NotificationDTO.builder()
                .familyIdFromFamilyUser(notification.getFamilyIdFromFamilyUser())
                .familyNameFromFamilyUser(notification.getFamilyNameFromFamilyUser())
                .familyUserNameFrom(notification.getFamilyUserNameFrom())
                .notificationId(notification.getNotificationId())
                .notificationInfo(notification.getNotificationInfo())
                .build();
    }
}
