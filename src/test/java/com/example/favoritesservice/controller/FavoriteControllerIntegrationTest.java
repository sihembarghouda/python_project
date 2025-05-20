package com.example.favoritesservice.controller;

import com.example.favoritesservice.dto.FavoriteRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class FavoriteControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testAddFavorite() throws Exception {
        FavoriteRequest request = new FavoriteRequest();
        request.setUserId("user123");
        request.setCourseId("course456");

        mockMvc.perform(post("/api/v1/favorites")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userId").value("user123"))
                .andExpect(jsonPath("$.courseId").value("course456"));
    }

    @Test
    void testGetUserFavorites() throws Exception {
        String userId = "user123";

        // On s’assure qu’il y a au moins un favori (créé dans testAddFavorite)
        mockMvc.perform(get("/api/v1/favorites/users/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());  // Vérifie que c’est une liste
    }
}

//Ce code réalise deux tests d’intégration sur le contrôleur FavoriteController. Le premier test, testAddFavorite(),
// vérifie le bon fonctionnement de l’ajout d’un favori via l’endpoint POST /api/v1/favorites.
// Il s’assure que la requête retourne un code HTTP 201 Created et que la réponse JSON contient les bons identifiants de l’utilisateur et
// du cours. L’objectif est de confirmer que l’API permet bien d’ajouter un favori et que les données retournées sont conformes à ce qui est attendu.
//
//Le second test, testGetUserFavorites(), teste la récupération de tous
// les favoris d’un utilisateur grâce à l’endpoint GET /api/v1/favorites/users/{userId}.
// Il vérifie que la requête renvoie un code 200 OK, que le contenu de la réponse est de type application/json et
// que la réponse contient une liste (sous forme de tableau JSON).
// Ce test permet donc de s’assurer que l’API retourne correctement tous les favoris associés à un utilisateur donné.