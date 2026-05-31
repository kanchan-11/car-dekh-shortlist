package com.copilot.car.dto;

import java.util.List;
import java.util.Map;

public class RecommendationRequest {
    private Double minPrice;
    private Double maxPrice;
    private List<String> bodyTypes;
    private List<String> fuelTypes;
    private List<Integer> seatingCapacities;
    private List<String> transmissions;
    private List<String> mustHaveFeatures;
    private Map<String, Integer> priorities;

    // Constructors
    public RecommendationRequest() {
    }

    public RecommendationRequest(Double minPrice, Double maxPrice, List<String> bodyTypes, List<String> fuelTypes,
                                 List<Integer> seatingCapacities, List<String> transmissions,
                                 List<String> mustHaveFeatures, Map<String, Integer> priorities) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.bodyTypes = bodyTypes;
        this.fuelTypes = fuelTypes;
        this.seatingCapacities = seatingCapacities;
        this.transmissions = transmissions;
        this.mustHaveFeatures = mustHaveFeatures;
        this.priorities = priorities;
    }

    // Getters and Setters
    public Double getMinPrice() { return minPrice; }
    public void setMinPrice(Double minPrice) { this.minPrice = minPrice; }

    public Double getMaxPrice() { return maxPrice; }
    public void setMaxPrice(Double maxPrice) { this.maxPrice = maxPrice; }

    public List<String> getBodyTypes() { return bodyTypes; }
    public void setBodyTypes(List<String> bodyTypes) { this.bodyTypes = bodyTypes; }

    public List<String> getFuelTypes() { return fuelTypes; }
    public void setFuelTypes(List<String> fuelTypes) { this.fuelTypes = fuelTypes; }

    public List<Integer> getSeatingCapacities() { return seatingCapacities; }
    public void setSeatingCapacities(List<Integer> seatingCapacities) { this.seatingCapacities = seatingCapacities; }

    public List<String> getTransmissions() { return transmissions; }
    public void setTransmissions(List<String> transmissions) { this.transmissions = transmissions; }

    public List<String> getMustHaveFeatures() { return mustHaveFeatures; }
    public void setMustHaveFeatures(List<String> mustHaveFeatures) { this.mustHaveFeatures = mustHaveFeatures; }

    public Map<String, Integer> getPriorities() { return priorities; }
    public void setPriorities(Map<String, Integer> priorities) { this.priorities = priorities; }
}
