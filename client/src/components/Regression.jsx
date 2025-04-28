import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Regression = () => {
  const [regressionData, setRegressionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/regression');
        setRegressionData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load regression data');
        setLoading(false);
        console.error('Error fetching regression data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="card">Loading regression data...</div>;
  if (error) return <div className="card">Error: {error}</div>;
  if (!regressionData) return <div className="card">No regression data available</div>;

  // R2 Score Comparison
  const r2ScoreData = {
    labels: ['Linear Regression', 'Random Forest'],
    datasets: [
      {
        label: 'R² Score (higher is better)',
        data: [
          regressionData.linear_regression.r2_score,
          regressionData.random_forest.r2_score,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // MSE Comparison
  const mseData = {
    labels: ['Linear Regression', 'Random Forest'],
    datasets: [
      {
        label: 'Mean Squared Error (lower is better)',
        data: [
          regressionData.linear_regression.mse,
          regressionData.random_forest.mse,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Regression Model Analysis</h2>
      
      <div className="dashboard-grid">
        <div className="card">
          <h3>R² Score Comparison</h3>
          <div style={{ height: '300px' }}>
            <Bar 
              data={r2ScoreData} 
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 1.0,
                    title: {
                      display: true,
                      text: 'R² Score'
                    }
                  }
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Model Accuracy (R² Score)'
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="card">
          <h3>Mean Squared Error Comparison</h3>
          <div style={{ height: '300px' }}>
            <Bar 
              data={mseData} 
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'MSE'
                    }
                  }
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Model Error (MSE)'
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="card">
          <h3>Regression Insights</h3>
          <div>
            <h4>Key Findings:</h4>
            <ul>
              <li>Random Forest significantly outperforms Linear Regression</li>
              <li>Random Forest achieved an R² score of {regressionData.random_forest.r2_score}</li>
              <li>Linear Regression achieved an R² score of {regressionData.linear_regression.r2_score}</li>
              <li>Random Forest's MSE is {((regressionData.linear_regression.mse - regressionData.random_forest.mse) / regressionData.linear_regression.mse * 100).toFixed(2)}% lower than Linear Regression</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h3>Model Explanation</h3>
          <div>
            <p>The Random Forest model performs better because:</p>
            <ul>
              <li>It can capture non-linear relationships in the data</li>
              <li>It's robust to outliers and noise</li>
              <li>It automatically handles feature interactions</li>
              <li>It reduces overfitting through ensemble learning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regression; 