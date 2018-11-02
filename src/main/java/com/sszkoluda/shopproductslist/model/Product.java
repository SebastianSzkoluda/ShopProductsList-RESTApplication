package com.sszkoluda.shopproductslist.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Builder
@Entity
@Table(name = "product")
public class Product {

    @Getter
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Getter
    @NotNull
    @Column(name = "product_name")
    private String productName;

    @Getter
    @NotNull
    @Column(name = "frequency_of_use")
    private Integer frequencyOfUse;

    @Getter
    @NotNull
    @Column(name = "price")
    private Float price;

    @Getter
    @NotNull
    @Column(name = "in_stock")
    private Integer inStock;

    @Getter
    @Column(name = "user_comment")
    private String userComment;

    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "family_id", nullable = false)
    @JsonIgnoreProperties("productsList")
    private Family family;


}
