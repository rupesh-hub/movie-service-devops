package com.alfarays.movie.service;

import com.alfarays.exception.GlobalException;
import com.alfarays.movie.entity.Image;
import com.alfarays.movie.entity.Movie;
import com.alfarays.movie.model.ImageResponse;
import com.alfarays.movie.model.MovieRequest;
import com.alfarays.movie.model.MovieResponse;
import com.alfarays.movie.repository.MovieRepository;
import com.alfarays.shared.GlobalResponse;
import com.alfarays.shared.Paging;
import com.alfarays.util.CustomDateTimeFormatter;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MovieService implements IMovieService {

    private final MovieRepository movieRepository;
    private final ImageService imageService;

    @Override
    public GlobalResponse<MovieResponse> post(MovieRequest request, List<MultipartFile> images, MultipartFile thumbnail) {
        try {
            Movie movie = mapToEntity(request);
            movie = movieRepository.save(movie);
            handleImagesAndThumbnail(movie, images, thumbnail);
            return GlobalResponse.success(mapToResponse(movie));
        } catch (Exception e) {
            log.error("Error while posting movie: ", e);
            throw new GlobalException("Error while posting movie.");
        }
    }

    @Override
    public GlobalResponse<List<MovieResponse>> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("releaseDate").descending());
        Page<Movie> moviePage = movieRepository.findAll(pageable);

        List<MovieResponse> movieResponses = moviePage.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return GlobalResponse.success(movieResponses, mapToPaging(moviePage));
    }

    @Override
    public GlobalResponse<MovieResponse> getById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found"));
        return GlobalResponse.success(mapToResponse(movie));
    }

    @Override
    public GlobalResponse<MovieResponse> update(Long id, MovieRequest request, List<MultipartFile> images, MultipartFile thumbnail) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found"));

        updateEntityFromRequest(request, movie);
        handleImagesAndThumbnail(movie, images, thumbnail);

        movie = movieRepository.save(movie);
        return GlobalResponse.success(mapToResponse(movie));
    }

    @Override
    public GlobalResponse<Void> delete(Long id) {
        if (!movieRepository.existsById(id)) {
            return GlobalResponse.failure("Movie not found");
        }
        movieRepository.deleteById(id);
        return GlobalResponse.success("Movie deleted successfully");
    }

    @Override
    public GlobalResponse<List<MovieResponse>> searchByTitle(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> moviePage = movieRepository.findByTitleContainingIgnoreCase(title, pageable);

        List<MovieResponse> movieResponses = moviePage.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return GlobalResponse.success(movieResponses, mapToPaging(moviePage));
    }

    @Override
    public GlobalResponse<List<MovieResponse>> filterByDateRange(LocalDateTime startDate, LocalDateTime endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> moviePage = movieRepository.findByReleaseDateBetween(startDate, endDate, pageable);

        List<MovieResponse> movieResponses = moviePage.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return GlobalResponse.success(movieResponses, mapToPaging(moviePage));
    }

    private void handleImagesAndThumbnail(Movie movie, List<MultipartFile> images, MultipartFile thumbnail) {
        if (images != null && !images.isEmpty()) {
//            if (movie.getImages() != null) movie.getImages().clear();
            List<Image> imageList = images.stream()
                    .map(file -> imageService.uploadImage(file, movie))
                    .collect(Collectors.toList());
            movie.setImages(imageList);
        }

        if (thumbnail != null) {
            Image thumbnailImage = imageService.uploadImage(thumbnail, movie);
            movie.setThumbnail(thumbnailImage);
        }
    }


    private Movie mapToEntity(MovieRequest request) {
        Movie movie = new Movie();
        movie.setTitle(request.getTitle());
        movie.setReleaseDate(request.getReleaseDate());
        movie.setDescription(request.getDescription());
        return movie;
    }

    private MovieResponse mapToResponse(Movie movie) {
        return MovieResponse.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .releaseDate(CustomDateTimeFormatter.formatDate(movie.getReleaseDate()))
                .description(movie.getDescription())
                .modifiedOn(CustomDateTimeFormatter.formatDateTime(movie.getModifiedOn()))
                .createdOn(CustomDateTimeFormatter.formatDateTime(movie.getCreatedOn()))
                .createdBy(movie.getCreatedBy())
                .modifiedBy(movie.getModifiedBy())
                .thumbnail(movie.getThumbnail() != null ? mapToImageResponse(movie.getThumbnail()) : null)
                .images(movie.getImages() != null ? movie.getImages().stream().map(this::mapToImageResponse).collect(Collectors.toList()) : null)
                .build();
    }

    private void updateEntityFromRequest(MovieRequest request, Movie movie) {
        movie.setTitle(request.getTitle());
        movie.setReleaseDate(request.getReleaseDate());
        movie.setDescription(request.getDescription());
    }

    private Paging mapToPaging(Page<?> page) {
        return Paging.builder()
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }

    private ImageResponse mapToImageResponse(Image image) {
        return ImageResponse.builder()
                .path(image.getPath())
                .filename(image.getFilename())
                .contentType(image.getContentType())
                .size(image.getSize())
                .createdBy(image.getCreatedBy())
                .createdOn(CustomDateTimeFormatter.formatDateTime(image.getCreatedOn()))
                .modifiedBy(image.getModifiedBy())
                .modifiedOn(CustomDateTimeFormatter.formatDateTime(image.getModifiedOn()))
                .build();
    }
}