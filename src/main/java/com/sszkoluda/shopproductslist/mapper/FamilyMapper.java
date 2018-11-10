package com.sszkoluda.shopproductslist.mapper;

import com.sszkoluda.shopproductslist.DTO.FamilyDTO;
import com.sszkoluda.shopproductslist.DTO.FamilyUserDTO;
import com.sszkoluda.shopproductslist.DTO.ProductDTO;
import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class FamilyMapper {

    public static Family FamilyDTOtoFamily(FamilyDTO familyDTO) {

        Set<FamilyUser> familyMembers = new HashSet<>();
        List<Product> productList = new ArrayList<>();

        familyDTO.getFamilyMembers().forEach(u -> {
            familyMembers.add(FamilyUserMapper.FamilyUserDTOtoFamilyUser(u));
        });

        familyDTO.getProductsList().forEach(p -> {
            productList.add(ProductMapper.ProductDTOtoProduct(p));
        });

        return Family.builder()
                .familyId(familyDTO.getFamilyId())
                .familyMembers(familyMembers)
                .familyName(familyDTO.getFamilyName())
                .productsList(productList)
                .build();
    }

    public static FamilyDTO FamilytoFamilyDTO(Family family) {

        Set<FamilyUserDTO> familyMembers = new HashSet<>();
        List<ProductDTO> productList = new ArrayList<>();

        family.getFamilyMembers().forEach(u -> {
            familyMembers.add(FamilyUserMapper.FamilyUsertoFamilyUserDTO(u));
        });

        family.getProductsList().forEach(p -> {
            productList.add(ProductMapper.ProducttoProductDTO(p));
        });

        return FamilyDTO.builder()
                .familyId(family.getFamilyId())
                .familyMembers(familyMembers)
                .familyName(family.getFamilyName())
                .productsList(productList)
                .build();
    }
}
