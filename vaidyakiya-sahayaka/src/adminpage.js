import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/patient');
  };

  return (
    <div className="admin-container">
  <h1>Administrator Page</h1>
  <div className="admin-box" onClick={handleNavigate}>
    <h3>Patient Applications</h3>
    <p>Click here to view and manage patient applications</p>
  </div>
</div>

  );
}
