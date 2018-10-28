package com.sszkoluda.shopproductslist.rest;

import com.sszkoluda.shopproductslist.exception.ErrorResponse;
import com.sszkoluda.shopproductslist.exception.FamilyException;
import com.sszkoluda.shopproductslist.model.Family;
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
    public Family getFamilyById(@PathVariable("id") Integer id) {
        return this.familyService.findFamilyById(id).get();
    }

    @PostMapping("/family")
    public ResponseEntity<?> createFamily(@RequestBody Family family) {

        try {
            Optional<Family> savedFamily = this.familyService.saveFamily(family);
            return ResponseEntity.status(HttpStatus.OK).body(savedFamily);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("{}");
        }
    }

    @GetMapping("/checkIfUserHaveFamily")
    public boolean checkIfUserHaveFamily() {
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
