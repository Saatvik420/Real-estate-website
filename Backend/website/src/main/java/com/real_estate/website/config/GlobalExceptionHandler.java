package com.real_estate.website.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllExceptions(Exception e) {
        System.err.println("GLOBAL EXCEPTION CAUGHT: " + e.getClass().getName() + " - " + e.getMessage());
        e.printStackTrace();
        
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", "Internal Server Error: " + e.getMessage());
        body.put("type", e.getClass().getSimpleName());
        
        return ResponseEntity.status(500).body(body);
    }
}
