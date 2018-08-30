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
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;

    @Getter
    @Column(name = "available_shop")
    private String available_shop;

}
