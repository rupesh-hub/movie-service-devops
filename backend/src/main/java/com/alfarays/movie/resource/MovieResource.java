package com.alfarays.movie.resource;

import com.alfarays.movie.model.MovieRequest;
import com.alfarays.movie.model.MovieResponse;
import com.alfarays.movie.service.IMovieService;
import com.alfarays.shared.GlobalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieResource {

    private final IMovieService movieService;

    @PostMapping
    public ResponseEntity<GlobalResponse<MovieResponse>> createMovie(
            @RequestParam("title") String title,
            @RequestParam("releaseDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate releaseDate,
            @RequestParam("description") String description,
            @RequestParam(value = "images", required = false) List<MultipartFile> images,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) {

        MovieRequest movieRequest = new MovieRequest();
        movieRequest.setTitle(title);
        movieRequest.setReleaseDate(releaseDate);
        movieRequest.setDescription(description);

        GlobalResponse<MovieResponse> response = movieService.post(movieRequest, images, thumbnail);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<GlobalResponse<List<MovieResponse>>> getAllMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        GlobalResponse<List<MovieResponse>> response = movieService.getAll(page, size);
        return ResponseEntity.ok(response);  // 200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<GlobalResponse<MovieResponse>> getMovieById(@PathVariable Long id) {
        GlobalResponse<MovieResponse> response = movieService.getById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GlobalResponse<MovieResponse>> updateMovie(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("releaseDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate releaseDate,
            @RequestParam("description") String description,
            @RequestParam(value = "images", required = false) List<MultipartFile> images,
            @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail) {

        MovieRequest movieRequest = new MovieRequest();
        movieRequest.setTitle(title);
        movieRequest.setReleaseDate(releaseDate);
        movieRequest.setDescription(description);

        GlobalResponse<MovieResponse> response = movieService.update(id, movieRequest, images, thumbnail);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GlobalResponse<Void>> deleteMovie(@PathVariable Long id) {
        GlobalResponse<Void> response = movieService.delete(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<GlobalResponse<List<MovieResponse>>> searchMoviesByTitle(
            @RequestParam("title") String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        GlobalResponse<List<MovieResponse>> response = movieService.searchByTitle(title, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/filter")
    public ResponseEntity<GlobalResponse<List<MovieResponse>>> filterMoviesByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        GlobalResponse<List<MovieResponse>> response = movieService.filterByDateRange(startDate, endDate, page, size);
        return ResponseEntity.ok(response);
    }

}
