package com.sszkoluda.shopproductslist.repository;

import com.sszkoluda.shopproductslist.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product,Integer> {

}
