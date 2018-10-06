package com.sszkoluda.shopproductslist.repository;

import com.sszkoluda.shopproductslist.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface ProductRepository extends CrudRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE p.productName LIKE :productName ")
    Optional<Product> findByProductName(@Param("productName") String productName);
}
