package com.real_estate.website.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String role; // ADMIN, USER, PARTNER, CONTRACTOR
    private String name;
    private String phone;
    private String address; // Kept for DB
    private String location; // Matches frontend
    private String bio; // Kept for DB
    private String personalBio; // Matches frontend
    private String specialty; // Kept for DB
    private String expertise; // Matches frontend
    private String experience; // Matches frontend
    @Builder.Default
    private Boolean active = true;
}
