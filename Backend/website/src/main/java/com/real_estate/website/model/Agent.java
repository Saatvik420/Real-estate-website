package com.real_estate.website.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "agents")
public class Agent {
    @Id
    private String id;
    private String name;
    private String company;
    private String designation;
    private String location;
    private List<String> areas;
    private String workingHours;
    private String workingDays;
    private String contact;
    private String email;
    private Double rating;
    private String experience;
    private String completedDeals;
    private String img;
    private String personalBio;
    private String specialization;
}
