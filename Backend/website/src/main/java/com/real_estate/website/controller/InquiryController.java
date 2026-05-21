package com.real_estate.website.controller;

import com.real_estate.website.model.Inquiry;
import com.real_estate.website.model.User;
import com.real_estate.website.repository.InquiryRepository;
import com.real_estate.website.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Inquiry> submitInquiry(@RequestBody Inquiry inquiry, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                inquiry.setUserId(user.getId());
                inquiry.setName(user.getName());
                inquiry.setEmail(user.getEmail());
                inquiry.setPhone(user.getPhone());
            }
        }
        
        inquiry.setCreatedAt(LocalDateTime.now());
        if (inquiry.getStatus() == null) inquiry.setStatus("New");
        
        return ResponseEntity.ok(inquiryRepository.save(inquiry));
    }

    @GetMapping("/me")
    public ResponseEntity<List<Inquiry>> getMyInquiries(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            return ResponseEntity.ok(inquiryRepository.findByEmail(email));
        }
        return ResponseEntity.status(401).build();
    }

    // Admin endpoint: Get all inquiries
    @GetMapping("/admin/all")
    public ResponseEntity<List<Inquiry>> getAllInquiries() {
        return ResponseEntity.ok(inquiryRepository.findAll());
    }

    // Admin endpoint: Appoint a contractor to an inquiry
    @PutMapping("/admin/{inquiryId}/appoint/{contractorId}")
    public ResponseEntity<Inquiry> appointContractor(@PathVariable String inquiryId, @PathVariable String contractorId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId).orElse(null);
        User contractor = userRepository.findById(contractorId).orElse(null);
        
        if (inquiry != null && contractor != null && "CONTRACTOR".equals(contractor.getRole())) {
            inquiry.setAppointedContractorId(contractorId);
            inquiry.setStatus("Contractor_Appointed");
            return ResponseEntity.ok(inquiryRepository.save(inquiry));
        }
        return ResponseEntity.badRequest().build();
    }

    // Admin endpoint: List all contractors
    @GetMapping("/admin/contractors")
    public ResponseEntity<List<User>> getContractors() {
        return ResponseEntity.ok(userRepository.findByRole("CONTRACTOR"));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Inquiry> updateInquiryStatus(@PathVariable String id, @RequestParam String status) {
        Inquiry inquiry = inquiryRepository.findById(id).orElse(null);
        if (inquiry != null) {
            inquiry.setStatus(status);
            return ResponseEntity.ok(inquiryRepository.save(inquiry));
        }
        return ResponseEntity.notFound().build();
    }
}

