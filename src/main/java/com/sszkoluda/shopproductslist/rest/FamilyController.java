package com.sszkoluda.shopproductslist.rest;

import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.service.FamilyService;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api")
public class FamilyController {

    final FamilyService familyService;

    final FamilyUserService familyUserService;

    @Autowired
    public FamilyController(FamilyService familyService, FamilyUserService familyUserService) {
        this.familyService = familyService;
        this.familyUserService = familyUserService;
    }

    @GetMapping("/family")
    public Set<Family> loggedUserFamilies(){
        return this.familyService.getLoggedUserFamilies();
    }

    @PostMapping("/family")
    public ResponseEntity<Family> createFamily(@RequestBody Family family){
        this.familyService.saveFamily(family);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/checkIfUserHaveFamily")
    public boolean checkIfUserHaveFamily(){
        if(familyUserService.doesLoadUserHaveAFamily()){
            return true;
        }
        else {
            return false;
        }
    }
}
