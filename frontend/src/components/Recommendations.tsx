import React, { useState } from 'react';
import type { RecommendationResponse, Car } from '../types';

interface RecommendationsProps {
  results: RecommendationResponse[];
  shortlistIds: number[];
  onToggleShortlist: (car: Car) => void;
  onRestart: () => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  results,
  shortlistIds,
  onToggleShortlist,
  onRestart,
}) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'score-excellent';
    if (score >= 75) return 'score-good';
    return 'score-average';
  };

  const getHighlightBadge = (response: RecommendationResponse) => {
    const { car, isPerfectMatch } = response;
    if (isPerfectMatch) return { text: "Perfect Fit 🌟", class: "badge-perfect" };
    if (car.safetyRating === 5) return { text: "Safety Champion 🛡️", class: "badge-safety" };
    if (car.fuelType === "Electric" || car.mileage >= 22.0) return { text: "Fuel Saver ⛽", class: "badge-mileage" };
    if (car.price < 10.0) return { text: "Budget-Friendly 💰", class: "badge-budget" };
    if (car.reviewRating >= 4.6) return { text: "Highly Rated ⭐", class: "badge-reviews" };
    return null;
  };

  return (
    <div className="recommendations-container animate-fade-in">
      <div className="results-header">
        <div>
          <h2>Your Curated Matches</h2>
          <p>We analyzed our database and calculated compatibility scores based on your weights.</p>
        </div>
        <button className="btn btn-secondary" onClick={onRestart}>
          🔄 Start Over / Adjust Inputs
        </button>
      </div>

      {results.length === 0 ? (
        <div className="no-results-card">
          <span>🏜️</span>
          <h3>No direct matches found</h3>
          <p>Your search constraints might be too strict. Try expanding your budget or removing must-have feature requirements.</p>
          <button className="btn btn-primary" onClick={onRestart}>Adjust Preferences</button>
        </div>
      ) : (
        <div className="results-grid">
          {results.map((res) => {
            const car = res.car;
            const isSaved = shortlistIds.includes(car.id);
            const badge = getHighlightBadge(res);
            
            return (
              <div key={car.id} className="car-result-card">
                <div className="car-card-header">
                  <div className="car-details">
                    <span className="car-brand">{car.make}</span>
                    <h3 className="car-name">{car.model}</h3>
                    <span className="car-variant">{car.variant}</span>
                  </div>
                  
                  {/* Circular Compatibility Score */}
                  <div className={`compatibility-circle ${getMatchScoreColor(res.matchScore)}`}>
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path className="circle"
                        strokeDasharray={`${res.matchScore}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="circle-percentage">
                      <span className="score-num">{res.matchScore}%</span>
                      <span className="score-lbl">Match</span>
                    </div>
                  </div>
                </div>

                <div className="car-image-container">
                  <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="car-photo" />
                  {badge && (
                    <span className={`highlight-badge ${badge.class}`}>{badge.text}</span>
                  )}
                </div>

                {/* Key Spec Badges */}
                <div className="spec-badges-row">
                  <span>₹{car.price}L</span>
                  <span>{car.transmission}</span>
                  <span>{car.fuelType}</span>
                  <span>{car.seatingCapacity} Seater</span>
                  <span>⭐ {car.safetyRating} NCAP</span>
                </div>

                {/* Explanations List */}
                <div className="explanations-box">
                  <h4>Why this car matches your profile:</h4>
                  <ul>
                    {res.matchExplanations.map((exp, idx) => (
                      <li key={idx}>
                        <span className="bullet-check">✓</span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="card-actions">
                  <button className="btn btn-info" onClick={() => setSelectedCar(car)}>
                    🔍 View Detailed Specs
                  </button>
                  <button 
                    className={`btn ${isSaved ? 'btn-shortlisted' : 'btn-primary'}`} 
                    onClick={() => onToggleShortlist(car)}
                  >
                    {isSaved ? '❤️ Shortlisted' : '🤍 Save to Shortlist'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAILED SPEC MODAL */}
      {selectedCar && (
        <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
          <div className="modal-content animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedCar.make} {selectedCar.model}</h2>
                <p className="modal-subtitle">{selectedCar.variant} ({selectedCar.bodyType})</p>
              </div>
              <button className="btn-close-modal" onClick={() => setSelectedCar(null)}>×</button>
            </div>

            <div className="modal-body-grid">
              <div className="modal-image-panel">
                <img src={selectedCar.imageUrl} alt={selectedCar.model} className="modal-photo" />
                <div className="owner-rating-card">
                  <div className="stars-row">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.floor(selectedCar.reviewRating) ? "star filled" : "star"}>★</span>
                    ))}
                    <span className="rating-num">{selectedCar.reviewRating} / 5</span>
                  </div>
                  <small>Based on {selectedCar.reviewCount} verified owners reviews</small>
                </div>
              </div>

              <div className="modal-spec-panel">
                <h3>Technical Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td>Ex-Showroom Price</td>
                      <td className="highlight-cell">₹{selectedCar.price} Lakhs</td>
                    </tr>
                    <tr>
                      <td>ARAI Mileage / Range</td>
                      <td>
                        {selectedCar.mileage} {selectedCar.fuelType === 'Electric' ? 'km (Full Range)' : 'kmpl'}
                      </td>
                    </tr>
                    <tr>
                      <td>NCAP Safety Rating</td>
                      <td>
                        {selectedCar.safetyRating}-Star NCAP Rating
                      </td>
                    </tr>
                    <tr>
                      <td>Engine Displacement</td>
                      <td>{selectedCar.engineCc > 0 ? `${selectedCar.engineCc} cc` : 'N/A (Electric Motor)'}</td>
                    </tr>
                    <tr>
                      <td>Engine Power</td>
                      <td>{selectedCar.powerBhp} Bhp</td>
                    </tr>
                    <tr>
                      <td>Gearbox Type</td>
                      <td>{selectedCar.transmission}</td>
                    </tr>
                    <tr>
                      <td>Seating Capacity</td>
                      <td>{selectedCar.seatingCapacity} Seater</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="sub-header">Features Onboard</h3>
                <div className="modal-features-chips">
                  {selectedCar.features.split(',').map((f) => (
                    <span key={f} className="feature-chip">{f.trim()}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className={`btn ${shortlistIds.includes(selectedCar.id) ? 'btn-shortlisted' : 'btn-primary'}`} 
                onClick={() => {
                  onToggleShortlist(selectedCar);
                }}
              >
                {shortlistIds.includes(selectedCar.id) ? '❤️ Remove from Shortlist' : '🤍 Save to Shortlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
