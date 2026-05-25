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
        return ResponseEntity.ok("Auth controller is reachable! [Version: 1.0.4]");
    }

    @GetMapping("/diagnostic/admin-check")
    public ResponseEntity<String> checkAdmin() {
        boolean exists = userRepository.findByEmail("admin@one5realty.com").isPresent();
        long count = userRepository.count();
        return ResponseEntity.ok("Admin exists: " + exists + " | Total users: " + count);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            String email = request.getEmail() != null ? request.getEmail().trim() : null;
            String password = request.getPassword();
            
            System.out.println(">>> [DIAGNOSTIC] LOGIN ATTEMPT START");
            System.out.println(">>> [DIAGNOSTIC] Email: [" + email + "]");
            System.out.println(">>> [DIAGNOSTIC] Password present: " + (password != null && !password.isEmpty()));
            
            if (email == null || password == null) {
                System.err.println(">>> [DIAGNOSTIC] REJECTED: Missing credentials");
                return ResponseEntity.badRequest().body(AuthResponse.builder()
                        .success(false)
                        .message("Email and password are required")
                        .build());
            }

            try {
                System.out.println(">>> [DIAGNOSTIC] Calling authenticationManager.authenticate()...");
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(email, password)
                );
                System.out.println(">>> [DIAGNOSTIC] authenticationManager.authenticate() SUCCESS");
            } catch (org.springframework.security.core.AuthenticationException e) {
                System.err.println(">>> [DIAGNOSTIC] AUTHENTICATION FAILED: " + e.getMessage());
                // Return the specific error message to help debug on deployment
                return ResponseEntity.status(401).body(AuthResponse.builder()
                        .success(false)
                        .message("Authentication failed: " + e.getMessage())
                        .build());
            }

            System.out.println(">>> [DIAGNOSTIC] Loading UserDetails...");
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            
            System.out.println(">>> [DIAGNOSTIC] Fetching user from repository...");
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User record missing after authentication"));
            
            System.out.println(">>> [DIAGNOSTIC] Generating JWT token...");
            String token = jwtUtil.generateToken(userDetails);
            
            System.out.println(">>> [DIAGNOSTIC] LOGIN SUCCESS: " + email + " (Role: " + user.getRole() + ")");
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
