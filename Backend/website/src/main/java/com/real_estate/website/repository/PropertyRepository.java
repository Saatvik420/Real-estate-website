package com.real_estate.website.repository;

import com.real_estate.website.model.Property;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PropertyRepository extends MongoRepository<Property, String> {
    List<Property> findByListingType(String listingType);
    List<Property> findByCityId(String cityId);
}
