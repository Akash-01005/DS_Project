import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/statistics');
        setStatistics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load statistics');
        setLoading(false);
        console.error('Error fetching statistics:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="card">Loading statistics...</div>;
  if (error) return <div className="card">Error: {error}</div>;
  if (!statistics) return <div className="card">No statistics available</div>;

  const pieData = {
    labels: ['Clustering Data', 'Regression Data', 'Raw Data'],
    datasets: [
      {
        data: [4, 2, statistics.rows || 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Create bar chart data from summary statistics
  const barData = {
    labels: ['Min', 'Mean', 'Max'],
    datasets: [
      {
        label: 'Price Distribution',
        data: [
          statistics.summary?.Price?.min || 0,
          statistics.summary?.Price?.mean || 0,
          statistics.summary?.Price?.max || 0
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard Overview</h2>
      
      <div className="dashboard-grid">
        <div className="card">
          <h3>Dataset Summary</h3>
          <ul>
            <li><strong>Total Records:</strong> {statistics.rows}</li>
            <li><strong>Total Features:</strong> {statistics.columns.length}</li>
            <li><strong>Features:</strong> {statistics.columns.join(', ')}</li>
          </ul>
        </div>

        <div className="card">
          <h3>Data Distribution</h3>
          <div style={{ height: '250px' }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="card">
          <h3>Price Distribution</h3>
          <div style={{ height: '250px' }}>
            <Bar 
              data={barData} 
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="card">
          <h3>Model Performance</h3>
          <div>
            <p><strong>Clustering:</strong> 4 optimal clusters with silhouette score of 0.58</p>
            <p><strong>Regression:</strong> Random Forest achieved R² score of 0.92</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 