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

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class FamilyServiceImpl implements FamilyService {

    private final FamilyRepository familyRepository;

    private final FamilyUserRepository familyUserRepository;

    @Autowired
    public FamilyServiceImpl(FamilyRepository familyRepository, FamilyUserRepository familyUserRepository) {
        this.familyRepository = familyRepository;
        this.familyUserRepository = familyUserRepository;
    }

    @Override
    public Optional<Family> saveFamily(Family family) {
        Set<FamilyUser> familyMembers = new HashSet<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
        return familyUser.map(FamilyUser::getUserFamilies).orElse(Collections.emptySet());
    }
}
