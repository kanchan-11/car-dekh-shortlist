export interface Car {
  id: number;
  make: string;
  model: string;
  variant: string;
  price: number; // in Lakhs
  bodyType: string; // SUV, Sedan, Hatchback, MUV
  fuelType: string; // Petrol, Diesel, CNG, Electric
  seatingCapacity: number;
  transmission: string; // Manual, Automatic
  mileage: number; // kmpl or km range
  safetyRating: number; // stars
  engineCc: number;
  powerBhp: number;
  features: string; // comma-separated
  reviewRating: number;
  reviewCount: number;
  imageUrl: string;
}

export interface RecommendationRequest {
  minPrice: number | null;
  maxPrice: number | null;
  bodyTypes: string[];
  fuelTypes: string[];
  seatingCapacities: number[];
  transmissions: string[];
  mustHaveFeatures: string[];
  priorities: {
    price: number;
    mileage: number;
    safety: number;
    features: number;
    reviews: number;
  };
}

export interface RecommendationResponse {
  car: Car;
  matchScore: number;
  matchExplanations: string[];
  isPerfectMatch: boolean;
}
