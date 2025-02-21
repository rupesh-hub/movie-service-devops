package com.alfarays.movie.service;

import com.alfarays.movie.model.MovieRequest;
import com.alfarays.movie.model.MovieResponse;
import com.alfarays.shared.GlobalResponse;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public interface IMovieService {

    GlobalResponse<MovieResponse> post(MovieRequest request, List<MultipartFile> images, MultipartFile thumbnail);
    GlobalResponse<List<MovieResponse>> getAll(int page, int size);
    GlobalResponse<MovieResponse> getById(Long id);
    GlobalResponse<MovieResponse> update(Long id, MovieRequest request, List<MultipartFile> images, MultipartFile thumbnail);
    GlobalResponse<Void> delete(Long id);
    GlobalResponse<List<MovieResponse>> searchByTitle(String query, int page, int size);
    GlobalResponse<List<MovieResponse>> filterByDateRange(LocalDateTime startDate, LocalDateTime endDate, int page, int size);

}
