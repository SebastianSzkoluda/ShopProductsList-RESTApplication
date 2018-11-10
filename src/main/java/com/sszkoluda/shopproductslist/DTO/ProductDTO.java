package com.sszkoluda.shopproductslist.DTO;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class ProductDTO {

    @Getter
    private Integer productId;

    @Getter
    private String productName;

    @Getter
    private Integer frequencyOfUse;

    @Getter
    private Float price;

    @Getter
    private Integer inStock;

    @Getter
    private String userComment;

    @Getter
    private FamilyDTO family;


}
