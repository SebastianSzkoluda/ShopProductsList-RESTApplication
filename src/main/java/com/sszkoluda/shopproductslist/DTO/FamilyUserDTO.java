package com.sszkoluda.shopproductslist.DTO;

import lombok.*;

import javax.validation.constraints.Email;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FamilyUserDTO {

    @Getter
    private Integer userId;

    @Getter
    private String password;

    @Getter
    private String firstname;

    @Getter
    private String lastname;

    @Getter
    private String username;

    @Getter
    @Email
    private String email;

    @Getter
    private Integer age;

    @Getter
    private String avatarFilename;

    @Getter
    private Set<AuthorityDTO> authorities;

    @Getter
    private Set<FamilyDTO> userFamilies;

    @Getter
    private Set<NotificationDTO> notificationsList;

}
