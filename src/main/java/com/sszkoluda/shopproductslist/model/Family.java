package com.sszkoluda.shopproductslist.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "family")
public class Family {

    @Getter
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer familyId;

    @Getter
    @Column(name = "family_name")
    private String familyName;

    @Getter
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "familymembers", joinColumns = {@JoinColumn(name = "family_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")})
    @JsonIgnoreProperties("userFamilies")
    private Set<FamilyUser> familyMembers;

    @Getter
    @OneToMany(mappedBy = "family", fetch = FetchType.EAGER,cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("family")
    private Set<Product> productsList;

}
