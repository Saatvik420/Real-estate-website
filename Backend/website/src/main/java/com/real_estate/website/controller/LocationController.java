package com.real_estate.website.controller;

import com.real_estate.website.model.City;
import com.real_estate.website.model.State;
import com.real_estate.website.repository.CityRepository;
import com.real_estate.website.repository.StateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LocationController {

    private final StateRepository stateRepository;
    private final CityRepository cityRepository;

    @GetMapping("/states")
    public List<State> getStates() {
        return stateRepository.findAll();
    }

    @GetMapping("/cities")
    public List<City> getCities(@RequestParam(required = false) String stateId) {
        if (stateId != null && !stateId.isEmpty()) {
            return cityRepository.findByStateId(stateId);
        }
        return cityRepository.findAll();
    }
}
