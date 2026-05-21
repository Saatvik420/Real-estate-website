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
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@bharatestates.com").isEmpty()) {
            User admin = User.builder()
                    .email("admin@bharatestates.com")
                    .password(passwordEncoder.encode("admin123"))
                    .name("System Admin")
                    .role("ADMIN")
                    .active(true)
                    .build();
            userRepository.save(admin);
        }
        if (userRepository.count() <= 1) { // Seed others if only admin exists or empty
            seedUsers();
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
    }

    private void seedUsers() {
        User admin = User.builder()
                .email("admin@bharatestates.com")
                .password(passwordEncoder.encode("admin123"))
                .name("System Admin")
                .role("ADMIN")
                .active(true)
                .build();
        userRepository.save(admin);

        User user = User.builder()
                .email("user@example.com")
                .password(passwordEncoder.encode("user123"))
                .name("John Doe")
                .role("USER")
                .active(true)
                .build();
        userRepository.save(user);

        User contractor1 = User.builder()
                .email("contractor1@example.com")
                .password(passwordEncoder.encode("password"))
                .name("Amit Sharma")
                .role("CONTRACTOR")
                .specialty("Interior Design")
                .active(true)
                .build();
        userRepository.save(contractor1);

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

    private void seedAgents() {
        List<Agent> agents = Arrays.asList(
                Agent.builder()
                        .id("agent_1")
                        .name("Rajesh Khanna")
                        .company("Luxury Living Realty")
                        .designation("Senior Luxury Consultant")
                        .location("Mumbai, Maharashtra")
                        .areas(Arrays.asList("Lower Parel", "Worli", "Marine Drive", "Bandra West"))
                        .contact("+91 98765 20025")
                        .email("rajesh.k@luxury-living.com")
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
                        .contact("+91 98765 20013")
                        .email("anita.d@capitalhomes.com")
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
                new State("st_mh", "Maharashtra"),
                new State("st_ka", "Karnataka"),
                new State("st_dl", "Delhi"),
                new State("st_hr", "Haryana"),
                new State("st_wb", "West Bengal"),
                new State("st_ap", "Andhra Pradesh"),
                new State("st_tg", "Telangana"),
                new State("st_tn", "Tamil Nadu"),
                new State("st_gj", "Gujarat"),
                new State("st_rj", "Rajasthan")
        );
        stateRepository.saveAll(states);

        List<City> cities = Arrays.asList(
                new City("mumbai", "st_mh", "Mumbai"),
                new City("pune", "st_mh", "Pune"),
                new City("bengaluru", "st_ka", "Bengaluru"),
                new City("delhi", "st_dl", "New Delhi"),
                new City("gurugram", "st_hr", "Gurugram"),
                new City("kolkata", "st_wb", "Kolkata"),
                new City("hyderabad", "st_tg", "Hyderabad"),
                new City("chennai", "st_tn", "Chennai"),
                new City("ahmedabad", "st_gj", "Ahmedabad"),
                new City("jaipur", "st_rj", "Jaipur")
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


