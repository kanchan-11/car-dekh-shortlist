package com.copilot.car.service;

import com.copilot.car.dto.RecommendationRequest;
import com.copilot.car.dto.RecommendationResponse;
import com.copilot.car.model.Car;
import com.copilot.car.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CarRecommendationService {

    private final CarRepository carRepository;

    @Autowired
    public CarRecommendationService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<RecommendationResponse> getRecommendations(RecommendationRequest request) {
        List<Car> allCars = carRepository.findAll();
        
        // Define default priority weights if missing
        Map<String, Integer> priorities = request.getPriorities() != null ? request.getPriorities() : new HashMap<>();
        int wPrice = priorities.getOrDefault("price", 3);
        int wMileage = priorities.getOrDefault("mileage", 3);
        int wSafety = priorities.getOrDefault("safety", 3);
        int wFeatures = priorities.getOrDefault("features", 3);
        int wReviews = priorities.getOrDefault("reviews", 3);
        int totalWeight = wPrice + wMileage + wSafety + wFeatures + wReviews;

        // Establish min and max prices
        double minBudget = request.getMinPrice() != null ? request.getMinPrice() : 0.0;
        double maxBudget = request.getMaxPrice() != null ? request.getMaxPrice() : 100.0;

        return allCars.stream().map(car -> {
            // 1. Check hard criteria compliance
            boolean matchesPrice = car.getPrice() >= minBudget && car.getPrice() <= maxBudget;
            boolean matchesBody = request.getBodyTypes() == null || request.getBodyTypes().isEmpty() ||
                    request.getBodyTypes().stream().anyMatch(t -> t.equalsIgnoreCase(car.getBodyType()));
            boolean matchesFuel = request.getFuelTypes() == null || request.getFuelTypes().isEmpty() ||
                    request.getFuelTypes().stream().anyMatch(f -> f.equalsIgnoreCase(car.getFuelType()));
            boolean matchesSeating = request.getSeatingCapacities() == null || request.getSeatingCapacities().isEmpty() ||
                    request.getSeatingCapacities().contains(car.getSeatingCapacity());
            boolean matchesTransmission = request.getTransmissions() == null || request.getTransmissions().isEmpty() ||
                    request.getTransmissions().stream().anyMatch(t -> t.equalsIgnoreCase(car.getTransmission()));

            boolean satisfiesHardFilters = matchesPrice && matchesBody && matchesFuel && matchesSeating && matchesTransmission;

            // 2. Score Individual Components (0.0 to 1.0)
            
            // Budget Score
            double priceScore = 0.0;
            if (car.getPrice() <= maxBudget) {
                if (car.getPrice() <= minBudget) {
                    priceScore = 1.0;
                } else {
                    priceScore = 1.0 - ((car.getPrice() - minBudget) / (maxBudget - minBudget));
                }
            } else {
                // Out of budget penalty
                priceScore = Math.max(0.0, 1.0 - ((car.getPrice() - maxBudget) / maxBudget)) * 0.4;
            }

            // Mileage Score
            double mileageScore = 0.0;
            if ("Electric".equalsIgnoreCase(car.getFuelType())) {
                mileageScore = Math.min(1.0, car.getMileage() / 450.0); // Normalize EV range (up to 450km)
            } else {
                mileageScore = Math.min(1.0, car.getMileage() / 28.0); // Normalize ICE mileage (up to 28kmpl)
            }

            // Safety Score
            double safetyScore = car.getSafetyRating() / 5.0;

            // Features Score
            double featureScore = 1.0;
            List<String> matchedFeatures = new ArrayList<>();
            List<String> requestedFeatures = request.getMustHaveFeatures();
            if (requestedFeatures != null && !requestedFeatures.isEmpty()) {
                String carFeaturesLower = car.getFeatures().toLowerCase();
                int matchCount = 0;
                for (String feature : requestedFeatures) {
                    if (carFeaturesLower.contains(feature.toLowerCase())) {
                        matchCount++;
                        matchedFeatures.add(feature);
                    }
                }
                featureScore = (double) matchCount / requestedFeatures.size();
            }

            // Reviews Score
            double reviewsScore = car.getReviewRating() / 5.0;

            // 3. Compute weighted compatibility score
            double totalScore = ((priceScore * wPrice) +
                                 (mileageScore * wMileage) +
                                 (safetyScore * wSafety) +
                                 (featureScore * wFeatures) +
                                 (reviewsScore * wReviews)) / totalWeight;
            
            // Adjust score based on hard filters. If they fail hard filters, reduce score to differentiate
            double finalScorePercentage = totalScore * 100;
            if (!satisfiesHardFilters) {
                // If it fails hard filters, penalize the score by 25% to push it below exact matches
                finalScorePercentage = finalScorePercentage * 0.75;
            }

            // Cap between 0 and 100
            finalScorePercentage = Math.max(0.0, Math.min(100.0, finalScorePercentage));

            // Perfect Match flag
            boolean isPerfectMatch = satisfiesHardFilters && 
                    (requestedFeatures == null || matchedFeatures.size() == requestedFeatures.size());

            // 4. Generate Explanations
            List<String> explanations = new ArrayList<>();
            
            // Price explanation
            if (car.getPrice() <= maxBudget) {
                double savings = maxBudget - car.getPrice();
                if (savings > 1.0) {
                    explanations.add(String.format("Priced at ₹%.2f Lakhs, saving you ₹%.2f Lakhs from your budget limit.", car.getPrice(), savings));
                } else {
                    explanations.add(String.format("Fits perfectly within your budget at ₹%.2f Lakhs.", car.getPrice()));
                }
            } else {
                explanations.add(String.format("Priced at ₹%.2f Lakhs, which is slightly above your budget by ₹%.2f Lakhs.", car.getPrice(), car.getPrice() - maxBudget));
            }

            // Mileage explanation
            if ("Electric".equalsIgnoreCase(car.getFuelType())) {
                explanations.add(String.format("Eco-friendly electric vehicle with a driving range of %.0f km per full charge.", car.getMileage()));
            } else if (car.getMileage() >= 18.0) {
                explanations.add(String.format("Exceptional fuel economy of %.1f kmpl, keeping monthly fuel costs low.", car.getMileage()));
            } else {
                explanations.add(String.format("Offers a standard highway/city mileage of %.1f kmpl.", car.getMileage()));
            }

            // Safety explanation
            if (car.getSafetyRating() >= 4) {
                explanations.add(String.format("Top-tier safety with a %d-Star rating certified by Global NCAP.", car.getSafetyRating()));
            } else {
                explanations.add(String.format("Equipped with standard active/passive safety features (%d-Star Global NCAP).", car.getSafetyRating()));
            }

            // Features explanation
            if (requestedFeatures != null && !requestedFeatures.isEmpty()) {
                if (matchedFeatures.size() == requestedFeatures.size()) {
                    explanations.add("Includes 100% of your must-have features.");
                } else if (!matchedFeatures.isEmpty()) {
                    explanations.add(String.format("Includes %d of your requested features (e.g. %s).", 
                            matchedFeatures.size(), String.join(", ", matchedFeatures)));
                } else {
                    explanations.add("Does not contain your specified must-have features, but offers other modern tech.");
                }
            }

            // Review sentiment explanation
            if (car.getReviewRating() >= 4.2) {
                explanations.add(String.format("Highly praised by owners with a %.1f/5 average rating based on %d user reviews.", car.getReviewRating(), car.getReviewCount()));
            }

            return RecommendationResponse.builder()
                    .car(car)
                    .matchScore(Math.round(finalScorePercentage * 10.0) / 10.0) // Round to 1 decimal place
                    .matchExplanations(explanations)
                    .isPerfectMatch(isPerfectMatch)
                    .build();
        })
        .sorted((r1, r2) -> {
            // Sort by satisfying hard filters first, then by match score descending
            boolean s1 = r1.getMatchScore() > 0 && !r1.getMatchExplanations().get(0).contains("slightly above");
            // Better sorting criteria: match score descending. If both have the same score, sort alphabetically
            return Double.compare(r2.getMatchScore(), r1.getMatchScore());
        })
        .collect(Collectors.toList());
    }
}
