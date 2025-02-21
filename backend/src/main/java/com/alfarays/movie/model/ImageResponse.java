package com.alfarays.movie.model;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageResponse {

    private String path;
    private String filename;
    private String contentType;
    private Long size;
    private String createdOn;
    private String modifiedOn;
    private String createdBy;
    private String modifiedBy;

}
