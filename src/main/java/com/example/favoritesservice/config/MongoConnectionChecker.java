package com.example.favoritesservice.config;

import com.mongodb.client.MongoClient;
import org.springframework.stereotype.Component;


@Component
public class MongoConnectionChecker {

    private final MongoClient mongoClient;

    public MongoConnectionChecker(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    public void checkConnection() {
        try {
            // Cette ligne force la connexion
            mongoClient.listDatabaseNames().first();
            System.out.println("Connected to MongoDB at mongodb://localhost:27017/favorites_db");
        } catch (Exception e) {
            System.err.println("Failed to connect to MongoDB: " + e.getMessage());
        }
    }
}
