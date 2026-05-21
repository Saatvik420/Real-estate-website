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
@Document(collection = "properties")
public class Property {
    @Id
    private String id;
    private String cityId;
    private String type;
    private String title;
    private Long price;
    private String priceStr;
    private String area;
    private String location;
    private String developer;
    private String status;
    private List<String> tags;
    private String img;
    private String rera;
    private String agentId;
    private String listingType; // Sale, Rent
}
