package com.example.test.vision;

import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.Feature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.example.test.vision.Image;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

@RestController
@CrossOrigin
public class VisionController {

    @Autowired
    private CloudVisionTemplate cloudVisionTemplate;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping("/getFiveLatestRecords")
    @Transactional
    public List<Image> getFiveLatestRecords(){
        return imageRepository.findTop5ByOrderByIdDesc();
    }

    @PostMapping("/extractLocalizedObjects/File")
    public Image extractLocalizedObjectsByFile(@RequestParam MultipartFile file ) throws IOException {
        Resource resource = file.getResource();
        AnnotateImageResponse response = this.cloudVisionTemplate.analyzeImage(resource, Feature.Type.OBJECT_LOCALIZATION);
        List<String> test = response.getLocalizedObjectAnnotationsList().stream().
                map(localizedObjectAnnotation -> localizedObjectAnnotation.getName()).collect(Collectors.toList());
        return imageRepository.save(new Image(resource.getInputStream().readAllBytes(),test));
    }

    @PostMapping("/extractLocalizedObjects/Url")
    public Image extractLocalizedObjectsByUrl(@RequestParam String url ) throws IOException {
        Resource resource = resourceLoader.getResource(url);
        AnnotateImageResponse response = this.cloudVisionTemplate.analyzeImage(resource, Feature.Type.OBJECT_LOCALIZATION);
        List<String> test = response.getLocalizedObjectAnnotationsList().stream().
                map(localizedObjectAnnotation -> localizedObjectAnnotation.getName()).collect(Collectors.toList());
        return imageRepository.save(new Image(resource.getInputStream().readAllBytes(),test));
    }

    @GetMapping("/getImage")
    public Image getImage(@RequestParam Long id){
        return imageRepository.findById(id).get();
    }
}
