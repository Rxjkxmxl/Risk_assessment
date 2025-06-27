// src/components/RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { riskCategories } from '../data/riskData';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ scores }) => {
  const chartLabels = Object.values(riskCategories).map(cat => cat.name);
  const chartDataPoints = Object.keys(riskCategories).map(catKey => scores[catKey] || 0);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Risk Score',
        data: chartDataPoints,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 25,
          backdropColor: 'transparent',
        },
        pointLabels: {
          font: {
            size: 14,
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;