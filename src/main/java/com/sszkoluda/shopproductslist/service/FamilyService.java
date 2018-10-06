package com.sszkoluda.shopproductslist.service;

import com.sszkoluda.shopproductslist.model.Family;

import java.util.Optional;
import java.util.Set;

public interface FamilyService {

    Optional<Family> saveFamily(Family family);

    Optional<Family> findFamilyByName(String familyName);

    Optional<Family> findFamilyById(Integer Id);

    Set<Family> getLoggedUserFamilies();

}
