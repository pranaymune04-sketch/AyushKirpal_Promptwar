import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DecisionForm from './components/DecisionForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import SkeletonLoader from './components/SkeletonLoader';
import ApiKeyModal from './components/ApiKeyModal';
import HistoryModal from './components/HistoryModal';
import { analyzeDecision } from './services/aiService';
import './App.css';

export default function App() {
  // Theme state (system default or light mode)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('blind_spot_theme') || 'light';
  });

  // Navigation / View state ('landing' | 'form' | 'dashboard')
  const [currentView, setCurrentView] = useState('landing');

  // Form inputs & AI result state
  const [inputs, setInputs] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modals state
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Apply theme class to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('blind_spot_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleStartFromLanding = () => {
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPreset = (preset) => {
    setInputs(preset);
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (formData) => {
    setInputs(formData);
    setIsLoading(true);
    setError(null);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const result = await analyzeDecision(formData);
      setAnalysis(result);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('An error occurred while analyzing your decision. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeAgain = () => {
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewDecision = () => {
    setInputs(null);
    setAnalysis(null);
    setError(null);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAnalysis = (record) => {
    try {
      const existing = JSON.parse(localStorage.getItem('blind_spot_history') || '[]');
      const newRecord = {
        id: 'ds-' + Date.now(),
        ...record
      };
      // Cap LocalStorage history to top 20 entries to prevent storage bloat
      const updated = [newRecord, ...existing].slice(0, 20);
      localStorage.setItem('blind_spot_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleLoadSavedDecision = (savedRecord) => {
    setInputs(savedRecord.inputs);
    setAnalysis(savedRecord.analysis);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
        onNewDecision={handleNewDecision}
        currentView={currentView}
      />

      {/* Main View Area */}
      <main className="main-content">
        {currentView === 'landing' && (
          <LandingPage 
            onStart={handleStartFromLanding} 
            onSelectPreset={handleSelectPreset}
          />
        )}

        {currentView === 'form' && (
          <DecisionForm 
            initialData={inputs}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        )}

        {currentView === 'dashboard' && (
          <>
            {isLoading ? (
              <SkeletonLoader />
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)', display: 'inline-block', marginBottom: '1rem' }}>
                  {error}
                </div>
                <div>
                  <button className="btn-primary" onClick={handleAnalyzeAgain}>
                    Try Again
                  </button>
                </div>
              </div>
            ) : analysis ? (
              <AnalysisDashboard
                inputs={inputs}
                analysis={analysis}
                onAnalyzeAgain={handleAnalyzeAgain}
                onNewDecision={handleNewDecision}
                onSaveAnalysis={handleSaveAnalysis}
              />
            ) : null}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>The Blind Spot</strong> — AI-Powered Critical Thinking & Decision Intelligence
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Empowering better decisions without prescribing outcomes.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onLoadSavedDecision={handleLoadSavedDecision}
      />
    </div>
  );
}
