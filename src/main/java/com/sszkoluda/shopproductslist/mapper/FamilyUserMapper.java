package com.sszkoluda.shopproductslist.mapper;

import com.sszkoluda.shopproductslist.DTO.AuthorityDTO;
import com.sszkoluda.shopproductslist.DTO.FamilyDTO;
import com.sszkoluda.shopproductslist.DTO.FamilyUserDTO;
import com.sszkoluda.shopproductslist.DTO.NotificationDTO;
import com.sszkoluda.shopproductslist.model.Authority;
import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Notification;

import java.util.HashSet;
import java.util.Set;

public class FamilyUserMapper {

    public static FamilyUser FamilyUserDTOtoFamilyUser(FamilyUserDTO familyUserDTO){

        Set<Notification> notifications = new HashSet<>();
        Set<Authority> authorities = new HashSet<>();
        Set<Family> userFamilies = new HashSet<>();

        familyUserDTO.getNotificationsList().forEach(n -> {
             notifications.add(NotificationMapper.NotificationDTOtoNotification(n));
        });

        familyUserDTO.getAuthorities().forEach(a -> {
            authorities.add(AuthorityMapper.AuthorityDTOtoAuthority(a));
        });

        familyUserDTO.getUserFamilies().forEach(f -> {
            userFamilies.add(FamilyMapper.FamilyDTOtoFamily(f));
        });

        return FamilyUser.builder()
                .lastname(familyUserDTO.getLastname())
                .firstname(familyUserDTO.getFirstname())
                .age(familyUserDTO.getAge())
                .avatarFilename(familyUserDTO.getAvatarFilename())
                .email(familyUserDTO.getEmail())
                .password(familyUserDTO.getPassword())
                .userId(familyUserDTO.getUserId())
                .username(familyUserDTO.getUsername())
                .notificationsList(notifications)
                .authorities(authorities)
                .userFamilies(userFamilies)
                .build();
    }

    public static FamilyUserDTO FamilyUsertoFamilyUserDTO(FamilyUser familyUser){
        Set<NotificationDTO> notifications = new HashSet<>();
        Set<AuthorityDTO> authorities = new HashSet<>();
        Set<FamilyDTO> userFamilies = new HashSet<>();

        familyUser.getNotificationsList().forEach(n -> {
            notifications.add(NotificationMapper.NotificationtoNotificationDTO(n));
        });

        familyUser.getAuthorities().forEach(a -> {
            authorities.add(AuthorityMapper.AuthoritytoAuthorityDTO(a));
        });

        familyUser.getUserFamilies().forEach(f -> {
            userFamilies.add(FamilyMapper.FamilytoFamilyDTO(f));
        });

        return FamilyUserDTO.builder()
                .lastname(familyUser.getLastname())
                .firstname(familyUser.getFirstname())
                .age(familyUser.getAge())
                .avatarFilename(familyUser.getAvatarFilename())
                .email(familyUser.getEmail())
                .password(familyUser.getPassword())
                .userId(familyUser.getUserId())
                .username(familyUser.getUsername())
                .notificationsList(notifications)
                .authorities(authorities)
                .userFamilies(userFamilies)
                .build();
    }
}
