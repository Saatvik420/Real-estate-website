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
                new State("st_dl", "Delhi"),
                new State("st_rj", "Rajasthan"),
                new State("st_up", "Uttar Pradesh"),
                new State("st_ut", "Uttarakhand")
        );
        stateRepository.saveAll(states);

        List<City> cities = Arrays.asList(
                // Delhi
                new City("janakpuri", "st_dl", "Janakpuri"),
                new City("dwarka", "st_dl", "Dwarka"),

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
                Property.builder()
                        .id("mh_p1")
                        .cityId("mumbai")
                        .type("Luxury Apartment")
                        .title("Lodha World One")
                        .price(240000000L)
                        .priceStr("₹24 Cr+")
                        .area("5200 sqft")
                        .location("Lower Parel")
                        .developer("Lodha Group")
                        .status("Ready to Move")
                        .tags(Arrays.asList("5+ BHK", "Sea View"))
                        .img("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80")
                        .rera("MH/RERA/2018/11")
                        .agentId("agent_1")
                        .listingType("Sale")
                        .build(),
                Property.builder()
                        .id("ka_p1")
                        .cityId("bengaluru")
                        .type("Luxury Apartment")
                        .title("Prestige Kingfisher Towers")
                        .price(350000000L)
                        .priceStr("₹35 Cr")
                        .area("8000 sqft")
                        .location("Lavelle Road")
                        .developer("Prestige Group")
                        .status("Ready to Move")
                        .tags(Arrays.asList("Penthouse", "City View", "5+ BHK"))
                        .img("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80")
                        .rera("KA/RERA/2017/05")
                        .agentId("agent_4")
                        .listingType("Sale")
                        .build(),
                Property.builder()
                        .id("hr_p1")
                        .cityId("gurugram")
                        .type("Luxury Condominium")
                        .title("M3M Golf Estate")
                        .price(65000000L)
                        .priceStr("₹6.5 Cr")
                        .area("3800 sqft")
                        .location("Golf Course Road")
                        .developer("M3M India")
                        .status("Ready to Move")
                        .tags(Arrays.asList("Golf View", "4 BHK"))
                        .img("https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80")
                        .rera("HR/RERA/2017/22")
                        .agentId("agent_3")
                        .listingType("Sale")
                        .build(),
                Property.builder()
                        .id("dl_p1")
                        .cityId("delhi")
                        .type("Penthouse")
                        .title("Lutyens Skyline")
                        .price(250000000L)
                        .priceStr("₹25 Cr")
                        .area("5500 sqft")
                        .location("Prithviraj Road")
                        .developer("Capital Dev")
                        .status("Ready to Move")
                        .tags(Arrays.asList("Ultra Luxury", "Prime Location", "5+ BHK"))
                        .img("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80")
                        .rera("DL/RERA/2019/08")
                        .agentId("agent_2")
                        .listingType("Sale")
                        .build(),
                // Rentals
                Property.builder()
                        .id("rent_mh_1")
                        .cityId("mumbai")
                        .type("Ultra Luxury Suite")
                        .title("SoBo Marine Drive Rent")
                        .price(280000L)
                        .priceStr("₹2.8 L / mo")
                        .area("3500 sqft")
                        .location("Marine Drive")
                        .developer("Lodha Group")
                        .status("Ready to Move")
                        .tags(Arrays.asList("Sea View", "5+ BHK"))
                        .img("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80")
                        .agentId("agent_1")
                        .listingType("Rent")
                        .build(),
                // Plots
                Property.builder()
                        .id("plot_mh_1")
                        .cityId("mumbai")
                        .type("Residential Plot")
                        .title("Residential Plot near Karjat")
                        .price(8500000L)
                        .priceStr("₹85 L")
                        .area("2500 sqft")
                        .location("Karjat")
                        .developer("Exotic Greens")
                        .status("Verified")
                        .tags(Arrays.asList("Corner Plot", "Gated Community"))
                        .img("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80")
                        .rera("MH/KAR/2023/102")
                        .agentId("agent_1")
                        .listingType("Sale")
                        .build()
        );
        propertyRepository.saveAll(properties);
    }
}


