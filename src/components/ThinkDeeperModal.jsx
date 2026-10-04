import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertTriangle, ShieldCheck, Compass } from 'lucide-react';
import { generateDeepDive } from '../services/aiService';

export default function ThinkDeeperModal({ isOpen, onClose, itemType, itemData, fullInputs }) {
  const [loading, setLoading] = useState(true);
  const [deepDiveData, setDeepDiveData] = useState(null);

  // Keyboard Escape key handler & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && itemData) {
      setLoading(true);
      generateDeepDive(itemType, itemData, fullInputs)
        .then((res) => {
          setDeepDiveData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Deep dive error:', err);
          setLoading(false);
        });
    }
  }, [isOpen, itemType, itemData, fullInputs]);

  if (!isOpen || !itemData) return null;

  const itemTitle = itemData.title || itemData.conflict || itemData.risk || itemData.question || 'Selected Blind Spot';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="think-deeper-title"
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 id="think-deeper-title" style={{ fontSize: '1.15rem' }}>Think Deeper Drill-Down</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Deep-dive critical evaluation for: <strong style={{ color: 'var(--primary)' }}>{itemTitle}</strong>
              </p>
            </div>
          </div>

          <button className="btn-icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
            <div className="badge-tag animate-pulse-glow" style={{ margin: '0 auto 1rem auto' }}>
              <Sparkles size={14} />
              <span>Generating Deep-Dive Critical Simulation...</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Stress-testing counterarguments and 12-month projections
            </p>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Scenario Simulation */}
            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--warning)' }}>
                <AlertTriangle size={16} />
                <span>12-Month Scenario Projection</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {deepDiveData?.scenarioSimulation}
              </p>
            </div>

            {/* 3 Counter Arguments */}
            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem', color: 'var(--primary)' }}>
                <Compass size={16} />
                <span>3 Provocative Counter-Arguments</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {deepDiveData?.counterArguments?.map((arg, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {arg}
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagnostic Actions */}
            <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem', color: 'var(--success)' }}>
                <ShieldCheck size={16} />
                <span>Immediate Diagnostic Experiments</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {deepDiveData?.diagnosticActions?.map((act, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {act}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button className="btn-secondary" onClick={onClose}>
                Done Exploring
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
