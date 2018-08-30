package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Authority;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.repository.FamilyRepository;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service(value = "userService")
public class FamilyUserServiceImpl implements FamilyUserService, UserDetailsService {

    @Autowired
    FamilyUserRepository familyUserRepository;

    @Autowired
    FamilyRepository familyRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Override
    public FamilyUser saveUser(FamilyUser user) {
        Set<Authority> authorities = new HashSet<>();
        authorities.add(new Authority("user"));
        FamilyUser newUser = FamilyUser.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .age(user.getAge())
                .password(bcryptEncoder.encode(user.getPassword()))
                .authorities(authorities)
                .build();

        return familyUserRepository.save(newUser);
    }

    @Override
    public Iterable<FamilyUser> listAllUsers() {
        // TODO Auto-generated method stub
        return familyUserRepository.findAll();
    }
    @Override
    public Optional<FamilyUser> findOne(String username) {
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
        if(familyUser.get().getUserFamilies().isEmpty()) {
            return false;
        }
        else {
            return true;
        }
    }

    @Transactional
    @Override
    public void addingUserToFamily(String familyName) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        Optional<FamilyUser>  familyUserTemp = familyUserRepository.findByEmail(auth.getName());
//        Optional<Family> family = familyRepository.findByName(familyName);
//        family.get().getFamilyMembers().add()
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(s);
        if(familyUser == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new User(familyUser.get().getUsername(), familyUser.get().getPassword(), getAuthority(familyUser.get()));
    }

    private Set<GrantedAuthority> getAuthority(FamilyUser familyUser) {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for(Authority role : familyUser.getAuthorities()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return grantedAuthorities;
    }
}
