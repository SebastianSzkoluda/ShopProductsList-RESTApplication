package com.sszkoluda.shopproductslist.repository;

import com.sszkoluda.shopproductslist.model.Family;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FamilyRepository extends CrudRepository<Family, Integer> {
    @Query("SELECT f FROM Family f WHERE f.familyName LIKE :familyName")
    Optional<Family> findByName(@Param("familyName") String familyName);
}
