package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service(value = "userService")
public class FamilyUserServiceImpl implements FamilyUserService, UserDetailsService {

    @Autowired
    FamilyUserRepository familyUserRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Override
    public FamilyUser saveUser(FamilyUser user) {
        FamilyUser newUser;
        newUser = FamilyUser.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .age(user.getAge())
                .password(bcryptEncoder.encode(user.getPassword())).build();

        return familyUserRepository.save(newUser);
    }

    @Override
    public Iterable<FamilyUser> listAllUsers() {
        // TODO Auto-generated method stub
        return familyUserRepository.findAll();
    }
    @Override
    public FamilyUser findOne(String username) {
        return familyUserRepository.findByUserName(username);
    }

    @Override
    public Optional<FamilyUser> findById(Integer id) {
        return familyUserRepository.findById(id);
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

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        FamilyUser familyUser = familyUserRepository.findByUserName(s);
        if(familyUser == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(familyUser.getUsername(), familyUser.getPassword(), getAuthority());
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }
}
