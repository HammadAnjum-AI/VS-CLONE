import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PatientApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editablePatient, setEditablePatient] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9096/managerreport')
      .then(response => {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setEditablePatient({ ...patient });
    setIsEditing(false);
  };

  const closeDetails = () => {
    setSelectedPatient(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditablePatient({ ...selectedPatient });
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:9096/updatepatient/${editablePatient.patient_id}`, editablePatient)
  .then(response => {
    console.log("Patient updated:", response.data);
    setSelectedPatient({ ...editablePatient });
    setIsEditing(false);
  })
  .catch(error => console.error("Update failed:", error));

    setSelectedPatient({ ...editablePatient });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditablePatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Patient Directory</h2>

      <div className="patient-grid">
        {applications.map((app, index) => (
          <div key={index} className="patient-card">
            <h3>{app.name}</h3>
            <p><strong>Patient ID:</strong> {app.patient_id}</p>
            <p><strong>Phone:</strong> {app.mobilenumber}</p>
            <p><strong>Illness:</strong> {app.illness}</p>
            <p><strong>Hospital:</strong> {app.hospitals}</p>
            <p><strong>Diagnosis:</strong> {app.diagnosis}</p>
            <button onClick={() => handleViewDetails(app)} className="view-details-button">
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedPatient && editablePatient && (
        <div className="details-container">
          <h3>Patient Full Details</h3>
          <form>
            <div style={{ marginBottom: '15px' }}>
              <label><strong>Patient ID:</strong></label>
              <input
                type="text"
                name="patient_id"
                value={editablePatient.patient_id}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label><strong>Name:</strong></label>
              <input
                type="text"
                name="name"
                value={editablePatient.name}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label><strong>Age:</strong></label>
              <input
                type="number"
                name="age"
                value={editablePatient.age}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label><strong>Mobile Number:</strong></label>
              <input
                type="text"
                name="mobilenumber"
                value={editablePatient.mobilenumber}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label><strong>Illness:</strong></label>
              <input
                type="text"
                name="illness"
                value={editablePatient.illness}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label><strong>Hospital:</strong></label>
              <input
                type="text"
                name="hospitals"
                value={editablePatient.hospitals}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label><strong>Diagnosis:</strong></label>
              <textarea
                name="diagnosis"
                value={editablePatient.diagnosis}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label><strong>Scans:</strong></label>
              <textarea
                name="scans"
                value={editablePatient.scans}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label><strong>Sponsorship:</strong></label>
              <input
                type="text"
                name="sponsorship"
                value={editablePatient.sponsorship}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <button type="button" onClick={closeDetails}>
              Close
            </button>

            {!isEditing ? (
              <>
                <button type="button" onClick={handleEdit}>Update</button>
                <button type="button">Approve</button>
              </>
            ) : (
              <>
                <button type="button" onClick={handleSaveEdit}>Save</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
