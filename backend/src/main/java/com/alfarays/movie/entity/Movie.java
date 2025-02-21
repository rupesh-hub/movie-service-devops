package com.alfarays.movie.entity;
import com.alfarays.shared.AbstractEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_movies")
@NamedQueries({
        @NamedQuery(name = "Movie.getAllWithPagination", query = "SELECT M FROM Movie M ORDER BY M.releaseDate DESC"),
        @NamedQuery(name = "Movie.searchMovie", query = "SELECT M FROM Movie M WHERE LOWER(M.title) LIKE LOWER(CONCAT('%', :title, '%')) ORDER BY M.releaseDate DESC"),
        @NamedQuery(name = "Movie.filterByDateRange", query = "SELECT M FROM Movie M WHERE M.releaseDate BETWEEN :startDate AND :endDate ORDER BY M.releaseDate DESC")
})

@ToString
public class Movie extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_movie_id_seq_generator")
    @SequenceGenerator(name = "_movie_id_seq_generator", sequenceName = "_movie_id_seq", allocationSize = 1, initialValue = 1)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    private String title;
    private LocalDate releaseDate;
    private String description;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Image> images;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail_image_id", referencedColumnName = "id")
    private Image thumbnail;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Review> reviews;
}
