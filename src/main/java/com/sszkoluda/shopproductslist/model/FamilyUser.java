package com.sszkoluda.shopproductslist.model;

import lombok.*;

import javax.persistence.*;


@EqualsAndHashCode
@Data
@Builder
@Entity
@Table(name = "user")
public class FamilyUser {

    @Getter
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    @Getter
    @Column(name = "username")
    private String username;

    @Getter
    @Column(name = "password")
    private String password;

    @Getter
    @Column(name = "email")
    private String email;

    @Getter
    @Column(name = "age")
    private Integer age;

}
