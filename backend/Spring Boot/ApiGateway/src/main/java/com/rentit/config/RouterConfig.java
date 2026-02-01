package com.rentit.config;

import java.util.Arrays;
import com.rentit.filter.AuthenticationFilter;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class RouterConfig {

        @Bean
        public RouteLocator createRoutes(RouteLocatorBuilder builder, AuthenticationFilter authFilter) {
                return builder.routes()

                                // 🔐 Auth Service (Public)
                                .route("auth-service", r -> r
                                                .path("/auth/**")
                                                .uri("http://localhost:9090"))

                                // 👨‍💼 Admin Service (.NET)
                                .route("admin-service", r -> r
                                                .path("/admin/**")
                                                .filters(f -> f.filter(
                                                                authFilter.apply(config -> config.setRole("ADMIN"))))
                                                .uri("http://localhost:9091"))

                                // 🚗 Owner Service (.NET)
                                .route("owner-service", r -> r
                                                .path("/owner/**")
                                                .filters(f -> f.filter(
                                                                authFilter.apply(config -> config.setRole("OWNER"))))
                                                .uri("http://localhost:9092"))

                                // 👤 Customer Service (Spring Boot)
                                .route("customer-service", r -> r
                                                .path("/customer/**")
                                                .filters(f -> f.filter(
                                                                authFilter.apply(config -> config.setRole("CUSTOMER"))))
                                                .uri("http://localhost:9093"))
                                .build();
        }

        @Bean
        public CorsWebFilter corsWebFilter() {
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
                config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
                config.setExposedHeaders(Arrays.asList("Authorization"));
                source.registerCorsConfiguration("/**", config);
                return new CorsWebFilter(source);
        }

}
