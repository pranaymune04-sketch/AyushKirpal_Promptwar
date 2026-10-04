import React from 'react';
import { Sparkles, Brain, Eye, Compass } from 'lucide-react';

export default function SkeletonLoader() {
  return (
    <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
      {/* Loading Banner */}
      <div 
        className="disclaimer-banner animate-pulse-glow" 
        style={{ background: 'linear-gradient(135deg, var(--primary-light), var(--bg-surface))', border: '1px solid var(--primary)' }}
      >
        <div className="banner-icon" style={{ background: 'var(--primary)' }}>
          <Brain size={24} className="animate-pulse" />
        </div>
        <div className="banner-text">
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            Evaluating Cognitive Reasoning & Mapping Blind Spots...
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Testing assumptions, stress-testing constraints, and analyzing potential cognitive biases.
          </p>
        </div>
      </div>

      {/* Metrics Skeleton */}
      <div className="metrics-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="metric-card skeleton-card" style={{ height: '90px' }}>
            <div className="skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* 6 Grid Cards Skeleton */}
      <div className="grid-6-cards" style={{ marginTop: '1.5rem' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="feature-card skeleton-card">
            <div className="skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
