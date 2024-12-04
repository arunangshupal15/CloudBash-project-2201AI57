// RecommendationWidget.js
import React, { useState } from "react";
import axios from "axios";

const RecommendationWidget = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/recommendations", {
        // You can customize the request body here
        productId: "31602544", // Example payload
        size: "M",
      });
      setRecommendations(response.data); // Assuming the response is an array
    } catch (err) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h3>Recommended Products</h3>
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {recommendations.map((item, index) => (
          <li key={index}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <img src={item.imageUrl} alt={item.name} style={{ width: "100px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationWidget;
