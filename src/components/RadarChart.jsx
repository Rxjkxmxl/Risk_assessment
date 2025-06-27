// src/components/RadarChart.jsx
import React from 'react';
import { Radar } from 'react-chartjs-2';
// ... (rest of the ChartJS imports are the same)
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { riskCategories } from '../data/riskData';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// THE COMPONENT NOW ACCEPTS A SECOND PROP: comparisonScores
const RadarChart = ({ scores, comparisonScores }) => {
  const chartLabels = Object.values(riskCategories).map(cat => cat.name);
  const chartDataPoints = Object.keys(riskCategories).map(catKey => scores[catKey] || 0);

  const datasets = [
    {
      label: 'Current Score',
      data: chartDataPoints,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
    },
  ];

  // If comparisonScores are provided, create and add a second dataset
  if (comparisonScores) {
    const comparisonDataPoints = Object.keys(riskCategories).map(catKey => comparisonScores[catKey] || 0);
    datasets.push({
      label: 'Comparison Score',
      data: comparisonDataPoints,
      backgroundColor: 'rgba(201, 203, 207, 0.2)',
      borderColor: 'rgba(201, 203, 207, 1)',
      borderWidth: 2,
    });
  }

  const data = {
    labels: chartLabels,
    datasets: datasets, // Use the dynamic datasets array
  };
  
  const options = { /* ... options are the same ... */ };

  return <Radar data={data} options={options} />;
};

export default RadarChart;