package com.real_estate.website.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InsightsController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getInsights(
            @RequestParam(required = false, defaultValue = "India") String locationId,
            @RequestParam(defaultValue = "city") String type) {
        
        System.out.println(">>> Insights Request: locationId=" + locationId + ", type=" + type);

        Map<String, Object> response = new HashMap<>();
        response.put("insightsTitle", locationId + " Market Insights");
        response.put("introduction", "Market intelligence report for " + locationId + " is currently being updated.");
        response.put("trend", new ArrayList<>());
        response.put("bars", new ArrayList<>());
        response.put("rentals", new ArrayList<>());
        response.put("devs", new ArrayList<>());
        response.put("sections", new ArrayList<>());
        
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> createBar(String loc, String val, String pct) {
        Map<String, Object> bar = new HashMap<>();
        bar.put("loc", loc);
        bar.put("val", val);
        bar.put("pct", pct);
        return bar;
    }

    private Map<String, Object> createRental(String lbl, String yield, String w) {
        Map<String, Object> rental = new HashMap<>();
        rental.put("lbl", lbl);
        rental.put("yield", yield);
        rental.put("w", w);
        return rental;
    }

    private Map<String, Object> createDev(String name, String type, String num, String exp, String sold, String rera) {
        Map<String, Object> dev = new HashMap<>();
        dev.put("name", name);
        dev.put("type", type);
        dev.put("num", num);
        dev.put("exp", exp);
        dev.put("sold", sold);
        dev.put("rera", rera);
        dev.put("logo", name.substring(0, 1));
        dev.put("proj", Arrays.asList("Project A", "Project B"));
        return dev;
    }
}
