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

            // Enable real data seeding
            if (stateRepository.count() == 0) {
                seedLocations();
            }
            if (propertyRepository.count() == 0) {
                seedProperties();
            }
            System.out.println("--- DATA SEEDING COMPLETED (Admin + Real Projects) ---");
        } catch (Exception e) {
            System.err.println("--- DATA SEEDING FAILED: " + e.getMessage() + " ---");
            e.printStackTrace();
        }
    }

    private void seedOtherUsers() {
    }

    private void seedAgents() {
    }

    private void seedLocations() {
        List<State> states = Arrays.asList(
                new State("st_rj", "Rajasthan"),
                new State("st_up", "Uttar Pradesh")
        );
        stateRepository.saveAll(states);

        List<City> cities = Arrays.asList(
                new City("khatu_shyam", "st_rj", "Khatu Shyam"),
                new City("sikar", "st_rj", "Sikar"),
                new City("jaipur", "st_rj", "Jaipur"),
                new City("dudu", "st_rj", "Dudu"),
                new City("vrindavan", "st_up", "Vrindavan")
        );
        cityRepository.saveAll(cities);
    }

    private void seedProperties() {
        List<Property> properties = Arrays.asList(
                Property.builder()
                        .id("proj_sss1")
                        .cityId("khatu_shyam")
                        .listingType("Projects")
                        .type("Residential Plot")
                        .title("Shree Shyam Sarovar-I")
                        .price(1500000L)
                        .priceStr("₹15 L - ₹35 L")
                        .area("100 - 300 sq yards")
                        .location("Abhawas, Ringas Road, Khatu Shyam")
                        .developer("One5 Realty Group")
                        .status("Completed")
                        .tags(Arrays.asList("Gated", "Temple Proximity", "Vastu Compliant"))
                        .img("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80")
                        .pdf("/projects/shree-shyam-sarovar-1.pdf")
                        .description("A premium residential plotting project located in the spiritual heart of Rajasthan. Shree Shyam Sarovar-I offers well-planned plots with modern amenities in a serene environment near the holy town of Khatu Shyam.")
                        .amenities(Arrays.asList("24/7 Security", "Wide Roads", "Water Supply", "Lush Green Parks"))
                        .build(),
                Property.builder()
                        .id("proj_sss2")
                        .cityId("sikar")
                        .listingType("Projects")
                        .type("Residential Plot")
                        .title("Shree Shyam Sarovar-II")
                        .price(1800000L)
                        .priceStr("₹18 L - ₹40 L")
                        .area("150 - 350 sq yards")
                        .location("Kerpura, Teh. Danta Ramgarh, Sikar")
                        .developer("One5 Realty Group")
                        .status("New Launch")
                        .tags(Arrays.asList("New Launch", "Investment Opportunity", "Large Plots"))
                        .img("https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80")
                        .pdf("/projects/shree-shyam-sarovar-2.pdf")
                        .description("The second phase of the successful Shyam Sarovar series. Located in the promising region of Kerpura, Sikar, this project is designed for those looking for substantial land assets in a rapidly developing corridor.")
                        .amenities(Arrays.asList("Clubhouse", "Play Area", "Gated Community", "Street Lighting"))
                        .build(),
                Property.builder()
                        .id("proj_an")
                        .cityId("dudu")
                        .listingType("Projects")
                        .type("Residential Plot")
                        .title("Aadinath Nagar")
                        .price(1200000L)
                        .priceStr("₹12 L - ₹25 L")
                        .area("100 - 250 sq yards")
                        .location("Jaipur-Ajmer Expressway, Dudu")
                        .developer("One5 Realty Group")
                        .status("Ongoing")
                        .tags(Arrays.asList("Highway Access", "Fastest Growing", "RERA Approved"))
                        .img("https://images.unsplash.com/photo-1464938532347-1e50a8c29f63?w=800&q=80")
                        .pdf("/projects/aadinath nagar.pdf")
                        .description("Strategically located on the Jaipur-Ajmer Expressway, Aadinath Nagar is perfectly positioned to benefit from the industrial and commercial growth along this vital corridor.")
                        .amenities(Arrays.asList("Highway Proximity", "Commercial Zone", "Green Belts", "Security Gate"))
                        .build(),
                Property.builder()
                        .id("proj_mv")
                        .cityId("jaipur")
                        .listingType("Projects")
                        .type("Residential Plot")
                        .title("Mayur Vihar")
                        .price(2000000L)
                        .priceStr("₹20 L - ₹45 L")
                        .area("120 - 300 sq yards")
                        .location("Village Panwaliya, Sanganer, Jaipur")
                        .developer("One5 Realty Group")
                        .status("Verified")
                        .tags(Arrays.asList("Sanganer", "Jaipur South", "Modern Infra"))
                        .img("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80")
                        .pdf("/projects/mayur-vihar.pdf")
                        .description("Mayur Vihar brings you closer to the urban conveniences of Jaipur while maintaining a peaceful suburban charm. Located in the thriving Sanganer area, it is ideal for home builders.")
                        .amenities(Arrays.asList("School Proximity", "Market Access", "Underground Utilities", "Community Center"))
                        .build(),
                Property.builder()
                        .id("proj_hv")
                        .cityId("vrindavan")
                        .listingType("Projects")
                        .type("Residential Plot")
                        .title("Hanumant Vihar")
                        .price(2500000L)
                        .priceStr("₹25 L - ₹60 L")
                        .area("150 - 400 sq yards")
                        .location("Radha Kund-Ral Road, Vrindavan, Mathura")
                        .developer("One5 Realty Group")
                        .status("Premium")
                        .tags(Arrays.asList("Vrindavan", "Holy Location", "Luxury Living"))
                        .img("https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80")
                        .pdf("/projects/hanumant-vihar.pdf")
                        .description("Experience spiritual tranquility at Hanumant Vihar. Located on the Radha Kund-Ral Road in Vrindavan, this project offers premium plots in a divine setting.")
                        .amenities(Arrays.asList("Spiritual Centers Nearby", "Gated Security", "Theme Parks", "Meditation Zones"))
                        .build()
        );
        propertyRepository.saveAll(properties);
    }
}


