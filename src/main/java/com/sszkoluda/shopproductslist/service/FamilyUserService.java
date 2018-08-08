package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.FamilyUser;

import java.util.Optional;

public interface FamilyUserService {

    FamilyUser saveUser(FamilyUser user);

    FamilyUser findOne(String username);

    Optional<FamilyUser> findById(Integer id);

    Iterable<FamilyUser> listAllUsers();

    Optional<FamilyUser> findUserByEmail(String email);

    boolean doesLoadUserHaveAFamily();

    void addingUserToFamily(FamilyUser familyUser);
}
