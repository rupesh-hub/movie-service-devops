package com.alfarays.movie.model;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieResponse {

    private Long id;
    private String title;
    private String releaseDate;
    private String description;
    private ImageResponse thumbnail;
    private List<ImageResponse> images;
    private String createdOn;
    private String modifiedOn;
    private String createdBy;
    private String modifiedBy;


}
