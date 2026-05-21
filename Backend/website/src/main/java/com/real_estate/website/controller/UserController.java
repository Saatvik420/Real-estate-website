package com.real_estate.website.controller;

import com.real_estate.website.model.User;
import com.real_estate.website.repository.UserRepository;
import com.real_estate.website.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<User> getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody User updatedUser, Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setPhone(updatedUser.getPhone());
                    
                    // Sync location/address
                    if (updatedUser.getLocation() != null) user.setLocation(updatedUser.getLocation());
                    if (updatedUser.getAddress() != null) user.setAddress(updatedUser.getAddress());
                    if (user.getLocation() != null && user.getAddress() == null) user.setAddress(user.getLocation());
                    if (user.getAddress() != null && user.getLocation() == null) user.setLocation(user.getAddress());

                    // Sync personalBio/bio
                    if (updatedUser.getPersonalBio() != null) user.setPersonalBio(updatedUser.getPersonalBio());
                    if (updatedUser.getBio() != null) user.setBio(updatedUser.getBio());
                    if (user.getPersonalBio() != null && user.getBio() == null) user.setBio(user.getPersonalBio());
                    if (user.getBio() != null && user.getPersonalBio() == null) user.setPersonalBio(user.getBio());

                    // Sync expertise/specialty
                    if (updatedUser.getExpertise() != null) user.setExpertise(updatedUser.getExpertise());
                    if (updatedUser.getSpecialty() != null) user.setSpecialty(updatedUser.getSpecialty());
                    if (user.getExpertise() != null && user.getSpecialty() == null) user.setSpecialty(user.getExpertise());
                    if (user.getSpecialty() != null && user.getExpertise() == null) user.setExpertise(user.getSpecialty());

                    // Do not allow changing email/role/password here for security
                    User saved = userRepository.save(user);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
