package com.sszkoluda.shopproductslist.rest;

import com.sszkoluda.shopproductslist.jwt.JwtTokenUtil;
import com.sszkoluda.shopproductslist.model.AuthToken;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.LoginUser;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final FamilyUserService familyUserService;

    private final FamilyUserRepository familyUserRepository;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, FamilyUserService familyUserService, FamilyUserRepository familyUserRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.familyUserService = familyUserService;
        this.familyUserRepository = familyUserRepository;
    }

    @PostMapping("/generateToken")
    public ResponseEntity<?> login(@RequestBody LoginUser loginUser) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final Optional<FamilyUser> familyUser = familyUserService.findOne(loginUser.getUsername());
        final String token = jwtTokenUtil.generateToken(familyUser.get());
        return ResponseEntity.ok(new AuthToken(token));
    }

    @PostMapping("/renewToken")
    public ResponseEntity<?> renewToken(@RequestBody String username) throws AuthenticationException {
        Optional<FamilyUser> familyUserToRenew = familyUserRepository.findByUserName(username);
        final String token = jwtTokenUtil.generateToken(familyUserToRenew.get());
        return ResponseEntity.ok(new AuthToken(token));
    }

    @PostMapping("/register")
    public ResponseEntity<FamilyUser> saveUser(@RequestBody FamilyUser user) {
        return this.familyUserService.saveUser(user)
                .map(fU -> new ResponseEntity<FamilyUser>(HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }
}
