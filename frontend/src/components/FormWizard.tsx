import React, { useState, useEffect } from 'react';
import type { RecommendationRequest } from '../types';
import { api } from '../services/api';

interface FormWizardProps {
  onSubmit: (request: RecommendationRequest) => void;
  onCancel: () => void;
}

export const FormWizard: React.FC<FormWizardProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState<number>(1);
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [loadingFeatures, setLoadingFeatures] = useState<boolean>(true);

  // Form State
  const [minPrice, setMinPrice] = useState<number>(5);
  const [maxPrice, setMaxPrice] = useState<number>(20);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedSeating, setSelectedSeating] = useState<number[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  // Weights (1 to 5 scale)
  const [weightPrice, setWeightPrice] = useState<number>(3);
  const [weightMileage, setWeightMileage] = useState<number>(3);
  const [weightSafety, setWeightSafety] = useState<number>(4);
  const [weightFeatures, setWeightFeatures] = useState<number>(3);
  const [weightReviews, setWeightReviews] = useState<number>(3);

  useEffect(() => {
    api.getFeatures()
      .then(data => {
        setAvailableFeatures(data);
        setLoadingFeatures(false);
      })
      .catch(err => {
        console.error("Failed to load features from backend", err);
        // Fallback standard features if backend fails
        setAvailableFeatures(["Sunroof", "Touchscreen", "Cruise Control", "ADAS", "360 Camera", "Ventilated Seats", "Panoramic Sunroof", "Keyless Entry"]);
        setLoadingFeatures(false);
      });
  }, []);

  const handleBodyTypeToggle = (type: string) => {
    setSelectedBodyTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFuelTypeToggle = (type: string) => {
    setSelectedFuelTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleTransmissionToggle = (trans: string) => {
    setSelectedTransmissions(prev =>
      prev.includes(trans) ? prev.filter(t => t !== trans) : [...prev, trans]
    );
  };

  const handleSeatingToggle = (seats: number) => {
    setSelectedSeating(prev =>
      prev.includes(seats) ? prev.filter(s => s !== seats) : [...prev, seats]
    );
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request: RecommendationRequest = {
      minPrice,
      maxPrice,
      bodyTypes: selectedBodyTypes,
      fuelTypes: selectedFuelTypes,
      seatingCapacities: selectedSeating,
      transmissions: selectedTransmissions,
      mustHaveFeatures: selectedFeatures,
      priorities: {
        price: weightPrice,
        mileage: weightMileage,
        safety: weightSafety,
        features: weightFeatures,
        reviews: weightReviews
      }
    };
    onSubmit(request);
  };

  // Preset quick setups
  const applyPreset = (presetName: string) => {
    if (presetName === 'safetyFirst') {
      setWeightSafety(5);
      setWeightPrice(3);
      setWeightMileage(3);
      setWeightFeatures(4);
      setWeightReviews(4);
      setSelectedFeatures(["ADAS"]);
    } else if (presetName === 'budgetDaily') {
      setWeightPrice(5);
      setWeightMileage(5);
      setWeightSafety(3);
      setWeightFeatures(2);
      setWeightReviews(3);
      setSelectedBodyTypes(["Hatchback", "SUV"]);
    } else if (presetName === 'luxuryPremium') {
      setWeightFeatures(5);
      setWeightReviews(5);
      setWeightPrice(1);
      setWeightSafety(5);
      setWeightMileage(2);
      setSelectedFeatures(["Sunroof", "Ventilated Seats", "360 Camera"]);
    }
  };

  return (
    <div className="form-wizard-card animate-fade-in">
      <div className="wizard-header">
        <button className="btn-close" onClick={onCancel}>← Exit Wizard</button>
        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="wizard-form">
        
        {/* STEP 1: BUDGET & BODY TYPE */}
        {step === 1 && (
          <div className="wizard-step animate-slide-in">
            <h2>Step 1: Budget & Style</h2>
            <p className="step-subtitle">Define how much you want to spend and the overall vehicle shape you prefer.</p>

            <div className="form-group">
              <label className="form-label-with-value">
                Budget Range (Lakhs INR):
                <span className="price-display">₹{minPrice}L - ₹{maxPrice}L</span>
              </label>
              <div className="range-double-slider">
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="0.5"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))}
                  className="styled-slider"
                />
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="0.5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))}
                  className="styled-slider"
                />
              </div>
              <small className="form-help-text">Ex-showroom pricing benchmark. Standard options start from ₹5L up to ₹35L.</small>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Body Styles (Select multiple)</label>
              <div className="selection-cards-grid">
                {[
                  { name: 'Hatchback', icon: '🚗', desc: 'Compact, easy to park, highly fuel efficient for cities.' },
                  { name: 'SUV', icon: '🚙', desc: 'Spacious, high ground clearance, commanding view.' },
                  { name: 'Sedan', icon: '🏎️', desc: 'Comfortable ride quality, large trunk, premium status.' },
                  { name: 'MUV', icon: '🚐', desc: 'Maximized utility, multi-row seating for family transport.' }
                ].map(item => (
                  <div
                    key={item.name}
                    className={`selection-card ${selectedBodyTypes.includes(item.name) ? 'selected' : ''}`}
                    onClick={() => handleBodyTypeToggle(item.name)}
                  >
                    <span className="card-icon">{item.icon}</span>
                    <span className="card-name">{item.name}</span>
                    <span className="card-desc">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="wizard-footer">
              <div></div>
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next: Mechanics & Space →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FUEL TYPE, TRANSMISSION & SEATING */}
        {step === 2 && (
          <div className="wizard-step animate-slide-in">
            <h2>Step 2: Mechanics & Practicality</h2>
            <p className="step-subtitle">Specify your fuel preference, gearbox type, and how many passengers you need to carry.</p>

            <div className="form-group">
              <label className="form-label">Fuel Types (Select multiple)</label>
              <div className="checkbox-pill-grid">
                {['Petrol', 'Diesel', 'CNG', 'Electric'].map(fuel => (
                  <button
                    type="button"
                    key={fuel}
                    className={`pill-button ${selectedFuelTypes.includes(fuel) ? 'active' : ''}`}
                    onClick={() => handleFuelTypeToggle(fuel)}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Transmission (Select multiple)</label>
              <div className="checkbox-pill-grid">
                {['Manual', 'Automatic'].map(trans => (
                  <button
                    type="button"
                    key={trans}
                    className={`pill-button ${selectedTransmissions.includes(trans) ? 'active' : ''}`}
                    onClick={() => handleTransmissionToggle(trans)}
                  >
                    {trans}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Seating Capacity (Select multiple)</label>
              <div className="checkbox-pill-grid">
                {[5, 7].map(seats => (
                  <button
                    type="button"
                    key={seats}
                    className={`pill-button ${selectedSeating.includes(seats) ? 'active' : ''}`}
                    onClick={() => handleSeatingToggle(seats)}
                  >
                    {seats} Seater
                  </button>
                ))}
              </div>
            </div>

            <div className="wizard-footer">
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                ← Back
              </button>
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next: Priorities & Features →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: FEATURES & PRIORITY WEIGHTS */}
        {step === 3 && (
          <div className="wizard-step animate-slide-in">
            <h2>Step 3: Must-Haves & Weights</h2>
            <p className="step-subtitle">Customize what features you cannot live without and how to weigh priorities.</p>

            <div className="quick-presets">
              <span className="preset-label">Quick Presets:</span>
              <button type="button" className="btn-preset" onClick={() => applyPreset('safetyFirst')}>🛡️ Safety First</button>
              <button type="button" className="btn-preset" onClick={() => applyPreset('budgetDaily')}>⛽ Budget & Commute</button>
              <button type="button" className="btn-preset" onClick={() => applyPreset('luxuryPremium')}>💎 Tech & Comfort</button>
            </div>

            <div className="form-group">
              <label className="form-label">Must-Have Tech & Comfort Features</label>
              {loadingFeatures ? (
                <div className="loading-spinner-inline">Loading available specs...</div>
              ) : (
                <div className="features-checkbox-grid">
                  {availableFeatures.map(feature => (
                    <label key={feature} className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                      />
                      <span className="checkmark"></span>
                      <span className="feature-text">{feature}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group weights-section">
              <label className="form-label">Priority Weights (1 = Low, 5 = Critical)</label>
              <p className="form-help-text">Our engine will use these weights to score and rank the matching cars.</p>
              
              <div className="weight-sliders-container">
                <div className="weight-slider-item">
                  <div className="weight-info">
                    <span>💰 Purchase Price</span>
                    <span className="weight-val">{weightPrice}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={weightPrice}
                    onChange={(e) => setWeightPrice(Number(e.target.value))}
                    className="styled-slider"
                  />
                </div>

                <div className="weight-slider-item">
                  <div className="weight-info">
                    <span>⛽ Fuel Economy / Range</span>
                    <span className="weight-val">{weightMileage}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={weightMileage}
                    onChange={(e) => setWeightMileage(Number(e.target.value))}
                    className="styled-slider"
                  />
                </div>

                <div className="weight-slider-item">
                  <div className="weight-info">
                    <span>🛡️ NCAP Safety Rating</span>
                    <span className="weight-val">{weightSafety}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={weightSafety}
                    onChange={(e) => setWeightSafety(Number(e.target.value))}
                    className="styled-slider"
                  />
                </div>

                <div className="weight-slider-item">
                  <div className="weight-info">
                    <span>⚙️ Technology & Features</span>
                    <span className="weight-val">{weightFeatures}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={weightFeatures}
                    onChange={(e) => setWeightFeatures(Number(e.target.value))}
                    className="styled-slider"
                  />
                </div>

                <div className="weight-slider-item">
                  <div className="weight-info">
                    <span>⭐ Owner Reviews & Ratings</span>
                    <span className="weight-val">{weightReviews}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={weightReviews}
                    onChange={(e) => setWeightReviews(Number(e.target.value))}
                    className="styled-slider"
                  />
                </div>
              </div>
            </div>

            <div className="wizard-footer">
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                ← Back
              </button>
              <button type="submit" className="btn btn-primary btn-submit">
                ✨ Generate Recommendation Shortlist
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};
