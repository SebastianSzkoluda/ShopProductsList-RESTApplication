package com.sszkoluda.shopproductslist.rest;


import com.sszkoluda.shopproductslist.exception.ErrorResponse;
import com.sszkoluda.shopproductslist.exception.FamilyUserException;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FamilyUserController {

    final
    FamilyUserService familyUserService;

    @Autowired
    public FamilyUserController(FamilyUserService familyUserService) {
        this.familyUserService = familyUserService;
    }

    @GetMapping("/user")
    public ResponseEntity<FamilyUser> getUser(@RequestParam(value = "email",required = true) String email) throws FamilyUserException {

        return this.familyUserService.findUserByEmail(email)
                .map(familyUser -> ResponseEntity.ok(familyUser))
                .orElseThrow(() -> new FamilyUserException("User with email: " + email + " not found"));

    }

    @GetMapping("/listAllUsers")
    public Iterable<FamilyUser> getAllUsers(){

        return familyUserService.listAllUsers();
    }

    @ExceptionHandler(FamilyUserException.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setErrorCode(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        return new ResponseEntity<ErrorResponse>(error, HttpStatus.NOT_FOUND);
    }
}
