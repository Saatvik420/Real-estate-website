package com.real_estate.website.repository;

import com.real_estate.website.model.City;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CityRepository extends MongoRepository<City, String> {
    List<City> findByStateId(String stateId);
}
