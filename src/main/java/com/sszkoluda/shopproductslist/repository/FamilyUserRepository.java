package com.sszkoluda.shopproductslist.repository;

import com.sszkoluda.shopproductslist.model.FamilyUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FamilyUserRepository extends CrudRepository<FamilyUser, Integer> {
    @Query("SELECT u FROM FamilyUser u WHERE u.email LIKE :email ")
    Optional<FamilyUser> findByEmail(@Param("email") String email);

    @Query("SELECT u FROM FamilyUser u WHERE u.username LIKE :username ")
    Optional<FamilyUser> findByUserName(@Param("username") String username);
}
