package com.copilot.car.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "shortlist_items")
public class ShortlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Car car;

    private LocalDateTime savedAt;

    // Constructors
    public ShortlistItem() {
    }

    public ShortlistItem(Long id, Car car, LocalDateTime savedAt) {
        this.id = id;
        this.car = car;
        this.savedAt = savedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }

    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }

    // Static Builder Implementation
    public static ShortlistItemBuilder builder() {
        return new ShortlistItemBuilder();
    }

    public static class ShortlistItemBuilder {
        private Long id;
        private Car car;
        private LocalDateTime savedAt;

        public ShortlistItemBuilder id(Long id) { this.id = id; return this; }
        public ShortlistItemBuilder car(Car car) { this.car = car; return this; }
        public ShortlistItemBuilder savedAt(LocalDateTime savedAt) { this.savedAt = savedAt; return this; }

        public ShortlistItem build() {
            return new ShortlistItem(id, car, savedAt);
        }
    }
}
