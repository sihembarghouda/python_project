package com.example.favoritesservice.dto;

import com.example.favoritesservice.model.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteResponse {
    private String id;
    private String userId;
    private String courseId;
    private Course course;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
