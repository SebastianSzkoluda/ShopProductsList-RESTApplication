package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.Product;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProductService {

    Optional<Product> saveProductForCurrentFamily(Product product, Integer familyId);

    List<Product> getProductsForFamily(Integer familyId);

    Optional<Product> findOne(String productName);

    Iterable<Product> listAllProducts();

    boolean removeProduct(Integer productId);
}
