// src/data/riskData.js

export const riskCategories = {
  team: { name: 'Team', weight: 0.3 },
  product: { name: 'Product', weight: 0.3 },
  market: { name: 'Market', weight: 0.25 },
  financials: { name: 'Financials', weight: 0.15 },
};

export const riskQuestions = [
  // --- TEAM QUESTIONS ---
  {
    id: 'q1',
    category: 'team',
    text: 'How many co-founders are on the team?',
    options: [
      { id: 'q1-a1', text: 'I am a solo founder', riskValue: 8 },
      { id: 'q1-a2', text: '2-3 co-founders with complementary skills', riskValue: 1 },
      { id: 'q1-a3', text: '4+ co-founders or team lacks clear roles', riskValue: 6 },
    ],
  },
  {
    id: 'q2',
    category: 'team',
    text: 'Does your team have direct experience in this industry?',
    options: [
      { id: 'q2-a1', text: 'Yes, 10+ years of combined, relevant experience', riskValue: 1 },
      { id: 'q2-a2', text: 'Some experience, but new to this specific niche', riskValue: 4 },
      { id: 'q2-a3', text: 'No, we are learning as we go', riskValue: 10 },
    ],
  },
  // --- PRODUCT QUESTIONS ---
  {
    id: 'q3',
    category: 'product',
    text: 'How have you validated your product idea?',
    options: [
        { id: 'q3-a1', text: 'We have paying customers for our MVP', riskValue: 1 },
        { id: 'q3-a2', text: 'We have validated the problem with user interviews', riskValue: 4 },
        { id: 'q3-a3', text: 'We believe it\'s a good idea but have no data yet', riskValue: 10 },
    ],
  },
  // ... Add 1-2 more questions for 'product', 'market', and 'financials'
];

export const actionableInsights = {
  team: {
    threshold: 12, // Show if team risk score is 12 or higher
    suggestion: 'High team risk detected. A startup\'s success is heavily tied to its founders. Consider bringing on an advisor with deep industry experience or finding a co-founder with skills that complement your own (e.g., technical, sales).'
  },
  product: {
    threshold: 10,
    suggestion: 'Your product risk is high. Focus on validating the core problem. Build a Minimum Viable Product (MVP) to test your assumptions with real users before investing heavily in features.'
  },
  // ... insights for 'market' and 'financials'
};