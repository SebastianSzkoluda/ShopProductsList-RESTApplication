package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.ProductToBuy;

import java.util.List;
import java.util.Optional;

public interface ProductToBuyService {

    Optional<ProductToBuy> saveProductToBuyForCurrentFamily(ProductToBuy productToBuy, Integer familyId);

    List<ProductToBuy> getProductsToBuyForFamily(Integer familyId);

    Optional<ProductToBuy> findOne(String productName);

    Iterable<ProductToBuy> listAllProductsToBuy();

    boolean removeProductToBuy(Integer productToBuyId);
}
