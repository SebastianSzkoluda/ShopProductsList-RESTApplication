package com.sszkoluda.shopproductslist.rest;

import com.sszkoluda.shopproductslist.jwt.JwtTokenUtil;
import com.sszkoluda.shopproductslist.model.AuthToken;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.LoginUser;
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
@RequestMapping("/api")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final FamilyUserService familyUserService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, FamilyUserService familyUserService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.familyUserService = familyUserService;
    }

    @RequestMapping(value = "/generate-token", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody LoginUser loginUser) throws AuthenticationException {

        System.out.println("YYYYYY: " + loginUser);
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final Optional<FamilyUser> familyUser = familyUserService.findOne(loginUser.getUsername());
        System.out.println("XXXXX: " + familyUser.get());
        final String token = jwtTokenUtil.generateToken(familyUser.get());
        return ResponseEntity.ok(new AuthToken(token));
    }

    @PostMapping("/register")
    public ResponseEntity<FamilyUser> saveUser(@RequestBody FamilyUser user){
        return this.familyUserService.saveUser(user)
                .map(fU -> new ResponseEntity<FamilyUser>(HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }
}
