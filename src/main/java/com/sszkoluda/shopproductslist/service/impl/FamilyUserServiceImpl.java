package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Authority;
import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Notification;
import com.sszkoluda.shopproductslist.repository.AuthorityRepository;
import com.sszkoluda.shopproductslist.repository.FamilyRepository;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.repository.NotificationRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FamilyUserServiceImpl implements FamilyUserService {

    private final FamilyRepository familyRepository;

    private final FamilyUserRepository familyUserRepository;

    private final BCryptPasswordEncoder bcryptEncoder;

    private final NotificationRepository notificationRepository;

    private final AuthorityRepository authorityRepository;

    private final SimpMessageSendingOperations messagingTemplate;

    @Autowired
    public FamilyUserServiceImpl(FamilyUserRepository familyUserRepository, BCryptPasswordEncoder bcryptEncoder, FamilyRepository familyRepository, NotificationRepository notificationRepository, AuthorityRepository authorityRepository, SimpMessageSendingOperations messagingTemplate) {
        this.familyUserRepository = familyUserRepository;
        this.bcryptEncoder = bcryptEncoder;
        this.familyRepository = familyRepository;
        this.notificationRepository = notificationRepository;
        this.authorityRepository = authorityRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public Optional<FamilyUser> saveUser(FamilyUser user) {
        Optional<Authority> authority = this.authorityRepository.findByName("ROLE_USER");
        Set<Authority> authorities = new HashSet<>();
        authorities.add(authority.get());
        Optional<FamilyUser> newUser = Optional.of(FamilyUser.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .age(user.getAge())
                .password(bcryptEncoder.encode(user.getPassword()))
                .authorities(authorities)
                .build());

        return newUser.map(familyUserRepository::save);
    }

    @Override
    public Iterable<FamilyUser> listAllUsers() {
        return this.familyUserRepository.findAll();
    }

    @Override
    public Optional<FamilyUser> findOne(String username) {
        return this.familyUserRepository.findByUserName(username);
    }

    @Override
    public Optional<FamilyUser> findById(Integer id) {
        return this.familyUserRepository.findById(id);
    }

    @Override
    public List<FamilyUser> findUsersLikePartOfUsername(String username) {
        return this.familyUserRepository.findUsersLike(username).orElse(Collections.emptyList());
    }

    @Override
    public void deleteUser(Integer id) {
        this.familyUserRepository.deleteById(id);
    }

    @Override
    public Optional<FamilyUser> findUserByEmail(String email) {
        return this.familyUserRepository.findByEmail(email);
    }

    @Override
    public Optional<FamilyUser> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return this.familyUserRepository.findByUserName(auth.getName());
    }

    @Override
    public boolean doesLoadUserHaveAFamily() {
        Optional<FamilyUser> familyUser = getCurrentUser();
        return familyUser.map(fU -> fU.getUserFamilies().isEmpty()).get();
    }

    @Override
    public Optional<Notification> sendInviteToFamily(Integer familyId, String invitedUserName) {
        Optional<FamilyUser> familyUser = getCurrentUser();
        Optional<FamilyUser> invitedUser = familyUserRepository.findByUserName(invitedUserName);
//        System.out.println("Invited User" + invitedUser.get());

        return invitedUser.flatMap(iU -> {
            Family familyFromFamilyUser = familyUser.map(familyUser1 -> familyUser1.getUserFamilies()
                    .stream().filter(family -> family.getFamilyId().equals(familyId)).findFirst().get()).get();
            if (familyFromFamilyUser.getFamilyMembers().stream().noneMatch(familyUser1 -> familyUser1.getUsername().equals(iU.getUsername()))) {
                Notification notification = Notification.builder()
                        .familyUser(iU)
                        .notificationInfo(familyUser.get().getUsername() + " wants to invite you to family: " + familyFromFamilyUser.getFamilyName() + ", ID: " + familyId)
                        .familyUserNameFrom(familyUser.get().getUsername())
                        .familyIdFromFamilyUser(familyId)
                        .familyNameFromFamilyUser(familyFromFamilyUser.getFamilyName()).build();
                if (iU.getNotificationsList().stream()
                        .noneMatch(n -> notification.getNotificationInfo().equals(n.getNotificationInfo()))) {
                    iU.getNotificationsList().add(notification);
                    return Optional.of(this.notificationRepository.save(notification));
//                            messagingTemplate.convertAndSend("/topic/notify",notification);
//                            this.messagingTemplate.convertAndSendToUser(iU.getUsername(), "/queue/notify", notification);
                }
            }
            return Optional.empty();
        });

    }

    @Override
    public void acceptInviteToFamily(Notification notification) {
        Optional<FamilyUser> familyUserFrom = this.familyUserRepository.findByUserName(notification.getFamilyUserNameFrom());
        familyUserFrom.map(fUF -> fUF.getUserFamilies()
                .stream()
                .filter(family -> family.getFamilyId().equals(notification.getFamilyIdFromFamilyUser()))
                .findFirst()).map(family -> {
            FamilyUser familyUserInvited = notification.getFamilyUser();
            familyUserInvited.getUserFamilies().add(family.get());
            family.get().getFamilyMembers().add(familyUserInvited);
            return this.familyUserRepository.save(familyUserInvited);
        });
        this.notificationRepository.delete(notification);
    }

}
