import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManagerReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportData = async () => {
      const mobilenumber = localStorage.getItem('mobilenumber');
      console.log('Sending mobilenumber:', mobilenumber);

      if (!mobilenumber) {
        alert('You must be logged in to view this data');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:9096/managerreport', {
          headers: {
            mobilenumber: mobilenumber,
          },
        });

        console.log('Response from backend:', response.data);

        if (Array.isArray(response.data)) {
          setReportData(response.data);
        } else {
          setError('No report data available.');
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchReportData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Manager Report</h2>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Illness</th>
            <th>Hospital</th>
            <th>Duration</th>
            <th>Diagnosis</th>
            <th>Scans</th>
            <th>Sponsorship</th>
          </tr>
        </thead>
        <tbody>
          {reportData.length > 0 ? (
            reportData.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.illness}</td>
                <td>{patient.hospitals}</td>
                <td>{patient.duration}</td>
                <td>{patient.diagnosis}</td>
                <td>{patient.scans}</td>
                <td>{patient.sponsorship}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available for this user.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerReport;
