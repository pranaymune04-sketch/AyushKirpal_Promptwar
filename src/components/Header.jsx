import React from 'react';
import { Eye, Moon, Sun, Key, History, PlusCircle } from 'lucide-react';

export default function Header({ 
  theme, 
  onToggleTheme, 
  onOpenApiKeyModal, 
  onOpenHistoryModal, 
  onNewDecision,
  currentView
}) {
  const hasCustomKey = Boolean(localStorage.getItem('custom_gemini_api_key'));

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div 
          className="brand-logo" 
          onClick={onNewDecision}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNewDecision(); }}
          aria-label="The Blind Spot Homepage"
        >
          <div className="brand-icon-wrapper">
            <Eye size={22} />
          </div>
          <div className="brand-title">The Blind Spot</div>
        </div>

        <div className="nav-actions">
          {currentView !== 'landing' && (
            <button 
              className="btn-secondary" 
              onClick={onNewDecision}
              title="Start a new decision analysis"
              aria-label="Start New Decision"
            >
              <PlusCircle size={16} />
              <span className="mobile-hide">New Decision</span>
            </button>
          )}

          <button 
            className="btn-icon" 
            onClick={onOpenHistoryModal} 
            title="Saved Decision History"
            aria-label="Saved Decision History"
          >
            <History size={18} />
          </button>

          <button 
            className={`btn-icon ${hasCustomKey ? 'has-key' : ''}`} 
            onClick={onOpenApiKeyModal} 
            title={hasCustomKey ? 'Custom Gemini API Key Configured' : 'Configure Gemini API Key'}
            aria-label="Configure Gemini API Key"
            style={hasCustomKey ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : {}}
          >
            <Key size={18} />
          </button>

          <button 
            className="btn-icon" 
            onClick={onToggleTheme} 
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
