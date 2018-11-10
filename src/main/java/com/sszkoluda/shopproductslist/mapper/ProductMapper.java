package com.sszkoluda.shopproductslist.mapper;

import com.sszkoluda.shopproductslist.DTO.ProductDTO;
import com.sszkoluda.shopproductslist.model.Product;

public class ProductMapper {

    public static Product ProductDTOtoProduct(ProductDTO productDTO) {

        return Product.builder()
                .family(FamilyMapper.FamilyDTOtoFamily(productDTO.getFamily()))
                .frequencyOfUse(productDTO.getFrequencyOfUse())
                .inStock(productDTO.getInStock())
                .price(productDTO.getPrice())
                .productId(productDTO.getProductId())
                .productName(productDTO.getProductName())
                .userComment(productDTO.getUserComment())
                .build();
    }

    public static ProductDTO ProducttoProductDTO(Product product) {

        return ProductDTO.builder()
                .family(FamilyMapper.FamilytoFamilyDTO(product.getFamily()))
                .frequencyOfUse(product.getFrequencyOfUse())
                .inStock(product.getInStock())
                .price(product.getPrice())
                .productId(product.getProductId())
                .productName(product.getProductName())
                .userComment(product.getUserComment())
                .build();
    }
}
