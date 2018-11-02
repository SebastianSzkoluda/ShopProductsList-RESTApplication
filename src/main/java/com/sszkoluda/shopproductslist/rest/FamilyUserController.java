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
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<FamilyUser> getLoggedUser() throws FamilyUserException {
        return this.familyUserService.getCurrentUser()
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new FamilyUserException("Noone is logged"));

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

    @GetMapping("/listSpecifiedUsers")
    public List<FamilyUser> getAllUsersLikePartOfUsername(@RequestParam String username) {
        return familyUserService.findUsersLikePartOfUsername(username);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<FamilyUser> deleteUser(@PathVariable("id") Integer id) {
        this.familyUserService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/sendInviteToFamily")
    public ResponseEntity<?> sendInviteToFamily(@RequestParam("familyId") Integer familyId,
                                                @RequestParam("invitedUserName") String invitedUserName) throws FamilyUserException {
        return this.familyUserService.sendInviteToFamily(familyId, invitedUserName)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new FamilyUserException("Error when creating notification"));
    }
//    @MessageMapping("/sendInviteToFamily/{familyName}/{invitedUserName}")
////    @SendToUser("/queue/notify")
//    public boolean sendInviteToFamily(@DestinationVariable String familyName, @DestinationVariable String invitedUserName, @Payload String username) {
//        System.out.println("XXXXXXXXXXXX: " + familyName + "  " + invitedUserName + "  " + username);
//        return this.familyUserService.sendInviteToFamily(familyName, invitedUserName, username);
//    }

    @PostMapping("/user/acceptInviteToFamily")
    public ResponseEntity<?> acceptInviteToFamily(@RequestBody Notification notification) {
        this.familyUserService.acceptInviteToFamily(notification);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/declineInviteToFamily")
    public ResponseEntity<?> declineInviteToFamily(@RequestBody Notification notification) {
        this.notificationRepository.delete(notification);
        return ResponseEntity.ok().build();
    }
}
