// RecommendationWidget.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecommendationWidget.css";

const RecommendationWidget = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/recommendations", {
        product_id: "31602544",
      });
      setRecommendations(response.data);
    } catch (err) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);
  return (
    <div className="recommendation-widget">
      <h3>Recommended Products</h3>
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Refresh Recommendations"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {recommendations.length > 0 ? (
        <ul className="recommendations-list">
          {recommendations.map((item, index) => (
            <li key={index} className="recommendation-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="recommendation-details">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-recommendations">No recommendations available.</p>
      )}
    </div>
  );
};

export default RecommendationWidget;

