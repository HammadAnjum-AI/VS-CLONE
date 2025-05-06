import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    illness: "",
    duration: "",
    diagnosis: "",
    scans: "",
    sponsorship: "",
    bloodtype: "",
  });


  
 

  const [errors, setErrors] = useState({});
  const [recommendation, setRecommendation] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { id, value, name } = e.target;
    const key = id || name;

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Fetch recommendation when illness changes
    if (key === "illness" && value) {
      try {
        const response = await axios.post("http://localhost:9096/recommend-hospital", {
          illness: value,
        });
        setRecommendation(response.data.recommendedHospital);
      } catch (error) {
        console.error("Error fetching hospital recommendation:", error);
        setRecommendation("Error fetching recommendation.");
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.illness) newErrors.illness = "Select illness";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.diagnosis.trim()) newErrors.diagnosis = "Diagnosis is required";
    if (!formData.scans.trim()) newErrors.scans = "Scan info required";
    if (!formData.sponsorship) newErrors.sponsorship = "Sponsorship is required";
    if (!formData.bloodtype.trim()) newErrors.bloodtype = "Blood type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const mobilenumber = localStorage.getItem("mobilenumber");
        const dataToSend = { ...formData, mobilenumber };
  
        const response = await axios.post("http://localhost:9096/typeillness", dataToSend);
        console.log("Data sent successfully", response.data);
  
        navigate("/recommendation", { state: { illness: formData.illness } });
      } catch (error) {
        console.error("Error submitting report:", error);
        alert("Error submitting report. Please try again.");
      }
    }
  };
  

  useEffect(() => {
    const mobilenumber = localStorage.getItem("mobilenumber");
    if (!mobilenumber) {
      alert("You must log in first");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <nav>
        <img src="\Images\ChatGPT Image May 5, 2025, 03_19_18 PM.png" alt="logo" width="50px" height="40px" />
        <div className="navlinks">
          <Link to="/manarep">Manager Report</Link>
          <button
            onClick={() => {
              alert("Logout successfully!");
              navigate("/");
            }}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </nav>

      <form onSubmit={handleSubmit}>
        <h2>
          Describe your Illness <br /> to match a hospital
        </h2>

        <div>
          <label>Type of illness:</label>
          <select id="illness" value={formData.illness} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Heart problem">Heart problem</option>
            <option value="Appendix">Appendix</option>
          </select>
          {errors.illness && <p className="error">{errors.illness}</p>}
        </div>

       

        <div>
          <label>Blood Type:</label>
          <input
            id="bloodtype"
            type="text"
            placeholder="Enter your blood type"
            value={formData.bloodtype}
            onChange={handleChange}
          />
          {errors.bloodtype && <p className="error">{errors.bloodtype}</p>}
        </div>

        <div>
          <label>Duration of illness:</label>
          <input
            id="duration"
            type="text"
            placeholder="Enter duration of illness"
            value={formData.duration}
            onChange={handleChange}
          />
          {errors.duration && <p className="error">{errors.duration}</p>}
        </div>

        <div>
          <label>Diagnosis:</label>
          <input
            id="diagnosis"
            type="text"
            placeholder="Enter any diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
          />
          {errors.diagnosis && <p className="error">{errors.diagnosis}</p>}
        </div>

        <div>
          <label>Scans:</label>
          <input
            id="scans"
            type="text"
            placeholder="Enter any scans"
            value={formData.scans}
            onChange={handleChange}
          />
          {errors.scans && <p className="error">{errors.scans}</p>}
        </div>

        <div>
          <label>Sponsorship:</label>
          <label>
            <input
              type="radio"
              name="sponsorship"
              value="Yes"
              checked={formData.sponsorship === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="sponsorship"
              value="No"
              checked={formData.sponsorship === "No"}
              onChange={handleChange}
            />
            No
          </label>
          {errors.sponsorship && <p className="error">{errors.sponsorship}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
