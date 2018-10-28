package com.sszkoluda.shopproductslist.repository;

import com.sszkoluda.shopproductslist.model.Authority;
import com.sszkoluda.shopproductslist.model.Family;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AuthorityRepository extends CrudRepository<Authority, Integer> {
    @Query("SELECT a FROM Authority a WHERE a.name LIKE :authorityName")
    Optional<Authority> findByName(@Param("authorityName") String authorityName);
}
