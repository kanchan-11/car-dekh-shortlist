import React, { useState } from 'react';

interface WelcomeHeroProps {
  onStart: () => void;
  onGoToShortlist: () => void;
  shortlistCount: number;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ onStart, onGoToShortlist, shortlistCount }) => {
  const [confusionLevel, setConfusionLevel] = useState<number>(50);

  const getConfusionDescription = (level: number) => {
    if (level < 25) {
      return {
        label: "Just Comparing Options",
        emoji: "🧐",
        desc: "You have 2 or 3 models in mind and need a detailed, objective head-to-head comparison to pick the final winner.",
        action: "Compare Saved Cars"
      };
    } else if (level < 75) {
      return {
        label: "A Bit Overwhelmed",
        emoji: "🤔",
        desc: "You know your budget and general body style, but are drowning in variant lists, engine specifications, and feature jargon.",
        action: "Start Matching"
      };
    } else {
      return {
        label: "Completely Clueless!",
        emoji: "🤯",
        desc: "You don't know if you should buy a petrol SUV or a diesel hatchback. You need step-by-step guidance from scratch.",
        action: "Find My Matches"
      };
    }
  };

  const status = getConfusionDescription(confusionLevel);

  return (
    <div className="welcome-hero-container">
      <div className="hero-badge">Smart Decision Assistant</div>
      <h1 className="hero-title">
        Decide on your next car <span className="text-gradient">with confidence</span>
      </h1>
      <p className="hero-subtitle">
        Say goodbye to analysis paralysis. Our multi-criteria ranking engine takes your budget, safety priorities, must-have features, and mileage needs, and maps them to a clear shortlist.
      </p>

      <div className="confusion-card">
        <h3>How confused are you about your purchase?</h3>
        <div className="slider-wrapper">
          <div className="slider-labels">
            <span>Just Comparing</span>
            <span>Unsure</span>
            <span>Totally Lost</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={confusionLevel}
            onChange={(e) => setConfusionLevel(Number(e.target.value))}
            className="styled-slider"
          />
        </div>

        <div className="confusion-status animate-fade-in">
          <div className="status-header">
            <span className="status-emoji">{status.emoji}</span>
            <div className="status-titles">
              <span className="status-label">{status.label}</span>
              <span className="status-level">{confusionLevel}% Confusion</span>
            </div>
          </div>
          <p className="status-desc">{status.desc}</p>
        </div>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onStart}>
            {status.action}
          </button>
          
          {shortlistCount > 0 && (
            <button className="btn btn-secondary" onClick={onGoToShortlist}>
              View Shortlist ({shortlistCount})
            </button>
          )}
        </div>
      </div>

      <div className="hero-features-grid">
        <div className="feature-item">
          <div className="feature-icon">📊</div>
          <h4>Weighted Decision Scoring</h4>
          <p>Score cars based on what matters to you: safety, mileage, price, features, or reviews.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🛡️</div>
          <h4>Safety & Comfort Focus</h4>
          <p>Highlighting Global NCAP crash ratings and specific comfort variants directly.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💡</div>
          <h4>Match Explanations</h4>
          <p>We tell you exactly *why* a car matches your profile, using clear, backend-generated bullets.</p>
        </div>
      </div>
    </div>
  );
};
