package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Notification;

import java.util.Optional;

public interface FamilyUserService {

    Optional<FamilyUser> saveUser(FamilyUser user);

    Optional<FamilyUser> findOne(String username);

    Optional<FamilyUser> findById(Integer id);

    Iterable<FamilyUser> listAllUsers();

    Optional<FamilyUser> findUserByEmail(String email);

    boolean doesLoadUserHaveAFamily();

    boolean sendInviteToFamily(String familyName, String invitedUserEmail);

    void acceptInviteToFamily(Notification notification);
}
