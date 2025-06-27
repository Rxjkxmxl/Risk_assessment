// src/data/riskData.jsx

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
  {
    id: 'q4',
    category: 'product',
    text: 'How difficult is your product to replicate?',
    options: [
        { id: 'q4-a1', text: 'Highly difficult, with patents or deep proprietary tech', riskValue: 1 },
        { id: 'q4-a2', text: 'Moderately difficult, requires significant domain knowledge', riskValue: 3 },
        { id: 'q4-a3', text: 'Relatively easy, a competitor could build it in a few months', riskValue: 7 },
    ],
  },
  // --- MARKET QUESTIONS ---
  {
    id: 'q5',
    category: 'market',
    text: 'What is the size of your target market?',
    options: [
        { id: 'q5-a1', text: 'A large, growing market (billions)', riskValue: 1 },
        { id: 'q5-a2', text: 'A well-defined niche market (millions)', riskValue: 3 },
        { id: 'q5-a3', text: 'A small or undefined market', riskValue: 9 },
    ],
  },
  {
    id: 'q6',
    category: 'market',
    text: 'How do you acquire customers?',
    options: [
        { id: 'q6-a1', text: 'We have a proven, scalable customer acquisition channel', riskValue: 2 },
        { id: 'q6-a2', text: 'We have some early ideas but haven\'t proven them yet', riskValue: 5 },
        { id: 'q6-a3', text: 'We have no clear plan for getting customers', riskValue: 10 },
    ],
  },
  // --- FINANCIALS QUESTIONS ---
  {
    id: 'q7',
    category: 'financials',
    text: 'What is your current funding situation?',
    options: [
        { id: 'q7-a1', text: 'We have 12+ months of runway from funding or revenue', riskValue: 1 },
        { id: 'q7-a2', text: 'We are pre-revenue and have 3-6 months of runway', riskValue: 6 },
        { id: 'q7-a3', text: 'We are running out of money in the next 3 months', riskValue: 10 },
    ],
  },
  {
    id: 'q8',
    category: 'financials',
    text: 'Do you have a clear monetization strategy?',
    options: [
        { id: 'q8-a1', text: 'Yes, and we have proven customers are willing to pay', riskValue: 1 },
        { id: 'q8-a2', text: 'We have a model (e.g., SaaS, ads) but it\'s untested', riskValue: 4 },
        { id: 'q8-a3', text: 'We plan to figure out monetization later', riskValue: 9 },
    ],
  },
];

export const actionableInsights = {
  team: {
    suggestion: 'High team risk detected. A startup\'s success is heavily tied to its founders. Consider bringing on an advisor with deep industry experience or finding a co-founder with skills that complement your own (e.g., technical, sales).'
  },
  product: {
    suggestion: 'Your product risk is high. Focus on validating the core problem. Build a Minimum Viable Product (MVP) to test your assumptions with real users before investing heavily in features.'
  },
  market: {
    suggestion: 'Your market risk is high. Clearly define your ideal customer profile and focus on a single, scalable channel to reach them. A great product with no path to market is a common failure point.'
  },
  financials: {
    suggestion: 'Your financial risk is high. Create a detailed 12-month financial forecast. Understand your burn rate and key metrics. If you plan to fundraise, start building relationships with investors now.'
  },
};