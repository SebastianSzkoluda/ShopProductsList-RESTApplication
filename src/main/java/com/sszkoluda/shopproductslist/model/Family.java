package com.sszkoluda.shopproductslist.model;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "family")
public class Family {

    @Getter
    @Id
    @Column(name = "family_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer familyId;

    @Getter
    @Column(name = "family_name")
    private String familyName;

}
