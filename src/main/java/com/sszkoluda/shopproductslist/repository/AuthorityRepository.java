package com.sszkoluda.shopproductslist.repository;

import com.sszkoluda.shopproductslist.model.Authority;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends CrudRepository<Authority,Integer> {
}
