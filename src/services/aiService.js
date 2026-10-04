import { GoogleGenAI } from '@google/genai';

// Helper to sanitize and get Gemini API key
const getApiKey = () => {
  const customKey = localStorage.getItem('custom_gemini_api_key');
  if (customKey && customKey.trim().length > 5) return customKey.trim();
  if (import.meta.env.VITE_GEMINI_API_KEY) return import.meta.env.VITE_GEMINI_API_KEY;
  return null;
};

/**
 * Main AI Decision Analysis Function
 */
export async function analyzeDecision(inputs) {
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      return await analyzeWithGemini(inputs, apiKey);
    } catch (err) {
      console.warn('Gemini API call failed or timed out, using intelligent fallback engine:', err);
      return generateSmartFallbackAnalysis(inputs);
    }
  } else {
    // Return high quality intelligent fallback analysis with simulated thinking latency
    await new Promise((res) => setTimeout(res, 1200));
    return generateSmartFallbackAnalysis(inputs);
  }
}

/**
 * Call Gemini API using @google/genai SDK
 */
async function analyzeWithGemini(inputs, apiKey) {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
You are an expert cognitive psychologist, decision analyst, and critical thinking advisor operating "The Blind Spot" platform.
Your task is NOT to tell the user what to decide, but to illuminate cognitive blind spots, hidden assumptions, contradictions, risks, and thought-provoking questions.

USER DECISION CONTEXT:
Primary Decision: ${inputs.primaryDecision || 'Not provided'}
What considering: ${inputs.whatConsidering || 'Not provided'}
Why leaning this way: ${inputs.whyLeaning || 'Not provided'}
Important factors: ${inputs.importantFactors || 'Not provided'}
Concerns / doubts: ${inputs.concernsOrDoubts || 'Not provided'}
Constraints: ${inputs.constraints || 'Not provided'}
Alternatives considering: ${inputs.alternatives || 'Not provided'}

Respond ONLY with a valid JSON object strictly adhering to this structure:
{
  "summary": "Brief 2-sentence executive summary reflecting the user's dilemma without making a choice for them.",
  "coverageScore": 78,
  "matrixScores": {
    "logicRigidity": 65,
    "riskAwareness": 70,
    "alternativeExploration": 45,
    "emotionalFactor": 60
  },
  "assumptions": [
    {
      "id": "asm-1",
      "title": "Short descriptive title of assumption",
      "description": "Clear explanation of what the user is taking for granted without empirical proof.",
      "riskLevel": "High",
      "mitigation": "How to test or verify this assumption before deciding."
    }
  ],
  "blindSpots": [
    {
      "id": "bs-1",
      "title": "Short title of cognitive blind spot",
      "category": "Cognitive Bias",
      "cognitiveBiasName": "Confirmation Bias / Sunk Cost / Focalism",
      "description": "Detailed explanation of the factor or bias that is easy to miss.",
      "insight": "Empowering insight to broaden perspective."
    }
  ],
  "conflictingReasoning": [
    {
      "id": "cr-1",
      "conflict": "Core contradictory claim or tension point",
      "explanation": "Why statement A contradicts statement B in their input.",
      "tensionPoint": "The exact tradeoff friction point."
    }
  ],
  "questionsToConsider": [
    {
      "id": "q-1",
      "question": "Deep diagnostic question for user to reflect on?",
      "whyItMatters": "Why asking this changes the decision evaluation framework.",
      "targetArea": "Reversibility / Long-term impact / Risk"
    }
  ],
  "risksAndTradeoffs": [
    {
      "id": "r-1",
      "risk": "Potential negative consequence or trade-off",
      "impact": "High",
      "probability": "Medium",
      "mitigationStrategy": "Proactive measure to hedge this downside."
    }
  ],
  "whatSeemsStrong": [
    {
      "id": "st-1",
      "strength": "Well-supported part of user's reasoning",
      "rationale": "Why this specific aspect shows clear alignment or good awareness."
    }
  ]
}
Return raw JSON string. Do not use markdown backticks outside JSON.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    }
  });

  const text = response.text;
  try {
    return JSON.parse(text);
  } catch (e) {
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  }
}

/**
 * Intelligent Fallback Engine for instantaneous offline / keyless demo experience
 */
export function generateSmartFallbackAnalysis(inputs) {
  const summary = `You are evaluating a major strategic decision involving ${inputs.whatConsidering || 'two distinct choices'}. While your current leaning is driven by ${inputs.whyLeaning ? 'your preference for ' + inputs.whyLeaning.slice(0, 65) + '...' : 'initial key motivations'}, critical hidden variables and long-term friction points warrant deeper inspection.`;

  const assumptions = [
    {
      id: 'asm-1',
      title: 'Linear Trajectory Assumption',
      description: `You are assuming that the initial conditions of your preferred option will remain consistent over the next 18–36 months without external shocks.`,
      riskLevel: 'High',
      mitigation: 'Conduct a pre-mortem exercise: write down three realistic external disruptions that could alter this trajectory.'
    },
    {
      id: 'asm-2',
      title: 'Unverifiable Culture & Environment Expectations',
      description: inputs.whyLeaning 
        ? `You assume that "${inputs.whyLeaning.slice(0, 50)}" will materialistically offset potential drawbacks like stress or operational ambiguity.` 
        : `You assume daily satisfaction will match your ideal expectations without testing team dynamics or actual daily cadence.`,
      riskLevel: 'Medium',
      mitigation: 'Speak to 2-3 alumni or people currently in similar positions to audit the actual day-to-day reality.'
    },
    {
      id: 'asm-3',
      title: 'Reversibility & Opportunity Cost Erasure',
      description: `You are assuming that choosing Option A leaves Option B open later, or that pivoting back carries minimal friction, energy, or financial cost.`,
      riskLevel: 'High',
      mitigation: 'Define explicit reversibility metrics: how hard is it to re-enter this baseline if you change your mind in 12 months?'
    },
    {
      id: 'asm-4',
      title: 'Current State Permanent Weighting',
      description: `You may be over-weighting your current pain points while under-weighting future compounding factors 24 months down the road.`,
      riskLevel: 'Medium',
      mitigation: 'Map out how this decision looks through the 10-10-10 lens (10 minutes, 10 months, 10 years).'
    }
  ];

  const blindSpots = [
    {
      id: 'bs-1',
      title: 'Focalism (Tunnel Vision on Primary Metric)',
      category: 'Cognitive Bias',
      cognitiveBiasName: 'Focalism',
      description: `When making this choice, it is easy to hyper-focus on one shiny variable (${inputs.importantFactors ? inputs.importantFactors.split(',')[0] : 'primary benefit'}) while underestimating how unmentioned variables (commute, stress, team friction) dictate daily happiness.`,
      insight: 'Expand your evaluation matrix from 1-2 major criteria to a holistic 360-degree quality-of-life audit.'
    },
    {
      id: 'bs-2',
      title: 'The Sunk Cost Shadow & Status Quo Bias',
      category: 'Cognitive Trap',
      cognitiveBiasName: 'Sunk Cost Fallacy',
      description: `Part of your hesitation may be anchored in previous investments of time, money, or identity in your current setup, rather than looking exclusively at forward-looking expected utility.`,
      insight: 'Ask: "If I was coming into this situation completely fresh with zero past history, which path would I choose today?"'
    },
    {
      id: 'bs-3',
      title: 'Asymmetric Information Risk',
      category: 'Cognitive Bias',
      cognitiveBiasName: 'Availability Heuristic',
      description: `You currently possess deep, intimate knowledge about the downsides of your current situation, but only polished, optimistic marketing data about the alternative.`,
      insight: 'Actively seek out negative reviews, failure stories, or candid drawback discussions regarding your leaning option.'
    },
    {
      id: 'bs-4',
      title: 'Unintended Second-Order Consequences',
      category: 'Systemic Factor',
      cognitiveBiasName: 'Status Quo Bias',
      description: `A choice that solves immediate friction (First-Order: relief/excitement) can create secondary friction (Second-Order: burn-out, liquidity lock, network fragmentation).`,
      insight: 'Trace out the domino chain: "If I choose X, then Y happens, which means Z will be impacted in 18 months."'
    }
  ];

  const conflictingReasoning = [
    {
      id: 'cr-1',
      conflict: 'Desired Autonomy vs. High-Risk Exposure',
      explanation: inputs.concernsOrDoubts 
        ? `You expressed concern around "${inputs.concernsOrDoubts.slice(0, 50)}", yet your leaning choice amplifies exposure to this exact variable.`
        : `Your desire for high impact and freedom directly competes with your desire for predictability and structural safety.`,
      tensionPoint: 'Reconciling tolerance for volatility with immediate comfort boundaries.'
    },
    {
      id: 'cr-2',
      conflict: 'Short-Term Satisfaction vs. Long-Term Compound Capital',
      explanation: inputs.constraints 
        ? `Your strict constraints ("${inputs.constraints.slice(0, 45)}") leave narrow margin for error if your primary leaning option encounters delays.`
        : `You are optimizing for immediate growth/relief, but your constraints leave little room for error if initial timelines slip.`,
      tensionPoint: 'Margin of safety vs aggressive pursuit.'
    }
  ];

  const questionsToConsider = [
    {
      id: 'q-1',
      question: 'What evidence would prove that your current leaning preference is the WRONG choice?',
      whyItMatters: 'Forces falsification thinking rather than seeking confirmation evidence.',
      targetArea: 'Falsifiability & Objectivity'
    },
    {
      id: 'q-2',
      question: 'If you flip a coin and it lands on the opposite choice, do you feel relief or regret?',
      whyItMatters: 'Accesses subconscious visceral intuition that analytical bullet points often hide.',
      targetArea: 'Subconscious Alignment'
    },
    {
      id: 'q-3',
      question: 'What is the "Type 1 vs Type 2" reversibility of this decision?',
      whyItMatters: 'Type 1 decisions (one-way doors) require 90% certainty; Type 2 decisions (two-way doors) should be made quickly.',
      targetArea: 'Reversibility & Velocity'
    },
    {
      id: 'q-4',
      question: 'In 3 years, looking back on this choice, what single unaddressed factor is most likely to have caused regret?',
      whyItMatters: 'Triggers retrospective foresight to uncover hidden vulnerabilities.',
      targetArea: 'Regret Minimization'
    }
  ];

  const risksAndTradeoffs = [
    {
      id: 'r-1',
      risk: 'Option Burnout & High Cognitive Load',
      impact: 'High',
      probability: 'Medium',
      mitigationStrategy: 'Establish clear quantitative milestones (e.g. 90-day review checkpoints) to evaluate progress objectively.'
    },
    {
      id: 'r-2',
      risk: 'Opportunity Cost Lock-in',
      impact: 'High',
      probability: 'High',
      mitigationStrategy: 'Maintain a time-boxed buffer period to stay connected with alternative networks or options.'
    },
    {
      id: 'r-3',
      risk: 'Financial Margin Compression',
      impact: 'Medium',
      probability: 'Medium',
      mitigationStrategy: 'Set aside an untouchable 3-month contingency reserve prior to committing full capital or time.'
    }
  ];

  const whatSeemsStrong = [
    {
      id: 'st-1',
      strength: 'Proactive Self-Awareness of Constraints',
      rationale: inputs.constraints 
        ? `You explicitly identified practical constraints (${inputs.constraints.slice(0, 45)}), showing grounded realism.` 
        : 'You demonstrate healthy awareness that decisions carry real tradeoffs rather than magical ideal outcomes.'
    },
    {
      id: 'st-2',
      strength: 'Exploration of Multiple Angles',
      rationale: inputs.alternatives 
        ? `Considering alternatives like "${inputs.alternatives.slice(0, 45)}" prevents binary framing (Option A vs Nothing).` 
        : 'You avoided knee-jerk impulses by taking time to systematically audit your logic.'
    }
  ];

  return {
    summary,
    coverageScore: 78,
    matrixScores: {
      logicRigidity: 62,
      riskAwareness: 72,
      alternativeExploration: inputs.alternatives ? 78 : 48,
      emotionalFactor: 58
    },
    assumptions,
    blindSpots,
    conflictingReasoning,
    questionsToConsider,
    risksAndTradeoffs,
    whatSeemsStrong
  };
}

/**
 * Deep Dive Generator for "Think Deeper" feature with robust fallback safety
 */
export async function generateDeepDive(itemType, itemData, fullInputs) {
  const title = itemData.title || itemData.conflict || itemData.risk || itemData.question || 'Selected Blind Spot';
  const apiKey = getApiKey();
  
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
Context: User decision: "${fullInputs.primaryDecision}".
They want to "Think Deeper" about this specific ${itemType}:
Title: "${title}"
Description: "${itemData.description || itemData.explanation || itemData.rationale || ''}"

Respond in raw JSON string:
{
  "scenarioSimulation": "Detailed simulation text...",
  "counterArguments": ["Arg 1", "Arg 2", "Arg 3"],
  "diagnosticActions": ["Action 1", "Action 2", "Action 3"]
}
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      const parsed = JSON.parse(response.text);
      if (parsed.scenarioSimulation && parsed.counterArguments) {
        return parsed;
      }
    } catch (e) {
      console.warn('Deep dive API error, falling back gracefully:', e);
    }
  }

  // Guaranteed fallback output
  await new Promise((res) => setTimeout(res, 800));
  return {
    scenarioSimulation: `If "${title}" is left unexamined over the next 12 months, you risk encountering a threshold moment where cumulative micro-strains surface as acute friction. Initially, minor misalignments in expectations will be ignored, but by Month 6, the gap between initial assumptions and operational reality may force expensive course corrections or unforced compromises.`,
    counterArguments: [
      `Devil's Advocate View: What if the worst-case scenario associated with "${title}" is actually a manageable temporary hurdle rather than a structural dealbreaker?`,
      `Inverted Perspective: If a rival or trusted mentor looked at "${title}", they might argue that over-indexing on this risk prevents you from seizing asymmetric upside.`,
      `Zero-Base Test: Assuming "${title}" comes to fruition, how easily could you absorb the downside with your current safety nets?`
    ],
    diagnosticActions: [
      `Run a 48-Hour Pre-Mortem: Write a 1-page document detailing why this decision failed completely 2 years from now, then identify which warning sign occurred first.`,
      `Conduct a Falsification Interview: Speak with someone who made a similar choice 2 years ago and ask specifically about their single biggest unexpected regret.`,
      `Define a Stop-Loss Threshold: Set quantitative metrics (date, cost limit, or energy threshold) at which you will re-evaluate or exit without emotional attachment.`
    ]
  };
}
