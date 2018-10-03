package com.sszkoluda.shopproductslist.rest;


import com.sszkoluda.shopproductslist.exception.ErrorResponse;
import com.sszkoluda.shopproductslist.exception.FamilyUserException;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Notification;
import com.sszkoluda.shopproductslist.repository.NotificationRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class FamilyUserController {

    private final FamilyUserService familyUserService;

    private final NotificationRepository notificationRepository;

    @Autowired
    public FamilyUserController(FamilyUserService familyUserService, NotificationRepository notificationRepository) {
        this.familyUserService = familyUserService;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/user")
    public ResponseEntity<FamilyUser> getUser(@RequestParam String email) throws FamilyUserException {
        return this.familyUserService.findUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new FamilyUserException("User with email: " + email + " not found"));

    }

    @GetMapping("/user/{id}")
    public ResponseEntity<FamilyUser> getUserById(@PathVariable Integer id) throws FamilyUserException {
        return this.familyUserService.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new FamilyUserException("User with id: " + id + " not found"));

    }

    @GetMapping("/listAllUsers")
    public Iterable<FamilyUser> getAllUsers() {
        return familyUserService.listAllUsers();
    }

    @GetMapping("/user/sendInviteToFamily")
    public boolean sendInviteToFamily(@RequestParam("familyName") String familyName, @RequestParam("invitedUserName") String invitedUserName) {
        return this.familyUserService.addingUserToFamilyNotificationStep(familyName, invitedUserName);
    }

    @PostMapping("/user/acceptInviteToFamily")
    public ResponseEntity<?> acceptInviteToFamily(@RequestBody Notification notification) {
        this.familyUserService.addingUserToFamilyAcceptStep(notification);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/declineInviteToFamily")
    public ResponseEntity<?> declineInviteToFamily(@RequestBody Notification notification) {
        this.notificationRepository.delete(notification);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(FamilyUserException.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception ex) {
        ErrorResponse error = new ErrorResponse();
        error.setErrorCode(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
