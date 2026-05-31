package com.copilot.car.config;

import com.copilot.car.model.Car;
import com.copilot.car.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CarRepository carRepository;

    @Autowired
    public DataInitializer(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (carRepository.count() > 0) {
            return; // Data already seeded
        }

        // Image constants from Unsplash for visual premium feel
        String suvUrl = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80";
        String sedanUrl = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80";
        String hatchbackUrl = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80";
        String muvUrl = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80";

        List<Car> seedCars = Arrays.asList(
            // 1. Tata Nexon
            Car.builder()
                .make("Tata")
                .model("Nexon")
                .variant("Creative Plus")
                .price(11.5) // Lakhs
                .bodyType("SUV")
                .fuelType("Petrol")
                .seatingCapacity(5)
                .transmission("Manual")
                .mileage(17.4) // kmpl (ARAI Certified)
                .safetyRating(5) // Global NCAP
                .engineCc(1199)
                .powerBhp(118.0)
                .features("Sunroof,Touchscreen,Cruise Control,360 Camera,Ventilated Seats")
                .reviewRating(4.3)
                .reviewCount(120)
                .imageUrl(suvUrl)
                .build(),

            // 2. Hyundai Creta
            Car.builder()
                .make("Hyundai")
                .model("Creta")
                .variant("SX Tech")
                .price(16.8)
                .bodyType("SUV")
                .fuelType("Petrol")
                .seatingCapacity(5)
                .transmission("Automatic")
                .mileage(15.8) // kmpl (ARAI Certified)
                .safetyRating(3) // Global NCAP (Current rating benchmark)
                .engineCc(1497)
                .powerBhp(113.0)
                .features("Sunroof,Touchscreen,Cruise Control,ADAS,360 Camera")
                .reviewRating(4.5)
                .reviewCount(230)
                .imageUrl(suvUrl)
                .build(),

            // 3. Maruti Suzuki Swift
            Car.builder()
                .make("Maruti Suzuki")
                .model("Swift")
                .variant("VXI")
                .price(6.8)
                .bodyType("Hatchback")
                .fuelType("Petrol")
                .seatingCapacity(5)
                .transmission("Manual")
                .mileage(24.8) // kmpl (ARAI Certified)
                .safetyRating(3) // Global NCAP
                .engineCc(1197)
                .powerBhp(88.5)
                .features("Touchscreen,Steering Controls,Keyless Entry")
                .reviewRating(4.1)
                .reviewCount(410)
                .imageUrl(hatchbackUrl)
                .build(),

            // 4. Mahindra XUV700
            Car.builder()
                .make("Mahindra")
                .model("XUV700")
                .variant("AX7 Luxury Pack")
                .price(24.5)
                .bodyType("SUV")
                .fuelType("Diesel")
                .seatingCapacity(7)
                .transmission("Automatic")
                .mileage(13.5)
                .safetyRating(5) // Global NCAP (Safest family SUV candidate)
                .engineCc(2198)
                .powerBhp(182.0)
                .features("Sunroof,Touchscreen,Cruise Control,ADAS,360 Camera,Ventilated Seats,Panoramic Sunroof")
                .reviewRating(4.7)
                .reviewCount(340)
                .imageUrl(suvUrl)
                .build(),

            // 5. Tata Punch
            Car.builder()
                .make("Tata")
                .model("Punch")
                .variant("Adventure")
                .price(7.2)
                .bodyType("SUV")
                .fuelType("Petrol")
                .seatingCapacity(5)
                .transmission("Manual")
                .mileage(20.1)
                .safetyRating(5) // Global NCAP 5-Star (Best budget safety)
                .engineCc(1199)
                .powerBhp(86.6)
                .features("Touchscreen,Steering Controls,Dual Airbags")
                .reviewRating(4.2)
                .reviewCount(180)
                .imageUrl(suvUrl)
                .build(),

            // 6. Kia Seltos
            Car.builder()
                .make("Kia")
                .model("Seltos")
                .variant("HTX Plus")
                .price(18.2)
                .bodyType("SUV")
                .fuelType("Diesel")
                .seatingCapacity(5)
                .transmission("Automatic")
                .mileage(19.1)
                .safetyRating(3)
                .engineCc(1493)
                .powerBhp(114.0)
                .features("Sunroof,Touchscreen,Cruise Control,Ventilated Seats,360 Camera")
                .reviewRating(4.4)
                .reviewCount(150)
                .imageUrl(suvUrl)
                .build(),

            // 7. MG ZS EV
            Car.builder()
                .make("MG")
                .model("ZS EV")
                .variant("Exclusive")
                .price(22.8)
                .bodyType("SUV")
                .fuelType("Electric")
                .seatingCapacity(5)
                .transmission("Automatic")
                .mileage(461.0) // km range per charge (ARAI Certified)
                .safetyRating(5)
                .engineCc(0) // Electric
                .powerBhp(174.3)
                .features("Sunroof,Touchscreen,Cruise Control,ADAS,360 Camera,Panoramic Sunroof")
                .reviewRating(4.6)
                .reviewCount(95)
                .imageUrl(suvUrl)
                .build(),

            // 8. Tata Tiago EV
            Car.builder()
                .make("Tata")
                .model("Tiago EV")
                .variant("XT Medium Range")
                .price(9.3)
                .bodyType("Hatchback")
                .fuelType("Electric")
                .seatingCapacity(5)
                .transmission("Automatic")
                .mileage(250.0) // km range
                .safetyRating(4) // Based on ICE counterpart rating
                .engineCc(0)
                .powerBhp(74.0)
                .features("Touchscreen,Automatic AC,Connected Car Tech")
                .reviewRating(4.2)
                .reviewCount(110)
                .imageUrl(hatchbackUrl)
                .build(),

            // 9. Toyota Urban Cruiser Hyryder
            Car.builder()
                .make("Toyota")
                .model("Hyryder")
                .variant("V Hybrid")
                .price(19.9)
                .bodyType("SUV")
                .fuelType("Petrol") // Strong Hybrid Petrol
                .seatingCapacity(5)
                .transmission("Automatic")
                .mileage(27.97) // Strong Hybrid high mileage
                .safetyRating(4)
                .engineCc(1490)
                .powerBhp(91.0)
                .features("Sunroof,Touchscreen,Cruise Control,360 Camera,Ventilated Seats,Panoramic Sunroof")
                .reviewRating(4.5)
                .reviewCount(80)
                .imageUrl(suvUrl)
                .build(),

            // 10. Maruti Suzuki Brezza
            Car.builder()
                .make("Maruti Suzuki")
                .model("Brezza")
                .variant("ZXI Plus")
                .price(13.9)
                .bodyType("SUV")
                .fuelType("Petrol")
                .seatingCapacity(5)
                .transmission("Automatic")
                .mileage(19.8)
                .safetyRating(4) // Global NCAP
                .engineCc(1462)
                .powerBhp(101.6)
                .features("Sunroof,Touchscreen,Cruise Control,360 Camera,Head Up Display")
                .reviewRating(4.3)
                .reviewCount(160)
                .imageUrl(suvUrl)
                .build(),

            // 11. Honda City
            Car.builder()
                .make("Honda")
                .model("City")
                .variant("ZX")
                .price(16.2)
                .bodyType("Sedan")
                .fuelType("Petrol")
                .seatingCapacity(5)
                .transmission("Automatic")
                .mileage(18.4)
                .safetyRating(5) // Global NCAP
                .engineCc(1498)
                .powerBhp(119.3)
                .features("Sunroof,Touchscreen,Cruise Control,ADAS,Lane Watch Camera")
                .reviewRating(4.6)
                .reviewCount(210)
                .imageUrl(sedanUrl)
                .build(),

            // 12. Hyundai Verna
            Car.builder()
                .make("Hyundai")
                .model("Verna")
                .variant("SX Opt Turbo")
                .price(17.4)
                .bodyType("Sedan")
                .fuelType("Petrol")
                .seatingCapacity(5)
                .transmission("Automatic")
                .mileage(20.6)
                .safetyRating(5) // Global NCAP (2023 Verna 5 star)
                .engineCc(1482)
                .powerBhp(158.0)
                .features("Sunroof,Touchscreen,Cruise Control,ADAS,Ventilated Seats")
                .reviewRating(4.6)
                .reviewCount(140)
                .imageUrl(sedanUrl)
                .build(),

            // 13. Maruti Suzuki Dzire
            Car.builder()
                .make("Maruti Suzuki")
                .model("Dzire")
                .variant("ZXI")
                .price(8.5)
                .bodyType("Sedan")
                .fuelType("Petrol")
                .seatingCapacity(5)
                .transmission("Manual")
                .mileage(24.7) // Highly efficient petrol
                .safetyRating(5) // New 2024 Dzire is 5-star NCAP
                .engineCc(1197)
                .powerBhp(88.5)
                .features("Sunroof,Touchscreen,Automatic AC")
                .reviewRating(4.2)
                .reviewCount(190)
                .imageUrl(sedanUrl)
                .build(),

            // 14. Maruti Suzuki Ertiga
            Car.builder()
                .make("Maruti Suzuki")
                .model("Ertiga")
                .variant("ZXI CNG")
                .price(11.6)
                .bodyType("MUV")
                .fuelType("CNG")
                .seatingCapacity(7)
                .transmission("Manual")
                .mileage(26.11) // km/kg CNG high mileage
                .safetyRating(3)
                .engineCc(1462)
                .powerBhp(86.6)
                .features("Touchscreen,Steering Controls,Automatic AC")
                .reviewRating(4.4)
                .reviewCount(320)
                .imageUrl(muvUrl)
                .build(),

            // 15. Toyota Innova Hycross
            Car.builder()
                .make("Toyota")
                .model("Innova Hycross")
                .variant("VX Hybrid")
                .price(26.0)
                .bodyType("MUV")
                .fuelType("Petrol") // Strong Hybrid
                .seatingCapacity(7)
                .transmission("Automatic")
                .mileage(23.24) // High hybrid mileage for MUV
                .safetyRating(5)
                .engineCc(1987)
                .powerBhp(183.7)
                .features("Sunroof,Touchscreen,Cruise Control,360 Camera,Panoramic Sunroof")
                .reviewRating(4.8)
                .reviewCount(175)
                .imageUrl(muvUrl)
                .build()
        );

        carRepository.saveAll(seedCars);
        System.out.println(">>> Car Shortlist Copilot Database seeded successfully with " + carRepository.count() + " vehicles.");
    }
}
