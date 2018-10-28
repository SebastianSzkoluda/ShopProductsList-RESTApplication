package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.repository.FamilyRepository;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.service.FamilyService;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class FamilyServiceImpl implements FamilyService {

    private final FamilyRepository familyRepository;

    private final FamilyUserRepository familyUserRepository;

    private final FamilyUserService familyUserService;

    @Autowired
    public FamilyServiceImpl(FamilyRepository familyRepository, FamilyUserRepository familyUserRepository, FamilyUserService familyUserService) {
        this.familyRepository = familyRepository;
        this.familyUserRepository = familyUserRepository;
        this.familyUserService = familyUserService;
    }

    @Override
    public Optional<Family> saveFamily(Family family) {
        Set<FamilyUser> familyMembers = new HashSet<>();
        Optional<FamilyUser> familyUser = this.familyUserService.getCurrentUser();
        return familyUser.map(f -> {
            f.getUserFamilies().add(family);
            familyMembers.add(f);
            return this.familyRepository.save(Family.builder()
                    .familyName(family.getFamilyName())
                    .familyMembers(familyMembers).build());
        });
    }

    @Override
    public Optional<Family> findFamilyByName(String familyName) {
        return this.familyRepository.findByName(familyName);
    }

    @Override
    public Optional<Family> findFamilyById(Integer id) {
        return this.familyRepository.findById(id);
    }

    @Override
    public Set<Family> getLoggedUserFamilies() {
        Optional<FamilyUser> familyUser = this.familyUserService.getCurrentUser();
        return familyUser.map(FamilyUser::getUserFamilies).orElse(Collections.emptySet());
    }
}
