package com.alfarays.movie.service;

import com.alfarays.movie.entity.Image;
import com.alfarays.movie.entity.Movie;
import com.alfarays.movie.model.MovieRequest;
import com.alfarays.movie.model.MovieResponse;
import com.alfarays.movie.repository.ImageRepository;
import com.alfarays.movie.repository.MovieRepository;
import com.alfarays.shared.GlobalResponse;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MovieServiceTests {

    @Mock
    private MovieRepository movieRepository;

    @Mock
    private ImageRepository imageRepository;

    @Mock
    private ImageService imageService; // Mock the ImageService

    @InjectMocks
    private MovieService movieService;

    @Captor
    private ArgumentCaptor<Movie> movieCaptor;

    @Captor
    private ArgumentCaptor<Image> imageCaptor;

    @Test
    void testPostMovie_Success() {
        // Arrange
        MovieRequest request = createMovieRequest();
        MockMultipartFile mockThumbnail = createMockMultipartFile("thumbnail.jpg");
        List<MockMultipartFile> mockImages = Collections.singletonList(createMockMultipartFile("image.jpg"));

        MultipartFile thumbnail = mockThumbnail; // Assign directly for single file
        List<MultipartFile> images = mockImages.stream().collect(Collectors.toList()); // Convert MockMultipartFile list to MultipartFile list

        Movie movie = createMovieEntity(request);

        when(movieRepository.save(any(Movie.class))).thenReturn(movie);
        when(imageService.uploadImage(any(), any())).thenReturn(Image.builder().path("path").build());

        // Act
        GlobalResponse<MovieResponse> response = movieService.post(request, images, thumbnail); // Use the converted lists


        // Assert
        assertNotNull(response);
        verify(movieRepository).save(movieCaptor.capture());
        verify(imageService, times(2)).uploadImage(any(), any()); // Verify ImageService calls
    }

    @Test
    void testGetAllMovies_Success() {
        // Arrange
        Movie movie = createMovieEntity(createMovieRequest());
        Pageable pageable = PageRequest.of(0, 10, Sort.by("releaseDate").descending()); // Use the same Sort
        Page<Movie> moviePage = new PageImpl<>(Collections.singletonList(movie));

        when(movieRepository.findAll(pageable)).thenReturn(moviePage); // Now the arguments match exactly

        // Act
        GlobalResponse<List<MovieResponse>> response = movieService.getAll(0, 10);

        // Assert
        assertNotNull(response);
        assertEquals(1, response.getData().size());
    }

    @Test
    void testGetMovieById_Success() {
        // Arrange
        Movie movie = createMovieEntity(createMovieRequest());
        when(movieRepository.findById(1L)).thenReturn(Optional.of(movie));

        // Act
        GlobalResponse<MovieResponse> response = movieService.getById(1L);

        // Assert
        assertNotNull(response);
    }

    @Test
    void testGetMovieById_NotFound() {
        when(movieRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> movieService.getById(1L));
    }

    @Test
    void testPostMovie_ImageUploadError() {
        MovieRequest request = createMovieRequest();
        MockMultipartFile mockThumbnail = createMockMultipartFile("thumbnail.jpg");
        List<MockMultipartFile> mockImages = Collections.singletonList(createMockMultipartFile("image.jpg"));

        MultipartFile thumbnail = mockThumbnail; // Assign directly for single file
        List<MultipartFile> images = mockImages.stream().collect(Collectors.toList()); // Convert MockMultipartFile list to MultipartFile list


        when(movieRepository.save(any(Movie.class))).thenReturn(new Movie());
        when(imageService.uploadImage(any(), any())).thenThrow(new RuntimeException("Image upload failed"));

        assertThrows(RuntimeException.class, () -> movieService.post(request, images, thumbnail)); // Use the converted lists
    }


    @Test
    void testUpdateMovie_Success() {
        // Arrange
        MovieRequest request = createMovieRequest();
        MockMultipartFile mockThumbnail = createMockMultipartFile("new_thumbnail.jpg");
        List<MockMultipartFile> mockImages = Collections.singletonList(createMockMultipartFile("new_image.jpg"));

        MultipartFile thumbnail = mockThumbnail;
        List<MultipartFile> images = mockImages.stream().collect(Collectors.toList());

        Movie existingMovie = createMovieEntity(request); // Existing movie in the database
        existingMovie.setThumbnail(Image.builder().path("old_thumbnail.jpg").build()); // Set existing thumbnail
        existingMovie.setImages(Collections.singletonList(Image.builder().path("old_image.jpg").build())); // Set existing images

        when(movieRepository.findById(1L)).thenReturn(Optional.of(existingMovie));
        when(movieRepository.save(any(Movie.class))).thenReturn(existingMovie); // Return the updated movie
        when(imageService.uploadImage(any(), any())).thenReturn(Image.builder().path("path").build());

        // Act
        GlobalResponse<MovieResponse> response = movieService.update(1L, request, images, thumbnail);

        // Assert
        assertNotNull(response);
        verify(movieRepository).save(movieCaptor.capture());
        Movie updatedMovie = movieCaptor.getValue();
        assertEquals(request.getTitle(), updatedMovie.getTitle()); // Verify updated fields

        verify(imageService, times(2)).uploadImage(any(), any()); // Verify ImageService calls for new images

        // Additional assertions to check if old images were replaced
        assertNotNull(updatedMovie.getThumbnail());
        assertNotEquals("old_thumbnail.jpg", updatedMovie.getThumbnail().getPath()); // Thumbnail should be updated
        assertEquals(1, updatedMovie.getImages().size());
        assertNotEquals("old_image.jpg", updatedMovie.getImages().get(0).getPath()); // Images should be updated
    }


    @Test
    void testDeleteMovie_Success() {
        when(movieRepository.existsById(1L)).thenReturn(true);
        GlobalResponse<Void> response = movieService.delete(1L);
        assertNotNull(response);
        verify(movieRepository).deleteById(1L);
    }

    @Test
    void testDeleteMovie_NotFound() {
        when(movieRepository.existsById(1L)).thenReturn(false);
        GlobalResponse<Void> response = movieService.delete(1L);
        assertNotNull(response);
    }

    @Test
    void testSearchByTitle_Success() {
        Movie movie = createMovieEntity(createMovieRequest());
        Pageable pageable = PageRequest.of(0, 10);
        Page<Movie> moviePage = new PageImpl<>(Collections.singletonList(movie));
        when(movieRepository.findByTitleContainingIgnoreCase(anyString(), any(Pageable.class))).thenReturn(moviePage);

        GlobalResponse<List<MovieResponse>> response = movieService.searchByTitle("test", 0, 10);

        assertNotNull(response);
        assertEquals(1, response.getData().size());
    }

    @Test
    void testFilterByDateRange_Success() {
        Movie movie = createMovieEntity(createMovieRequest());
        Pageable pageable = PageRequest.of(0, 10);
        Page<Movie> moviePage = new PageImpl<>(Collections.singletonList(movie));
        when(movieRepository.findByReleaseDateBetween(any(), any(), any(Pageable.class))).thenReturn(moviePage);

        GlobalResponse<List<MovieResponse>> response = movieService.filterByDateRange(LocalDateTime.now(), LocalDateTime.now(), 0, 10);

        assertNotNull(response);
        assertEquals(1, response.getData().size());
    }

    // Helper methods to create test data
    private MovieRequest createMovieRequest() {
        MovieRequest request = new MovieRequest();
        request.setTitle("Test Movie");
        request.setReleaseDate(LocalDate.now());
        request.setDescription("Test Description");
        return request;
    }

    private Movie createMovieEntity(MovieRequest request) {
        Movie movie = new Movie();
        movie.setId(1L); // Or use a sequence generator in tests
        movie.setTitle(request.getTitle());
        movie.setReleaseDate(request.getReleaseDate());
        movie.setDescription(request.getDescription());
        return movie;
    }

    private MockMultipartFile createMockMultipartFile(String filename) {
        return new MockMultipartFile(filename, filename, "image/jpeg", filename.getBytes());
    }

}