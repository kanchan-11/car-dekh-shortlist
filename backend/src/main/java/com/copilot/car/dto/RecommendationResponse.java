package com.copilot.car.dto;

import com.copilot.car.model.Car;
import java.util.List;

public class RecommendationResponse {
    private Car car;
    private Double matchScore; // compatibility percentage (0 - 100)
    private List<String> matchExplanations; // bullet explanations
    private Boolean isPerfectMatch; // flag

    // Constructors
    public RecommendationResponse() {
    }

    public RecommendationResponse(Car car, Double matchScore, List<String> matchExplanations, Boolean isPerfectMatch) {
        this.car = car;
        this.matchScore = matchScore;
        this.matchExplanations = matchExplanations;
        this.isPerfectMatch = isPerfectMatch;
    }

    // Getters and Setters
    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }

    public Double getMatchScore() { return matchScore; }
    public void setMatchScore(Double matchScore) { this.matchScore = matchScore; }

    public List<String> getMatchExplanations() { return matchExplanations; }
    public void setMatchExplanations(List<String> matchExplanations) { this.matchExplanations = matchExplanations; }

    public Boolean getIsPerfectMatch() { return isPerfectMatch; }
    public void setIsPerfectMatch(Boolean isPerfectMatch) { this.isPerfectMatch = isPerfectMatch; }

    // Static Builder Implementation
    public static RecommendationResponseBuilder builder() {
        return new RecommendationResponseBuilder();
    }

    public static class RecommendationResponseBuilder {
        private Car car;
        private Double matchScore;
        private List<String> matchExplanations;
        private Boolean isPerfectMatch;

        public RecommendationResponseBuilder car(Car car) { this.car = car; return this; }
        public RecommendationResponseBuilder matchScore(Double matchScore) { this.matchScore = matchScore; return this; }
        public RecommendationResponseBuilder matchExplanations(List<String> matchExplanations) { this.matchExplanations = matchExplanations; return this; }
        public RecommendationResponseBuilder isPerfectMatch(Boolean isPerfectMatch) { this.isPerfectMatch = isPerfectMatch; return this; }

        public RecommendationResponse build() {
            return new RecommendationResponse(car, matchScore, matchExplanations, isPerfectMatch);
        }
    }
}
