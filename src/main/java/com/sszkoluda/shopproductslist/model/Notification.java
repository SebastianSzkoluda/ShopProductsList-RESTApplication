package com.sszkoluda.shopproductslist.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@Builder
@Entity
@Table(name = "notification")
public class Notification {

    public Notification() {}

    @Getter
    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer notificationId;

    @Getter
    @Column(name = "notification_info")
    private String notificationInfo;

    @Getter
    @Column(name = "family_username_from")
    private String familyUserNameFrom;

    @Getter
    @Column(name = "family_name_from_user")
    private String familyNameFromFamilyUser;

    @Getter
    @Column(name = "family_id_from_user")
    private Integer familyIdFromFamilyUser;

    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id", nullable=false)
    @JsonIgnoreProperties("notificationsList")
    private FamilyUser familyUser;
}
