package com.sszkoluda.shopproductslist.rest;


import com.sszkoluda.shopproductslist.exception.ErrorResponse;
import com.sszkoluda.shopproductslist.exception.FamilyUserException;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class FamilyUserController {

    final FamilyUserService familyUserService;

    @Autowired
    public FamilyUserController(FamilyUserService familyUserService) {
        this.familyUserService = familyUserService;
    }

    @PostMapping("/signup")
    public FamilyUser saveUser(@RequestBody FamilyUser user){
        return familyUserService.saveUser(user);
    }

    @GetMapping("/user")
    public ResponseEntity<FamilyUser> getUser(@RequestParam String email) throws FamilyUserException {

        return this.familyUserService.findUserByEmail(email)
                .map(familyUser -> ResponseEntity.ok(familyUser))
                .orElseThrow(() -> new FamilyUserException("User with email: " + email + " not found"));

    }

    @GetMapping("/user/{id}")
    public ResponseEntity<FamilyUser> getUserById(@PathVariable Integer id) throws FamilyUserException {

        return this.familyUserService.findById(id)
                .map(familyUser -> ResponseEntity.ok(familyUser))
                .orElseThrow(() -> new FamilyUserException("User with id: " + id + " not found"));

    }

    @GetMapping("/listAllUsers")
    public Iterable<FamilyUser> getAllUsers() {

        return familyUserService.listAllUsers();
    }

    @ExceptionHandler(FamilyUserException.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setErrorCode(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
