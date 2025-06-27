// src/utils/calculateRisk.js
import { riskQuestions, actionableInsights, riskCategories } from '../data/riskData';

export function calculateRiskProfile(answers) {
  // 1. Initialize scores for each category
  const categoryScores = {};
  for (const categoryKey in riskCategories) {
    categoryScores[categoryKey] = 0;
  }

  // 2. Calculate raw score for each category based on answers
  for (const questionId in answers) {
    const answer = answers[questionId];
    const question = riskQuestions.find(q => q.id === questionId);
    if (question) {
      categoryScores[question.category] += answer.riskValue;
    }
  }

  // 3. Normalize scores (e.g., to a scale of 100)
  // This helps in comparing categories, as they might have different numbers of questions.
  const maxScores = {};
  for (const categoryKey in riskCategories) {
      maxScores[categoryKey] = riskQuestions
          .filter(q => q.category === categoryKey)
          .reduce((sum, q) => sum + Math.max(...q.options.map(o => o.riskValue)), 0);
  }
  
  const normalizedScores = {};
  for (const categoryKey in categoryScores) {
    if (maxScores[categoryKey] > 0) {
      normalizedScores[categoryKey] = Math.round((categoryScores[categoryKey] / maxScores[categoryKey]) * 100);
    } else {
      normalizedScores[categoryKey] = 0;
    }
  }

  // 4. Determine which actionable insights to show
  const insights = [];
  for (const category in normalizedScores) {
    // We use the normalized score to check against a consistent threshold
    // Let's assume a "high risk" threshold is a score of 60 out of 100
    if (normalizedScores[category] >= 60 && actionableInsights[category]) {
      insights.push({
        category: riskCategories[category].name,
        suggestion: actionableInsights[category].suggestion
      });
    }
  }
  
  // 5. Calculate weighted overall score
  let overallScore = 0;
  for (const categoryKey in normalizedScores) {
      overallScore += normalizedScores[categoryKey] * riskCategories[categoryKey].weight;
  }

  return { 
    scores: normalizedScores, // Use normalized scores for the chart
    insights, 
    overallScore: Math.round(overallScore)
  };
}