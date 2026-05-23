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
        response.put("insightsTitle", locationId);
        response.put("trend", Arrays.asList(20, 35, 45, 70, 95));
        
        List<Map<String, Object>> bars = new ArrayList<>();
        bars.add(createBar("Elite Sector 1", "₹18,500", "85%"));
        bars.add(createBar("Premium Heights", "₹15,200", "70%"));
        bars.add(createBar("Luxury Enclave", "₹22,000", "95%"));
        response.put("bars", bars);

        List<Map<String, Object>> rentals = new ArrayList<>();
        rentals.add(createRental("Studio", "4.2%", "40%"));
        rentals.add(createRental("2 BHK", "3.8%", "60%"));
        rentals.add(createRental("3 BHK", "4.5%", "80%"));
        rentals.add(createRental("Penthouse", "5.1%", "100%"));
        response.put("rentals", rentals);

        List<Map<String, Object>> devs = new ArrayList<>();
        devs.add(createDev("Lodha Group", "Premium", "42", "25", "5000+", "L/101"));
        devs.add(createDev("Prestige", "Luxury", "35", "30", "4000+", "P/202"));
        response.put("devs", devs);
        
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
