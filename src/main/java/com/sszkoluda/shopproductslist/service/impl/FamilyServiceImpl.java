package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.repository.FamilyRepository;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.service.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class FamilyServiceImpl implements FamilyService {

    private FamilyRepository familyRepository;

    private final FamilyUserRepository familyUserRepository;

    @Autowired
    public FamilyServiceImpl(FamilyRepository familyRepository, FamilyUserRepository familyUserRepository) {
        this.familyRepository = familyRepository;
        this.familyUserRepository = familyUserRepository;
    }

    @Override
    public Family saveFamily(Family family) {
        Set<FamilyUser> familyMembers = new HashSet<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
        familyUser.get().getUserFamilies().add(family);
        familyMembers.add(familyUser.get());
        Family familyTmp;
        familyTmp = Family.builder().familyName(family.getFamilyName()).familyMembers(familyMembers).build();
        return familyRepository.save(familyTmp);
    }

    @Override
    public Optional<Family> findFamilyByName(String familyName) {
        return familyRepository.findByName(familyName);
    }

    @Override
    public Set<Family> getLoggedUserFamilies() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
        return familyUser.get().getUserFamilies();
    }
}
