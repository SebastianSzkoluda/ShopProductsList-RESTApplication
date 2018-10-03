package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.Product;

import java.util.Optional;
import java.util.Set;

public interface ProductService {

    Optional<Product> saveProductForCurrentFamily(Product product,String familyName);

    Set<Product> getProductsForFamily(String familyName);

    Optional<Product> findOne(String productName);

    Iterable<Product> listAllProducts();

    boolean removeProduct(Integer productId);
}
