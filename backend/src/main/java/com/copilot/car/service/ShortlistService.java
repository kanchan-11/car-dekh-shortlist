package com.copilot.car.service;

import com.copilot.car.model.Car;
import com.copilot.car.model.ShortlistItem;
import com.copilot.car.repository.CarRepository;
import com.copilot.car.repository.ShortlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ShortlistService {

    private final ShortlistRepository shortlistRepository;
    private final CarRepository carRepository;

    @Autowired
    public ShortlistService(ShortlistRepository shortlistRepository, CarRepository carRepository) {
        this.shortlistRepository = shortlistRepository;
        this.carRepository = carRepository;
    }

    public List<Car> getShortlistedCars() {
        return shortlistRepository.findAll().stream()
                .map(ShortlistItem::getCar)
                .collect(Collectors.toList());
    }

    public boolean addToShortlist(Long carId) {
        if (shortlistRepository.existsByCarId(carId)) {
            return false; // Already in shortlist
        }
        Optional<Car> carOptional = carRepository.findById(carId);
        if (carOptional.isPresent()) {
            ShortlistItem item = ShortlistItem.builder()
                    .car(carOptional.get())
                    .savedAt(LocalDateTime.now())
                    .build();
            shortlistRepository.save(item);
            return true;
        }
        throw new IllegalArgumentException("Car with ID " + carId + " not found.");
    }

    public boolean removeFromShortlist(Long carId) {
        Optional<ShortlistItem> itemOptional = shortlistRepository.findByCarId(carId);
        if (itemOptional.isPresent()) {
            shortlistRepository.delete(itemOptional.get());
            return true;
        }
        return false;
    }

    public boolean isShortlisted(Long carId) {
        return shortlistRepository.existsByCarId(carId);
    }
}
