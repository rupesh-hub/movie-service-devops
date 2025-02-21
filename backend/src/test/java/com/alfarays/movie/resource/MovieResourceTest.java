package com.alfarays.movie.resource;

import com.alfarays.movie.model.MovieRequest;
import com.alfarays.movie.model.MovieResponse;
import com.alfarays.movie.resource.MovieResource;
import com.alfarays.movie.service.IMovieService;
import com.alfarays.shared.GlobalResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class MovieResourceTest {

    @Mock
    private IMovieService movieService;

    @InjectMocks
    private MovieResource movieResource;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(movieResource).build();
    }

    @Test
    void testCreateMovie() throws Exception {
        // Arrange
        MovieRequest request = new MovieRequest();
        request.setTitle("Test Movie");
        request.setReleaseDate(LocalDate.now());
        request.setDescription("Test Description");

        MockMultipartFile thumbnail = new MockMultipartFile("thumbnail", "thumbnail.jpg", "image/jpeg", "thumbnail".getBytes());
        List<MockMultipartFile> images = Collections.singletonList(new MockMultipartFile("images", "image1.jpg", "image/jpeg", "image1".getBytes()));

        MovieResponse movieResponse = MovieResponse.builder().title("Test Movie").build();
        when(movieService.post(any(), any(), any())).thenReturn(GlobalResponse.success(movieResponse));

        // Act & Assert
        mockMvc.perform(multipart("/movies")
                        .file(thumbnail)
                        .file(images.get(0))
                        .param("title", request.getTitle())
                        .param("releaseDate", request.getReleaseDate().format(DateTimeFormatter.ISO_DATE))
                        .param("description", request.getDescription())
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.title").value(request.getTitle()));
    }

    @Test
    void testGetAllMovies() throws Exception {
        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setTitle("Test Movie");
        when(movieService.getAll(0, 10)).thenReturn(GlobalResponse.success(Collections.singletonList(movieResponse)));

        mockMvc.perform(get("/movies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title").value("Test Movie"));
    }

    @Test
    void testGetMovieById() throws Exception {
        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setTitle("Test Movie");
        when(movieService.getById(1L)).thenReturn(GlobalResponse.success(movieResponse));

        mockMvc.perform(get("/movies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value("Test Movie"));
    }

//    @Test
//    void testUpdateMovie() throws Exception {
//        MovieRequest request = new MovieRequest();
//        request.setTitle("Updated Movie");
//        request.setReleaseDate(LocalDate.now());
//        request.setDescription("Updated Description");
//
//        MockMultipartFile thumbnail = new MockMultipartFile("thumbnail", "thumbnail.jpg", "image/jpeg", "thumbnail".getBytes());
//        List<MockMultipartFile> images = Collections.singletonList(new MockMultipartFile("images", "image1.jpg", "image/jpeg", "image1".getBytes()));
//
//
//        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.multipart("/movies/1")
//                        .file(thumbnail) // Only if sending files
//                        .file(images.get(0)) // Only if sending files
//                        .param("title", request.getTitle())
//                        .param("releaseDate", request.getReleaseDate().format(DateTimeFormatter.ISO_DATE))
//                        .param("description", request.getDescription())
//                        .contentType(MediaType.MULTIPART_FORM_DATA))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.title").value(request.getTitle()))
//                .andReturn();
//
//        String content = result.getResponse().getContentAsString();
//        System.out.println("Response Content: " + content);
//
//    }

    @Test
    void testDeleteMovie() throws Exception {
        when(movieService.delete(1L)).thenReturn(GlobalResponse.success(null));

        mockMvc.perform(delete("/movies/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testSearchMoviesByTitle() throws Exception {
        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setTitle("Test Movie");
        when(movieService.searchByTitle("Test", 0, 10)).thenReturn(GlobalResponse.success(Collections.singletonList(movieResponse)));

        mockMvc.perform(get("/movies/search")
                        .param("title", "Test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title").value("Test Movie"));
    }

    @Test
    void testFilterMoviesByDateRange() throws Exception {
        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setTitle("Test Movie");
        LocalDateTime now = LocalDateTime.now();
        when(movieService.filterByDateRange(now, now, 0, 10)).thenReturn(GlobalResponse.success(Collections.singletonList(movieResponse)));

        mockMvc.perform(get("/movies/filter")
                        .param("startDate", now.format(DateTimeFormatter.ISO_DATE_TIME))
                        .param("endDate", now.format(DateTimeFormatter.ISO_DATE_TIME)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].title").value("Test Movie"));
    }

}