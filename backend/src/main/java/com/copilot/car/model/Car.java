package com.copilot.car.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String make;
    private String model;
    private String variant;
    private Double price; // In Lakhs (INR)
    private String bodyType; // SUV, Sedan, Hatchback, MUV
    private String fuelType; // Petrol, Diesel, CNG, Electric
    private Integer seatingCapacity;
    private String transmission; // Manual, Automatic
    private Double mileage; // kmpl or km/charge
    private Integer safetyRating; // Global NCAP / Bharat NCAP stars (1-5)
    private Integer engineCc; // Engine displacement
    private Double powerBhp; // Power output
    private String features; // Comma-separated list of key features
    private Double reviewRating; // User review rating average (1.0 - 5.0)
    private Integer reviewCount; // Number of user reviews
    private String imageUrl; // Image placeholder or thumbnail URL

    // Constructors
    public Car() {
    }

    public Car(Long id, String make, String model, String variant, Double price, String bodyType, String fuelType,
               Integer seatingCapacity, String transmission, Double mileage, Integer safetyRating, Integer engineCc,
               Double powerBhp, String features, Double reviewRating, Integer reviewCount, String imageUrl) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.variant = variant;
        this.price = price;
        this.bodyType = bodyType;
        this.fuelType = fuelType;
        this.seatingCapacity = seatingCapacity;
        this.transmission = transmission;
        this.mileage = mileage;
        this.safetyRating = safetyRating;
        this.engineCc = engineCc;
        this.powerBhp = powerBhp;
        this.features = features;
        this.reviewRating = reviewRating;
        this.reviewCount = reviewCount;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getVariant() { return variant; }
    public void setVariant(String variant) { this.variant = variant; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getBodyType() { return bodyType; }
    public void setBodyType(String bodyType) { this.bodyType = bodyType; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public Integer getSeatingCapacity() { return seatingCapacity; }
    public void setSeatingCapacity(Integer seatingCapacity) { this.seatingCapacity = seatingCapacity; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public Double getMileage() { return mileage; }
    public void setMileage(Double mileage) { this.mileage = mileage; }

    public Integer getSafetyRating() { return safetyRating; }
    public void setSafetyRating(Integer safetyRating) { this.safetyRating = safetyRating; }

    public Integer getEngineCc() { return engineCc; }
    public void setEngineCc(Integer engineCc) { this.engineCc = engineCc; }

    public Double getPowerBhp() { return powerBhp; }
    public void setPowerBhp(Double powerBhp) { this.powerBhp = powerBhp; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }

    public Double getReviewRating() { return reviewRating; }
    public void setReviewRating(Double reviewRating) { this.reviewRating = reviewRating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    // Static Builder Implementation
    public static CarBuilder builder() {
        return new CarBuilder();
    }

    public static class CarBuilder {
        private Long id;
        private String make;
        private String model;
        private String variant;
        private Double price;
        private String bodyType;
        private String fuelType;
        private Integer seatingCapacity;
        private String transmission;
        private Double mileage;
        private Integer safetyRating;
        private Integer engineCc;
        private Double powerBhp;
        private String features;
        private Double reviewRating;
        private Integer reviewCount;
        private String imageUrl;

        public CarBuilder id(Long id) { this.id = id; return this; }
        public CarBuilder make(String make) { this.make = make; return this; }
        public CarBuilder model(String model) { this.model = model; return this; }
        public CarBuilder variant(String variant) { this.variant = variant; return this; }
        public CarBuilder price(Double price) { this.price = price; return this; }
        public CarBuilder bodyType(String bodyType) { this.bodyType = bodyType; return this; }
        public CarBuilder fuelType(String fuelType) { this.fuelType = fuelType; return this; }
        public CarBuilder seatingCapacity(Integer seatingCapacity) { this.seatingCapacity = seatingCapacity; return this; }
        public CarBuilder transmission(String transmission) { this.transmission = transmission; return this; }
        public CarBuilder mileage(Double mileage) { this.mileage = mileage; return this; }
        public CarBuilder safetyRating(Integer safetyRating) { this.safetyRating = safetyRating; return this; }
        public CarBuilder engineCc(Integer engineCc) { this.engineCc = engineCc; return this; }
        public CarBuilder powerBhp(Double powerBhp) { this.powerBhp = powerBhp; return this; }
        public CarBuilder features(String features) { this.features = features; return this; }
        public CarBuilder reviewRating(Double reviewRating) { this.reviewRating = reviewRating; return this; }
        public CarBuilder reviewCount(Integer reviewCount) { this.reviewCount = reviewCount; return this; }
        public CarBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }

        public Car build() {
            return new Car(id, make, model, variant, price, bodyType, fuelType, seatingCapacity, transmission, mileage, safetyRating, engineCc, powerBhp, features, reviewRating, reviewCount, imageUrl);
        }
    }
}
