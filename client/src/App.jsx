import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';
import Clustering from './components/Clustering';
import Regression from './components/Regression';

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>Data Science Dashboard</h1>
          <nav>
            <NavLink to="/" className="nav-link" end>Dashboard</NavLink>
            <NavLink to="/data" className="nav-link">Data</NavLink>
            <NavLink to="/clustering" className="nav-link">Clustering</NavLink>
            <NavLink to="/regression" className="nav-link">Regression</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<DataTable />} />
          <Route path="/clustering" element={<Clustering />} />
          <Route path="/regression" element={<Regression />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 