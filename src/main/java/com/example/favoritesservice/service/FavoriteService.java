package com.example.favoritesservice.service;

import com.example.favoritesservice.dto.FavoriteRequest;
import com.example.favoritesservice.dto.FavoriteResponse;

import java.util.List;



public interface FavoriteService {

    /**
     * Ajoute un nouveau favori
     */
    FavoriteResponse addFavorite(FavoriteRequest favoriteRequest);

    /**
     * Récupère tous les favoris d'un utilisateur
     */
    List<FavoriteResponse> getUserFavorites(String userId);

    /**
     * Vérifie si un cours est dans les favoris d'un utilisateur
     */
    boolean isFavorite(String userId, String courseId);

    /**
     * Récupère un favori spécifique
     */
    FavoriteResponse getFavorite(String userId, String courseId);

    /**
     * Supprime un favori
     */
    void removeFavorite(String userId, String courseId);

    /**
     * Supprime tous les favoris d'un utilisateur
     */
    void removeAllUserFavorites(String userId);
}