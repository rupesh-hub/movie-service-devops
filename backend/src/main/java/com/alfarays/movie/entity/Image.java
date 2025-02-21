package com.alfarays.movie.entity;

import com.alfarays.shared.AbstractEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_images")
public class Image extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_image_id_seq_generator")
    @SequenceGenerator(name = "_image_id_seq_generator", sequenceName = "_image_id_seq", allocationSize = 1, initialValue = 1)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    private String path;
    private String filename;
    private String contentType;
    private Long size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;
}