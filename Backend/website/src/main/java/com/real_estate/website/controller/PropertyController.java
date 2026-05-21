package com.real_estate.website.controller;

import com.real_estate.website.model.Property;
import com.real_estate.website.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyRepository propertyRepository;

    @GetMapping
    public List<Property> getProperties(
            @RequestParam(required = false) String listingType,
            @RequestParam(required = false) String cityId,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status
    ) {
        Property probe = new Property();
        
        if (listingType != null && !listingType.isEmpty()) {
            probe.setListingType(listingType);
        }
        
        if (cityId != null && !cityId.isEmpty() && !cityId.equalsIgnoreCase("India")) {
            probe.setCityId(cityId);
        }
        
        if (type != null && !type.isEmpty() && !type.equalsIgnoreCase("Any Type")) {
            probe.setType(type);
        }
        
        if (status != null && !status.isEmpty() && !status.equalsIgnoreCase("Any Status")) {
            probe.setStatus(status);
        }

        ExampleMatcher matcher = ExampleMatcher.matchingAll()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.EXACT);
        
        Example<Property> example = Example.of(probe, matcher);
        return propertyRepository.findAll(example);
    }

    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable String id) {
        return propertyRepository.findById(id).orElse(null);
    }
}
