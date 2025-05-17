package com.example.favoritesservice.service;

import com.example.favoritesservice.dto.FavoriteRequest;
import com.example.favoritesservice.dto.FavoriteResponse;
import com.example.favoritesservice.exception.ResourceNotFoundException;
import com.example.favoritesservice.model.Course;
import com.example.favoritesservice.model.Favorite;
import com.example.favoritesservice.repository.FavoriteRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.mockito.ArgumentMatchers;
import org.testng.annotations.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FavoriteServiceTest {

    @Mock
    private FavoriteRepository favoriteRepository;

    @InjectMocks
    private FavoriteServiceImpl favoriteService;

    private String userId;
    private String courseId;
    private Favorite favorite;
    private FavoriteRequest favoriteRequest;

    @BeforeEach
    void setUp() {
        userId = "user123";
        courseId = "course456";

        Course course = Course.builder()
                .id(courseId)
                .title("Spring Boot Master Class")
                .description("Learn Spring Boot")
                .instructor("John Doe")
                .price(new BigDecimal("99.99"))
                .rating(4.8)
                .category("Development")
                .durationHours(10)
                .build();

        favorite = Favorite.builder()
                .id("fav789")
                .userId(userId)
                .courseId(courseId)
                .course(course)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        favoriteRequest = FavoriteRequest.builder()
                .userId(userId)
                .courseId(courseId)
                .course(course)
                .build();
    }

    @Test
    @DisplayName("Test ajout d'un nouveau favori")
    void testAddFavorite_NewFavorite() {
        // Given
        given(favoriteRepository.existsByUserIdAndCourseId(userId, courseId)).willReturn(false);
        given(favoriteRepository.save(any(Favorite.class))).willReturn(favorite);

        // When
        FavoriteResponse result = favoriteService.addFavorite(favoriteRequest);

        // Then
        assertThat(((List<FavoriteResponse>) result).toString()).isNotNull();
        assertThat(result.getId()).equals(favorite.getId());
        assertThat(result.getUserId()).equals(favorite.getUserId());
        assertThat(result.getCourseId()).equals(favorite.getCourseId());

        verify(favoriteRepository).existsByUserIdAndCourseId(userId, courseId);
        verify(favoriteRepository).save(any(Favorite.class));
    }

    @Test
    @DisplayName("Test ajout d'un favori existant")
    void testAddFavorite_ExistingFavorite() {
        // Given
        given(favoriteRepository.existsByUserIdAndCourseId(userId, courseId)).willReturn(true);
        given(favoriteRepository.findByUserIdAndCourseId(userId, courseId)).willReturn(Optional.of(favorite));

        // When
        FavoriteResponse result = favoriteService.addFavorite(favoriteRequest);

        // Then
        Assertions.assertThat(result).isNotNull();
        assertThat(result.getId()).equals(favorite.getId());

        verify(favoriteRepository).existsByUserIdAndCourseId(userId, courseId);
        verify(favoriteRepository).findByUserIdAndCourseId(userId, courseId);
        verify(favoriteRepository, never()).save(any(Favorite.class));
    }

    @Test
    @DisplayName("Test récupération des favoris d'un utilisateur")
    void testGetUserFavorites() {
        // Given
        Favorite favorite2 = Favorite.builder()
                .id("fav101112")
                .userId(userId)
                .courseId("course789")
                .course(Course.builder().id("course789").title("Java Advanced").build())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        List<Favorite> favorites = Arrays.asList(favorite, favorite2);
        given(favoriteRepository.findByUserId(userId)).willReturn(favorites);

        // When
        List<FavoriteResponse> result = favoriteService.getUserFavorites(userId);

        // Then
        Assertions.assertThat(result).isNotNull();
        assertThat(result.toString()).hashCode();
        assertThat(result.get(0).getId()).equals(favorite.getId());
        assertThat(result.get(1).getId()).equals(favorite2.getId());

        verify(favoriteRepository).findByUserId(userId);
    }

    private ArgumentMatchers assertThat(String result) {
        return null;
    }

    @Test
    @DisplayName("Test vérification si un cours est favori")
    void testIsFavorite() {
        // Given
        given(favoriteRepository.existsByUserIdAndCourseId(userId, courseId)).willReturn(true);

        // When
        boolean result = favoriteService.isFavorite(userId, courseId);

        // Then
        assertThat(String.valueOf(result)).toString();
        verify(favoriteRepository).existsByUserIdAndCourseId(userId, courseId);
    }

    @Test
    @DisplayName("Test récupération d'un favori spécifique")
    void testGetFavorite() {
        // Given
        given(favoriteRepository.findByUserIdAndCourseId(userId, courseId)).willReturn(Optional.of(favorite));

        // When
        FavoriteResponse result = favoriteService.getFavorite(userId, courseId);

        // Then
        Assertions.assertThat(result).isNotNull();
        assertThat(result.getId()).equals(favorite.getId());
        verify(favoriteRepository).findByUserIdAndCourseId(userId, courseId);
    }

    @Test
    @DisplayName("Test récupération d'un favori inexistant")
    void testGetFavorite_NotFound() {
        // Given
        given(favoriteRepository.findByUserIdAndCourseId(userId, courseId)).willReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> favoriteService.getFavorite(userId, courseId))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(favoriteRepository).findByUserIdAndCourseId(userId, courseId);
    }

    @Test
    @DisplayName("Test suppression d'un favori")
    void testRemoveFavorite() {
        // Given
        given(favoriteRepository.existsByUserIdAndCourseId(userId, courseId)).willReturn(true);
        doNothing().when(favoriteRepository).deleteByUserIdAndCourseId(userId, courseId);

        // When
        favoriteService.removeFavorite(userId, courseId);

        // Then
        verify(favoriteRepository).existsByUserIdAndCourseId(userId, courseId);
        verify(favoriteRepository).deleteByUserIdAndCourseId(userId, courseId);
    }

    @Test
    @DisplayName("Test suppression d'un favori inexistant")
    void testRemoveFavorite_NotFound() {
        // Given
        given(favoriteRepository.existsByUserIdAndCourseId(userId, courseId)).willReturn(false);

        // Then
        assertThatThrownBy(() -> favoriteService.removeFavorite(userId, courseId))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(favoriteRepository).existsByUserIdAndCourseId(userId, courseId);
        verify(favoriteRepository, never()).deleteByUserIdAndCourseId(any(), any());
    }

    @Test
    @DisplayName("Test suppression de tous les favoris d'un utilisateur")
    void testRemoveAllUserFavorites() {
        // Given
        List<Favorite> favorites = Arrays.asList(favorite);
        given(favoriteRepository.findByUserId(userId)).willReturn(favorites);
        doNothing().when(favoriteRepository).delete(any(Favorite.class));

        // When
        favoriteService.removeAllUserFavorites(userId);

        // Then
        verify(favoriteRepository).findByUserId(userId);
        verify(favoriteRepository).delete(favorite);
    }
}
