import React, { useState, useEffect } from 'react';
import { X, History, Trash2, ExternalLink, Calendar } from 'lucide-react';

export default function HistoryModal({ isOpen, onClose, onLoadSavedDecision }) {
  const [historyItems, setHistoryItems] = useState([]);

  // Escape key handler & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
      loadHistory();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  const loadHistory = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('blind_spot_history') || '[]');
      setHistoryItems(saved);
    } catch (e) {
      setHistoryItems([]);
    }
  };

  const handleDelete = (id) => {
    const updated = historyItems.filter(item => item.id !== id);
    localStorage.setItem('blind_spot_history', JSON.stringify(updated));
    setHistoryItems(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved decision analyses?')) {
      localStorage.removeItem('blind_spot_history');
      setHistoryItems([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-modal-title"
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <History size={18} />
            </div>
            <div>
              <h3 id="history-modal-title" style={{ fontSize: '1.15rem' }}>Saved Decisions History</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Revisit past reasoning, reflections, and AI analyses
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {historyItems.length > 0 && (
              <button 
                className="btn-secondary" 
                onClick={handleClearAll}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', color: 'var(--danger)' }}
              >
                Clear All
              </button>
            )}
            <button className="btn-icon" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {historyItems.length === 0 ? (
          <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
            <History size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>No Saved Decisions Yet</h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', maxWidth: '360px', margin: '0.4rem auto 0 auto' }}>
              When you analyze a decision and click "Save Analysis", your structured results will be stored locally here for future reference.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {historyItems.map((item) => (
              <div 
                key={item.id} 
                className="analysis-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onLoadSavedDecision(item);
                  onClose();
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onLoadSavedDecision(item);
                    onClose();
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={12} />
                    {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button 
                      className="btn-icon" 
                      style={{ width: 28, height: 28 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      title="Delete entry"
                      aria-label="Delete decision entry"
                    >
                      <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                    </button>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  {item.inputs.primaryDecision.length > 75 
                    ? item.inputs.primaryDecision.slice(0, 75) + '...' 
                    : item.inputs.primaryDecision}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span className="badge-tag" style={{ margin: 0, fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                    Coverage Score: {item.analysis.coverageScore}%
                  </span>

                  <span style={{ fontSize: '0.775rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>Open Analysis</span>
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
