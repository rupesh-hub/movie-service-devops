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
@Table(name = "_reviews")
@NamedQueries({
        @NamedQuery(name = "Review.getReviewsByMovie", query = "SELECT R FROM Review R WHERE R.movie.id = :movieId"),
        @NamedQuery(name = "Review.getAverageRating", query = "SELECT AVG(R.rating) FROM Review R WHERE R.movie.id = :movieId")
})
public class Review extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_review_id_seq_generator")
    @SequenceGenerator(name = "_review_id_seq_generator", sequenceName = "_review_id_seq", allocationSize = 1, initialValue = 1)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private Long id;

    private int rating;
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;
}
