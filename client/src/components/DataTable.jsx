import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="card">Loading data...</div>;
  if (error) return <div className="card">Error: {error}</div>;
  if (!data || data.length === 0) return <div className="card">No data available</div>;

  // Get the column headers from the first data object
  const headers = Object.keys(data[0]);

  return (
    <div>
      <h2>Dataset Overview</h2>
      <div className="card">
        <p>Showing {data.length} records from the Car Details dataset</p>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} style={{ 
                    padding: '10px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #ddd',
                    backgroundColor: '#f3f4f6' 
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ 
                  backgroundColor: rowIndex % 2 === 0 ? 'white' : '#fafafa'
                }}>
                  {headers.map((header) => (
                    <td key={`${rowIndex}-${header}`} style={{ 
                      padding: '8px', 
                      borderBottom: '1px solid #ddd' 
                    }}>
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable; 