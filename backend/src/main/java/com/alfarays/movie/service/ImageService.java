package com.alfarays.movie.service;

import com.alfarays.movie.entity.Image;
import com.alfarays.movie.entity.Movie;
import com.alfarays.movie.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {


    @Value("${file.upload.directory}")
    private String uploadDir;

    private final ImageRepository imageRepository;

    public Image uploadImage(MultipartFile file, Movie movie) {
        try {
            // 1. Create the uploads directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 2. Generate a unique filename (UUID) and get the file extension
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String uniqueFilename = UUID.randomUUID() + fileExtension;


            // 3. Construct the full file path (including date subdirectory)
            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy_MM_dd");
            String dateSubdirectory = currentDate.format(formatter);

            Path movieDirectory = uploadPath.resolve(dateSubdirectory);
            if (!Files.exists(movieDirectory)) {
                Files.createDirectories(movieDirectory);
            }

            String finalFileName = movie.getId() + "_" + uniqueFilename;
            Path filePath = movieDirectory.resolve(finalFileName);


            // 4. Save the file to the specified path
            Files.copy(file.getInputStream(), filePath);

            // 5. Construct the URL
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/") // base path for uploads
                    .path(dateSubdirectory + "/") // Added the date subdirectory
                    .path(finalFileName) // Unique file name
                    .toUriString();

            Image image = Image.builder()
                    .path(fileDownloadUri) // Store URL in the database
                    .filename(finalFileName) // Store actual file name
                    .contentType(file.getContentType())
                    .size(file.getSize())
                    .movie(movie)
                    .build();

            return imageRepository.save(image);
        } catch (IOException e) {
            log.error("Error uploading image: ", e);
            throw new RuntimeException("Error uploading image", e);
        }
    }

}
