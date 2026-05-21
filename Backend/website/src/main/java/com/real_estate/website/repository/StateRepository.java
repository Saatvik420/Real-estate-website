package com.real_estate.website.repository;

import com.real_estate.website.model.State;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StateRepository extends MongoRepository<State, String> {
}
