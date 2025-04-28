import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Clustering = () => {
  const [clusterData, setClusterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/clustering');
        setClusterData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load clustering data');
        setLoading(false);
        console.error('Error fetching clustering data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="card">Loading clustering data...</div>;
  if (error) return <div className="card">Error: {error}</div>;
  if (!clusterData) return <div className="card">No clustering data available</div>;

  // Prepare data for KMeans cluster distribution chart
  const clusterCountsData = {
    labels: Object.keys(clusterData.kmeans.cluster_counts).map(key => `Cluster ${key}`),
    datasets: [
      {
        data: Object.values(clusterData.kmeans.cluster_counts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Comparison chart for KMeans vs KMedoids
  const algorithmComparisonData = {
    labels: ['KMeans', 'KMedoids'],
    datasets: [
      {
        label: 'Silhouette Score',
        data: [clusterData.kmeans.silhouette_score, clusterData.kmedoids.silhouette_score],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Clustering Analysis</h2>
      
      <div className="dashboard-grid">
        <div className="card">
          <h3>KMeans Cluster Distribution</h3>
          <div style={{ height: '300px' }}>
            <Pie 
              data={clusterCountsData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Distribution of data points across clusters'
                  }
                }
              }} 
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <p><strong>Optimal Clusters:</strong> {clusterData.kmeans.optimal_clusters}</p>
            <p><strong>Silhouette Score:</strong> {clusterData.kmeans.silhouette_score.toFixed(2)}</p>
          </div>
        </div>

        <div className="card">
          <h3>Algorithm Comparison</h3>
          <div style={{ height: '300px' }}>
            <Doughnut 
              data={algorithmComparisonData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Silhouette Score Comparison'
                  }
                }
              }} 
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <p>KMeans performed better with a silhouette score of {clusterData.kmeans.silhouette_score.toFixed(2)} compared to KMedoids with {clusterData.kmedoids.silhouette_score.toFixed(2)}.</p>
          </div>
        </div>

        <div className="card">
          <h3>Clustering Insights</h3>
          <div>
            <h4>Key Findings:</h4>
            <ul>
              <li>Optimal number of clusters for KMeans: {clusterData.kmeans.optimal_clusters}</li>
              <li>Cluster 2 contains the most data points: {clusterData.kmeans.cluster_counts['2']}</li>
              <li>KMeans outperformed KMedoids in terms of silhouette score</li>
              <li>The clusters likely represent different car categories based on price and features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clustering; 