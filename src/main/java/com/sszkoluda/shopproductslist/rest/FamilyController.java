package com.sszkoluda.shopproductslist.rest;

import com.sszkoluda.shopproductslist.exception.ErrorResponse;
import com.sszkoluda.shopproductslist.exception.FamilyException;
import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.Product;
import com.sszkoluda.shopproductslist.repository.FamilyRepository;
import com.sszkoluda.shopproductslist.service.FamilyService;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class FamilyController {

    private final FamilyService familyService;

    private final FamilyUserService familyUserService;

    @Autowired
    public FamilyController(FamilyService familyService, FamilyUserService familyUserService) {
        this.familyService = familyService;
        this.familyUserService = familyUserService;
    }

    @GetMapping("/family")
    public Set<Family> loggedUserFamilies() {
        return this.familyService.getLoggedUserFamilies();
    }

    @GetMapping("family/{id}")
    public Optional<Family> getFamilyById(@PathVariable("id") Integer id) {
        return this.familyService.findFamilyById(id);
    }

    @PostMapping("/family")
    public ResponseEntity<Family> createFamily(@RequestBody Family family) {
        return this.familyService.saveFamily(family)
                .map(f -> new ResponseEntity<>(f,HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @GetMapping("/checkIfUserHaveFamily")
    public boolean checkIfUserHaveFamily() {
        return this.familyUserService.doesLoadUserHaveAFamily();
    }
}
