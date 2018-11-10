package com.sszkoluda.shopproductslist.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
public class NotificationDTO {

    @Getter
    private Integer notificationId;

    @Getter
    private String notificationInfo;

    @Getter
    private String familyUserNameFrom;

    @Getter
    private String familyNameFromFamilyUser;

    @Getter
    private Integer familyIdFromFamilyUser;

    @Getter
    private FamilyUserDTO familyUser;

    public NotificationDTO() {
    }
}
