package com.example.favoritesservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertCallback;
import com.example.favoritesservice.model.Favorite;

import java.time.LocalDateTime;

@Configuration
@EnableMongoAuditing
public class MongoConfig {

    @Bean
    public BeforeConvertCallback<Favorite> beforeSaveFavoriteCallback() {
        return (entity, collection) -> {
            LocalDateTime now = LocalDateTime.now();

            if (entity.getCreatedAt() == null) {
                entity.setCreatedAt(now);
            }

            entity.setUpdatedAt(now);
            return entity;
        };
    }
}