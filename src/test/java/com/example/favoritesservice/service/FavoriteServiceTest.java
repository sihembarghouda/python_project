package com.example.favoritesservice.service;

import com.example.favoritesservice.dto.FavoriteRequest;
import com.example.favoritesservice.dto.FavoriteResponse;
import com.example.favoritesservice.exception.ResourceNotFoundException;
import com.example.favoritesservice.model.Course;
import com.example.favoritesservice.model.Favorite;
import com.example.favoritesservice.repository.FavoriteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.testng.annotations.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FavoriteServiceImplTest {

    @Mock
    private FavoriteRepository favoriteRepository;

    @InjectMocks
    private FavoriteServiceImpl favoriteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddFavorite_NewFavorite() {
        FavoriteRequest request = new FavoriteRequest("user1", "course1", "Course Name");

        when(favoriteRepository.existsByUserIdAndCourseId("user1", "course1")).thenReturn(false);
        when(favoriteRepository.save(any(Favorite.class))).thenAnswer(inv -> {
            Favorite f = inv.getArgument(0);
            f.setId("1");
            return f;
        });

        FavoriteResponse response = favoriteService.addFavorite(request);

        assertNotNull(response);
        assertEquals("user1", response.getUserId());
        assertEquals("course1", response.getCourseId());
        verify(favoriteRepository, times(1)).save(any(Favorite.class));
    }

    @Test
    void testAddFavorite_AlreadyExists() {
        Course mockCourse = new Course();
        mockCourse.setId("course1");
        mockCourse.setName("Course Name");

        Favorite existing = Favorite.builder()
                .id("1")
                .userId("user1")
                .courseId("course1")
                .course(mockCourse)
                .build();

        FavoriteRequest request = new FavoriteRequest("user1", "course1", "Course Name");

        when(favoriteRepository.existsByUserIdAndCourseId("user1", "course1")).thenReturn(true);
        when(favoriteRepository.findByUserIdAndCourseId("user1", "course1")).thenReturn(Optional.of(existing));

        FavoriteResponse response = favoriteService.addFavorite(request);

        assertEquals("user1", response.getUserId());
        verify(favoriteRepository, never()).save(any());
    }

    @Test
    void testGetUserFavorites() {
        Course course1 = new Course();
        course1.setId("course1");
        course1.setName("Course 1");

        Course course2 = new Course();
        course2.setId("course2");
        course2.setName("Course 2");

        List<Favorite> favorites = List.of(
                new Favorite("1", "user1", "course1", course1, null, null),
                new Favorite("2", "user1", "course2", course2, null, null)
        );

        when(favoriteRepository.findByUserId("user1")).thenReturn(favorites);

        List<FavoriteResponse> responses = favoriteService.getUserFavorites("user1");

        assertEquals(2, responses.size());
        assertEquals("course1", responses.get(0).getCourseId());
    }

    @Test
    void testIsFavorite() {
        when(favoriteRepository.existsByUserIdAndCourseId("user1", "course1")).thenReturn(true);

        boolean result = favoriteService.isFavorite("user1", "course1");

        assertTrue(result);
    }

    @Test
    void testGetFavorite_Found() {
        Course course = new Course();
        course.setId("course1");
        course.setName("Course");

        Favorite fav = new Favorite("1", "user1", "course1", course, null, null);
        when(favoriteRepository.findByUserIdAndCourseId("user1", "course1"))
                .thenReturn(Optional.of(fav));

        FavoriteResponse response = favoriteService.getFavorite("user1", "course1");

        assertEquals("course1", response.getCourseId());
    }

    @Test
    void testGetFavorite_NotFound() {
        when(favoriteRepository.findByUserIdAndCourseId("user1", "course1")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            favoriteService.getFavorite("user1", "course1");
        });
    }

    @Test
    void testRemoveFavorite_Success() {
        when(favoriteRepository.existsByUserIdAndCourseId("user1", "course1")).thenReturn(true);

        favoriteService.removeFavorite("user1", "course1");

        verify(favoriteRepository).deleteByUserIdAndCourseId("user1", "course1");
    }

    @Test
    void testRemoveFavorite_NotFound() {
        when(favoriteRepository.existsByUserIdAndCourseId("user1", "course1")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> {
            favoriteService.removeFavorite("user1", "course1");
        });
    }

    @Test
    void testRemoveAllUserFavorites() {
        Course course = new Course();
        course.setId("course1");
        course.setName("Course 1");

        List<Favorite> favorites = List.of(
                new Favorite("1", "user1", "course1", course, null, null)
        );

        when(favoriteRepository.findByUserId("user1")).thenReturn(favorites);

        favoriteService.removeAllUserFavorites("user1");

        verify(favoriteRepository, times(1)).delete(any(Favorite.class));
    }
}


//Ce code teste la logique métier de la gestion des favoris dans FavoriteServiceImpl, notamment :
//
//Ajout d’un favori (nouveau ou existant).
//
//Récupération des favoris.
//
//Vérification de l’existence d’un favori.
//
//Suppression d’un favori unique ou de tous les favoris d’un utilisateur.
//
//Gestion des erreurs (favori non trouvé).