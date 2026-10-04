import React, { useState, useEffect } from 'react';
import { X, Key, Check, ShieldAlert } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  // Escape key handler & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
      setApiKey(localStorage.getItem('custom_gemini_api_key') || '');
      setSaved(false);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  const handleSave = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('custom_gemini_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('custom_gemini_api_key');
    }
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleClear = () => {
    localStorage.removeItem('custom_gemini_api_key');
    setApiKey('');
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '480px' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-key-modal-title"
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Key size={18} />
            </div>
            <div>
              <h3 id="api-key-modal-title" style={{ fontSize: '1.1rem' }}>Gemini API Settings</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Optional custom Google Gemini API Key
              </p>
            </div>
          </div>

          <button className="btn-icon" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
            By default, <strong>The Blind Spot</strong> comes equipped with an intelligent critical thinking engine. If you wish to connect your own official Google Gemini API Key for live AI generation, paste it below.
          </p>

          <div className="form-group">
            <label className="form-label" htmlFor="apiKeyInput">
              Gemini API Key
            </label>
            <input
              id="apiKeyInput"
              type="password"
              className="form-textarea"
              style={{ height: '42px', padding: '0 0.85rem' }}
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldAlert size={12} />
              <span>Your key is stored strictly in your local browser storage and never sent to third-party servers.</span>
            </p>
          </div>

          {saved && (
            <div style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.825rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={16} />
              <span>API Key preference updated!</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            {apiKey ? (
              <button className="btn-secondary" type="button" onClick={handleClear} style={{ color: 'var(--danger)' }}>
                Remove Key
              </button>
            ) : <div />}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" type="button" onClick={onClose}>
                Cancel
              </button>
              <button className="btn-primary" type="submit">
                Save Preference
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
