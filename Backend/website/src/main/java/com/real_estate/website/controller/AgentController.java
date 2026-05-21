package com.real_estate.website.controller;

import com.real_estate.website.model.Agent;
import com.real_estate.website.repository.AgentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = {"http://localhost:*", "http://127.0.0.1:*"})
public class AgentController {

    private final AgentRepository agentRepository;

    @GetMapping
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Agent getAgentById(@PathVariable String id) {
        return agentRepository.findById(id).orElse(null);
    }
}
