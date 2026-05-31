package com.copilot.car.controller;

import com.copilot.car.model.Car;
import com.copilot.car.service.ShortlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shortlist")
public class ShortlistController {

    private final ShortlistService shortlistService;

    @Autowired
    public ShortlistController(ShortlistService shortlistService) {
        this.shortlistService = shortlistService;
    }

    @GetMapping
    public List<Car> getShortlist() {
        return shortlistService.getShortlistedCars();
    }

    @PostMapping("/{carId}")
    public ResponseEntity<?> addToShortlist(@PathVariable Long carId) {
        try {
            boolean added = shortlistService.addToShortlist(carId);
            if (added) {
                return ResponseEntity.ok(Map.of("message", "Car successfully added to shortlist", "success", true));
            } else {
                return ResponseEntity.ok(Map.of("message", "Car is already in the shortlist", "success", false));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of("message", e.getMessage(), "success", false));
        }
    }

    @DeleteMapping("/{carId}")
    public ResponseEntity<?> removeFromShortlist(@PathVariable Long carId) {
        boolean removed = shortlistService.removeFromShortlist(carId);
        if (removed) {
            return ResponseEntity.ok(Map.of("message", "Car removed from shortlist", "success", true));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "Car not found in shortlist", "success", false));
        }
    }

    @GetMapping("/check/{carId}")
    public ResponseEntity<Map<String, Boolean>> checkShortlisted(@PathVariable Long carId) {
        boolean exists = shortlistService.isShortlisted(carId);
        return ResponseEntity.ok(Map.of("isShortlisted", exists));
    }
}
