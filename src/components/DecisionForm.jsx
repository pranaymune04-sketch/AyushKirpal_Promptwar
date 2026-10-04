import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  ArrowRight
} from 'lucide-react';
import { EXAMPLE_PRESETS } from '../data/examplePresets';

export default function DecisionForm({ initialData, onSubmit, isLoading }) {
  const [primaryDecision, setPrimaryDecision] = useState(initialData?.primaryDecision || '');
  const [whatConsidering, setWhatConsidering] = useState(initialData?.whatConsidering || '');
  const [whyLeaning, setWhyLeaning] = useState(initialData?.whyLeaning || '');
  const [importantFactors, setImportantFactors] = useState(initialData?.importantFactors || '');
  const [concernsOrDoubts, setConcernsOrDoubts] = useState(initialData?.concernsOrDoubts || '');
  const [constraints, setConstraints] = useState(initialData?.constraints || '');
  const [alternatives, setAlternatives] = useState(initialData?.alternatives || '');

  const [showOptionalFields, setShowOptionalFields] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState(initialData?.id ? EXAMPLE_PRESETS.find(p => p.id === initialData.id) : null);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setPrimaryDecision(preset.primaryDecision);
    setWhatConsidering(preset.whatConsidering);
    setWhyLeaning(preset.whyLeaning);
    setImportantFactors(preset.importantFactors);
    setConcernsOrDoubts(preset.concernsOrDoubts);
    setConstraints(preset.constraints);
    setAlternatives(preset.alternatives);
  };

  const handlePrimaryDecisionChange = (value) => {
    setPrimaryDecision(value);
    // If user modifies text away from the selected preset's text, clear active preset highlight
    if (selectedPreset && value !== selectedPreset.primaryDecision) {
      setSelectedPreset(null);
    }
  };

  const handleReset = () => {
    setSelectedPreset(null);
    setPrimaryDecision('');
    setWhatConsidering('');
    setWhyLeaning('');
    setImportantFactors('');
    setConcernsOrDoubts('');
    setConstraints('');
    setAlternatives('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!primaryDecision.trim()) return;

    onSubmit({
      id: selectedPreset ? selectedPreset.id : undefined,
      primaryDecision,
      whatConsidering,
      whyLeaning,
      importantFactors,
      concernsOrDoubts,
      constraints,
      alternatives
    });
  };

  const wordCount = primaryDecision.trim() ? primaryDecision.trim().split(/\s+/).length : 0;

  return (
    <div className="form-card animate-fade-in" id="decision-form-container">
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Analyze Your Decision</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Provide as much context as possible. The more specific your inputs, the sharper your blind spot insights will be.
          </p>
        </div>

        {primaryDecision && (
          <button className="btn-secondary" type="button" onClick={handleReset} style={{ fontSize: '0.8rem' }}>
            <RotateCcw size={14} />
            <span>Reset Fields</span>
          </button>
        )}
      </div>

      {/* Preset Prompts Chips */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Quick Preset Examples (Select to auto-fill)
        </div>
        <div className="preset-chip-group" role="group" aria-label="Preset decision prompts">
          {EXAMPLE_PRESETS.map((preset) => {
            const isPresetActive = selectedPreset?.id === preset.id && primaryDecision === preset.primaryDecision;
            return (
              <button
                key={preset.id}
                type="button"
                className={`preset-chip ${isPresetActive ? 'active' : ''}`}
                onClick={() => handleSelectPreset(preset)}
                aria-pressed={isPresetActive}
              >
                <span>{preset.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Main Large Text Area */}
        <div className="form-group">
          <label className="form-label" htmlFor="primaryDecision">
            <span>What decision or situation are you trying to resolve? *</span>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 400 }}>
              {wordCount} words
            </span>
          </label>
          <textarea
            id="primaryDecision"
            className="form-textarea"
            rows={5}
            placeholder="e.g. I am deciding whether to accept a job offer at an early-stage startup or stay at my current corporate position..."
            value={primaryDecision}
            onChange={(e) => handlePrimaryDecisionChange(e.target.value)}
            required
          />
        </div>

        {/* Accordion for Structured Optional Fields */}
        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="button"
            className="accordion-toggle"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            aria-expanded={showOptionalFields}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} style={{ color: 'var(--primary)' }} />
              <span>Structured Context Fields (Optional, but highly recommended)</span>
            </span>
            {showOptionalFields ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showOptionalFields && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginTop: '1rem', padding: '0.5rem 0' }}>
              {/* Field 1: What are you considering */}
              <div className="form-group">
                <label className="form-label" htmlFor="whatConsidering">
                  🎯 What options are you considering?
                </label>
                <textarea
                  id="whatConsidering"
                  className="form-textarea"
                  rows={2}
                  placeholder="Option A vs Option B..."
                  value={whatConsidering}
                  onChange={(e) => setWhatConsidering(e.target.value)}
                />
              </div>

              {/* Field 2: Why are you leaning this way */}
              <div className="form-group">
                <label className="form-label" htmlFor="whyLeaning">
                  ⚖️ Why are you leaning this way?
                </label>
                <textarea
                  id="whyLeaning"
                  className="form-textarea"
                  rows={2}
                  placeholder="Your current preference and logic..."
                  value={whyLeaning}
                  onChange={(e) => setWhyLeaning(e.target.value)}
                />
              </div>

              {/* Field 3: Important factors */}
              <div className="form-group">
                <label className="form-label" htmlFor="importantFactors">
                  📌 Important factors & priorities
                </label>
                <textarea
                  id="importantFactors"
                  className="form-textarea"
                  rows={2}
                  placeholder="Salary, work-life balance, learning speed, location..."
                  value={importantFactors}
                  onChange={(e) => setImportantFactors(e.target.value)}
                />
              </div>

              {/* Field 4: Concerns or doubts */}
              <div className="form-group">
                <label className="form-label" htmlFor="concernsOrDoubts">
                  ❓ Concerns or doubts
                </label>
                <textarea
                  id="concernsOrDoubts"
                  className="form-textarea"
                  rows={2}
                  placeholder="What worries you or gives you pause?"
                  value={concernsOrDoubts}
                  onChange={(e) => setConcernsOrDoubts(e.target.value)}
                />
              </div>

              {/* Field 5: Constraints */}
              <div className="form-group">
                <label className="form-label" htmlFor="constraints">
                  🛑 Constraints & deadlines
                </label>
                <textarea
                  id="constraints"
                  className="form-textarea"
                  rows={2}
                  placeholder="Time limits, financial budget, family obligations..."
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                />
              </div>

              {/* Field 6: Alternatives */}
              <div className="form-group">
                <label className="form-label" htmlFor="alternatives">
                  🔀 Alternatives you are considering
                </label>
                <textarea
                  id="alternatives"
                  className="form-textarea"
                  rows={2}
                  placeholder="Plan B, hybrid choices, delaying the decision..."
                  value={alternatives}
                  onChange={(e) => setAlternatives(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Form Action Button */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn-primary animate-pulse-glow"
            style={{ width: '100%', maxWidth: '320px', padding: '0.85rem' }}
            disabled={!primaryDecision.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner" />
                <span>AI Analyzing Reasoning...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Analyze My Decision</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
