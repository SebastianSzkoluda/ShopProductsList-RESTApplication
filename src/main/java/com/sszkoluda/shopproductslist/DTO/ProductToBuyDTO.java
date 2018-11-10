package com.sszkoluda.shopproductslist.DTO;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Data
public class ProductToBuyDTO {

    @Getter
    private Integer productId;

    @Getter
    private String productName;

    @Getter
    private String shop;

    @Getter
    private FamilyDTO family;

}
