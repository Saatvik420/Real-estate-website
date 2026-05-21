package com.real_estate.website.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "inquiries")
public class Inquiry {
    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private String propertyId;
    private String userId; // Link to registered user
    private String appointedContractorId; // Link to the contractor admin appoints
    private String status; // New, Contacted, Closed, Contractor_Appointed
    private LocalDateTime createdAt;
}
