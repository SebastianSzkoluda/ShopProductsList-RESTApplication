package com.sszkoluda.shopproductslist.repository;

import com.sszkoluda.shopproductslist.model.Family;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyRepository extends CrudRepository<Family,Integer> {
    @Query("SELECT f FROM Family f WHERE f.family_name LIKE :family_name ")
    Optional<Family> findByName(@Param("family_name") String family_name);
}
