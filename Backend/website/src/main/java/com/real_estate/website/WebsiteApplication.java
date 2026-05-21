package com.real_estate.website;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebsiteApplication.class, args);
	}

	@Bean
	public CommandLineRunner dbTest(org.springframework.data.mongodb.core.MongoTemplate mongoTemplate) {
		return args -> {
			try {
				System.out.println("--- TESTING MONGODB CONNECTION ---");
				mongoTemplate.getDb().listCollectionNames().first();
				System.out.println("--- MONGODB CONNECTION SUCCESSFUL ---");
			} catch (Exception e) {
				System.err.println("--- MONGODB CONNECTION FAILED: " + e.getMessage() + " ---");
			}
		};
	}

}
