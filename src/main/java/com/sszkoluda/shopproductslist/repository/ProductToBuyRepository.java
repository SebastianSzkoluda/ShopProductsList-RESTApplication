package com.sszkoluda.shopproductslist.repository;

import com.sszkoluda.shopproductslist.model.ProductToBuy;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductToBuyRepository extends CrudRepository<ProductToBuy, Integer> {

    @Query("SELECT p FROM ProductToBuy p WHERE p.productName LIKE :productName ")
    Optional<ProductToBuy> findByProductName(@Param("productName") String productName);
}
