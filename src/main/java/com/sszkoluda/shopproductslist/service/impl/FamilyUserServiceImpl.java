package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class FamilyUserServiceImpl implements FamilyUserService {

    @Autowired
    FamilyUserRepository familyUserRepository;

    @Override
    public void saveUser(FamilyUser user) {
        familyUserRepository.save(user);
    }

    @Override
    public Iterable<FamilyUser> listAllUsers() {
        // TODO Auto-generated method stub
        return familyUserRepository.findAll();
    }

    @Override
    public Optional<FamilyUser> findUserByEmail(String email) {
        return familyUserRepository.findByEmail(email);
    }

    @Override
    public boolean doesLoadUserHaveAFamily() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByEmail(auth.getName());
//        if(familyUser.getFamilyNameInUser() == null) {
//            return false;
//        }
//        else {
//            return true;
//        }
        return true;
    }

    @Transactional
    @Override
    public void addingUserToFamily(FamilyUser familyUser) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser>  familyUserTemp = familyUserRepository.findByEmail(auth.getName());
//        familyUser.setFamilyNameInUser(familyUserTemp.getFamilyNameInUser());
    }
}
