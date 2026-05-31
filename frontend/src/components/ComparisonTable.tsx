import React from 'react';
import type { Car } from '../types';

interface ComparisonTableProps {
  cars: Car[];
  onRemove: (carId: number) => void;
  onGoToWizard: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ cars, onRemove, onGoToWizard }) => {
  if (cars.length === 0) {
    return (
      <div className="empty-shortlist-card animate-fade-in">
        <span>📋</span>
        <h3>Your Shortlist is Empty</h3>
        <p>Shortlist a few cars using the recommendation engine or browsing all models, then compare them here side-by-side.</p>
        <button className="btn btn-primary" onClick={onGoToWizard}>
          🚀 Start Matching Wizard
        </button>
      </div>
    );
  }

  // Calculate Winners
  const getLowestPrice = () => Math.min(...cars.map(c => c.price));
  const getHighestMileage = () => {
    // electric mileage is range (e.g. 250, 461) while ICE is kmpl (e.g. 17, 24).
    // Let's filter ICE/Hybrids/CNG vs electrics. Or just compare numeric mileage.
    return Math.max(...cars.map(c => c.mileage));
  };
  const getHighestSafety = () => Math.max(...cars.map(c => c.safetyRating));
  const getHighestReview = () => Math.max(...cars.map(c => c.reviewRating));
  const getMostFeatures = () => Math.max(...cars.map(c => c.features.split(',').length));

  const lowestPrice = getLowestPrice();
  const highestMileage = getHighestMileage();
  const highestSafety = getHighestSafety();
  const highestReview = getHighestReview();
  const mostFeatures = getMostFeatures();

  return (
    <div className="comparison-container animate-fade-in">
      <div className="comparison-header">
        <h2>Side-by-Side Comparison</h2>
        <p>Analyze differences and identify category leaders highlighted in <span className="winner-glow-text">emerald green</span>.</p>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="sticky-col">Specification</th>
              {cars.map(car => (
                <th key={car.id} className="car-header-cell">
                  <div className="comparison-card-top">
                    <button className="btn-remove-item" onClick={() => onRemove(car.id)} title="Remove from shortlist">×</button>
                    <img src={car.imageUrl} alt={car.model} className="comparison-car-img" />
                    <h4>{car.make} {car.model}</h4>
                    <span className="variant-label">{car.variant}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="spec-label sticky-col">Ex-Showroom Price</td>
              {cars.map(car => {
                const isWinner = car.price === lowestPrice && cars.length > 1;
                return (
                  <td key={car.id} className={isWinner ? 'winner-cell' : ''}>
                    <span className="cell-value">₹{car.price} Lakhs</span>
                    {isWinner && <span className="winner-label">Lowest Price 🏆</span>}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Body Type</td>
              {cars.map(car => (
                <td key={car.id}>
                  <span className="cell-value">{car.bodyType}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Fuel Type</td>
              {cars.map(car => (
                <td key={car.id}>
                  <span className="cell-value">{car.fuelType}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Gearbox / Transmission</td>
              {cars.map(car => (
                <td key={car.id}>
                  <span className="cell-value">{car.transmission}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Mileage / Range</td>
              {cars.map(car => {
                const isWinner = car.mileage === highestMileage && cars.length > 1;
                return (
                  <td key={car.id} className={isWinner ? 'winner-cell' : ''}>
                    <span className="cell-value">
                      {car.mileage} {car.fuelType === 'Electric' ? 'km (Range)' : 'kmpl'}
                    </span>
                    {isWinner && <span className="winner-label">Best Range/Fuel Econ 🏆</span>}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="spec-label sticky-col">NCAP Safety Rating</td>
              {cars.map(car => {
                const isWinner = car.safetyRating === highestSafety && cars.length > 1;
                return (
                  <td key={car.id} className={isWinner ? 'winner-cell' : ''}>
                    <span className="cell-value">⭐ {car.safetyRating} / 5</span>
                    {isWinner && <span className="winner-label">Safest 🏆</span>}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Engine displacement</td>
              {cars.map(car => (
                <td key={car.id}>
                  <span className="cell-value">
                    {car.engineCc > 0 ? `${car.engineCc} cc` : 'Electric Motor'}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Engine Power</td>
              {cars.map(car => (
                <td key={car.id}>
                  <span className="cell-value">{car.powerBhp} Bhp</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Seating Capacity</td>
              {cars.map(car => (
                <td key={car.id}>
                  <span className="cell-value">{car.seatingCapacity} Seater</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Owner Reviews</td>
              {cars.map(car => {
                const isWinner = car.reviewRating === highestReview && cars.length > 1;
                return (
                  <td key={car.id} className={isWinner ? 'winner-cell' : ''}>
                    <span className="cell-value">⭐ {car.reviewRating} ({car.reviewCount} reviews)</span>
                    {isWinner && <span className="winner-label">Best Owner Feedback 🏆</span>}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="spec-label sticky-col">Key Features Onboard</td>
              {cars.map(car => {
                const numFeatures = car.features.split(',').length;
                const isWinner = numFeatures === mostFeatures && cars.length > 1;
                return (
                  <td key={car.id} className={isWinner ? 'winner-cell features-col' : 'features-col'}>
                    <div className="features-compare-list">
                      {car.features.split(',').map(f => (
                        <span key={f} className="feature-pill">{f.trim()}</span>
                      ))}
                    </div>
                    {isWinner && <div className="winner-label-bottom">Most Tech-Packed 🏆</div>}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
