import React, { useState } from 'react';
import { 
  Lightbulb, 
  Eye, 
  GitCompare, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  PlusCircle, 
  BookmarkCheck, 
  Share2, 
  Download, 
  Compass, 
  ArrowUpRight,
  Sliders,
  Check,
  Brain,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ThinkDeeperModal from './ThinkDeeperModal';

// Cognitive Bias Glossary definitions in plain English
const BIAS_GLOSSARY = {
  'focalism': 'Focusing too heavily on one major factor (e.g. salary) while underestimating how unmentioned variables dictate daily quality of life.',
  'sunk cost': 'Refusing to switch paths because of past time, money, or effort already spent, rather than evaluating future utility.',
  'status quo': 'A subconscious preference for keeping things the same rather than risking change, even when change has higher upside.',
  'availability heuristic': 'Overestimating likelihoods based on memorable recent news or immediate personal anecdotes rather than objective data.',
  'optimism bias': 'Believing that you are far less likely to experience negative outcomes or unexpected delays than average.',
  'planning fallacy': 'Underestimating the time, financial resources, and operational energy required to complete a future task.'
};

function CognitiveBiasBadge({ biasName, category }) {
  const name = biasName || category || 'Cognitive Trap';
  const nameLower = name.toLowerCase();
  
  // Match key glossary term
  let glossaryText = 'A psychological pattern or systemic variable that can distort objective reasoning.';
  if (nameLower.includes('focalism')) glossaryText = BIAS_GLOSSARY['focalism'];
  else if (nameLower.includes('sunk cost')) glossaryText = BIAS_GLOSSARY['sunk cost'];
  else if (nameLower.includes('status quo')) glossaryText = BIAS_GLOSSARY['status quo'];
  else if (nameLower.includes('availability')) glossaryText = BIAS_GLOSSARY['availability heuristic'];
  else if (nameLower.includes('optimism')) glossaryText = BIAS_GLOSSARY['optimism bias'];
  else if (nameLower.includes('planning')) glossaryText = BIAS_GLOSSARY['planning fallacy'];

  return (
    <div className="bias-tooltip-trigger" tabIndex={0} role="note" aria-label={`${name}: ${glossaryText}`}>
      <span className="severity-tag severity-medium" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
        <span>{name}</span>
        <Info size={11} />
      </span>
      <div className="bias-tooltip-box">
        <strong>{name}:</strong> {glossaryText}
      </div>
    </div>
  );
}

export default function AnalysisDashboard({ 
  inputs, 
  analysis, 
  onAnalyzeAgain, 
  onNewDecision, 
  onSaveAnalysis 
}) {
  const [reflectionNotes, setReflectionNotes] = useState(inputs.reflectionNotes || '');
  const [clarityBefore, setClarityBefore] = useState(inputs.clarityBefore || 4);
  const [clarityAfter, setClarityAfter] = useState(inputs.clarityAfter || 8);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Think Deeper Modal state
  const [thinkDeeperModal, setThinkDeeperModal] = useState({
    isOpen: false,
    itemType: '',
    itemData: null
  });

  const handleOpenThinkDeeper = (itemType, itemData) => {
    setThinkDeeperModal({
      isOpen: true,
      itemType,
      itemData
    });
  };

  const handleSave = () => {
    onSaveAnalysis({
      inputs: {
        ...inputs,
        reflectionNotes,
        clarityBefore,
        clarityAfter
      },
      analysis,
      timestamp: new Date().toISOString()
    });

    setIsSaved(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 }
    });

    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleCopySummary = () => {
    const textReport = `
=== THE BLIND SPOT — DECISION ANALYSIS REPORT ===
Decision: ${inputs.primaryDecision}

EXECUTIVE SUMMARY:
${analysis.summary}

CRITICAL THINKING COVERAGE SCORE: ${analysis.coverageScore}%

KEY ASSUMPTIONS:
${analysis.assumptions.map(a => `- [${a.riskLevel} Risk] ${a.title}: ${a.description}`).join('\n')}

POTENTIAL BLIND SPOTS:
${analysis.blindSpots.map(b => `- [${b.cognitiveBiasName}] ${b.title}: ${b.description}`).join('\n')}

CONFLICTING REASONING:
${analysis.conflictingReasoning.map(c => `- ${c.conflict}: ${c.explanation}`).join('\n')}

QUESTIONS TO CONSIDER:
${analysis.questionsToConsider.map(q => `- ${q.question} (${q.whyItMatters})`).join('\n')}

RISKS & TRADE-OFFS:
${analysis.risksAndTradeoffs.map(r => `- [Impact: ${r.impact}] ${r.risk}`).join('\n')}

WHAT SEEMS STRONG:
${analysis.whatSeemsStrong.map(s => `- ${s.strength}: ${s.rationale}`).join('\n')}

"The decision is yours. We help you see the factors that may be easy to miss."
`;
    navigator.clipboard.writeText(textReport.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = `# The Blind Spot — Decision Analysis Report
*Generated on: ${new Date().toLocaleDateString()}*

## Primary Decision
> ${inputs.primaryDecision}

${inputs.whatConsidering ? `**Options Considering:** ${inputs.whatConsidering}\n` : ''}
${inputs.whyLeaning ? `**Current Leaning:** ${inputs.whyLeaning}\n` : ''}

---

### 🛡️ Decision Disclaimer
> **The decision is yours. We help you see the factors that may be easy to miss.**

---

### Executive Analysis Summary
${analysis.summary}

### Critical Thinking Metrics
- **Coverage Index:** ${analysis.coverageScore}%
- **Logic Rigidity:** ${analysis.matrixScores?.logicRigidity || 60}%
- **Risk Awareness:** ${analysis.matrixScores?.riskAwareness || 70}%
- **Alternative Exploration:** ${analysis.matrixScores?.alternativeExploration || 50}%

---

### 💡 Key Assumptions
${analysis.assumptions.map(a => `#### ${a.title} (${a.riskLevel} Risk)\n${a.description}\n*Mitigation:* ${a.mitigation}\n`).join('\n')}

### 👁️ Potential Blind Spots & Cognitive Traps
${analysis.blindSpots.map(b => `#### ${b.title} (*${b.cognitiveBiasName}*)\n${b.description}\n*Insight:* ${b.insight}\n`).join('\n')}

### ⚡ Conflicting Reasoning
${analysis.conflictingReasoning.map(c => `#### ${c.conflict}\n${c.explanation}\n*Tension Point:* ${c.tensionPoint}\n`).join('\n')}

### ❓ Questions to Consider
${analysis.questionsToConsider.map(q => `- **${q.question}**\n  *Why it matters:* ${q.whyItMatters}\n`).join('\n')}

### ⚠️ Risks & Trade-offs
${analysis.risksAndTradeoffs.map(r => `#### ${r.risk} (Impact: ${r.impact}, Prob: ${r.probability})\n*Mitigation:* ${r.mitigationStrategy}\n`).join('\n')}

### ✨ What Seems Strong
${analysis.whatSeemsStrong.map(s => `- **${s.strength}:** ${s.rationale}\n`).join('\n')}

---
${reflectionNotes ? `### My Reflection & Revised Notes\n${reflectionNotes}\n` : ''}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `blind-spot-analysis-${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Disclaimer Banner */}
      <div className="disclaimer-banner">
        <div className="banner-icon">
          <ShieldCheck size={24} />
        </div>
        <div className="banner-text">
          <h3>The decision is yours.</h3>
          <p>
            We help you see the factors that may be easy to miss. This analysis does not make a recommendation for you — it expands your critical awareness.
          </p>
        </div>
      </div>

      {/* Decision Context Box */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.775rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          Analyzed Decision Situation
        </div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {inputs.primaryDecision}
        </h2>
      </div>

      {/* Critical Thinking Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Critical Thinking Coverage</span>
            <Brain size={16} />
          </div>
          <div className="metric-value" style={{ color: 'var(--primary)' }}>
            {analysis.coverageScore}%
          </div>
          <div className="metric-bar-bg">
            <div className="metric-bar-fill" style={{ width: `${analysis.coverageScore}%` }} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Logic Flexibility</span>
            <Sliders size={16} />
          </div>
          <div className="metric-value">
            {100 - (analysis.matrixScores?.logicRigidity || 60)}%
          </div>
          <div className="metric-bar-bg">
            <div className="metric-bar-fill" style={{ width: `${100 - (analysis.matrixScores?.logicRigidity || 60)}%`, background: 'var(--accent)' }} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Risk Awareness</span>
            <AlertTriangle size={16} />
          </div>
          <div className="metric-value" style={{ color: 'var(--warning)' }}>
            {analysis.matrixScores?.riskAwareness || 70}%
          </div>
          <div className="metric-bar-bg">
            <div className="metric-bar-fill" style={{ width: `${analysis.matrixScores?.riskAwareness || 70}%`, background: 'var(--warning)' }} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Alternatives Explored</span>
            <Compass size={16} />
          </div>
          <div className="metric-value" style={{ color: 'var(--success)' }}>
            {analysis.matrixScores?.alternativeExploration || 55}%
          </div>
          <div className="metric-bar-bg">
            <div className="metric-bar-fill" style={{ width: `${analysis.matrixScores?.alternativeExploration || 55}%`, background: 'var(--success)' }} />
          </div>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} style={{ color: 'var(--primary)' }} />
          <span>Synthesis & Analytical Summary</span>
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {analysis.summary}
        </p>
      </div>

      {/* 6 Core Dashboard Sections */}
      <div className="grid-6-cards">
        {/* Section 1: Key Assumptions */}
        <div className="feature-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="card-header-icon assumptions" style={{ margin: 0 }}>
                <Lightbulb size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem' }}>Key Assumptions</h3>
            </div>
            <span className="badge-tag" style={{ margin: 0, fontSize: '0.725rem' }}>
              {analysis.assumptions?.length || 0} Identified
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {analysis.assumptions?.map((item) => (
              <div key={item.id} className="analysis-item">
                <div className="item-top">
                  <span className="item-title">{item.title}</span>
                  <span className={`severity-tag severity-${item.riskLevel.toLowerCase()}`}>
                    {item.riskLevel} Risk
                  </span>
                </div>
                <p className="item-desc">{item.description}</p>
                {item.mitigation && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontStyle: 'italic' }}>
                    💡 <strong>Test:</strong> {item.mitigation}
                  </p>
                )}
                <button 
                  className="item-action-btn"
                  onClick={() => handleOpenThinkDeeper('Assumption', item)}
                  aria-label={`Think deeper about assumption ${item.title}`}
                >
                  <span>Think Deeper</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Potential Blind Spots */}
        <div className="feature-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="card-header-icon blindspots" style={{ margin: 0 }}>
                <Eye size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem' }}>Potential Blind Spots</h3>
            </div>
            <span className="badge-tag" style={{ margin: 0, fontSize: '0.725rem', background: 'var(--warning-bg)', color: 'var(--warning)' }}>
              Overlooked Factors
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {analysis.blindSpots?.map((item) => (
              <div key={item.id} className="analysis-item">
                <div className="item-top">
                  <span className="item-title">{item.title}</span>
                  <CognitiveBiasBadge biasName={item.cognitiveBiasName} category={item.category} />
                </div>
                <p className="item-desc">{item.description}</p>
                {item.insight && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.35rem' }}>
                    🔍 <strong>Insight:</strong> {item.insight}
                  </p>
                )}
                <button 
                  className="item-action-btn"
                  onClick={() => handleOpenThinkDeeper('Blind Spot', item)}
                  aria-label={`Think deeper about blind spot ${item.title}`}
                >
                  <span>Think Deeper</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Conflicting Reasoning */}
        <div className="feature-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="card-header-icon conflicts" style={{ margin: 0 }}>
                <GitCompare size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem' }}>Conflicting Reasoning</h3>
            </div>
            <span className="badge-tag" style={{ margin: 0, fontSize: '0.725rem', background: 'var(--danger-bg)', color: 'var(--danger)' }}>
              Tension Points
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {analysis.conflictingReasoning?.map((item) => (
              <div key={item.id} className="analysis-item">
                <div className="item-top">
                  <span className="item-title">{item.conflict}</span>
                </div>
                <p className="item-desc">{item.explanation}</p>
                {item.tensionPoint && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '0.35rem' }}>
                    ⚡ <strong>Friction:</strong> {item.tensionPoint}
                  </p>
                )}
                <button 
                  className="item-action-btn"
                  onClick={() => handleOpenThinkDeeper('Conflict', item)}
                  aria-label={`Think deeper about conflict ${item.conflict}`}
                >
                  <span>Think Deeper</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Questions to Consider */}
        <div className="feature-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="card-header-icon questions" style={{ margin: 0 }}>
                <HelpCircle size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem' }}>Questions to Consider</h3>
            </div>
            <span className="badge-tag" style={{ margin: 0, fontSize: '0.725rem' }}>
              Reflection Prompts
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {analysis.questionsToConsider?.map((item) => (
              <div key={item.id} className="analysis-item">
                <div className="item-top">
                  <span className="item-title" style={{ color: 'var(--primary)' }}>
                    "{item.question}"
                  </span>
                </div>
                <p className="item-desc" style={{ fontStyle: 'italic' }}>
                  Why this matters: {item.whyItMatters}
                </p>
                <button 
                  className="item-action-btn"
                  onClick={() => handleOpenThinkDeeper('Question', item)}
                  aria-label={`Think deeper about question ${item.question}`}
                >
                  <span>Think Deeper</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Risks & Trade-offs */}
        <div className="feature-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="card-header-icon risks" style={{ margin: 0 }}>
                <AlertTriangle size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem' }}>Risks & Trade-offs</h3>
            </div>
            <span className="badge-tag" style={{ margin: 0, fontSize: '0.725rem', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
              Downside Risk
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {analysis.risksAndTradeoffs?.map((item) => (
              <div key={item.id} className="analysis-item">
                <div className="item-top">
                  <span className="item-title">{item.risk}</span>
                  <span className={`severity-tag severity-${(item.impact || 'Medium').toLowerCase()}`}>
                    Impact: {item.impact}
                  </span>
                </div>
                <p className="item-desc">Hedge: {item.mitigationStrategy}</p>
                <button 
                  className="item-action-btn"
                  onClick={() => handleOpenThinkDeeper('Risk', item)}
                  aria-label={`Think deeper about risk ${item.risk}`}
                >
                  <span>Think Deeper</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: What Seems Strong */}
        <div className="feature-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="card-header-icon strong" style={{ margin: 0 }}>
                <CheckCircle2 size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem' }}>What Seems Strong</h3>
            </div>
            <span className="badge-tag" style={{ margin: 0, fontSize: '0.725rem', background: 'var(--success-bg)', color: 'var(--success)' }}>
              Validated Reasoning
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {analysis.whatSeemsStrong?.map((item) => (
              <div key={item.id} className="analysis-item">
                <div className="item-top">
                  <span className="item-title" style={{ color: 'var(--success)' }}>
                    {item.strength}
                  </span>
                </div>
                <p className="item-desc">{item.rationale}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Reflection & Revision Section with 1-10 Scale */}
      <section className="reflection-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <Sparkles size={22} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1.25rem' }}>Reflect & Revise Your Thoughts</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Now that you've reviewed your cognitive blind spots and potential risks, record your updated perspective before making your final move.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label className="form-label" htmlFor="clarityBeforeSlider">
              <span>Clarity Rating Before Analysis: <strong>{clarityBefore} / 10</strong></span>
            </label>
            <input 
              id="clarityBeforeSlider"
              type="range" 
              min="1" 
              max="10" 
              value={clarityBefore} 
              onChange={(e) => setClarityBefore(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--text-muted)' }}
              aria-label="Clarity rating before analysis on a scale of 1 to 10"
            />
            <div className="slider-scale-track">
              <span>1 (Uncertain)</span>
              <span>5</span>
              <span>10 (Absolute Clarity)</span>
            </div>
          </div>

          <div>
            <label className="form-label" htmlFor="clarityAfterSlider">
              <span>Clarity Rating After Analysis: <strong style={{ color: 'var(--primary)' }}>{clarityAfter} / 10</strong></span>
            </label>
            <input 
              id="clarityAfterSlider"
              type="range" 
              min="1" 
              max="10" 
              value={clarityAfter} 
              onChange={(e) => setClarityAfter(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
              aria-label="Clarity rating after analysis on a scale of 1 to 10"
            />
            <div className="slider-scale-track">
              <span>1 (Uncertain)</span>
              <span>5</span>
              <span>10 (Absolute Clarity)</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reflectionNotes">
            My Updated Notes & Countermeasures
          </label>
          <textarea
            id="reflectionNotes"
            className="form-textarea"
            rows={3}
            placeholder="e.g. After seeing the blind spot on culture assumptions, I will set up 2 informal calls with current team members before signing..."
            value={reflectionNotes}
            onChange={(e) => setReflectionNotes(e.target.value)}
          />
        </div>
      </section>

      {/* Action Toolbar */}
      <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={onAnalyzeAgain}>
            <RotateCcw size={16} />
            <span>Edit Inputs & Re-analyze</span>
          </button>

          <button className="btn-secondary" onClick={onNewDecision}>
            <PlusCircle size={16} />
            <span>Start New Decision</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={handleCopySummary}>
            {copied ? <Check size={16} style={{ color: 'var(--success)' }} /> : <Share2 size={16} />}
            <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
          </button>

          <button className="btn-secondary" onClick={handleDownloadMarkdown}>
            <Download size={16} />
            <span>Export Markdown Report</span>
          </button>

          <button 
            className={`btn-primary ${isSaved ? 'saved' : ''}`}
            onClick={handleSave}
            style={isSaved ? { background: 'var(--success)', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' } : {}}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Sparkles size={18} />}
            <span>{isSaved ? 'Analysis Saved!' : 'Save Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Think Deeper Modal */}
      <ThinkDeeperModal 
        isOpen={thinkDeeperModal.isOpen}
        onClose={() => setThinkDeeperModal({ ...thinkDeeperModal, isOpen: false })}
        itemType={thinkDeeperModal.itemType}
        itemData={thinkDeeperModal.itemData}
        fullInputs={inputs}
      />
    </div>
  );
}
