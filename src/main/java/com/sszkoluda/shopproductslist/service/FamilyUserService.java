package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.FamilyUser;

import java.util.Optional;

public interface FamilyUserService {

    void saveUser(FamilyUser user);
    Iterable<FamilyUser> listAllUsers();
    Optional<FamilyUser> findUserByEmail(String email);
    boolean doesLoadUserHaveAFamily();
    void addingUserToFamily(FamilyUser familyUser);
}
