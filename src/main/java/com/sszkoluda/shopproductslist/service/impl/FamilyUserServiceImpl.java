package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Authority;
import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Notification;
import com.sszkoluda.shopproductslist.repository.FamilyRepository;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.repository.NotificationRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service(value = "userService")
public class FamilyUserServiceImpl implements FamilyUserService, UserDetailsService {

    private final FamilyRepository familyRepository;

    private final FamilyUserRepository familyUserRepository;

    private final BCryptPasswordEncoder bcryptEncoder;

    private final NotificationRepository notificationRepository;

    @Autowired
    public FamilyUserServiceImpl(FamilyUserRepository familyUserRepository, BCryptPasswordEncoder bcryptEncoder, FamilyRepository familyRepository, NotificationRepository notificationRepository) {
        this.familyUserRepository = familyUserRepository;
        this.bcryptEncoder = bcryptEncoder;
        this.familyRepository = familyRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Optional<FamilyUser> saveUser(FamilyUser user) {
        Set<Authority> authorities = new HashSet<>();
        authorities.add(new Authority("user"));
        Optional<FamilyUser> newUser = Optional.of(FamilyUser.builder()
                .username(user.getUsername())
                .email(user.getEmail())
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
    public Optional<FamilyUser> findUserByEmail(String email) {
        return this.familyUserRepository.findByEmail(email);
    }

    @Override
    public boolean doesLoadUserHaveAFamily() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
        return familyUser.map(fU -> fU.getUserFamilies().isEmpty()).get();
    }

    @Override
    public boolean sendInviteToFamily(String familyName, String invitedUserName) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
        Optional<FamilyUser> invitedUser = familyUserRepository.findByUserName(invitedUserName);
        return invitedUser
                .map(iU -> {
                    Family familyFromFamilyUser = familyUser.map(familyUser1 -> familyUser1.getUserFamilies()
                            .stream().filter(family -> family.getFamilyName().equals(familyName)).findFirst().get()).get();
                    if (familyFromFamilyUser.getFamilyMembers().stream().noneMatch(familyUser1 -> familyUser1.getUsername().equals(iU.getUsername()))) {
                        Notification notification = Notification.builder()
                                .familyUser(iU)
                                .notificationInfo(familyUser.get().getUsername() + " wants to invite you to family: " + familyName)
                                .familyUserNameFrom(familyUser.get().getUsername())
                                .familyIdFromFamilyUser(familyFromFamilyUser.getFamilyId())
                                .familyNameFromFamilyUser(familyName).build();
                        if (iU.getNotificationsList().stream()
                                .noneMatch(n -> notification.getNotificationInfo().equals(n.getNotificationInfo()))) {
                            iU.getNotificationsList().add(notification);
                            this.notificationRepository.save(notification);
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }).get();
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

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(s);
        if (familyUser == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new User(familyUser.get().getUsername(), familyUser.get().getPassword(), getAuthority(familyUser.get()));
    }

    private Set<GrantedAuthority> getAuthority(FamilyUser familyUser) {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for (Authority role : familyUser.getAuthorities()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return grantedAuthorities;
    }
}
