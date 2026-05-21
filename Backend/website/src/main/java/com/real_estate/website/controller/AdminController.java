package com.real_estate.website.controller;

import com.real_estate.website.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getPlatformMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalGmv", "₹14,200 Cr");
        metrics.put("activeUsers", userRepository.count());
        metrics.put("pendingApprovals", 8);
        metrics.put("conversionRate", "12.4%");
        metrics.put("growth", "+18.5%");
        
        return ResponseEntity.ok(metrics);
    }
    
    @GetMapping("/users")
    public ResponseEntity<Iterable<com.real_estate.website.model.User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
