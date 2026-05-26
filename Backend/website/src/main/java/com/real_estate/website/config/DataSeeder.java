package com.real_estate.website.config;

import com.real_estate.website.model.*;
import com.real_estate.website.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final StateRepository stateRepository;
    private final CityRepository cityRepository;
    private final AgentRepository agentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        System.out.println("DEBUG: DataSeeder execution started...");
        try {
            System.out.println("--- DATA SEEDING STARTED ---");
            
            String adminEmail = "one5realtysolutions@gmail.com";
            String adminPass = "admin123";

            // Clean up any existing admin to ensure fresh credentials
            List<User> existingAdmins = userRepository.findAll().stream()
                    .filter(u -> adminEmail.equalsIgnoreCase(u.getEmail()))
                    .toList();
            
            if (!existingAdmins.isEmpty()) {
                System.out.println("Found " + existingAdmins.size() + " existing admin(s). Deleting for fresh start...");
                userRepository.deleteAll(existingAdmins);
            }

            System.out.println("Creating fresh Admin user: " + adminEmail);
            User admin = User.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPass))
                    .name("System Admin")
                    .role("ADMIN")
                    .active(true)
                    .build();
            userRepository.save(admin);
            System.out.println("Admin user successfully seeded.");

            if (userRepository.count() <= 1) {
                seedOtherUsers();
            }
            if (agentRepository.count() == 0) {
                seedAgents();
            }
            if (stateRepository.count() == 0) {
                seedLocations();
            }
            if (propertyRepository.count() == 0) {
                seedProperties();
            }
            System.out.println("--- DATA SEEDING COMPLETED ---");
        } catch (Exception e) {
            System.err.println("--- DATA SEEDING FAILED: " + e.getMessage() + " ---");
            e.printStackTrace();
        }
    }

    private void seedOtherUsers() {
        System.out.println("Seeding other users...");
        if (userRepository.findByEmail("user@example.com").isEmpty()) {
            User user = User.builder()
                    .email("user@example.com")
                    .password(passwordEncoder.encode("user123"))
                    .name("John Doe")
                    .role("USER")
                    .active(true)
                    .build();
            userRepository.save(user);
        }

        if (userRepository.findByEmail("contractor1@example.com").isEmpty()) {
            User contractor1 = User.builder()
                    .email("contractor1@example.com")
                    .password(passwordEncoder.encode("password"))
                    .name("Amit Sharma")
                    .role("CONTRACTOR")
                    .specialty("Interior Design")
                    .active(true)
                    .build();
            userRepository.save(contractor1);
        }

        if (userRepository.findByEmail("contractor2@example.com").isEmpty()) {
            User contractor2 = User.builder()
                    .email("contractor2@example.com")
                    .password(passwordEncoder.encode("password"))
                    .name("Vikram Singh")
                    .role("CONTRACTOR")
                    .specialty("Civil Construction")
                    .active(true)
                    .build();
            userRepository.save(contractor2);
        }
    }

    private void seedAgents() {
        List<Agent> agents = Arrays.asList(
                Agent.builder()
                        .id("agent_1")
                        .name("Rajesh Khanna")
                        .company("Luxury Living Realty")
                        .designation("Senior Luxury Consultant")
                        .location("Mumbai, Maharashtra")
                        .areas(Arrays.asList("Lower Parel", "Worli", "Marine Drive", "Bandra West"))
                        .contact("+91 99109 11650")
                        .email("one5realtysolutions@gmail.com")
                        .rating(4.9)
                        .experience("15+ Years")
                        .completedDeals("500+")
                        .img("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80")
                        .personalBio("Specializing in ultra-luxury high-rise apartments and sea-facing penthouses in South Mumbai.")
                        .specialization("High-Net-Worth Individuals (HNWI) Portfolios")
                        .build(),
                Agent.builder()
                        .id("agent_2")
                        .name("Anita Desai")
                        .company("Capital City Homes")
                        .designation("Residential Specialist")
                        .location("Delhi NCR")
                        .areas(Arrays.asList("Dwarka", "Sector 10", "Prithviraj Road", "Gurugram"))
                        .contact("+91 99109 11650")
                        .email("one5realtysolutions@gmail.com")
                        .rating(4.8)
                        .experience("10+ Years")
                        .completedDeals("350+")
                        .img("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80")
                        .personalBio("Expert in urban residential market with a focus on family-centric gated communities.")
                        .specialization("Premium Family Residences")
                        .build()
        );
        agentRepository.saveAll(agents);
    }

    private void seedLocations() {
        List<State> states = Arrays.asList(
                new State("st_rj", "Rajasthan"),
                new State("st_up", "U.P."),
                new State("st_ut", "Uttarakhand")
        );
        stateRepository.saveAll(states);

        List<City> cities = Arrays.asList(
                // Rajasthan
                new City("khatu_shyam", "st_rj", "Khatu Shyam"),
                new City("paota", "st_rj", "Paota"),
                new City("behror", "st_rj", "Behror"),
                new City("neemrana", "st_rj", "Neemrana"),
                new City("jaipur", "st_rj", "Jaipur"),
                new City("ajmer_road", "st_rj", "Ajmer Road"),
                
                // U.P.
                new City("noida", "st_up", "Noida"),
                new City("greater_noida", "st_up", "Greater Noida"),
                new City("vrindavan", "st_up", "Vrindavan"),
                new City("ayodhya", "st_up", "Ayodhya"),
                
                // Uttarakhand
                new City("dehradun", "st_ut", "Dehradun"),
                new City("haridwar", "st_ut", "Haridwar")
        );
        cityRepository.saveAll(cities);
    }

    private void seedProperties() {
        List<Property> properties = Arrays.asList(
                // --- RAJASTHAN PROPERTIES ---
                Property.builder()
                        .id("rj_p1")
                        .cityId("jaipur")
                        .type("Independent Villa")
                        .title("The Royal Heritage Estate")
                        .price(85000000L)
                        .priceStr("₹8.5 Cr")
                        .area("6500 sqft")
                        .location("C-Scheme, Jaipur")
                        .developer("Jaipur Jewels")
                        .status("Ready to Move")
                        .tags(Arrays.asList("Heritage", "Private Pool", "5 BHK"))
                        .img("https://images.pexels.com/photos/28426012/pexels-photo-28426012.jpeg")
                        .rera("RJ/RERA/2023/101")
                        .agentId("agent_1")
                        .listingType("Sale")
                        .build(),
                Property.builder()
                        .id("rj_p2")
                        .cityId("khatu_shyam")
                        .type("Premium Plot")
                        .title("Shyam Dham Residency")
                        .price(4500000L)
                        .priceStr("₹45 L")
                        .area("200 sq yards")
                        .location("Near Temple, Khatu")
                        .developer("Divine Developers")
                        .status("New Launch")
                        .tags(Arrays.asList("Temple View", "Vastu Compliant"))
                        .img("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80")
                        .rera("RJ/RERA/2024/045")
                        .agentId("agent_2")
                        .listingType("Plots / Land")
                        .build(),
                Property.builder()
                        .id("rj_p3")
                        .cityId("neemrana")
                        .type("Commercial Plot")
                        .title("Japanese Zone Hub")
                        .price(12000000L)
                        .priceStr("₹1.2 Cr")
                        .area("500 sq yards")
                        .location("RIICO Industrial Area")
                        .developer("Global Infra")
                        .status("Verified")
                        .tags(Arrays.asList("Industrial", "Strategic Location"))
                        .img("https://images.pexels.com/photos/33797765/pexels-photo-33797765.jpeg")
                        .agentId("agent_1")
                        .listingType("Plots / Land")
                        .build(),

                // --- U.P. PROPERTIES ---
                Property.builder()
                        .id("up_p1")
                        .cityId("noida")
                        .type("Luxury Apartment")
                        .title("The Grand Pavilion")
                        .price(32000000L)
                        .priceStr("₹3.2 Cr")
                        .area("2800 sqft")
                        .location("Sector 150, Noida")
                        .developer("Ace Group")
                        .status("Under Construction")
                        .tags(Arrays.asList("Golf Facing", "4 BHK", "Modern Amenities"))
                        .img("https://images.pexels.com/photos/25466317/pexels-photo-25466317.jpeg")
                        .rera("UP/RERA/2022/882")
                        .agentId("agent_2")
                        .listingType("Sale")
                        .build(),
                Property.builder()
                        .id("up_p2")
                        .cityId("vrindavan")
                        .type("Luxury Villa")
                        .title("Krishna Kunj Estate")
                        .price(18000000L)
                        .priceStr("₹1.8 Cr")
                        .area("2200 sqft")
                        .location("Chaitanya Vihar")
                        .developer("Bhakti Homes")
                        .status("Ready to Move")
                        .tags(Arrays.asList("Spiritual", "Gated Community", "3 BHK"))
                        .img("https://images.pexels.com/photos/29651458/pexels-photo-29651458.jpeg")
                        .rera("UP/RERA/2021/443")
                        .agentId("agent_1")
                        .listingType("Sale")
                        .build(),
                Property.builder()
                        .id("up_p3")
                        .cityId("ayodhya")
                        .type("Premium Apartment")
                        .title("Ram Janmabhoomi Heights")
                        .price(25000000L)
                        .priceStr("₹2.5 Cr")
                        .area("1800 sqft")
                        .location("Civil Lines, Ayodhya")
                        .developer("Saryu Developers")
                        .status("New Launch")
                        .tags(Arrays.asList("Prime Location", "Luxury Finishes"))
                        .img("https://images.pexels.com/photos/12058309/pexels-photo-12058309.jpeg")
                        .agentId("agent_2")
                        .listingType("Sale")
                        .build(),

                // --- UTTARAKHAND PROPERTIES ---
                Property.builder()
                        .id("ut_p1")
                        .cityId("dehradun")
                        .type("Penthouse")
                        .title("Mussoorie View Heights")
                        .price(45000000L)
                        .priceStr("₹4.5 Cr")
                        .area("4200 sqft")
                        .location("Rajpur Road")
                        .developer("Himalayan Retreats")
                        .status("Ready to Move")
                        .tags(Arrays.asList("Hill View", "Private Terrace", "4 BHK"))
                        .img("https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&q=80")
                        .rera("UT/RERA/2023/012")
                        .agentId("agent_1")
                        .listingType("Sale")
                        .build(),
                Property.builder()
                        .id("ut_p2")
                        .cityId("haridwar")
                        .type("Luxury Suite")
                        .title("Ganga Kinare Residency")
                        .price(15000000L)
                        .priceStr("₹1.5 Cr")
                        .area("1500 sqft")
                        .location("Har ki Pauri Road")
                        .developer("Holy Sands")
                        .status("Ready to Move")
                        .tags(Arrays.asList("River View", "Holy Location"))
                        .img("https://images.pexels.com/photos/27418789/pexels-photo-27418789.jpeg")
                        .agentId("agent_2")
                        .listingType("Sale")
                        .build()
        );
        propertyRepository.saveAll(properties);
    }
}


