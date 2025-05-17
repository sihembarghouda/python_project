package com.example.favoritesservice.service;

import com.example.favoritesservice.dto.FavoriteRequest;
import com.example.favoritesservice.dto.FavoriteResponse;
import com.example.favoritesservice.exception.ResourceNotFoundException;
import com.example.favoritesservice.model.Favorite;
import com.example.favoritesservice.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "userFavorites", key = "#favoriteRequest.userId"),
            @CacheEvict(value = "favorites", key = "#favoriteRequest.userId + '-' + #favoriteRequest.courseId")
    })
    public FavoriteResponse addFavorite(FavoriteRequest favoriteRequest) {
        log.debug("Adding favorite for user: {} and course: {}",
                favoriteRequest.getUserId(), favoriteRequest.getCourseId());

        // Vérifier si le favori existe déjà
        if (favoriteRepository.existsByUserIdAndCourseId(
                favoriteRequest.getUserId(), favoriteRequest.getCourseId())) {
            log.info("Favorite already exists");

            // Récupérer le favori existant et le retourner
            Favorite existingFavorite = favoriteRepository.findByUserIdAndCourseId(
                            favoriteRequest.getUserId(), favoriteRequest.getCourseId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Favorite", "userId and courseId",
                            favoriteRequest.getUserId() + " - " + favoriteRequest.getCourseId()));

            return mapToFavoriteResponse(existingFavorite);
        }

        // Créer un nouveau favori
        Favorite favorite = Favorite.builder()
                .userId(favoriteRequest.getUserId())
                .courseId(favoriteRequest.getCourseId())
                .course(favoriteRequest.getCourse())
                .build();

        Favorite savedFavorite = favoriteRepository.save(favorite);
        log.info("Favorite saved with ID: {}", savedFavorite.getId());

        return mapToFavoriteResponse(savedFavorite);
    }

    @Override
    @Cacheable(value = "userFavorites", key = "#userId")
    public List<FavoriteResponse> getUserFavorites(String userId) {
        log.debug("Fetching favorites for user: {}", userId);

        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        log.info("Found {} favorites for user: {}", favorites.size(), userId);

        return favorites.stream()
                .map(this::mapToFavoriteResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Cacheable(value = "favorites", key = "#userId + '-' + #courseId")
    public boolean isFavorite(String userId, String courseId) {
        log.debug("Checking if course {} is favorite for user {}", courseId, userId);
        return favoriteRepository.existsByUserIdAndCourseId(userId, courseId);
    }

    @Override
    @Cacheable(value = "favorites", key = "#userId + '-' + #courseId")
    public FavoriteResponse getFavorite(String userId, String courseId) {
        log.debug("Fetching favorite for user: {} and course: {}", userId, courseId);

        Favorite favorite = favoriteRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Favorite", "userId and courseId", userId + " - " + courseId));

        return mapToFavoriteResponse(favorite);
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "userFavorites", key = "#userId"),
            @CacheEvict(value = "favorites", key = "#userId + '-' + #courseId")
    })
    public void removeFavorite(String userId, String courseId) {
        log.debug("Removing favorite for user: {} and course: {}", userId, courseId);

        if (!favoriteRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw new ResourceNotFoundException(
                    "Favorite", "userId and courseId", userId + " - " + courseId);
        }

        favoriteRepository.deleteByUserIdAndCourseId(userId, courseId);
        log.info("Favorite removed for user: {} and course: {}", userId, courseId);
    }

    @Override
    @Transactional
    @CacheEvict(value = "userFavorites", key = "#userId")
    public void removeAllUserFavorites(String userId) {
        log.debug("Removing all favorites for user: {}", userId);

        List<Favorite> userFavorites = favoriteRepository.findByUserId(userId);
        if (userFavorites.isEmpty()) {
            log.info("No favorites found for user: {}", userId);
            return;
        }

        // Supprimer les favoris un par un pour déclencher les évènements
        userFavorites.forEach(favorite -> {
            favoriteRepository.delete(favorite);
            // Éviction du cache pour chaque favori individuel
            String cacheKey = favorite.getUserId() + "-" + favorite.getCourseId();
            log.debug("Evicting cache for key: {}", cacheKey);
        });

        log.info("All favorites removed for user: {}", userId);
    }

    // Méthode utilitaire pour mapper un Favorite en FavoriteResponse
    private FavoriteResponse mapToFavoriteResponse(Favorite favorite) {
        return FavoriteResponse.builder()
                .id(favorite.getId())
                .userId(favorite.getUserId())
                .courseId(favorite.getCourseId())
                .course(favorite.getCourse())
                .createdAt(favorite.getCreatedAt())
                .updatedAt(favorite.getUpdatedAt())
                .build();
    }
}