package com.copilot.car.controller;

import com.copilot.car.dto.RecommendationRequest;
import com.copilot.car.dto.RecommendationResponse;
import com.copilot.car.model.Car;
import com.copilot.car.repository.CarRepository;
import com.copilot.car.service.CarRecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarRepository carRepository;
    private final CarRecommendationService recommendationService;

    @Autowired
    public CarController(CarRepository carRepository, CarRecommendationService recommendationService) {
        this.carRepository = carRepository;
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @GetMapping("/features")
    public List<String> getAllFeatures() {
        List<Car> cars = carRepository.findAll();
        Set<String> uniqueFeatures = new TreeSet<>();
        
        for (Car car : cars) {
            if (car.getFeatures() != null && !car.getFeatures().trim().isEmpty()) {
                String[] featureArray = car.getFeatures().split(",");
                for (String feature : featureArray) {
                    uniqueFeatures.add(feature.trim());
                }
            }
        }
        return new ArrayList<>(uniqueFeatures);
    }

    @PostMapping("/recommendations")
    public List<RecommendationResponse> getRecommendations(@RequestBody RecommendationRequest request) {
        return recommendationService.getRecommendations(request);
    }
}
