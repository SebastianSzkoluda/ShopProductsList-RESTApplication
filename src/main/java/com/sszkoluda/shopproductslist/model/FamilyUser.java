package com.sszkoluda.shopproductslist.model;

import lombok.*;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@EqualsAndHashCode
@Data
@Builder
@Entity
@Table(name = "user")
public class FamilyUser {

    @Getter
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    @Getter
    @Column(name = "password")
    private String password;

    @Getter
    @Column(name = "username")
    private String username;

    @Getter
    @Column(name = "email")
    private String email;

    @Getter
    @Column(name = "age")
    private Integer age;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "grantedauthorities", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Authority> authorities;

}
