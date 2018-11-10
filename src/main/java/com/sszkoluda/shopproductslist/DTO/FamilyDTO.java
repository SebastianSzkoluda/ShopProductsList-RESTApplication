package com.sszkoluda.shopproductslist.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FamilyDTO {

    @Getter
    private Integer familyId;

    @Getter
    private String familyName;

    @Getter
    private Set<FamilyUserDTO> familyMembers;

    @Getter
    private List<ProductDTO> productsList;

    @Getter
    private List<ProductToBuyDTO> productsToBuyList;

}
