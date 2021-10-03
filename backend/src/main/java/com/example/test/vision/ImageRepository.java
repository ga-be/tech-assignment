package com.example.test.vision;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ImageRepository extends CrudRepository<Image,Long> {
    List<Image> findTop5ByOrderByIdDesc();
}
