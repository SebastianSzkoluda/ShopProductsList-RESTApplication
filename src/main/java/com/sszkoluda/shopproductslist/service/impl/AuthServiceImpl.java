package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Authority;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service(value = "userService")
public class AuthServiceImpl implements AuthService, UserDetailsService {

    private final FamilyUserRepository familyUserRepository;

    @Autowired
    public AuthServiceImpl(FamilyUserRepository familyUserRepository) {
        this.familyUserRepository = familyUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(s);
        if (familyUser == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new User(familyUser.get().getUsername(), familyUser.get().getPassword(), getAuthority(familyUser.get()));
    }

    private Set<GrantedAuthority> getAuthority(FamilyUser familyUser) {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for (Authority role : familyUser.getAuthorities()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return grantedAuthorities;
    }
}
