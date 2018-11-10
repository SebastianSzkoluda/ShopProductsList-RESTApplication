package com.sszkoluda.shopproductslist.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(value = {"familyMembers","productsToBuyList","productsList"})
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
    @NotNull
    private String familyName;

    @Getter
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "familymembers", joinColumns = {@JoinColumn(name = "family_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")})
    @JsonIgnoreProperties("userFamilies")
    private Set<FamilyUser> familyMembers;

    @Getter
    @OneToMany(mappedBy = "family", fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnoreProperties("family")
    private List<Product> productsList;

    @Getter
    @OneToMany(mappedBy = "family", fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @JsonIgnoreProperties("family")
    private List<ProductToBuy> productsToBuyList;

}
