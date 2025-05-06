
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Recommendation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState("");
  const [loading, setLoading] = useState(true);

  const illness = location.state?.illness;

  useEffect(() => {
    if (!illness) {
      alert("No illness provided.");
      navigate("/");
      return;
    }

    const fetchRecommendation = async () => {
      try {
        const response = await axios.post("http://localhost:9096/recommend-hospital", {
          illness,
        });
        setRecommended(response.data.recommendedHospital);
      } catch (error) {
        console.error("Error fetching hospital recommendation:", error);
        setRecommended("Error fetching hospital.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [illness, navigate]);

  return (
    <div>
      <h2>Recommended Hospital</h2>
      {loading ? <p>Loading...</p> : <p><strong>{recommended}</strong></p>}
      <button onClick={() => navigate("/dash")}>Back to Dashboard</button>
    </div>
  );
}
