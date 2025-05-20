package com.example.favoritesservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course implements Serializable {
    private String id;
    private String title;
    private String description;
    private String instructor;
    private String thumbnailUrl;
    private BigDecimal price;
    private Double rating;
    private String category;
    private Integer durationHours;

    public void setName(String s) {
    }
}