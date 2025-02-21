package com.alfarays.movie.repository;

import com.alfarays.movie.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query(name="Movie.searchMovie")
    Page<Movie> findByTitleContainingIgnoreCase(@Param("title") String title, Pageable pageable);

    @Query(name="Movie.filterByDateRange")
    Page<Movie> findByReleaseDateBetween( @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);

}
