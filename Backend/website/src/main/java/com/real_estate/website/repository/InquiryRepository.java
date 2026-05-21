package com.real_estate.website.repository;

import com.real_estate.website.model.Inquiry;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface InquiryRepository extends MongoRepository<Inquiry, String> {
    List<Inquiry> findByEmail(String email);
    List<Inquiry> findByUserId(String userId);
}
