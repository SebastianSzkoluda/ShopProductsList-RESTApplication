package com.sszkoluda.shopproductslist.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "family_id", nullable = false)
    @JsonIgnoreProperties("productsToBuyList")
    private Family family;

}
