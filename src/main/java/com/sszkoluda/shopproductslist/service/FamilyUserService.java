package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Notification;

import java.util.List;
import java.util.Optional;

public interface FamilyUserService {

    Optional<FamilyUser> saveUser(FamilyUser user);

    Optional<FamilyUser> findOne(String username);

    Optional<FamilyUser> findById(Integer id);

    List<FamilyUser> findUsersLikePartOfUsername(String username);

    void deleteUser(Integer id);

    Iterable<FamilyUser> listAllUsers();

    Optional<FamilyUser> findUserByEmail(String email);

    Optional<FamilyUser> getCurrentUser();

    boolean doesLoadUserHaveAFamily();

    Optional<Notification> sendInviteToFamily(Integer familyId, String invitedUserEmail);

    void acceptInviteToFamily(Notification notification);
}
