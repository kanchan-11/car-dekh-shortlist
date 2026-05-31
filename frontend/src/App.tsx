import React, { useState, useEffect } from 'react';
import { WelcomeHero } from './components/WelcomeHero';
import { FormWizard } from './components/FormWizard';
import { Recommendations } from './components/Recommendations';
import { ComparisonTable } from './components/ComparisonTable';
import type { Car, RecommendationRequest, RecommendationResponse } from './types';
import { api } from './services/api';

type TabType = 'home' | 'wizard' | 'results' | 'shortlist' | 'all';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [shortlist, setShortlist] = useState<Car[]>([]);
  const [results, setResults] = useState<RecommendationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search query for 'all' cars catalog tab
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch initial data
  useEffect(() => {
    fetchShortlist();
    fetchCars();
  }, []);

  const fetchShortlist = async () => {
    try {
      const data = await api.getShortlist();
      setShortlist(data);
    } catch (err) {
      console.error("Failed to load shortlist", err);
    }
  };

  const fetchCars = async () => {
    try {
      const data = await api.getCars();
      setAllCars(data);
    } catch (err) {
      console.error("Failed to load car dataset", err);
    }
  };

  const handleToggleShortlist = async (car: Car) => {
    const isSaved = shortlist.some(item => item.id === car.id);
    try {
      if (isSaved) {
        await api.removeFromShortlist(car.id);
      } else {
        await api.addToShortlist(car.id);
      }
      // Refresh shortlist data
      await fetchShortlist();
    } catch (err) {
      console.error("Failed to update shortlist status", err);
      alert("Error updating shortlist. Make sure the Spring Boot server is running.");
    }
  };

  const handleWizardSubmit = async (request: RecommendationRequest) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getRecommendations(request);
      setResults(data);
      setActiveTab('results');
    } catch (err: any) {
      console.error("Failed to get recommendations", err);
      setError("Unable to process matches. Please verify that the backend server is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  const shortlistIds = shortlist.map(c => c.id);

  // Filter cars for All Catalog
  const filteredCatalog = allCars.filter(car => {
    const searchString = `${car.make} ${car.model} ${car.variant} ${car.bodyType} ${car.fuelType}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="app-shell">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-logo" onClick={() => setActiveTab('home')}>
          <span className="logo-spark">✨</span>
          <div className="logo-text">
            <h2>Car Shortlist</h2>
            <span>Copilot</span>
          </div>
        </div>
        
        <nav className="header-nav">
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} 
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${activeTab === 'wizard' || activeTab === 'results' ? 'active' : ''}`} 
            onClick={() => setActiveTab(results.length > 0 ? 'results' : 'wizard')}
          >
            Match Finder
          </button>
          <button 
            className={`nav-link ${activeTab === 'shortlist' ? 'active' : ''}`} 
            onClick={() => setActiveTab('shortlist')}
          >
            My Shortlist <span className="shortlist-pill">{shortlist.length}</span>
          </button>
          <button 
            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveTab('all')}
          >
            All Cars
          </button>
        </nav>
      </header>

      {/* ERROR BANNER */}
      {error && (
        <div className="error-banner animate-fade-in">
          <span>⚠️</span>
          <p>{error}</p>
          <button className="btn-close-banner" onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <h3>Analyzing Preferences...</h3>
            <p>Our backend decision engine is scoring vehicles against your criteria.</p>
          </div>
        </div>
      )}

      {/* MAIN BODY */}
      <main className="app-main-content">
        
        {activeTab === 'home' && (
          <WelcomeHero 
            onStart={() => setActiveTab('wizard')}
            onGoToShortlist={() => setActiveTab('shortlist')}
            shortlistCount={shortlist.length}
          />
        )}

        {activeTab === 'wizard' && (
          <FormWizard 
            onSubmit={handleWizardSubmit}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'results' && (
          <Recommendations 
            results={results}
            shortlistIds={shortlistIds}
            onToggleShortlist={handleToggleShortlist}
            onRestart={() => setActiveTab('wizard')}
          />
        )}

        {activeTab === 'shortlist' && (
          <ComparisonTable 
            cars={shortlist}
            onRemove={(id) => api.removeFromShortlist(id).then(fetchShortlist)}
            onGoToWizard={() => setActiveTab('wizard')}
          />
        )}

        {activeTab === 'all' && (
          <div className="catalog-container animate-fade-in">
            <div className="catalog-header">
              <div>
                <h2>Comprehensive Catalog</h2>
                <p>Browse our complete seed database of premium cars in the Indian market.</p>
              </div>
              <div className="search-bar-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by make, model, fuel type..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="styled-search-input"
                />
                {searchQuery && <button className="btn-clear-search" onClick={() => setSearchQuery('')}>×</button>}
              </div>
            </div>

            <div className="results-grid">
              {filteredCatalog.map(car => {
                const isSaved = shortlistIds.includes(car.id);
                return (
                  <div key={car.id} className="car-result-card catalog-card">
                    <div className="catalog-card-header">
                      <div>
                        <span className="car-brand">{car.make}</span>
                        <h3>{car.model}</h3>
                        <span className="car-variant">{car.variant}</span>
                      </div>
                      <span className="catalog-price">₹{car.price}L</span>
                    </div>

                    <div className="car-image-container">
                      <img src={car.imageUrl} alt={car.model} className="car-photo" />
                      <span className="catalog-body-badge">{car.bodyType}</span>
                    </div>

                    <table className="mini-specs-table">
                      <tbody>
                        <tr>
                          <td>Fuel / Gearbox</td>
                          <td>{car.fuelType} / {car.transmission}</td>
                        </tr>
                        <tr>
                          <td>ARAI Mileage</td>
                          <td>{car.mileage} {car.fuelType === 'Electric' ? 'km Range' : 'kmpl'}</td>
                        </tr>
                        <tr>
                          <td>NCAP Safety</td>
                          <td>⭐ {car.safetyRating} Stars</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="card-actions">
                      <button 
                        className={`btn ${isSaved ? 'btn-shortlisted' : 'btn-primary'} w-100`} 
                        onClick={() => handleToggleShortlist(car)}
                      >
                        {isSaved ? '❤️ Shortlisted' : '🤍 Add to Shortlist'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>© 2026 Car Shortlist Copilot. Developed as a full-stack assignment for interview evaluation.</p>
        <div className="footer-links">
          <span>Data Sources: CarDekho, CarWale, Global NCAP, ARAI</span>
        </div>
      </footer>
    </div>
  );
};
