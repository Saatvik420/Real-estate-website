package com.real_estate.website.controller;

import com.real_estate.website.dto.AuthResponse;
import com.real_estate.website.dto.LoginRequest;
import com.real_estate.website.model.User;
import com.real_estate.website.repository.UserRepository;
import com.real_estate.website.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth controller is reachable!");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            System.out.println(">>> LOGIN ATTEMPT: Email=" + request.getEmail());
            
            if (request.getEmail() == null || request.getPassword() == null) {
                return ResponseEntity.badRequest().body(AuthResponse.builder()
                        .success(false)
                        .message("Email and password are required")
                        .build());
            }

            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
                );
            } catch (org.springframework.security.core.AuthenticationException e) {
                System.err.println(">>> AUTHENTICATION FAILED: " + e.getMessage());
                return ResponseEntity.status(401).body(AuthResponse.builder()
                        .success(false)
                        .message("Invalid email or password")
                        .build());
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User record missing after authentication"));
            
            String token = jwtUtil.generateToken(userDetails);
            
            System.out.println(">>> LOGIN SUCCESS: " + request.getEmail() + " (Role: " + user.getRole() + ")");
            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token)
                    .user(user)
                    .success(true)
                    .build());
        } catch (Exception e) {
            System.err.println(">>> LOGIN CRITICAL ERROR: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(AuthResponse.builder()
                    .success(false)
                    .message("Internal Server Error during login: " + e.getMessage())
                    .build());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {
        try {
            System.out.println("Register attempt for email: " + user.getEmail() + " with role: " + user.getRole());
            
            if (user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body(AuthResponse.builder()
                        .success(false)
                        .message("Email and password are required")
                        .build());
            }

            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                System.out.println("Registration failed: Email already exists");
                return ResponseEntity.badRequest().body(AuthResponse.builder()
                        .success(false)
                        .message("Email already registered")
                        .build());
            }

            // Secure the password
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            
            // Set default role if not provided
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("USER");
            }
            
            // Set active by default
            user.setActive(true);

            User savedUser = userRepository.save(user);
            System.out.println("User registered successfully with ID: " + savedUser.getId());

            // Create UserDetails directly from the saved user to avoid a redundant DB query
            // and potential eventual consistency issues in MongoDB
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                    savedUser.getEmail(),
                    savedUser.getPassword(),
                    java.util.Collections.singletonList(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + savedUser.getRole()))
            );
            
            String token = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token)
                    .user(savedUser)
                    .success(true)
                    .build());
        } catch (Exception e) {
            System.err.println("Registration failed for " + user.getEmail() + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(AuthResponse.builder()
                    .success(false)
                    .message("Internal Server Error: " + e.getMessage())
                    .build());
        }
    }
}
