package com.sszkoluda.shopproductslist.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user")
public class FamilyUser {

    @Getter
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Getter
    @NotNull
    @Column(name = "password")
    private String password;

    @Getter
    @NotNull
    @Column(name = "firstname")
    private String firstname;

    @Getter
    @NotNull
    @Column(name = "lastname")
    private String lastname;

    @Getter
    @Column(name = "username")
    private String username;

    @Getter
    @Email
    @NotNull
    @Column(name = "email")
    private String email;

    @Getter
    @Column(name = "age")
    private Integer age;

    @Getter
    @Column(name = "avatar_filename")
    private String avatarFilename;

    @Getter
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "grantedauthorities", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
    private Set<Authority> authorities;

    @Getter
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "familymembers", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "family_id", referencedColumnName = "id")})
    @JsonIgnoreProperties("familyMembers")
    private Set<Family> userFamilies;

    @Getter
    @OneToMany(mappedBy = "familyUser", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("familyUser")
    private Set<Notification> notificationsList;

}
