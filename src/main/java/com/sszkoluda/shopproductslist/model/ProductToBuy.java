package com.sszkoluda.shopproductslist.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "producttobuy")
public class ProductToBuy {

    @Getter
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Getter
    @Column(name = "available_shop")
    private String availableShop;

    @Getter
    @Column(name = "Family_family_id")
    private Integer familyIdFk;



}
