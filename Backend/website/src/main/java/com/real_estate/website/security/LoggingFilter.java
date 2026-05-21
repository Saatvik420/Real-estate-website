package com.real_estate.website.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class LoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        System.out.println(">>> REQUEST: " + request.getMethod() + " " + request.getRequestURI());
        System.out.println(">>> ORIGIN: " + request.getHeader("Origin"));
        System.out.println(">>> AUTH: " + request.getHeader("Authorization"));
        
        filterChain.doFilter(request, response);
        
        System.out.println("<<< RESPONSE: " + response.getStatus() + " for " + request.getRequestURI());
    }
}
