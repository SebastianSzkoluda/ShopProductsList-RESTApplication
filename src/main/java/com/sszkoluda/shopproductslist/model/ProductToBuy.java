package com.sszkoluda.shopproductslist.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Builder
@Data
@Entity
@Table(name = "producttobuy")
public class ProductToBuy {

    @Getter
    @Id
    @Column(name = "productId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Getter
    @Column(name = "available_shop")
    private String availableShop;

}
