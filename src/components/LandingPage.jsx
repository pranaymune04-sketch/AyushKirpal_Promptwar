import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  Eye, 
  GitCompare, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { EXAMPLE_PRESETS } from '../data/examplePresets';
import heroImg from '../assets/hero_illustration.jpg';
import methodologyImg from '../assets/methodology.jpg';

export default function LandingPage({ onStart, onSelectPreset }) {
  return (
    <div className="landing-container animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="badge-tag">
          <Sparkles size={14} />
          <span>AI-Powered Decision Intelligence</span>
        </div>

        <h1 className="hero-title">
          The Blind Spot
        </h1>
        
        <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          See what you might be missing before you decide.
        </h2>

        <p className="hero-subtitle">
          Most AI tools try to give you instant answers or make choices for you. 
          <strong> The Blind Spot</strong> does the opposite — it stress-tests your reasoning, uncovers hidden cognitive traps, surfaces contradictory assumptions, and equips you to think more critically.
        </p>

        <div className="hero-cta-group" style={{ marginBottom: '2.5rem' }}>
          <button className="btn-primary" style={{ padding: '0.85rem 1.85rem', fontSize: '1.05rem' }} onClick={onStart}>
            <span>Analyze My Decision</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Hero Showcase Image */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)', margin: '0 auto 1rem auto', maxWidth: '820px' }}>
          <img 
            src={heroImg} 
            alt="The Blind Spot AI Decision Analysis Platform" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* Preset Prompts Picker */}
      <section style={{ marginTop: '2.5rem', marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
            Try a Real Decision Scenario
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Select any sample dilemma below to pre-fill the analyzer instantly
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {EXAMPLE_PRESETS.map((preset) => (
            <div 
              key={preset.id} 
              className="feature-card" 
              style={{ cursor: 'pointer', padding: '1.25rem' }}
              onClick={() => onSelectPreset(preset)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectPreset(preset); }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge-tag" style={{ margin: 0, fontSize: '0.75rem' }}>{preset.tag}</span>
                <ArrowRight size={16} style={{ color: 'var(--primary)' }} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                {preset.title}
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {preset.primaryDecision}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Visual & 6 Core Dimensions Showcase Grid */}
      <section style={{ marginTop: '3rem' }}>
        <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
          Systemic Critical Thinking Framework
        </div>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          How The Blind Spot Scrutinizes Your Logic
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
          Our AI acts as an impartial devil’s advocate, evaluating your inputs across six high-impact dimensions.
        </p>

        {/* Methodology Diagram Card */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', marginBottom: '2.5rem' }}>
          <img 
            src={methodologyImg} 
            alt="Decision Intelligence Methodology Diagram" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div className="grid-6-cards">
          <div className="feature-card">
            <div className="card-header-icon assumptions">
              <Lightbulb size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Key Assumptions</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Identifies unproven beliefs and taken-for-granted baseline facts you may be relying on without empirical evidence.
            </p>
          </div>

          <div className="feature-card">
            <div className="card-header-icon blindspots">
              <Eye size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Potential Blind Spots</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Surfaces psychological cognitive biases (sunk cost fallacy, focalism, optimism bias) and overlooked systemic variables.
            </p>
          </div>

          <div className="feature-card">
            <div className="card-header-icon conflicts">
              <GitCompare size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Conflicting Reasoning</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Highlights subtle friction points, logical contradictions, or misalignments between your stated goals and constraints.
            </p>
          </div>

          <div className="feature-card">
            <div className="card-header-icon questions">
              <HelpCircle size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Questions to Consider</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Provides sharp, diagnostic inquiry prompts designed to challenge confirmation bias and deepen your reflection.
            </p>
          </div>

          <div className="feature-card">
            <div className="card-header-icon risks">
              <AlertTriangle size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Risks & Trade-offs</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Maps out second-order consequences, potential downsides, worst-case scenarios, and practical hedging strategies.
            </p>
          </div>

          <div className="feature-card">
            <div className="card-header-icon strong">
              <CheckCircle2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>What Seems Strong</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Validates the parts of your thinking that are empirically grounded, well-reasoned, and aligned with your constraints.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Empowerment Guarantee */}
      <section style={{ marginTop: '4rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldCheck size={32} />
        </div>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Our Non-Prescriptive Philosophy</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            We believe that important decisions belong solely to you. The Blind Spot will never say "Accept Option A" or "Reject Option B". We exist to expand your peripheral vision so you can decide with absolute clarity and conviction.
          </p>
        </div>
        <div>
          <button className="btn-primary" onClick={onStart}>
            <span>Analyze Now</span>
          </button>
        </div>
      </section>
    </div>
  );
}
