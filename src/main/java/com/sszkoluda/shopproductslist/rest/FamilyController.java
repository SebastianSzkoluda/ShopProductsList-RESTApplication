package com.sszkoluda.shopproductslist.rest;

import com.sszkoluda.shopproductslist.exception.ErrorResponse;
import com.sszkoluda.shopproductslist.exception.FamilyException;
import com.sszkoluda.shopproductslist.model.Family;
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

    private final FamilyService familyService;

    private final FamilyUserService familyUserService;

    @Autowired
    public FamilyController(FamilyService familyService, FamilyUserService familyUserService) {
        this.familyService = familyService;
        this.familyUserService = familyUserService;
    }

    @GetMapping("/family")
    public Set<Family> loggedUserFamilies(){
        return this.familyService.getLoggedUserFamilies();
    }

    @GetMapping("family/{familyName}")
    public Family getFamilyByName(@PathVariable("familyName") String familyName) {
        return this.familyService.findFamilyByName(familyName).get();
    }

    @PostMapping("/family")
    public ResponseEntity<Family> createFamily(@RequestBody Family family){
        return this.familyService.saveFamily(family)
                .map(f -> new ResponseEntity<Family>(HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @GetMapping("/checkIfUserHaveFamily")
    public boolean checkIfUserHaveFamily(){
        return this.familyUserService.doesLoadUserHaveAFamily();
    }

    @ExceptionHandler(FamilyException.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setErrorCode(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
