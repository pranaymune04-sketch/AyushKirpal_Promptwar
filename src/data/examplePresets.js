export const EXAMPLE_PRESETS = [
  {
    id: 'career-internship',
    title: 'Accept Startup Internship vs Corporate Offer',
    tag: 'Career & Work',
    icon: 'Briefcase',
    primaryDecision: `I have received two internship offers for this summer: Offer A is a high-growth seed-stage AI startup (15 employees) offering $35/hr with high autonomy, building full-stack AI features. Offer B is an established fortune 500 tech enterprise offering $45/hr with formal mentorship, structured return offer pipeline, and brand prestige. I am strongly leaning towards the startup because I want to learn fast and build real features rather than working on legacy corporate modules, but I worry about stability and missing out on a clear return offer.`,
    whatConsidering: 'Choosing between a high-growth seed AI startup internship vs a Fortune 500 corporate tech internship.',
    whyLeaning: 'I feel excited about high autonomy, fast pace, and writing customer-facing code at the startup.',
    importantFactors: 'Learning velocity, resume prestige, total compensation, likelihood of a full-time return offer, mentorship quality.',
    concernsOrDoubts: 'Startup might run low on runway or fail to provide structured mentorship; enterprise might feel slow and bureaucratic.',
    constraints: 'Must decide within 7 days; summer internship period is 12 weeks.',
    alternatives: 'Negotiate start dates to try both (split summer), or ask corporate if I can be placed in their innovation R&D division.'
  },
  {
    id: 'career-pivot',
    title: 'Switching to Full-time Founder / Side Project',
    tag: 'Entrepreneurship',
    icon: 'Rocket',
    primaryDecision: `I am considering quitting my senior software engineering job ($160k salary) to go full-time on my B2B SaaS side project. The side project currently makes $2,400/month in MRR from 18 paying customers and has been growing 15% month-over-month for the past 4 months. My savings can cover 10 months of personal runway. My spouse is supportive but cautious about health insurance and income predictability.`,
    whatConsidering: 'Resigning from full-time job to work 100% on my bootstrap SaaS startup.',
    whyLeaning: 'The project is already generating revenue and I feel my full-time job is holding back its growth trajectory.',
    importantFactors: 'Financial security, personal fulfillment, enterprise customer acquisition speed, health insurance cost.',
    concernsOrDoubts: 'What if growth stalls at $3k MRR? What if personal savings run out before hitting sustainable profitability ($8k MRR)?',
    constraints: '10 months of liquid cash runway ($40,000 personal savings); spouse needs consistent family health insurance coverage.',
    alternatives: 'Negotiate part-time (3 days/week) at current job, hire a freelance contractor for marketing while staying employed, or raise a pre-seed angel round.'
  },
  {
    id: 'personal-housing',
    title: 'Buying First Home vs Renting & Investing',
    tag: 'Personal Finance',
    icon: 'Home',
    primaryDecision: `My partner and I are debating whether to purchase a $480,000 3-bedroom townhouse with a 15% down payment ($72,000) at a 6.8% mortgage rate, or continue renting our modern 2-bedroom apartment for $2,200/month while investing our savings into index funds. We have $110,000 in liquid savings. We both work remotely and plan to stay in our current city for at least 3-5 years, but we are unsure if home prices in this suburb will appreciate or stagnate.`,
    whatConsidering: 'Buying a $480k townhouse vs continuing to rent at $2,200/mo and investing liquid capital.',
    whyLeaning: 'We feel like we are throwing money away on rent and want space for a home office and potential pets.',
    importantFactors: 'Long-term net worth creation, monthly cash flow flexibility, property tax & maintenance costs, freedom to customize space.',
    concernsOrDoubts: 'High interest rate environment makes monthly payment ($3,400 with HOA & taxes) tight; potential loss of career mobility if we need to relocate.',
    constraints: 'Max down payment $85,000 to keep emergency fund intact; monthly housing expenses should stay under 35% of net income.',
    alternatives: 'Wait 18 months to save a 20% down payment and monitor mortgage rate cuts, or buy a smaller 2-bedroom condo as a starter property.'
  },
  {
    id: 'education-grad-school',
    title: 'Enrolling in Master\'s Abroad vs Staying in Tech Industry',
    tag: 'Education',
    icon: 'GraduationCap',
    primaryDecision: `I have been accepted into a 2-year Master of Science in Data Science program in Europe ( tuition ~$12,000/yr total). I currently work as a Junior Analyst earning $70k in my home country. Attending the program requires taking a 2-year career pause, relocating overseas, and using most of my savings. I am leaning towards going because I want international work experience and a deeper specialized degree, but I am worried about lost salary and re-entering a tough job market in 2 years.`,
    whatConsidering: 'Quitting job to pursue a 2-year Master\'s degree in Europe.',
    whyLeaning: 'Seeking international exposure, stronger technical foundation, and long-term global career opportunities.',
    importantFactors: 'Opportunity cost of 2 years lost salary (~$140k total), international visa sponsorship opportunities, depth of technical curriculum.',
    concernsOrDoubts: 'Will a Master\'s degree actually increase my salary more than 2 additional years of real-world industry experience?',
    constraints: 'Program starts in September; total budget for tuition + living is capped at $45,000.',
    alternatives: 'Deferred enrollment by 1 year, online part-time Master\'s degree while keeping current job, or applying internally for global company transfer.'
  },
  {
    id: 'product-pivot',
    title: 'Pivoting Product Strategy from B2C to Enterprise B2B',
    tag: 'Business Strategy',
    icon: 'Layers',
    primaryDecision: `Our team builds an AI productivity mobile app with 45,000 free consumer downloads but low conversion to $4.99/mo premium (<1.2%). Recently, 3 mid-sized sales teams reached out asking for team management features and custom security compliance, offering to pay $500/month per team. We are considering sunsetting the consumer app marketing and pivoting 100% of product development to Enterprise B2B workspace features.`,
    whatConsidering: 'Pivoting from a B2C freemium mobile app to a high-ACV B2B SaaS platform.',
    whyLeaning: 'B2B has far higher customer lifetime value (LTV) and willingness to pay, solving our monetization bottleneck.',
    importantFactors: 'Development complexity, enterprise security compliance (SOC2/GDPR), lengthening sales cycles, team skill set fit.',
    concernsOrDoubts: 'B2C users will feel abandoned; enterprise sales requires long procurement cycles we haven\'t navigated before.',
    constraints: 'Burn rate allows 6 months of development without new revenue; current engineering team of 4 is all full-stack mobile engineers.',
    alternatives: 'Keep consumer app on auto-pilot while launching B2B as a standalone spin-off product.'
  }
];
