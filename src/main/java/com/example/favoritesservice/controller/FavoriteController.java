package com.example.favoritesservice.controller;

import com.example.favoritesservice.dto.FavoriteRequest;
import com.example.favoritesservice.dto.FavoriteResponse;
import com.example.favoritesservice.service.FavoriteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
@Slf4j
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity<FavoriteResponse> addFavorite(@Valid @RequestBody FavoriteRequest favoriteRequest) {
        log.info("Request to add favorite for user: {} and course: {}",
                favoriteRequest.getUserId(), favoriteRequest.getCourseId());

        FavoriteResponse response = favoriteService.addFavorite(favoriteRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<FavoriteResponse>> getUserFavorites(@PathVariable String userId) {
        log.info("Request to get favorites for user: {}", userId);

        List<FavoriteResponse> favorites = favoriteService.getUserFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    @GetMapping("/users/{userId}/courses/{courseId}")
    public ResponseEntity<FavoriteResponse> getFavorite(
            @PathVariable String userId,
            @PathVariable String courseId) {
        log.info("Request to get favorite for user: {} and course: {}", userId, courseId);

        FavoriteResponse favorite = favoriteService.getFavorite(userId, courseId);
        return ResponseEntity.ok(favorite);
    }

    @GetMapping("/users/{userId}/courses/{courseId}/status")
    public ResponseEntity<Map<String, Boolean>> checkFavoriteStatus(
            @PathVariable String userId,
            @PathVariable String courseId) {
        log.info("Request to check favorite status for user: {} and course: {}", userId, courseId);

        boolean isFavorite = favoriteService.isFavorite(userId, courseId);
        return ResponseEntity.ok(Map.of("isFavorite", isFavorite));
    }

    @DeleteMapping("/users/{userId}/courses/{courseId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable String userId,
            @PathVariable String courseId) {
        log.info("Request to remove favorite for user: {} and course: {}", userId, courseId);

        favoriteService.removeFavorite(userId, courseId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> removeAllUserFavorites(@PathVariable String userId) {
        log.info("Request to remove all favorites for user: {}", userId);

        favoriteService.removeAllUserFavorites(userId);
        return ResponseEntity.noContent().build();
    }
}
