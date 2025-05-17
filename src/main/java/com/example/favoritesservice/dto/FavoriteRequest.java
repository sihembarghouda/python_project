package com.example.favoritesservice.dto;

import com.example.favoritesservice.model.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    private String courseId;

    @NotNull(message = "Course details are required")
    private Course course;
}