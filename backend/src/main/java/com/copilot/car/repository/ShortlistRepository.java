package com.copilot.car.repository;

import com.copilot.car.model.ShortlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ShortlistRepository extends JpaRepository<ShortlistItem, Long> {
    boolean existsByCarId(Long carId);
    Optional<ShortlistItem> findByCarId(Long carId);
    void deleteByCarId(Long carId);
}
