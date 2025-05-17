package com.example.favoritesservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
@SpringBootApplication
@EnableCaching
public class FavoritesServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(FavoritesServiceApplication.class, args);
    }

}
